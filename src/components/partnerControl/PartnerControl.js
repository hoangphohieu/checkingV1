import React, { Component } from 'react';
import SelectDate from './SelectDate';

class PartnerControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getListById("listPartner");
        this.props.getListById("listDay");
    }

    componentDidUpdate() {
        let obj={}; obj[this.props.items.type]=this.props.items.listItem[0]; // tạo obj ={} để setstate
        if ( this.state[this.props.items.type] === undefined) { this.setState({ ...obj }) };  // nếu chưa có trường state đó thì tạo state đó

    }
    render() {
        let items = this.props.items;

        console.log(this.state);

        return (
            <div>
                <SelectDate />
            </div>
        );
    }
}

export default PartnerControl;