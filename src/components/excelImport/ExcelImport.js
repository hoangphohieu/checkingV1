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
            dataExcel: null,
            changeItemsExcelFail: 0,
            reRender: 0
        }
    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem("ItemsExcel")) !== null) {
            this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) })
        }
    }

    componentDidUpdate = () => {
        this.CDU_reRenderWhenItemsExcelZero(); // rerender khi post het list items from excel
        this.CDU_ItemsCountProperties();
        this.CDU_postListItemCount();
        this.CDU_stateImportExcelToDefault();
    }
    CDU_stateImportExcelToDefault = () => {
        if (
            (this.props.itemExcelReload.dataFetched === true || this.props.itemExcelReload.error === true)
            && (
                ((JSON.parse(localStorage.getItem("ItemsExcel")).length === 0) && (JSON.parse(localStorage.getItem("ItemsExcelFail")).length === 0))
                && ((JSON.parse(localStorage.getItem("ItemsExcelSuccess")).length === 0) && (JSON.parse(localStorage.getItem("listItemCount")).length === 0))
            )

        ) {
            console.log(this.props.itemExcelReload.dataFetched,this.props.itemExcelReload.error);
            this.props.stateImportExcelToDefault();

        }

    }

    CDU_ItemsCountProperties = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        let ItemsExcelSuccess = JSON.parse(localStorage.getItem("ItemsExcelSuccess"));
        ItemsExcelSuccess = ItemsExcelSuccess.filter(param => { return param.lineitemname !== undefined });
        localStorage.setItem("ItemsExcelSuccess", JSON.stringify(ItemsExcelSuccess));

        if ((ItemsExcel.length === 0 && ItemsExcelFail.length === 0) && ItemsExcelSuccess.length > 0) {
            console.log(ItemsExcelSuccess);

            let listItemCount = [];

            // danh sach so partner
            let listPartner = _.uniq(ItemsExcelSuccess.map(param => param.partner));  // lọc số partner vaf lọc trùng;
            listPartner = listPartner.map(param => { return [param, param] });
            listPartner = _.fromPairs(listPartner);
            listPartner = { ...listPartner, id: "listPartner" };
            listItemCount.push(listPartner);

            // danh sach so ngay
            let listDay = _.uniq(ItemsExcelSuccess.map(param => param.day));  // lọc số partner vaf lọc trùng;
            listDay = listDay.map(param => { return [param, param] });
            listDay = _.fromPairs(listDay);
            listDay = { ...listDay, id: "listDaylistPartner" }; 
            listItemCount.push(listDay);

            // danh sach  partner voi so ngay tuong ung
            let listPartnerAndDay = ItemsExcelSuccess.map(param => { return [param.day, param.partner] });
            listPartnerAndDay = _.uniqWith(listPartnerAndDay, _.isEqual);
            let arrListPartner = _.toPairs(listPartner).filter(param => { return param[1] !== "listPartner" });
            let listPartnerAndDay2 = [];
            for (let i = 0; i <= arrListPartner.length - 1; i++) {
                let item = { id: "listday" + arrListPartner[i][1] }
                let item2 = listPartnerAndDay.filter(param => { return param[1] === arrListPartner[i][1] }).map(param2 => { return [param2[0], param2[0]] });
                item2 = _.fromPairs(item2);
                item = { ...item, ...item2 };
                listPartnerAndDay2.push(item);
                listItemCount.push(item);
            }

            // danh sach doit ac voi ngay tuong ung, tih tong base cost voi so luong
            for (let i = 0; i <= arrListPartner.length - 1; i++) {
                const uuidv1 = require('uuid/v1');

                let PartnerAndDay = listPartnerAndDay2.filter(param => { return param.id === ("listday" + arrListPartner[i][1]) });
                PartnerAndDay = _.toPairs(PartnerAndDay[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);

                for (let j = 0; j <= PartnerAndDay.length - 1; j++) {
                    let item = { id: uuidv1(), namePartner: arrListPartner[i][1], dayNumber: PartnerAndDay[j] }
                    let item2 = ItemsExcelSuccess.filter(param => { return param.partner === arrListPartner[i][1] });
                    item["Sum_lineitemquantity"] = 0;
                    item["Sum_basecost"] = 0;
                    item["Sum_us"] = 0;
                    item["Sum_luminous"] = 0;
                    let month = (new Date(PartnerAndDay[j])).getMonth() + 1;
                    let year = (new Date(PartnerAndDay[j])).getFullYear();
                    item["monthNumber"] = month;
                    item["yearNumber"] = year;
                    item2.filter(param => { return param.day === PartnerAndDay[j] }).filter(param => { return param.shippingcountry.trim().toLowerCase() === "us" }).forEach(param => { item.Sum_us = item.Sum_us + param.lineitemquantity });
                    item2.filter(param => { return param.day === PartnerAndDay[j] }).filter(param => { return param.phonecasetype.trim().toLowerCase() === "luminous" }).forEach(param => { item.Sum_luminous = item.Sum_luminous + param.lineitemquantity });
                    item2.filter(param => { return param.day === PartnerAndDay[j] }).forEach(param => {
                        item.Sum_lineitemquantity = (item.Sum_lineitemquantity + param.lineitemquantity);
                        item.Sum_basecost = (item.Sum_basecost + param.lineitemquantity * param.basecost);
                    })
                    // console.log(item);
                    listItemCount.push(item);
                }
            }

            listDay = _.toPairs(listDay).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            for (let j = 0; j <= listDay.length - 1; j++) {
                const uuidv1 = require('uuid/v1');
                let item = { id: uuidv1(), namePartner: "allPartner", dayNumber: listDay[j] }
                let item2 = ItemsExcelSuccess;
                item["Sum_lineitemquantity"] = 0;
                item["Sum_basecost"] = 0;
                item["Sum_us"] = 0;
                item["Sum_luminous"] = 0;
                let month = (new Date(listDay[j])).getMonth() + 1;
                let year = (new Date(listDay[j])).getFullYear();
                item["monthNumber"] = month;
                item["yearNumber"] = year;
                item2.filter(param => { return param.day === listDay[j] }).filter(param => { return param.shippingcountry.trim().toLowerCase() === "us" }).forEach(param => { item.Sum_us = item.Sum_us + param.lineitemquantity });
                item2.filter(param => { return param.day === listDay[j] }).filter(param => { return param.phonecasetype.trim().toLowerCase() === "luminous" }).forEach(param => { item.Sum_luminous = item.Sum_luminous + param.lineitemquantity });
                item2.filter(param => { return param.day === listDay[j] }).forEach(param => {
                    item.Sum_lineitemquantity = (item.Sum_lineitemquantity + param.lineitemquantity);
                    item.Sum_basecost = (item.Sum_basecost + param.lineitemquantity * param.basecost);
                })
                // console.log(item);
                listItemCount.push(item);
            }

            localStorage.setItem("listItemCount", JSON.stringify(listItemCount));
            localStorage.setItem("ItemsExcelSuccess", JSON.stringify([]));
            // console.log(listItemCount);



        }
    }
    CDU_reRenderWhenItemsExcelZero() {
        let payload = this.props.itemExcelReload;
        if ((payload.dataFetched === true || payload.error === true) && (JSON.parse(localStorage.getItem("ItemsExcel")).length === 0)) {
            if (this.state.dataExcel !== null) { this.setState({ dataExcel: null }); };
        }
    }
    // read data from excel 
    CDU_postListItemCount = () => {
        if (JSON.parse(localStorage.getItem("listItemCount")).length > 0) {
            let listItemCount = JSON.parse(localStorage.getItem("listItemCount"));
            this.postToServer(listItemCount);
            localStorage.setItem("ItemsExcel", JSON.stringify(listItemCount));
            localStorage.setItem("listItemCount", JSON.stringify([]));
        }
    }
    ProcessExcel = (param) => {
        //Read the Excel File data.
        var workbook = XLSX.read(param, {
            type: 'binary'
        });
        /* convert from workbook to array of arrays */
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 }); // data= arr[]
        data[0] = data[0].map(param => { param = param.trim().toLowerCase().split(" ").join(""); return param })
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
        objectConvert.shift();
        objectConvert = objectConvert.map(param => {
            param.day = ((param.day - 25569) * 24 * 60 * 60 * 1000);
            if ((param.shippingcountry.trim().toLowerCase() !== "us") && (param.shippingcountry.trim().toLowerCase() !== "united states")) {
                param.shippingcountry = "WW"
            }
            return param;
        });


        console.log(objectConvert);

        objectConvert = objectConvert.map(param => {
            let id = param["name"].toUpperCase() + param["basecost"] + _.kebabCase(param["lineitemname"]);
            return { ...param, id: id }
        });
        // dua du lieu arr[] vao local storage
        let dataExcel = objectConvert;
        localStorage.setItem("ItemsExcel", JSON.stringify(dataExcel));
        this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) });

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
    // end read data from excel 

    postToServer = (ItemsExcel) => {
        if (ItemsExcel.length > 0) {
            this.props.postItem(ItemsExcel[ItemsExcel.length - 1]);

        }
    }

    doingWhenDataFetchedTrue = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));

        if (ItemsExcel.length > 0) {
            localStorage.setItem("ItemsExcelSuccess", JSON.stringify([...JSON.parse(localStorage.getItem("ItemsExcelSuccess")), ItemsExcel[ItemsExcel.length - 1]]));
            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));
        }
        // console.log(ItemsExcel);

    }
    doingWhenErrorTrue = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let itemFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));

        if (ItemsExcel.length > 0) {
            itemFail = _.uniqWith([...itemFail, [...ItemsExcel].pop()], _.isEqual);  // loc va tao ra itemFail
            localStorage.setItem("ItemsExcelFail", JSON.stringify(itemFail)); // lf itemFail vao storage

            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));
        }
    }
    postItemsExcelFail = (param, id) => {
        this.deleteItemsExcelFail(id);
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        // console.log(ItemsExcel);
        ItemsExcel.push(param);
        localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
        this.props.postItem(param);

    }
    patchItemsExcelCountFail = (param, id) => {
        // console.log(param);
        this.deleteItemsExcelFail(id);
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        // console.log(ItemsExcel);
        ItemsExcel.push(param);
        localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
        this.props.patchItemsExcelFail(param);

    }

    changeItemsExcelFail = (param, id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = param;
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
        this.setState({ changeItemsExcelFail: Math.random() })
    }
    deleteItemsExcelFail = (id) => {
        // console.log(id);

        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = null;
        ItemsExcelFail = ItemsExcelFail.filter(param => { return param !== null });
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
    }


    render() {
        if (JSON.parse(localStorage.getItem("ItemsExcelFail")) === null) {
            localStorage.setItem("ItemsExcelFail", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("ItemsExcelSuccess")) === null) {
            localStorage.setItem("ItemsExcelSuccess", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("ItemsCountProperties")) === null) {
            localStorage.setItem("ItemsCountProperties", JSON.stringify([]));
        }

        if (JSON.parse(localStorage.getItem("listItemCount")) === null) {
            localStorage.setItem("listItemCount", JSON.stringify([]));
        }


        console.log(this.props.itemExcelReload);
        // console.log(JSON.parse(localStorage.getItem("ItemsExcelSuccess")));

        if (this.props.itemExcelReload.dataFetched === true) { this.doingWhenDataFetchedTrue() }
        else if (this.props.itemExcelReload.error === true) { this.doingWhenErrorTrue() }
        let ItemsExcel = JSON.stringify(this.state.dataExcel);
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));

        if (ItemsExcelFail.length !== 0) {
            ItemsExcelFail = ItemsExcelFail.map((param, id) => {
                return <CheckingFailProperties {...this.props}
                    proppertiesitem={param} key={id}
                    sttItemsExcelFail={id}
                    changeItemsExcelFail={this.changeItemsExcelFail}
                    deleteItemsExcelFail={this.deleteItemsExcelFail}
                    postItemsExcelFail={this.postItemsExcelFail}
                    patchItemsExcelCountFail={this.patchItemsExcelCountFail} />
            })
        }
        // console.log(ItemsExcel);

        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <button type="button" className="btn btn-success" onClick={() => this.postToServer(this.state.dataExcel)}>Post to Server</button>
                <Exceltable dataExcelTable={ItemsExcel} />
                {ItemsExcelFail}
            </div>
        );
    }
}

export default InputExcel;