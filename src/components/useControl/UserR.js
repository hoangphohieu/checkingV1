import React, { Component } from 'react';

class UserR extends Component {
    render() {
        let userProperties = JSON.parse(localStorage.UserProperties);
        return (
            <div>
                <p className="title-userR">Xin chao {userProperties[3]} </p>
                <p className="title-userR">Bạn đã đăng nhập thành công ! </p>
            </div>
        );
    }
}

export default UserR;