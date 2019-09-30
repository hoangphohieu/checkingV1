import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import TrackingImport from '../components/trackingImport/TrackingImport';
function mapStateToProps(state) {
      return {
            itemExcelReload:state.ItemTracking
      };
}

function mapDispatchToProps(dispatch) {
      return {
            patchItem: (param) => dispatch(actions.patchItemCheckingControlAPI(param)),
            getItemTrackingFail: (param) => dispatch(actions.getItemTrackingFailAPI(param)),
            postListTrackingCount:(param)=>dispatch(actions.postListTrackingCountAPI(param)),
      };
}

class CheckingControlContainer extends Component {
      render() {
            
            return (
                  <React.Fragment>
                        <TrackingImport {...this.props}/>
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(CheckingControlContainer);