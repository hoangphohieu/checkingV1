import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExcelImport from '../components/excelImport/ExcelImport';
import * as actions from './../actions';
function mapStateToProps(state) {
    return {
        itemExcelReload:state.ItemExcelPost
    };
}
function mapDispatchToProps(dispatch) {
    return {
        postItem:(param)=>dispatch(actions.postItemAPI(param)),
        postListItemCount:(param)=>dispatch(actions.postListItemCountAPI(param)),
        patchListItemCount:(param)=>dispatch(actions.patchListItemCountAPI(param)),
        patchItemsExcelFail:(param)=>dispatch(actions.patchItemsExcelFailAPI(param)),
        postListItemCountPatchFail:(param)=>dispatch(actions.postListItemCountPatchFailAPI(param)),
        getLastItemOflistItemCountPatch:(param)=>dispatch(actions.getLastItemOflistItemCountPatch(param)),
        propsImportExcelToDefault:(param)=>dispatch(actions.stateImportExcelToDefault(param)),
        
    };
}

class ExcelImportContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <ExcelImport {...this.props}/>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(ExcelImportContainer);