import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExcelImport from '../components/excelImport/ExcelImport';

function mapStateToProps(state) {
    return {

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
    mapStateToProps,
)(ExcelImportContainer);