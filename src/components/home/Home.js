import React, { Component } from 'react';
import SelectPartnerAndDay from './SelectPartnerAndDay';
import AllChartsPartner from './AllChartsPartner';
import TrackingSearchContainer from './../../containers/TrackingSearchContainer';
class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            product: null,
            date: {
                from: undefined,
                to: undefined
            },
        }
    }
    setDaySelect = (param) => { // setState lai, được gọi từ component con (SelectDate)

        this.setState({ date: param })

    }
    setproduct = (param) => {
        this.setState({ product: param })
    }
    render() {

        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <p>select col-4</p>
                            <SelectPartnerAndDay sentDayToProps={this.setDaySelect} date={this.state.date} product={this.state.product} setproduct={this.setproduct} {...this.props} />
                        </div>
                        <div className="col-8 d-flex-column align-item-center over-flow-control">
                            <p>Biểu đồ col-8</p>
                            <AllChartsPartner date={this.state.date} product={this.state.product} {...this.props} />
                        </div>

                        <div className="col-12 mt-3">
                            <TrackingSearchContainer {...this.props} />
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

export default Home;