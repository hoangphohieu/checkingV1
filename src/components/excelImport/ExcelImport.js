import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './Exceltable';
class InputExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            dataExcel: [],
            numberTimeOut: 0
        }
    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem("ItemsExcel")) !== null) {
            this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) })
        }

    }

    ProcessExcel = (data) => {
        const uuidv1 = require('uuid/v1'); // tao uuid
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        /* convert from workbook to array of arrays */
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 }); // data= arr[]
        let dataState = data.shift();
        dataState.push("printStatus");
        dataState.push("id");
        data = data.map(param => { return [...param, false, uuidv1()] });
        data.unshift(dataState);
        // console.log(data);


        // dua du lieu arr[] vao local storage
        localStorage.setItem("ItemsExcel", JSON.stringify(data));
        this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) })
        // console.log(JSON.parse(localStorage.getItem("ItemsExcel")));

        /*end  convert from workbook to array of arrays */
    };
    readSingleFile = (e) => {
        let _this = this;

        //Validate whether File is valid Excel file.
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.csv)$/;
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
                        let data = "";
                        let bytes = new Uint8Array(e.target.result);
                        for (let i = 0; i < bytes.byteLength; i++) {
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
    postToServer = (param,number) => {
        // console.log(param);
        let objectConvert;
        if (param !== []) {
            objectConvert = param.map((param2, id) => {
                let obj = {};
                for (let j = 0; j <= param2.length - 1; j++) {
                    obj[param[0][j]] = param2[j]
                }
                return {
                    ...obj
                }
            })
            objectConvert.shift();
            setTimeout(() => {
                this.props.postItem(objectConvert[objectConvert.length - 1]);
            }, number);
        }
        // console.log(objectConvert);




    }

    render() {
        let payload = this.props.itemExcelReload;
        if (payload.dataFetched === true) {
            let items = JSON.parse(localStorage.getItem("ItemsExcel"));
            if (items.length > 1) {
                items.pop();
                localStorage.setItem("ItemsExcel", JSON.stringify(items));
                this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")),numberTimeOut:this.state.numberTimeOut+100 })
                this.postToServer(this.state.dataExcel,this.state.numberTimeOut);
            }

        }

        // console.log(JSON.parse(localStorage.getItem("ItemsExcel")));

        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <button type="button" className="btn btn-success" onClick={() => this.postToServer(this.state.dataExcel)}>Post to Server</button>
                <Exceltable dataExcelTable={this.state.dataExcel} />
            </div>
        );
    }
}

export default InputExcel;