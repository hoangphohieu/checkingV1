import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartnerControl from '../components/partnerControl/PartnerControl';
import * as actions from './../actions';

function mapStateToProps(state) {
    return {
        items:state.itemsPartner
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getListById:(param)=>dispatch(actions.getListById(param)),
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
    mapStateToProps,mapDispatchToProps
)(PartnerControlContainer);