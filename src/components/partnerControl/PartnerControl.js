import React, { Component } from 'react';
import SelectDate from './SelectDate';
import _ from 'lodash';
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
        let obj = {}; obj[this.props.items.type] = this.props.items.listItem[0]; // tạo obj ={} để setstate
        if (this.state[this.props.items.type] === undefined) { this.setState({ ...obj }) };  // nếu chưa có trường state đó thì tạo state đó
        if (this.state.listPartner !== undefined) {
            // console.log(this.state.listPartner);
            let partner = _.toPairs(this.state.listPartner).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            for (let i = 0; i <= partner.length - 1; i++) { // để ý cái này, request rất nhiều :((
                // console.log(partner[i]);

                if (this.state[partner[i]] === undefined) {
                    console.log(this.state);
                    this.props.getListById(partner[i]);
                }
            }
            // console.log(this.state);

        }

    }
    render() {
        let listPartner= this.state.listPartner;
        listPartner=_.toPairs(listPartner).filter(param=>{return param[0]!=="id"}).map(param=>param[1]);
        listPartner=listPartner.map((param,id)=>{return <SelectDate {...this.props} partnerAndDay={_.toPairs(this.state[param])} key={id}/>})

        return (
            <div>
                {listPartner}
            </div>
        );
    }
}

export default PartnerControl;