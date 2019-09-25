import React, { Component } from 'react';
// import _ from 'lodash';
import SelectPartnerAndDay from './SelectPartnerAndDay';
import AllChartsPartner from './AllChartsPartner';
class PartnerControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            date: {
                from: undefined,
                to: undefined
            },
        }
    }
    setDaySelect = (param) => { // setState lai, được gọi từ component con (SelectDate)
        this.setState({ date: param })

    }
    render() {
console.log(this.state.date);

        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <p>select col-4</p>
                            <SelectPartnerAndDay sentDayToProps={this.setDaySelect} date={this.state.date} setDateToUndefined{...this.props} />
                        </div>
                        <div className="col-8 d-flex-column align-item-center">
                            <p>Biểu đồ col-8</p>
                            <AllChartsPartner date={this.state.date}  {...this.props} />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default PartnerControl;