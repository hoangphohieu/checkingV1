import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './Exceltable';

class InputExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            dataExcel: []
        }
    }
    ProcessExcel = (data) => {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        // demo
        /* convert from workbook to array of arrays */
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
        this.setState({ dataExcel: data })
        
        //  end demo
    };
    readSingleFile = (e) => {
        let _this = this;

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.csv)$/;
        if (regex.test(e.target.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        _this.ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(e.target.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        _this.ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(e.target.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    }
    render() {
        let objectConvert;
        if (this.state.dataExcel !== []) {
            objectConvert = this.state.dataExcel.map((param, id) => {
                let obj = {};
                for (let j = 0; j <= param.length - 1; j++) {
                    obj[this.state.dataExcel[0][j]] = param[j]
                }
                return {
                    ...obj
                }
            })
            objectConvert.shift();

        }
        console.log(objectConvert);

        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <Exceltable dataExcelTable={this.state.dataExcel}/>
            </div>
        );
    }
}

export default InputExcel;