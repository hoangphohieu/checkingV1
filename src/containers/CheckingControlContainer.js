import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import CheckingControl from '../components/checkingControl/CheckingControl';
function mapStateToProps(state) {
      return {
            dataChecking: state.items
      };
}

function mapDispatchToProps(dispatch) {
      return {
            searchChecking: (param) => dispatch(actions.getCheckingAPI(param)),
            changePrintStatus: (param) => dispatch(actions.changePrintStatusAPI(param)),
            patchItemCheckingProperties:(param)=>dispatch(actions.patchItemCheckingProperties(param)),
            deleteItemChecking:(param)=>dispatch(actions.deleteItemChecking(param)),
            itemsPrintFalse:()=>dispatch(actions.itemsPrintFalse()),
      };
}

class CheckingControlContainer extends Component {
      render() {
            
            return (
                  <React.Fragment>
                        <CheckingControl {...this.props}/>
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(CheckingControlContainer);