import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackingSearch from '../components/partnerControl/TrackingSearch';

function mapStateToProps(state) {
    return {

    };
}

class TrackingSearchContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <TrackingSearch {...this.props} />
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(TrackingSearchContainer);