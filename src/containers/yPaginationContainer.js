import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../actions/index';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
      return {
            valueToGetAPI:state.valueToGetAPI  // lấy value từ store để get API
      };
}
function mapDispatchToProps(dispatch) {
      return {
            changeActivePage:(param)=>dispatch(action.changeActivePage(param)), //trigger lên valueToGetAPIReducer
            getPageItem:(param)=> dispatch(action.getPageItemsAPI(param)) // trigger lên itemsReducer và itemsaga
      };
}

class PaginationContainer extends Component {
      render() {
            return (
                 <React.Fragment>
                       <Pagination {...this.props}/> 
                 </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps,mapDispatchToProps
)(PaginationContainer);