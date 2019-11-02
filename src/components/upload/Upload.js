// thêm phần khi upload sẽ update thêm product
// product đã thêm vào this.state.userchange 



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
            firstPostListItemCount: 0,
            firstPatchListItemCount: 0,
            user: [],
            userChange: []

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
        if (JSON.parse(localStorage.getItem("ItemsExcel")) === null) {
            localStorage.setItem("ItemsExcel", JSON.stringify([]));
        }


        this.props.ExcelGetListPartner("?dataType=user"); // lay sanh sach cac partner


    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem("ItemsExcel")) !== null) {
            this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.firstPatchListItemCount === 0 || nextState.firstPostListItemCount === 0) { return true }
        if (this.state.firstPatchListItemCount !== nextState.firstPatchListItemCount) { return false }
        if (this.state.firstPostListItemCount !== nextState.firstPostListItemCount) { return false }
        return true;
    }


    componentDidUpdate = () => {
        this.CDU_ItemsCountProperties(); // bộ đếm itemCount khi post xong
        this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi có request trả về
        if (JSON.parse(localStorage.getItem("listItemCountPost")).length > 0) { this.CDU_postListItemCount(); }
        if (JSON.parse(localStorage.getItem("listItemCountPatch")).length > 0 && JSON.parse(localStorage.getItem("listItemCountPost")).length === 0) { // ty sua cai nay bang 0
            this.CDU_patchListItemCount();
        }
        this.CDU_propsImportExcelToDefault();
        this.CDU_reRenderWhenItemsExcelZero(); // rerender khi post het list items from excel

    }


    CDU_ItemsCountProperties = () => {
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        let ItemsExcelSuccess = JSON.parse(localStorage.getItem("ItemsExcelSuccess"));
        if ((ItemsExcel.length === 0 && ItemsExcelFail.length === 0) && ItemsExcelSuccess.length > 0) {
            let listItemCountPost = [];
            let listItemCountPatch = [];
            console.log(ItemsExcelSuccess);

            // danh sach so partner
            let listPartner = _.uniq(ItemsExcelSuccess.map(param => [param.product + param.partner, [param.product, param.partner]]));  // lọc số partner vaf lọc trùng;
            listPartner = _.fromPairs(listPartner);
            listPartner = { ...listPartner, id: "listPartner" };
            listItemCountPatch.push(listPartner);

            // danh sach so ngay all partner
            let listDay = _.uniq(ItemsExcelSuccess.map(param => [param.product + param.day, [param.product, param.day]]));  // lọc số partner vaf lọc trùng;
            listDay = _.fromPairs(listDay);
            listDay = { ...listDay, id: "listdaylistPartner" };
            listItemCountPatch.push(listDay);

            // danh sach  partner voi so ngay tuong ung
            let listPartnerAndDay = ItemsExcelSuccess.map(param => { return [param.product, param.day, param.partner] });
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
                    item["Sumlineitemquantity"] = 0;
                    item["Sumbasecost"] = 0;
                    item["Sumproduct"] = arrListPartner[i][1][0];
                    item["Sumus"] = 0;
                    item["Sumorder"] = [];
                    if (ItemsExcelSuccess[0].product.trim().toLowerCase() === "phonecase") item["Sumluminous"] = 0;
                    let month = (new Date(PartnerAndDay[j][1])).getMonth() + 1;
                    let year = (new Date(PartnerAndDay[j][1])).getFullYear();
                    item["monthNumber"] = month;
                    item["yearNumber"] = year;
                    item2.filter(param => { return param.day === PartnerAndDay[j][1] }).filter(param => { return param.shippingcountry.trim().toLowerCase() === "us" }).forEach(param => { item.Sumus = item.Sumus + param.lineitemquantity });
                    if (ItemsExcelSuccess[0].product.trim().toLowerCase() === "phonecase") item2.filter(param => { return param.day === PartnerAndDay[j][1] }).filter(param => { return param.phonecasetype.trim().toLowerCase() === "luminous" }).forEach(param => { item.Sumluminous = item.Sumluminous + param.lineitemquantity });
                    item2.filter(param => { return param.day === PartnerAndDay[j][1] }).forEach(param => {
                        item.Sumlineitemquantity = (item.Sumlineitemquantity + param.lineitemquantity);
                        item.Sumorder.push(param.name);
                        item.Sumbasecost = (item.Sumbasecost + param.lineitemquantity * param.basecost);
                    })
                    listItemCountPost.push(item);
                }
            }

            listDay = _.toPairs(listDay).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            for (let j = 0; j <= listDay.length - 1; j++) {
                let uuidv1 = require('uuid/v1');
                let item = { id: uuidv1(), namePartner: "allPartner", dayNumber: listDay[j][1] }
                let item2 = ItemsExcelSuccess;
                item["Sumlineitemquantity"] = 0;
                item["Sumbasecost"] = 0;
                item["Sumproduct"] = listDay[j][0];
                item["Sumus"] = 0;
                if (ItemsExcelSuccess[0].product.trim().toLowerCase() === "phonecase") item["Sumluminous"] = 0;
                item["Sumorder"] = [];
                let month = (new Date(listDay[j][1])).getMonth() + 1;
                let year = (new Date(listDay[j][1])).getFullYear();
                item["monthNumber"] = month;
                item["yearNumber"] = year;
                item2.filter(param => { return param.day === listDay[j][1] }).filter(param => { return param.shippingcountry.trim().toLowerCase() === "us" }).forEach(param => { item.Sumus = item.Sumus + param.lineitemquantity });
                if (ItemsExcelSuccess[0].product.trim().toLowerCase() === "phonecase") item2.filter(param => { return param.day === listDay[j][1] }).filter(param => { return param.phonecasetype.trim().toLowerCase() === "luminous" }).forEach(param => { item.Sumluminous = item.Sumluminous + param.lineitemquantity });
                item2.filter(param => { return param.day === listDay[j][1] }).forEach(param => {
                    item.Sumlineitemquantity = (item.Sumlineitemquantity + param.lineitemquantity);
                    item.Sumorder.push(param.name);
                    item.Sumbasecost = (item.Sumbasecost + param.lineitemquantity * param.basecost);
                })
                listItemCountPost.push(item);
            }
            localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCountPatch));
            localStorage.setItem("listItemCountPost", JSON.stringify(listItemCountPost));
            localStorage.setItem("ItemsExcelSuccess", JSON.stringify([]));
        }
    }

    CDU_checkRequest() {
        let listItemCountPatch = JSON.parse(localStorage.getItem("listItemCountPatch"));
        let listItemCountPost = JSON.parse(localStorage.getItem("listItemCountPost"));
        if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_SUCSESS") { this.doingWhenPostItemSucsess() }
        else if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }
        else if (this.props.itemExcelReload.type === "GET_LAST_ITEM_OF_LIST_ITEM_COUNT_SUCSESS") { this.postAndPatchItemExcelCountPatch(listItemCountPatch) }
        else if (this.props.itemExcelReload.type === "GET_LAST_ITEM_OF_LIST_ITEM_COUNT_RFAILURE") { this.getLastItemOfListItemCountFail() }
        else if (this.props.itemExcelReload.type === "PATCH_LIST_ITEM_COUNT_SUCSESS") { this.doingWhenPatchListItemCountSucsess(listItemCountPatch) } // success hay fail chung 1 requets
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_PATCH_FAIL_SUCSESS") { this.doingWhenPostListItemCountPatchFailSucsess(listItemCountPatch) }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_PATCH_FAIL_RFAILURE") { this.doingWhenPostListItemCountPatchFailFail() }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_SUCSESS") { this.doingWhenPostListItemCountSucsess(listItemCountPost) }
        else if (this.props.itemExcelReload.type === "POST_LIST_ITEM_COUNT_RFAILURE") { this.doingWhenPostListItemCountFail() }
        else if (this.props.itemExcelReload.type === "STATE_POST_TO_DEFAULT") { }
        else if (this.props.itemExcelReload.type === "EXCEL_GET_LIST_BY_ID_SUCSESS") { this.getListByIdSucsess() }
        else if (this.props.itemExcelReload.type === "EXCEL_GET_LIST_BY_ID_RFAILURE") { this.getLastItemOfListItemCountFail() }
    }
    getListByIdSucsess = () => {
        let item = this.props.itemExcelReload.listItem;
        console.log(item);
        this.setState({ user: item });
        this.props.propsImportExcelToDefault();
    }
    CDU_postListItemCount = () => {
        if (this.state.firstPostListItemCount === 0) {
            let listItemCount = JSON.parse(localStorage.getItem("listItemCountPost"));
            this.props.postListItemCount(listItemCount[listItemCount.length - 1]);
            this.setState({ firstPostListItemCount: 1 })
        }
    }

    CDU_patchListItemCount() {
        if (this.state.firstPatchListItemCount === 0) { // lần đầu thì phải get cái item cuối xem có không, có thì patch không thì post
            let listItemCount = JSON.parse(localStorage.getItem("listItemCountPatch"));
            this.props.getLastItemOflistItemCountPatch(listItemCount[listItemCount.length - 1]);
            this.setState({ firstPatchListItemCount: 1 })

        }
    }

    CDU_propsImportExcelToDefault = () => {
        if ((this.props.itemExcelReload.dataFetched === true || this.props.itemExcelReload.error === true)
            && ((JSON.parse(localStorage.getItem("listItemCountPost")).length === 0) && (JSON.parse(localStorage.getItem("listItemCountPatch")).length === 0))
        ) {
            console.log("CDU_propsImportExcelToDefault..........................");
            console.log(JSON.parse(localStorage.getItem("listItemCountPatch")).length, JSON.parse(localStorage.getItem("listItemCountPost")).length);
            this.setState({ firstPostListItemCount: 0, firstPatchListItemCount: 0 });
            this.props.propsImportExcelToDefault();

        };
    }

    CDU_reRenderWhenItemsExcelZero() {


        let payload = this.props.itemExcelReload;
        if ((payload.dataFetched === true || payload.error === true) && (JSON.parse(localStorage.getItem("ItemsExcel")).length === 0)) {
            console.log(this.state.dataExcel);
            if (this.state.dataExcel !== null) { this.setState({ dataExcel: null }); };
        }
    }

    postAndPatchItemExcelCountPatch(listItemCount) {
        let item = this.props.itemExcelReload.listItem;
        if (item.length === 0) {
            this.props.postListItemCountPatchFail(listItemCount[listItemCount.length - 1]);
        }
        else if (item.length > 0) {
            this.props.patchListItemCount(listItemCount[listItemCount.length - 1]);
        }

    }
    getLastItemOfListItemCountFail() {
        alert("Kiểm tra đường truyền mạng và F5 lại trang !! (1) ");
    }

    doingWhenPatchListItemCountSucsess = (listItemCount) => {// doingWhenPatchListItemCountSucsess
        let item = this.props.itemExcelReload.listItem;
        item = _.toPairs(item);
        if (item.length > 0) {
            if (listItemCount.length > 0) {
                listItemCount.pop();
                localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
                if (listItemCount.length > 0) { this.props.getLastItemOflistItemCountPatch(listItemCount[listItemCount.length - 1]); }
            }
        }
        else {// doingWhenPatchListItemCountFail
            alert("Kiểm tra đường truyền mạng và F5 lại trang !! (2) ");
        }
    }
    doingWhenPostListItemCountPatchFailSucsess(listItemCount) {
        if (listItemCount.length > 0) {
            listItemCount.pop();
            localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
            if (listItemCount.length > 0) { this.props.getLastItemOflistItemCountPatch(listItemCount[listItemCount.length - 1]); }
        }
    }
    doingWhenPostListItemCountPatchFailFail() {
        alert("Kiểm tra đường truyền mạng và F5 lại trang !! (3) ");
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
    postToServer = (ItemsExcel) => {
        if (ItemsExcel.length > 0) {
            this.props.postItem(ItemsExcel[ItemsExcel.length - 1]);

        }
    }

    doingWhenPostListItemCountSucsess = (listItemCountPost) => {
        if (listItemCountPost.length > 0) {
            listItemCountPost.pop();
            localStorage.setItem("listItemCountPost", JSON.stringify(listItemCountPost));
            if (listItemCountPost.length > 0) this.props.postListItemCount(listItemCountPost[listItemCountPost.length - 1]);
        }
    }


    doingWhenPostListItemCountFail = () => {
        alert("Kiểm tra đường truyền mạng và F5 lại trang !! (4) ");
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
        this.setState({ reRender: Math.random() })
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
        console.log(dataObj);

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
            param["printStatus"] = false;// tạo printStatus
            param.name = param.name.trim();
            param.product = param.product.trim().toLowerCase();
            return param;
        });
        // console.log(dataObj);
        dataObj = this.checkDataFailImport([...dataObj])
        // console.log(dataObj);

        // dua du lieu arr[] vao local storage
        localStorage.setItem("ItemsExcel", JSON.stringify(dataObj));
        this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) });

    };
    checkDataFailImport = (data) => {
        let day = data.map(param => param.day);
        let basecost = data.map(param => param.basecost);
        let lineitemquantity = data.map(param => param.lineitemquantity);
        let name = data.map(param => param.name);
        let product = data.map(param => param.product);
        let phonecasetype = data.map(param => param.phonecasetype);


        let user = this.state.user;





        day.forEach(param => {
            if (isNaN(param) !== false) { this.alertError("Có 'day' không đúng, bạn vui lòng xem lại :("); }
            else if (param < 1262278800000 && param > 1893430800000) { this.alertError("Có ngày tháng không đúng, bạn vui lòng xem lại :("); }
        })
        basecost.forEach(param => {
            if (isNaN(param) !== false) { this.alertError("Có 'basecost' không đúng, bạn vui lòng xem lại :("); }
        })
        lineitemquantity.forEach(param => {
            if (isNaN(param) !== false) { this.alertError("Có 'line item quantity' không đúng, bạn vui lòng xem lại :("); }
        })
        name.forEach(param => {
            if (param.match(/[!@$%^&*(),.?":{}|<>]/g)) {
                this.alertError("Có 'name' chứa ký tực đặc biệt   " + param.match(/[!@$%^&*(),.?":{}|<>]/g) + "     bạn vui lòng kiểm tra lại :(");
            }
        })

        if (_.uniq(product)[0] === "phonecase") {
            phonecasetype.forEach(param => {
                if (param !== "glass" && param !== "luminous") {
                    this.alertError("Có 'phonecasetype' không phải là glass hoặc không phải là luminous  , bạn vui lòng xem lại nhé :( ");

                }
            })
        }

        // check code 
        data.map(param => {
            let userTrue = user.filter(user1 => {
                let userTrue2 = user1.code.filter(param2 => {
                    return param.name.toLowerCase().startsWith(param2.toLowerCase());
                })
                if (userTrue2.length !== 0) { return true }
                return false;
            });
            console.log(userTrue);
            if (userTrue.length !== 0) { param["partner"] = userTrue[0].name; }
            else { param["partner"] = null }
            return param;
        })
        let ItemsNotParner = data.filter(param => param.partner === null).map(param => param.name);
        if (ItemsNotParner.length !== 0) {
            this.alertError("Có order chưa thêm code nhận diện đối tác: " + ItemsNotParner.join(","));
        }

        // end check code 


        // check product
        let dataproduct = data.map(param => { return { partner: param.partner, product: param.product } });
        dataproduct = _.uniqWith(dataproduct, _.isEqual);
        console.log(dataproduct);
        // console.log(data);

        dataproduct.map(param => {
            let userTrue = user.filter(param2 => { return param2.name === param.partner });

            console.log(userTrue);
            let dff = _.difference([param.product], userTrue[0].product);
            if (dff.length !== 0) {
                alert("có product mới:" + dff);
                userTrue = userTrue[0];
                userTrue.product.push(param.product);
                this.setState({ userChange: [...this.state.userChange,userTrue]});
                console.log(userTrue);

            }
            // console.log(dff);

        })



        //  ed check product

        return data;

    }
    alertError = (param) => {
        alert(param);
        window.location = "/Upload";
    }
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
        console.log(this.state.userChange);


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

                {(JSON.parse(localStorage.getItem("ItemsExcelFail")).length === 0 && (JSON.parse(localStorage.getItem("listItemCountPatch")).length === 0 && JSON.parse(localStorage.getItem("listItemCountPost")).length === 0)) ?
                    <>
                        <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                        <button type="button" className="btn btn-success" onClick={() => this.postToServer(this.state.dataExcel)}>Post to Server</button>
                    </> :
                    <div className="alert alert-warning" role="alert">Có lỗi xảy ra !!!</div>
                }
                <Exceltable dataExcelTable={ItemsExcel} />
                {ItemsExcelFail}
            </div>
        );
    }
}

export default InputExcel;