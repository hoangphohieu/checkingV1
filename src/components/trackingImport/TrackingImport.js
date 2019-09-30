import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './../excelImport/Exceltable';
class InputExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            dataExcel: null,
            firstPostListTrackingCount: 0,

        }
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        if (JSON.parse(localStorage.getItem("ItemsTrackingFail")) === null) {
            localStorage.setItem("ItemsTrackingFail", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("ItemsTracking")) === null) {
            localStorage.setItem("ItemsTracking", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("ItemsTrackingSuccess")) === null) {
            localStorage.setItem("ItemsTrackingSuccess", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("listTrackingCountPost")) === null) {
            localStorage.setItem("listTrackingCountPost", JSON.stringify([]));
        }
    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem("ItemsTracking")) !== null) {
            this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsTracking")) })
        }
    }



    componentDidUpdate = () => {
        let ItemsTracking = JSON.parse(localStorage.getItem("ItemsTracking"));
        let ItemsTrackingFail = JSON.parse(localStorage.getItem("ItemsTrackingFail"));
        this.CDU_ItemsCountProperties(); // bộ đếm itemCount khi post xong
        this.CDU_TrackRequest(ItemsTracking, ItemsTrackingFail);
        if (JSON.parse(localStorage.getItem("listTrackingCountPost")).length > 0) { this.CDU_postListTrackingCount(); }
        this.CDU_GetTrackFail(ItemsTracking, ItemsTrackingFail);
        this.CDU_reRenderWhenItemsTrackingZero();
    }
    CDU_postListTrackingCount = () => {
        if (this.state.firstPostListTrackingCount === 0) {
            let listItemCount = JSON.parse(localStorage.getItem("listTrackingCountPost"));
            this.props.postListTrackingCount(listItemCount[listItemCount.length - 1]);
            this.setState({ firstPostListTrackingCount: 1 })
        }
    }

    CDU_TrackRequest(ItemsTracking, ItemsTrackingFail) {
        let listTrackingCountPost = JSON.parse(localStorage.getItem("listTrackingCountPost"));
        if (this.props.itemExcelReload.type === "PATCH_ITEM_TRACKING_CONTROL_SUCSESS") { this.doingWhenPatchItemSucsess(ItemsTracking, ItemsTrackingFail) }
        else if (this.props.itemExcelReload.type === "PATCH_ITEM_TRACKING_CONTROL_RFAILURE") { }
        else if (this.props.itemExcelReload.type === "GET_ITEM_TRACKING_FAIL_SUCSESS") { this.getItemTrackingFailSucsess(ItemsTracking, ItemsTrackingFail) }
        else if (this.props.itemExcelReload.type === "GET_ITEM_TRACKING_FAIL_RFAILURE") { this.getItemTrackingFailRfailure() }
        else if (this.props.itemExcelReload.type === "POST_LIST_TRACKING_COUNT_SUCSESS") { this.postListTrackingCountSucsess(listTrackingCountPost) }
        else if (this.props.itemExcelReload.type === "POST_LIST_TRACKING_COUNT_RFAILURE") { this.postListTrackingCountFail() }
    }
    patchToServer = (ItemsTracking) => {
        if (ItemsTracking.length > 0) {
            let item = ItemsTracking[ItemsTracking.length - 1];
            let item2 = { id: item.id, trackingnumber: item.trackingnumber }
            console.log(item2);

            this.props.patchItem(item2);
        }
    }

    CDU_ItemsCountProperties = () => {
        let ItemsTracking = JSON.parse(localStorage.getItem("ItemsTracking"));
        let ItemsTrackingFail = JSON.parse(localStorage.getItem("ItemsTrackingFail"));
        let ItemsTrackingSuccess = JSON.parse(localStorage.getItem("ItemsTrackingSuccess"));
        if ((ItemsTracking.length === 0 && ItemsTrackingFail.length === 0) && ItemsTrackingSuccess.length > 0) {
            let listTrackingCountPost = [];
            console.log(ItemsTrackingSuccess);

            // danh sach so partner
            let listPartner = _.uniq(ItemsTrackingSuccess.map(param => [param.partnertype + param.partner, [param.partnertype, param.partner]]));  // lọc số partner vaf lọc trùng;
            listPartner = _.fromPairs(listPartner);
            listPartner = { ...listPartner, id: "listPartner" };

            // danh sach so ngay all partner
            let listDay = _.uniq(ItemsTrackingSuccess.map(param => [param.partnertype + param.day, [param.partnertype, param.day]]));  // lọc số partner vaf lọc trùng;
            listDay = _.fromPairs(listDay);
            listDay = { ...listDay, id: "listdaylistPartner" };

            // danh sach  partner voi so ngay tuong ung
            let listPartnerAndDay = ItemsTrackingSuccess.map(param => { return [param.partnertype, param.day, param.partner] });
            listPartnerAndDay = _.uniqWith(listPartnerAndDay, _.isEqual);
            let arrListPartner = _.toPairs(listPartner).filter(param => { return param[1] !== "listPartner" });
            let listPartnerAndDay2 = [];
            for (let i = 0; i <= arrListPartner.length - 1; i++) {
                let item = { id: "listday" + arrListPartner[i][1][1] }
                let item2 = listPartnerAndDay.filter(param => { return param[2] === arrListPartner[i][1][1] }).map(param2 => { return [param2[0] + param2[1], [param2[0], param2[1]]] });
                item2 = _.fromPairs(item2);
                item = { ...item, ...item2 };
                listPartnerAndDay2.push(item);
            }

            // danh sach doit ac voi ngay tuong ung, tih tong base cost voi so luong
            for (let i = 0; i <= arrListPartner.length - 1; i++) {
                const uuidv1 = require('uuid/v1');
                let PartnerAndDay = listPartnerAndDay2.filter(param => { return param.id === ("listday" + arrListPartner[i][1][1]) });
                PartnerAndDay = _.toPairs(PartnerAndDay[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
                for (let j = 0; j <= PartnerAndDay.length - 1; j++) {
                    let item = { id: uuidv1(), namePartner: arrListPartner[i][1][1], dayNumber: PartnerAndDay[j][1] }
                    let item2 = ItemsTrackingSuccess.filter(param => { return param.partner === arrListPartner[i][1][1] });
                    item["Sumlineitemquantity"] = 0;
                    item["Sumbasecost"] = 0;
                    item["Sumpartnertype"] = arrListPartner[i][1][0];
                    item["Sumus"] = 0;
                    item["Sumtrackingnumber"] = [];
                    let month = (new Date(PartnerAndDay[j][1])).getMonth() + 1;
                    let year = (new Date(PartnerAndDay[j][1])).getFullYear();
                    item["monthNumber"] = month;
                    item["yearNumber"] = year;

                    item2.filter(param => { return param.day === PartnerAndDay[j][1] }).forEach(param => {
                        item.Sumtrackingnumber.push(param.trackingnumber);
                    })
                    listTrackingCountPost.push(item);
                }
            }

            listDay = _.toPairs(listDay).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            for (let j = 0; j <= listDay.length - 1; j++) {
                let uuidv1 = require('uuid/v1');
                let item = { id: uuidv1(), namePartner: "allPartner", dayNumber: listDay[j][1] }
                let item2 = ItemsTrackingSuccess;
                item["Sumlineitemquantity"] = 0;
                item["Sumbasecost"] = 0;
                item["Sumpartnertype"] = listDay[j][0];
                item["Sumus"] = 0;
                item["Sumluminous"] = 0;
                item["Sumtrackingnumber"] = [];
                let month = (new Date(listDay[j][1])).getMonth() + 1;
                let year = (new Date(listDay[j][1])).getFullYear();
                item["monthNumber"] = month;
                item["yearNumber"] = year;
                item2.filter(param => { return param.day === listDay[j][1] }).forEach(param => {
                    item.Sumtrackingnumber.push(param.trackingnumber);
                })
                listTrackingCountPost.push(item);
            }
            localStorage.setItem("listTrackingCountPost", JSON.stringify(listTrackingCountPost));
            localStorage.setItem("ItemsTrackingSuccess", JSON.stringify([]));
        }
    }
    CDU_GetTrackFail(ItemsTracking, ItemsTrackingFail) {

        if (ItemsTracking.length === 0 && ItemsTrackingFail.length > 0) {
            localStorage.setItem("ItemsTracking", JSON.stringify(ItemsTrackingFail));
            localStorage.setItem("ItemsTrackingFail", JSON.stringify([]));
            let nameEndItem = ItemsTrackingFail[ItemsTrackingFail.length - 1].name
            this.props.getItemTrackingFail(nameEndItem);
        }
    }
    CDU_reRenderWhenItemsTrackingZero() {
        let payload = this.props.itemExcelReload;
        if ((payload.dataFetched === true || payload.error === true) && (JSON.parse(localStorage.getItem("ItemsTracking")).length === 0)) {
            if (this.state.dataExcel !== null) { this.setState({ dataExcel: null }); };
        }
    }
    doingWhenPatchItemSucsess(ItemsTracking, ItemsTrackingFail) {
        console.log("doingWhenPatchItemSucsess");

        let item = this.props.itemExcelReload.listItem;
        item = _.toPairs(item);
        if (item.length > 0) {
            if (ItemsTracking.length > 0) {
                let ItemsTrackingSuccess = JSON.parse(localStorage.getItem("ItemsTrackingSuccess"));
                ItemsTrackingSuccess.push(ItemsTracking[ItemsTracking.length - 1]);
                localStorage.setItem("ItemsTrackingSuccess", JSON.stringify(ItemsTrackingSuccess));
                ItemsTracking.pop();
                localStorage.setItem("ItemsTracking", JSON.stringify(ItemsTracking));
                if (ItemsTracking.length > 0) {
                    let nameEndItem = ItemsTracking[ItemsTracking.length - 1].name
                    this.props.getItemTrackingFail(nameEndItem);
                }
            }
        }
        else {// doingWhenPatchListItemCountFail
            if (ItemsTracking.length > 0) {
                ItemsTrackingFail.push(ItemsTracking[ItemsTracking.length - 1]);
                ItemsTracking.pop();
                localStorage.setItem("ItemsTracking", JSON.stringify(ItemsTracking));
                localStorage.setItem("ItemsTrackingFail", JSON.stringify(ItemsTrackingFail));
            }

            alert("Kiểm tra đường truyền mạng và F5 lại trang !! (1) ");
        }
    }

    getItemTrackingFailSucsess(ItemsTracking, ItemsTrackingFail) {
        let item = this.props.itemExcelReload.listItem;
        console.log(item);
        if (item.length > 1) {
            item = _.orderBy(item, ['day'], ['asc']);
            item = item[item.length - 1];
            let endItemsTracking = ItemsTracking[ItemsTracking.length - 1];
            item.trackingnumber = endItemsTracking.trackingnumber;
            this.props.patchItem(item);
        }
        else if (item.length === 1) {
            item = item[item.length - 1];
            let endItemsTracking = ItemsTracking[ItemsTracking.length - 1];
            item.trackingnumber = endItemsTracking.trackingnumber;
            this.props.patchItem(item);
        }

    }
    getItemTrackingFailRfailure() {
        alert("Kiểm tra đường truyền mạng và F5 lại trang !! (1) ");
    }
    getLastItemToCheck(_this) {
        let ItemsTracking = JSON.parse(localStorage.getItem("ItemsTracking"));
        if (ItemsTracking.length > 0) {
            let nameEndItem = ItemsTracking[ItemsTracking.length - 1].name;
            console.log(_this);

            _this.props.getItemTrackingFail(nameEndItem);
        }
    }

    postListTrackingCountSucsess = (listTrackingCountPost) => {
        if (listTrackingCountPost.length > 0) {
            listTrackingCountPost.pop();
            localStorage.setItem("listTrackingCountPost", JSON.stringify(listTrackingCountPost));
            if (listTrackingCountPost.length > 0) this.props.postListTrackingCount(listTrackingCountPost[listTrackingCountPost.length - 1]);
        }
    }
    postListTrackingCountFail() {
        alert("Kiểm tra đường truyền mạng và F5 lại trang !! (3) ");
    }

    ProcessExcel = (param) => {
        //Read the Excel File data.
        var workbook = XLSX.read(param, {
            type: 'binary'
        });
        /* convert from workbook to array of arrays */
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 }); // data= arr[[],[]...[]]
        data[0] = data[0].map(param => { param = param.trim().toLowerCase().split(" ").join(""); return param }) // data[0] bo space va chu hoa
        data = data.map(param => { // chuyuyển thuộc tính undefined thành null
            for (let i = 1; i <= param.length - 1; i++) {
                if (param[i] === undefined) param[i] = null;
            }
            return param
        })

        let dataObj = data.map(param => { return _.zipObject(data[0], param) });  // [{},{}...{}]
        dataObj.shift();
        dataObj.map(param => { // lọc day, shippingcountry , và id
            let dateConvert = ((param.day - 25569) * 24 * 60 * 60 * 1000);
            dateConvert = Date.parse(new Date(new Date(dateConvert).toDateString()));   // parse date sang number cho chinh xac  
            param.day = dateConvert; // lọc và định dạng lại ngày
            if ((param.shippingcountry.trim().toLowerCase() !== "us") && (param.shippingcountry.trim().toLowerCase().split(" ").join("") !== "unitedstates")) {
                param.shippingcountry = "WW"
            }
            else { param.shippingcountry = "US" } // lọc và định dạnh lại shipping country
            let id = _.kebabCase(param.name).split("-").join("") + _.kebabCase(param.lineitemname).split("-").join("") + _.kebabCase(param.lineitemsku).split("-").join("");
            param["id"] = id;// tạo id
            return param;
        });

        // dua du lieu arr[] vao local storage
        localStorage.setItem("ItemsTracking", JSON.stringify(dataObj));
        this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsTracking")) });

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

    render() {
        let ItemsTracking = JSON.stringify(this.state.dataExcel);
        console.log(this.props.itemExcelReload);
        let _this = this;
        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <button type="button" className="btn btn-success" onClick={() => this.getLastItemToCheck(_this)}>Patch to Server</button>
                <Exceltable dataExcelTable={ItemsTracking} />
                {/* {ItemsTrackingFail} */}
            </div>
        );
    }
}

export default InputExcel;