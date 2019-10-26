import React, { Component } from 'react';
import UserProperties from './UserProperties';
import AddUser from './AddUser';
class UserCRUD extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listPartner: null,
            listUser: []
        }
    }

    componentDidMount() {
        this.props.userGetListById("listPartner"); // lay sanh sach cac partner
        this.props.getListUser("?dataType=user"); // laydanh sach cac user
    }

    componentDidUpdate() {
        this.CDU_checkRequest();
    }
    CDU_checkRequest = () => {
        if (this.props.itemsPayload.type === "USER_GET_LIST_BY_ID_SUCSESS") { this.getListPartnerSucsess() }
        else if (this.props.itemsPayload.type === "GET_LIST_USER_SUCSESS") { this.getListUserSucsess() }
        else if (this.props.itemsPayload.type === "CHANGE_USE_PROPERTIES_SUCSESS") { this.changeUserPropertiesSucsess() }
        else if (this.props.itemsPayload.type === "CREATE_USER_SUCSESS") { this.createUserSucsess() }
        else if (this.props.itemsPayload.type === "DELETE_USER_SUCSESS") { this.deleteUserSucsess() }
        else if (this.props.itemsPayload.type === "DELETE_USER_RFAILURE") { this.deleteUserFail() }
    }
    deleteUserFail = () => {
        alert("kiểm tra lại đường truyền mạng!");
        this.props.setStateStoreToDefault();

    }
    deleteUserSucsess = () => {
        this.props.getListUser("?dataType=user"); // laydanh sach cac user
    }
    createUserSucsess = () => {
        this.props.getListUser("?dataType=user"); // laydanh sach cac user
    }
    createUserFail = () => {
        alert("Tài khoản đã tồn tại, hoặc kiểm tra lại đường truyền mạng!");
        this.props.setStateStoreToDefault();

    }
    changeUserPropertiesSucsess = () => {
        this.props.getListUser("?dataType=user"); // laydanh sach cac user
    }
    getListPartnerSucsess = () => {
        let listPartner = this.props.itemsPayload.listItem;
        if (listPartner.length === 1) {
            this.setState({ listPartner: listPartner[0] });
            this.props.setStateStoreToDefault();

        }
    }

    getListUserSucsess = () => {
        let listUser = this.props.itemsPayload.listItem;
        if (listUser.length !== 0) {
            this.setState({ listUser: listUser });
            this.props.setStateStoreToDefault();
        }


    }



    render() {
        let listUser = this.state.listUser;
        console.log(listUser);

        if (listUser !== []) {
            listUser = listUser.filter(param => param.id !== "adminretc_000");
            listUser = listUser.map((param, id) => { return <UserProperties {...this.props} userProperties={param} key={id} listPartner={this.state.listPartner} /> })
        }

        return (
            <div>
                <AddUser {...this.props} listPartner={this.state.listPartner} />
                {listUser}

            </div>
        );
    }
}

export default UserCRUD;