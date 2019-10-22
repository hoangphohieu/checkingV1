import React, { Component } from 'react';
import UserProperties from './UserProperties';
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
    }
    getListPartnerSucsess = () => {
        let listPartner = this.props.itemsPayload.listItem;
        if (listPartner.length === 1 && this.state.listPartner === null) {
            this.setState({ listPartner: listPartner[0] })
        }
    }

    getListUserSucsess = () => {
        let listUser = this.props.itemsPayload.listItem;
        if (listUser.length !== 0 && this.state.listUser.length === 0) {
            this.setState({ listUser: listUser })
        }


    }

    render() {
        let listUser = this.state.listUser;
        if (listUser !== []) {
            listUser = listUser.map((param, id) => { return <UserProperties {...this.props} userProperties={param} key={id} /> })
        }

        return (
            <div>
                UserCRUD
                {listUser}
            </div>
        );
    }
}

export default UserCRUD;