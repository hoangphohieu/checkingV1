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
        patchItemsExcelFail:(param)=>dispatch(actions.patchItemsExcelFailAPI(param)),
        stateImportExcelToDefault:(param)=>dispatch(actions.stateImportExcelToDefault(param)),
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