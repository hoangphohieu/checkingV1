import React, { Component } from 'react';
import SelectDate from './SelectDate';
import AllChartsPartner from './AllChartsPartner';
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
                            <SelectDate  {...this.props} />
                        </div>
                        <div className="col-8 d-flex-column align-item-center over-flow-control">
                            <p>Biểu đồ col-8</p>
                            <AllChartsPartner date={this.state.date} product={this.state.product} {...this.props} />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;