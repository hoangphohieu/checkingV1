import React, { Component } from 'react';
import { connect } from 'react-redux';
import Upload from '../components/upload/Upload';
import * as actions from '../actions';
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
        ExcelGetListPartner:(param)=>dispatch(actions.ExcelGetListPartner(param)),
        propsImportExcelToDefault:()=>dispatch(actions.stateImportExcelToDefault())
        
        
    };
}

class UploadContainer extends Component {
    render() {    
        return (
            <React.Fragment>
                <Upload {...this.props}/>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(UploadContainer);