import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './../components/Items';
import * as action from './../actions';

function mapStateToProps(state) {
      return {
            items: state.items.listItem,
            valueToGetAPI: state.valueToGetAPI
      };
}
function mapDispatchToProps(dispatch) {
      return {
            getFirstPage: (param) => dispatch(action.getPageItemsAPI(param)), // trigger lên itemSaga và itemsReducer 
            updateItem: (param) => dispatch(action.updateItemAPI(param)), // trigger lên itemSaga và itemsReducer
            deleteItem: (param) => dispatch(action.deleteItemAPI(param)) // trigger lên itemSaga và itemsReducer
      };
}


class ItemsContainer extends Component {
      render() {
            return (
                  <React.Fragment>
                        <Items {...this.props} />
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(ItemsContainer);