import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loadding from './../components/Loadding';
function mapStateToProps(state) {
    return {
        items: state.items
    };
}
class LoaddingContainer extends Component {
    render() {
        return (
            <Loadding {...this.props} />
        );
    }
}
export default connect(
    mapStateToProps,
)(LoaddingContainer);