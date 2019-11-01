import React, { Component } from 'react';
import LoginUses from './LoginUses';
import UserR from './UserR';
import UserCRUD from './UserCRUD';
class UseControl extends Component {


    componentDidUpdate() {
        this.CDU_checkRequest();
    }
    CDU_checkRequest = () => {
        if (this.props.itemsPayload.type === "GET_USE_INFO_SUCSESS") { this.getUserInfoSucsess() }
        else if (this.props.itemsPayload.type === "GET_USE_INFO_RFAILURE") { this.getUserInfoFail() }
    }
    getUserInfoSucsess = () => {
        let user = this.props.itemsPayload.listItem;
        if (user.length === 1) {
            let properties = [];
            properties.push(user[0].router);
            properties.push(user[0].partner);
            properties.push(user[0].name);
            properties.push(user[0].phone);
            localStorage.setItem("UserProperties", JSON.stringify(properties));
            // this.props.setStateStoreToDefault(); 
            window.location="/useControl";
        }
    }
    getUserInfoFail = () => {
        alert("Kiểm tra lại đường truyền mạng và F5 lại trang !");
        this.props.setStateStoreToDefault();

    }
   
    render() {


        let UserProperties = JSON.parse(localStorage.UserProperties);

        console.log(UserProperties);



        return (
            <div>
                {(UserProperties.length === 0) ? <LoginUses  {...this.props} /> : ((UserProperties[0] === "retc_000") ? <UserCRUD  {...this.props} /> : <UserR  {...this.props} />)}
            </div>
        );
    }
}

export default UseControl;