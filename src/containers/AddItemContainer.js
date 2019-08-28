import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddItem from '../components/AddItem';
import * as action from './../actions';
function mapStateToProps(state) {
      return {
            valueToGetAPI: state.valueToGetAPI  // lấy state từ store 
      };
}
function mapDisPatchToProps(dispatch) {
      return {
            addItem: (param) => dispatch(action.addItemAPI(param)) // trigger lên itemSaga và itemSReducer
      };
}

class AddItemContainer extends Component {
      render() {
            return (
                  <React.Fragment>
                        <AddItem {...this.props} />
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDisPatchToProps
)(AddItemContainer);