import React, { Component } from 'react';
import UserProperties from './UserProperties';
import PartnersPagination from './PartnersPagination';

import AddUser from './AddUser';
import _ from "lodash"
class UserCRUD extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listUser: [],
            listPartner: []
        }
    }

    componentWillMount() {
        console.log();

        if (localStorage.SumOrderHome === undefined) {
            localStorage.setItem("SumOrderHome", JSON.stringify([]));
        }

        localStorage.setItem("ListGetBaseCost", JSON.stringify([]));
        localStorage.setItem("ListBaseCostProperties", JSON.stringify([]));

        if (JSON.parse(localStorage.SumOrderHome).length === 0) { this.props.getSumItem("sumitem/?datatype=item") };
    }
    componentDidMount() {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user


    }

    componentDidUpdate() {
        this.CDU_checkRequest();
    }
    CDU_checkRequest = () => {
        if (this.props.itemsPayload.type === "GET_LIST_USER_SUCSESS") { this.getListUserSucsess() }
        else if (this.props.itemsPayload.type === "CHANGE_USE_PROPERTIES_SUCSESS") { this.changeUserPropertiesSucsess() }
        else if (this.props.itemsPayload.type === "CREATE_USER_SUCSESS") { this.createUserSucsess() }
        else if (this.props.itemsPayload.type === "GET_SUM_ITEM_SUCSESS") { this.getSumItemSucsess() }
        else if (this.props.itemsPayload.type === "DELETE_USER_SUCSESS") { this.deleteUserSucsess() }
        else if (this.props.itemsPayload.type === "DELETE_USER_RFAILURE") { this.deleteUserFail() }
    }
    getSumItemSucsess = () => {
        if (JSON.parse(localStorage.SumOrderHome).length === 0) {
            localStorage.setItem("SumOrderHome", JSON.stringify(_.toPairs(this.props.itemsPayload.listItem)));
            this.props.setStateStoreToDefault();
        }
        else {
            // localStorage.setItem("ListGetBaseCost", JSON.stringify(param));
            let ListGetBaseCost = JSON.parse(localStorage.ListGetBaseCost);
            if (ListGetBaseCost.length > 0) {
                ListGetBaseCost.pop();
                localStorage.ListGetBaseCost = JSON.stringify(ListGetBaseCost);
                if (ListGetBaseCost.length !== 0)
                    this.props.getSumItem("sumitem/?datatype=item&partner=user" + ListGetBaseCost[ListGetBaseCost.length - 1]);

                let ListBaseCostProperties = JSON.parse(localStorage.ListBaseCostProperties);
                ListBaseCostProperties = [...ListBaseCostProperties, this.props.itemsPayload.listItem];
                localStorage.ListBaseCostProperties = JSON.stringify(ListBaseCostProperties);


            }
        }


        console.log(this.props.itemsPayload);


    }
    deleteUserFail = () => {
        alert("kiểm tra lại đường truyền mạng!");
        this.props.setStateStoreToDefault();

    }
    deleteUserSucsess = () => {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user
    }
    createUserSucsess = () => {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user
    }
    createUserFail = () => {
        alert("Tài khoản đã tồn tại, hoặc kiểm tra lại đường truyền mạng!");
        this.props.setStateStoreToDefault();

    }
    changeUserPropertiesSucsess = () => {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user
    }

    getListUserSucsess = () => {
        let listUser = this.props.itemsPayload.listItem;

        if (listUser.length > 1) {
            listUser.pop();
            listUser = listUser.filter(param => param.item_post.id !== "adminretc_000");
            let listPartner = _.chunk(listUser.map(param => param.item_post.partner.substr(4)), 2);

            this.setState({ listUser: listUser, listPartner: listPartner });
            this.props.setStateStoreToDefault();
        }


    }

    getBaseCostByList = (param) => {
        console.log(param);

        localStorage.setItem("ListGetBaseCost", JSON.stringify(param));
        this.props.getSumItem("sumitem/?datatype=item&partner=user" + param[param.length - 1]); // laydanh sach cac user

        console.log("ListGetBaseCost.........");


    }

    render() {
        let listUser = this.state.listUser;
        if (listUser.length > 0) {
            listUser = listUser.map((param, id) => { return <UserProperties {...this.props} userProperties={param} key={id} /> })
        }
        //  tính tổng số base cost
        let sumBaseCost = 0;
        if (JSON.parse(localStorage.SumOrderHome).length !== 0) {
            JSON.parse(localStorage.SumOrderHome).forEach(element => {
                element[1].forEach(element2 => {
                    sumBaseCost += element2.basecost;
                })
            });
        }

        // tính tổng đã thanh toán paid
        let paid = 0;
        if (this.state.listUser.length > 0) {
            this.state.listUser.forEach(param => {
                if (param.item_post.paid.length !== 0) {
                    param.item_post.paid.forEach(param2 => {
                        paid += parseInt(param2[1]);
                    })
                }
            })
        }
        // tính cái khác
        console.log(this.state.listPartner);

        return (
            <div>
                <div className="row">
                    <div className="col-2 left-tracking-properties p-0">
                        <AddUser {...this.props} />
                        <div className="tracking-count mt-3" >Al Partner</div>
                        <PartnersPagination partnersPaginations={this.state.listPartner} getBaseCostByList={this.getBaseCostByList} />




                    </div>
                    <div className="col-10">
                        <div className="row mt-2 justify-content-center">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-body p-1">
                                        <div className="d-flex justify-content-around">
                                            <h5 className="m-0">Base Cost:{sumBaseCost}</h5>
                                            <h5 className="m-0">Paid:{paid}</h5>
                                            <h5 className="m-0">Lost:{Math.abs(sumBaseCost - paid)}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-12">
                                {listUser}
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}

export default UserCRUD;