import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackingSearch from '../components/partnerControl/TrackingSearch';
import * as actions from './../actions';
 
function mapStateToProps(state) {
    return {
        listItems: state.TrackingReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTracking: (param) => dispatch(actions.getTrackingAPI(param)),

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
    mapStateToProps, mapDispatchToProps
)(TrackingSearchContainer);