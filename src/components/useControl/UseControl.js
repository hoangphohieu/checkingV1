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
        console.log(this.props.itemsPayload);

        if (user.length === 2) {
            let properties = [];
            user=user[0].item_post;
            properties.push(user.router);
            properties.push(user.partner);
            properties.push(user.name);
            properties.push(user.phone);
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

