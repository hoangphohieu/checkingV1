import React, { Component } from 'react';
import ChartPartner from './ChartPartner';
import _ from 'lodash';

class AllChartsPartner extends Component {
    render() {
        return (
            <React.Fragment>
                <ChartPartner styleChart="Sum_lineitemquantity"  {...this.props}/>
                <ChartPartner  styleChart="Sum_basecost" {...this.props} />
            </React.Fragment>
        );
    }
}

export default AllChartsPartner;