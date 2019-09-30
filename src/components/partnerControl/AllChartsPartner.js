import React, { Component } from 'react';
import ChartPartner from './ChartPartner';
import TrackingPagination from './TrackingPagination';
import _ from 'lodash';

class AllChartsPartner extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.date !== nextProps.date) { return false }
        return true
    }
    render() {

        return (
            <React.Fragment>
                <ChartPartner styleChart="Sumlineitemquantity"  {...this.props} />
                <ChartPartner styleChart="Sumbasecost" {...this.props} />
                <TrackingPagination {...this.props}/>
            </React.Fragment>
        );
    }
}

export default AllChartsPartner;