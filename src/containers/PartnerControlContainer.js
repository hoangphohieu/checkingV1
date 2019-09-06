import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartnerControl from '../components/partnerControl/PartnerControl';

function mapStateToProps(state) {
    return {

    };
}

class PartnerControlContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <PartnerControl {...this.props}/>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(PartnerControlContainer);