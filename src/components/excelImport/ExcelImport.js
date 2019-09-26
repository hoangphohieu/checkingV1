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
            reRender: 0,
            stateListItemCountFail: 0,
            stateListItemPatchFail: 0,

        }
    }
    componentWillMount() { // khởi tạo localStorate
        if (JSON.parse(localStorage.getItem("ItemsExcelFail")) === null) {
            localStorage.setItem("ItemsExcelFail", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("ItemsExcelSuccess")) === null) {
            localStorage.setItem("ItemsExcelSuccess", JSON.stringify([]));
        }

        if (JSON.parse(localStorage.getItem("listItemCountPatch")) === null) {
            localStorage.setItem("listItemCountPatch", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("listItemCountPatchFail")) === null) {
            localStorage.setItem("listItemCountPatchFail", JSON.stringify([]));
        }

        if (JSON.parse(localStorage.getItem("listItemCountPost")) === null) {
            localStorage.setItem("listItemCountPost", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("listItemCountPostFail")) === null) {
            localStorage.setItem("listItemCountPostFail", JSON.stringify([]));
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
        this.CDU_stateImportExcelToDefault();
        this.CDU_postListItemCount();
        this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi có request trả về
    }
    CDU_stateImportExcelToDefault = () => {
        // if ((this.props.itemExcelReload.dataFetched === true || this.props.itemExcelReload.error === true)
        //     && (
        //         ((JSON.parse(localStorage.getItem("ItemsExcel")).length === 0) && (JSON.parse(localStorage.getItem("ItemsExcelFail")).length === 0))
        //         && ((JSON.parse(localStorage.getItem("ItemsExcelSuccess")).length === 0) && (JSON.parse(localStorage.getItem("listItemCount")).length === 0))
        //     )
        // ) {
        //     this.props.stateImportExcelToDefault();
        // }

    }

    CDU_ItemsCountProperties = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        let ItemsExcelSuccess = JSON.parse(localStorage.getItem("ItemsExcelSuccess"));
        ItemsExcelSuccess = ItemsExcelSuccess.filter(param => { return param.lineitemname !== undefined }); /// xem laại cái này để làm gì
        localStorage.setItem("ItemsExcelSuccess", JSON.stringify(ItemsExcelSuccess));

        if ((ItemsExcel.length === 0 && ItemsExcelFail.length === 0) && ItemsExcelSuccess.length > 0) {
            let listItemCountPost = [];
            let listItemCountPatch = [];

            // danh sach so partner
            let listPartner = _.uniq(ItemsExcelSuccess.map(param => [param.partnertype + param.partner, [param.partnertype, param.partner]]));  // lọc số partner vaf lọc trùng;
            listPartner = _.fromPairs(listPartner);
            listPartner = { ...listPartner, id: "listPartner" };
            listItemCountPatch.push(listPartner);

            // danh sach so ngay all partner
            let listDay = _.uniq(ItemsExcelSuccess.map(param => [param.partnertype + param.day, [param.partnertype, param.day]]));  // lọc số partner vaf lọc trùng;
            listDay = _.fromPairs(listDay);
            listDay = { ...listDay, id: "listdaylistPartner" };
            listItemCountPatch.push(listDay);

            // danh sach  partner voi so ngay tuong ung
            let listPartnerAndDay = ItemsExcelSuccess.map(param => { return [param.partnertype, param.day, param.partner] });
            listPartnerAndDay = _.uniqWith(listPartnerAndDay, _.isEqual);
            let arrListPartner = _.toPairs(listPartner).filter(param => { return param[1] !== "listPartner" });
            let listPartnerAndDay2 = [];
            for (let i = 0; i <= arrListPartner.length - 1; i++) {
                let item = { id: "listday" + arrListPartner[i][1][1] }
                let item2 = listPartnerAndDay.filter(param => { return param[2] === arrListPartner[i][1][1] }).map(param2 => { return [param2[0] + param2[1], [param2[0], param2[1]]] });
                item2 = _.fromPairs(item2);
                item = { ...item, ...item2 };
                listPartnerAndDay2.push(item);
                listItemCountPatch.push(item);
            }

            // danh sach doit ac voi ngay tuong ung, tih tong base cost voi so luong
            for (let i = 0; i <= arrListPartner.length - 1; i++) {
                const uuidv1 = require('uuid/v1');
                let PartnerAndDay = listPartnerAndDay2.filter(param => { return param.id === ("listday" + arrListPartner[i][1][1]) });
                PartnerAndDay = _.toPairs(PartnerAndDay[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
                for (let j = 0; j <= PartnerAndDay.length - 1; j++) {
                    let item = { id: uuidv1(), namePartner: arrListPartner[i][1][1], dayNumber: PartnerAndDay[j][1] }
                    let item2 = ItemsExcelSuccess.filter(param => { return param.partner === arrListPartner[i][1][1] });
                    item["Sum_lineitemquantity"] = 0;
                    item["Sum_basecost"] = 0;
                    item["partnertype"] = arrListPartner[i][1][0];
                    item["Sum_us"] = 0;
                    // if (param.partnertype.trim().toLowerCase() === "phonecase") item["Sum_luminous"] = 0;
                    let month = (new Date(PartnerAndDay[j][1])).getMonth() + 1;
                    let year = (new Date(PartnerAndDay[j][1])).getFullYear();
                    item["monthNumber"] = month;
                    item["yearNumber"] = year;
                    item2.filter(param => { return param.day === PartnerAndDay[j][1] }).filter(param => { return param.shippingcountry.trim().toLowerCase() === "us" }).forEach(param => { item.Sum_us = item.Sum_us + param.lineitemquantity });
                    // if (param.partnertype.trim().toLowerCase() === "phonecase") item2.filter(param => { return param.day === PartnerAndDay[j][1] }).filter(param => { return param.phonecasetype.trim().toLowerCase() === "luminous" }).forEach(param => { item.Sum_luminous = item.Sum_luminous + param.lineitemquantity });
                    item2.filter(param => { return param.day === PartnerAndDay[j][1] }).forEach(param => {
                        item.Sum_lineitemquantity = (item.Sum_lineitemquantity + param.lineitemquantity);
                        item.Sum_basecost = (item.Sum_basecost + param.lineitemquantity * param.basecost);
                    })
                    // console.log(item);
                    listItemCountPost.push(item);
                }
            }

            listDay = _.toPairs(listDay).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            for (let j = 0; j <= listDay.length - 1; j++) {
                let  uuidv1 = require('uuid/v1');
                let item = { id: uuidv1(), namePartner: "allPartner", dayNumber: listDay[j][1] }
                let item2 = ItemsExcelSuccess;
                item["Sum_lineitemquantity"] = 0;
                item["Sum_basecost"] = 0;
                item["partnertype"] = listDay[j][0];
                item["Sum_us"] = 0;
                item["Sum_luminous"] = 0;
                let month = (new Date(listDay[j][1])).getMonth() + 1;
                let year = (new Date(listDay[j][1])).getFullYear();
                item["monthNumber"] = month;
                item["yearNumber"] = year;
                item2.filter(param => { return param.day === listDay[j][1] }).filter(param => { return param.shippingcountry.trim().toLowerCase() === "us" }).forEach(param => { item.Sum_us = item.Sum_us + param.lineitemquantity });
                item2.filter(param => { return param.day === listDay[j][1] }).filter(param => { return param.phonecasetype.trim().toLowerCase() === "luminous" }).forEach(param => { item.Sum_luminous = item.Sum_luminous + param.lineitemquantity });
                item2.filter(param => { return param.day === listDay[j][1] }).forEach(param => {
                    item.Sum_lineitemquantity = (item.Sum_lineitemquantity + param.lineitemquantity);
                    item.Sum_basecost = (item.Sum_basecost + param.lineitemquantity * param.basecost);
                })
                listItemCountPost.push(item);
            }

            localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCountPatch));
            localStorage.setItem("listItemCountPost", JSON.stringify(listItemCountPost));
            console.log( JSON.parse(localStorage.getItem("listItemCountPatch")));
            console.log( JSON.parse(localStorage.getItem("listItemCountPost")));

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
        if (JSON.parse(localStorage.getItem("listItemCountPost")).length > 0) {
            let listItemCount = JSON.parse(localStorage.getItem("listItemCountPost"));
            this.props.postListItemCount(listItemCount[listItemCount.length - 1]);
        }
        else if (JSON.parse(localStorage.getItem("listItemCountPatch")).length > 0) {
            let listItemCount = JSON.parse(localStorage.getItem("listItemCountPatch"));
            this.props.patchListItemCount(listItemCount[listItemCount.length - 1]);
        }
    }
    CDU_checkRequest() {
        if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_SUCSESS") { this.doingWhenPostItemSucsess() }
        else if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_SUCSESS") { this.doingWhenPostListItemCountSucsess() }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_RFAILURE") { this.doingWhenPostListItemCountFail() }
        else if (this.props.itemExcelReload.type === "PATCH_LIST_ITEM_COUNT_SUCSESS") { this.doingWhenPatchListItemCountSucsess() }
        else if (this.props.itemExcelReload.type === "PATCH_LIST_ITEM_COUNT_RFAILURE") { this.doingWhenPatchListItemCountFail() }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_PATCH_FAIL_SUCSESS") { this.doingWhenPostListItemCountPatchFailSucsess() }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_PATCH_FAIL_RFAILURE") { this.doingWhenPostListItemCountPatchFailFail() }
    }
    postToServer = (ItemsExcel) => {
        if (ItemsExcel.length > 0) {
            this.props.postItem(ItemsExcel[ItemsExcel.length - 1]);

        }
    }
    doingWhenPostItemSucsess = () => { //TRUE: ItemsExcel -1 và ItemsExcelSuccess+1, sau đó post ItemsExcel, vòng lặp đến khi nào ItemsExcel=0
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        if (ItemsExcel.length > 0) {
            localStorage.setItem("ItemsExcelSuccess", JSON.stringify([...JSON.parse(localStorage.getItem("ItemsExcelSuccess")), ItemsExcel[ItemsExcel.length - 1]]));
            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));
        }
    }
    doingWhenPostItemFail = () => { // FAIL: ItemsExcel-1  và ItemsExcelFail +1; sau đó post ItemsExcel, vòng lặp đến khi nào ItemsExcel=0
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
    doingWhenPostListItemCountSucsess = () => {
        let listItemCount = JSON.parse(localStorage.getItem("listItemCountPost"));
        if (listItemCount.length > 0) {
            listItemCount.pop();
            localStorage.setItem("listItemCountPost", JSON.stringify(listItemCount));
            console.log(JSON.parse(localStorage.getItem("listItemCountPost")));
            this.props.postListItemCount(listItemCount[listItemCount.length - 1]);
        }
    }
    doingWhenPostListItemCountFail = () => {
        let listItemCountFail = JSON.parse(localStorage.getItem("listItemCountPostFail"));
        let listItemCount = JSON.parse(localStorage.getItem("listItemCountPost"));
        if (listItemCount.length > 0) {
            localStorage.setItem("listItemCountPostFail", JSON.stringify([...listItemCountFail, listItemCount[listItemCount.length - 1]]));
            listItemCount.pop();
            localStorage.setItem("listItemCountPost", JSON.stringify(listItemCount));
        }
        else if (listItemCountFail.length > 0 && this.state.stateListItemCountFail === 0) {
            localStorage.setItem("listItemCountPost", JSON.stringify(JSON.parse(localStorage.getItem("listItemCountPostFail"))));
            localStorage.setItem("listItemCountPostFail", JSON.stringify([]));
            let listItemCountElse = JSON.parse(localStorage.getItem("listItemCountPost"));
            this.props.postListItemCount(listItemCountElse[listItemCountElse.length - 1]);
            this.setState({ stateListItemCountFail: 1 })

        }

    }
    doingWhenPatchListItemCountSucsess = () => {
        let listItemCount = JSON.parse(localStorage.getItem("listItemCountPatch"));
        if (listItemCount.length > 0) {
            listItemCount.pop();
            localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
            this.props.patchListItemCount(listItemCount[listItemCount.length - 1]);
        }
    }
    doingWhenPatchListItemCountFail = () => {
        let listItemCountFail = JSON.parse(localStorage.getItem("listItemCountPatchFail"));
        let listItemCount = JSON.parse(localStorage.getItem("listItemCountPatch"));
        if (listItemCount.length > 0) {
            if (JSON.stringify(listItemCount[listItemCount.length - 1]) !== JSON.stringify(listItemCountFail[listItemCountFail.length - 1])) {
                localStorage.setItem("listItemCountPatchFail", JSON.stringify([...listItemCountFail, listItemCount[listItemCount.length - 1]]));
                listItemCount.pop();
                localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
            }
        }
        else if (listItemCount.length === 0 && (listItemCountFail.length > 0 && this.state.stateListItemPatchFail === 0)) {
            localStorage.setItem("listItemCountPatch", JSON.stringify(JSON.parse(localStorage.getItem("listItemCountPatchFail"))));
            localStorage.setItem("listItemCountPatchFail", JSON.stringify([]));
            this.props.patchListItemCount(listItemCount[listItemCount.length - 1]);
            this.setState({ stateListItemPatchFail: 1 })

        }
        else if (listItemCount.length === 0 && (listItemCountFail.length > 0 && this.state.stateListItemPatchFail === 1)) {
            localStorage.setItem("listItemCountPatch", JSON.stringify(JSON.parse(localStorage.getItem("listItemCountPatchFail"))));
            localStorage.setItem("listItemCountPatchFail", JSON.stringify([]));
            this.props.postListItemCountPatchFail(listItemCount[listItemCount.length - 1]);
            this.setState({ stateListItemPatchFail: 2 })

        }
    }
    doingWhenPostListItemCountPatchFailSucsess() {
        let listItemCount = JSON.parse(localStorage.getItem("listItemCountPatch"));
        if (listItemCount.length > 0) {
            listItemCount.pop();
            localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
            this.props.postListItemCountPatchFail(listItemCount[listItemCount.length - 1]);
        }
    }
    doingWhenPostListItemCountPatchFailFail() {
        let listItemCountFail = JSON.parse(localStorage.getItem("listItemCountPatchFail"));
        let listItemCount = JSON.parse(localStorage.getItem("listItemCountPatch"));

        if (listItemCount.length > 0) {
            localStorage.setItem("listItemCountPatchFail", JSON.stringify([...listItemCountFail, listItemCount[listItemCount.length - 1]]));
            listItemCount.pop();
            localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
        }
    }

    changeItemsExcelFail = (param, id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = param;
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
        this.setState({ changeItemsExcelFail: Math.random() })
    }
    postItemsExcelFail = (param, id) => {
        this.deleteItemsExcelFail(id);
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        ItemsExcel.push(param);
        localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
        this.props.postItem(param);

    }
    deleteItemsExcelFail = (id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = null;
        ItemsExcelFail = ItemsExcelFail.filter(param => { return param !== null });
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
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
        localStorage.setItem("ItemsExcel", JSON.stringify(dataObj));
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
    render() {
        console.log(this.props.itemExcelReload.type);


        // console.log(this.props.itemExcelReload);




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

        return (
            <div className="App mt-4">
                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                <button type="button" className="btn btn-success" onClick={() => this.postToServer(this.state.dataExcel)}>Post to Server</button>
                <Exceltable dataExcelTable={ItemsExcel} />
                {/* {ItemsExcelFail} */}
            </div>
        );
    }
}

export default InputExcel;