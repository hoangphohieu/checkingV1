import React, { Component } from 'react';
import ChartPartner from './ChartPartner';
import _ from 'lodash';

class AllChartsPartner extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props.date, nextProps.date);
        if (this.props.date !== nextProps.date) { return false }
        return true
    }
    render() {
        console.log(this.props.items.listItem);

        return (
            <React.Fragment>
                <ChartPartner styleChart="Sum_lineitemquantity"  {...this.props} />
                <ChartPartner styleChart="Sum_basecost" {...this.props} />
            </React.Fragment>
        );
    }
}

export default AllChartsPartner;