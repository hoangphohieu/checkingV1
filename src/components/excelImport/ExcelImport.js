import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './Exceltable';
import CheckingFailProperties from './CheckingFailProperties';
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

    componentDidUpdate = () => {
        let payload = this.props.itemExcelReload;

        if ((payload.dataFetched === true || payload.error === true) && (JSON.parse(localStorage.getItem("ItemsExcel")).listItem.length === 1)) {
            if (this.state.dataExcel.listItem !== null) {
                this.setState({ dataExcel: { ...this.state.dataExcel, listItem: null } });
            }
        }
    }

    ProcessExcel = (param) => {
        // const uuidv1 = require('uuid/v1'); // tao uuid
        //Read the Excel File data.
        var workbook = XLSX.read(param, {
            type: 'binary'
        });
        /* convert from workbook to array of arrays */
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 }); // data= arr[]

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
        listPartner = { ...listPartner, id: "listPartner" };

        let listDay = _.uniq(objectConvert.map(param => param.day));  // lọc số partner vaf lọc trùng;
        listDay.shift();
        listDay = listDay.map(param => { return [param, param] });
        listDay = _.fromPairs(listDay);
        listDay = { ...listDay, id: "listDay" };

        let listPartnerAndDay = objectConvert.map(param => { return [param.day, param.partner] });
        listPartnerAndDay = _.uniqWith(listPartnerAndDay, _.isEqual);

        // listPartnerAndDay2 la danh sach partner voi ngay
        let arrListPartner = _.toPairs(listPartner);
        arrListPartner = arrListPartner.filter(param => { return param[1] !== "listPartner" })

        let listPartnerAndDay2 = [];
        for (let i = 0; i <= arrListPartner.length - 1; i++) {
            // console.log(arrListPartner[i]);
            listPartnerAndDay2.push();
            let item = {
                id: arrListPartner[i][1],
            }
            let item2 = listPartnerAndDay.filter(param => { return param[1] === arrListPartner[i][1] }).map(param2 => { return [param2[0], param2[0]] });
            item2 = _.fromPairs(item2);
            item = { ...item, ...item2 };
            listPartnerAndDay2.push(item)
        }



        // dua du lieu arr[] vao local storage
        let dataExcel = {
            listItem: objectConvert,
            listPartnerAndDay: [...listPartnerAndDay2, listPartner, listDay]

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
    postToServer = (param) => {
        let listItem = param.listItem;
        if (listItem.length > 1) {
            listItem.shift();
            this.props.postItem(listItem[listItem.length - 1]);

        }
    }
    postItemsExcelFail = (param, id) => {
        this.props.postItem(param);
        this.deleteItemsExcelFail(id);
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        console.log(ItemsExcel);
        ItemsExcel.listItem.push(param);
        localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));

    }
    doingWhenDataFetchedTrue = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let listItem = ItemsExcel.listItem;
        console.log(listItem)
        if (listItem.length > 1) {
            listItem.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify({ ...ItemsExcel, listItem: listItem }));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));
        }
    }

    doingWhenErrorTrue = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let itemFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));

        let listItem = ItemsExcel.listItem;
        if (listItem.length > 1) {
            itemFail = _.uniqWith([...itemFail, [...listItem].pop()], _.isEqual);  // loc va tao ra itemFail
            localStorage.setItem("ItemsExcelFail", JSON.stringify(itemFail)); // luu itemFail vao storage

            listItem.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify({ ...ItemsExcel, listItem: listItem }));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));
        }
    }
    changeItemsExcelFail = (param, id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = param;
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
        this.setState({ numberTimeOut: Math.random() })
    }
    deleteItemsExcelFail = (id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = null;
        ItemsExcelFail = ItemsExcelFail.filter(param => { return param !== null });
        console.log(ItemsExcelFail);

        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
        this.setState({ numberTimeOut: Math.random() })
    }


    render() {

        if (JSON.parse(localStorage.getItem("ItemsExcelFail")) === null) {  // tao ItemsExcelFail trong local storage neu chua co
            localStorage.setItem("ItemsExcelFail", JSON.stringify([]));
        }

        if (this.props.itemExcelReload.dataFetched === true) { this.doingWhenDataFetchedTrue() }
        else if (this.props.itemExcelReload.error === true) { this.doingWhenErrorTrue() }

        let listItem = JSON.stringify(this.state.dataExcel.listItem);
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));

        if (ItemsExcelFail.length !== 0) {
            ItemsExcelFail = ItemsExcelFail.map((param, id) => { return <CheckingFailProperties {...this.props} proppertiesitem={param} key={id} sttItemsExcelFail={id} changeItemsExcelFail={this.changeItemsExcelFail} deleteItemsExcelFail={this.deleteItemsExcelFail} postItemsExcelFail={this.postItemsExcelFail} /> })
        }

        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <button type="button" className="btn btn-success" onClick={() => this.postToServer(this.state.dataExcel)}>Post to Server</button>
                <Exceltable dataExcelTable={listItem} />
                {ItemsExcelFail}
            </div>
        );
    }
}

export default InputExcel;