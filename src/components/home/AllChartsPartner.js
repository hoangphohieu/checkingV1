import React, { Component } from 'react';
import ChartAmount from './ChartAmount';
import ChartBaseCost from './ChartBaseCost';

import _ from 'lodash';

class AllChartsPartner extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.date !== nextProps.date) { return false }
    //     return true
    // }
    render() {
console.log(this.props);

        return (
            <React.Fragment>
                <ChartAmount styleChart="Sumlineitemquantity"  {...this.props} />
                <ChartBaseCost styleChart="Sumbasecost" {...this.props} />
                
            </React.Fragment>
        );
    }
}

export default AllChartsPartner;