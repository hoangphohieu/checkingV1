import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './Exceltable';
class InputExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            dataExcel: {
                listItem: null,
                objectDay: null,
                objectPartner: null,

            },
            numberTimeOut: 0,

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
        // console.log(data);

        let objectConvert;
        if (data !== []) {
            objectConvert = data.map(param2 => {
                let obj = {};
                for (let j = 0; j <= param2.length - 1; j++) {
                    (param2[j] === undefined) ? (obj[data[0][j]] = null) : (obj[data[0][j]] = param2[j]);
                }
                return {
                    ...obj
                }
            })
        }

        objectConvert = objectConvert.map(param => {
            let id = param["Name"].toUpperCase() + param["Base cost"] + _.kebabCase(param["Lineitem name"]);
            return { ...param, id: id }
        });
        let listPartner = _.uniq(objectConvert.map(param => param.partner));  // lọc số partner vaf lọc trùng;
        listPartner.shift();
        listPartner = listPartner.map(param => { return [param, param] });
        listPartner = _.fromPairs(listPartner);


        let listDay = _.uniq(objectConvert.map(param => param.day));  // lọc số partner vaf lọc trùng;
        listDay.shift();
        listDay = listDay.map(param => { return [param, param] });
        listDay = _.fromPairs(listDay);


        // dua du lieu arr[] vao local storage
        let dataExcel = {
            listItem: objectConvert,
            listPartner: listPartner,
            listDay: listDay,

        }
        localStorage.setItem("ItemsExcel", JSON.stringify(dataExcel));
        this.setState({
            dataExcel: JSON.parse(localStorage.getItem("ItemsExcel"))
        })

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
    postToServer = (param, number) => {
        let listPartner = param.listPartner;
        let listDay = param.listDay;
        let listItem = param.listItem;
        // console.log(param);
        if (param !== []) {

            listItem.shift();
            setTimeout(() => {
                this.props.postItem(listItem[listItem.length - 1]);
            }, number);
        }
        // console.log(listItem);




    }

    render() {
        // console.log(this.state.dataExcel);

        let payload = this.props.itemExcelReload;
        if (payload.dataFetched === true) {
            // console.log("sd,nbdvkjdsnvdksjn");

            let param = JSON.parse(localStorage.getItem("ItemsExcel"));
            let listPartner = param.listPartner;
            let listDay = param.listDay;
            let listItem = param.listItem;
            
            if (listItem.length > 1) {
                listItem.pop();
                localStorage.setItem("ItemsExcel", JSON.stringify({ ...param, listItem: listItem }));
                this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")), numberTimeOut: this.state.numberTimeOut + 100 })
                this.postToServer(this.state.dataExcel, this.state.numberTimeOut);
            }

        }
        console.log(this.state.dataExcel.listDay);

        let listItem = JSON.stringify(this.state.dataExcel.listItem);

        // console.log(JSON.parse(localStorage.getItem("ItemsExcel")));

        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <button type="button" className="btn btn-success" onClick={() => this.postToServer(this.state.dataExcel)}>Post to Server</button>
                <Exceltable dataExcelTable={listItem} />
            </div>
        );
    }
}

export default InputExcel;