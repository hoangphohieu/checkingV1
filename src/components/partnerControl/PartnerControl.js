import React, { Component } from 'react';
import SelectPartnerAndDay from './SelectPartnerAndDay';
import AllChartsPartner from './AllChartsPartner';
import TrackingSearchContainer from './../../containers/TrackingSearchContainer';
class PartnerControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            partnerType: null,
            date: {
                from: undefined,
                to: undefined
            },
        }
    }
    setDaySelect = (param) => { // setState lai, được gọi từ component con (SelectDate)

        this.setState({ date: param })

    }
    setPartnerType = (param) => {
        this.setState({ partnerType: param })
    }
    render() {

        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <p>select col-4</p>
                            <SelectPartnerAndDay sentDayToProps={this.setDaySelect} date={this.state.date} partnerType={this.state.partnerType} setpartnerType={this.setPartnerType} {...this.props} />
                        </div>
                        <div className="col-8 d-flex-column align-item-center">
                            <p>Biểu đồ col-8</p>
                            <AllChartsPartner date={this.state.date} partnerType={this.state.partnerType} {...this.props} />
                            <TrackingSearchContainer {...this.props} />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default PartnerControl;