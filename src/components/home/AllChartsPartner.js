import React, { Component } from 'react';
import ChartAmount from './ChartAmount';
import ChartBaseCost from './ChartBaseCost';

import _ from 'lodash';

class AllChartsPartner extends Component {

    render() {
        console.log(JSON.parse(localStorage.SumOrderHome));

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-5 one-chart">
                        <ChartAmount styleChart="Sumlineitemquantity"  {...this.props} />

                    </div>
                    <div className="col-5 one-chart">
                        <ChartBaseCost styleChart="Sumbasecost" {...this.props} />

                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default AllChartsPartner;