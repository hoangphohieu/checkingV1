import React, { Component } from 'react';

class LoginUses extends Component {
    submit = () => {
        let endPoint = this.refs["loginUse"].value.trim() + this.refs["passwordUse"].value.trim();
        this.props.getUse(endPoint);
        // console.log(endPoint);

    }
    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        {/* Tabs Titles */}
                        {/* Icon */}

                        {/* Login Form */}
                        <form>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" ref="loginUse" />
                            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" ref="passwordUse" />
                            <br />
                            <button type="button" className="btn btn-info" onClick={this.submit}>Submit</button>
                        </form>
                        {/* Remind Passowrd */}
                        <div id="formFooter">
                            <a className="underlineHover" href="#">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginUses;