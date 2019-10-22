import React, { Component } from 'react';

class UserCRUD extends Component {
    componentDidMount() {
        this.props.getListUser("?dataType=user");
    }
    
    render() {
        let userProperties = JSON.parse(localStorage.UserProperties);
        console.log("UserCRUD...........");

        return (
            <div>
                UserCRUD
            </div>
        );
    }
}

export default UserCRUD;