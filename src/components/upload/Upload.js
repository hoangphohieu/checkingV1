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


    componentDidUpdate = () => {
        this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi có request trả về
        this.CDU_reRenderWhenItemsExcelZero(); // rerender khi post het list items from excel

    }



    CDU_checkRequest() {

        if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_SUCSESS") { this.doingWhenPostItemSucsess() }
        else if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }
        else if (this.props.itemExcelReload.type === "EXCEL_GET_LIST_BY_ID_SUCSESS") { this.getListByIdSucsess() }
        else if (this.props.itemExcelReload.type === "STATE_POST_TO_DEFAULT") { }
    }
    getListByIdSucsess = () => {
        let item = this.props.itemExcelReload.listItem;
        console.log(item);
        this.setState({ user: item });
        this.props.propsImportExcelToDefault();
    }


    CDU_reRenderWhenItemsExcelZero() {


        let payload = this.props.itemExcelReload;
        if ((payload.dataFetched === true || payload.error === true) && (JSON.parse(localStorage.getItem("ItemsExcel")).length === 0)) {
            console.log(this.state.dataExcel);
            if (this.state.dataExcel !== null) { this.setState({ dataExcel: null }); };
        }
    }

    // postAndPatchItemExcelCountPatch(listItemCount) {
    //     let item = this.props.itemExcelReload.listItem;
    //     if (item.length === 0) {
    //         this.props.postListItemCountPatchFail(listItemCount[listItemCount.length - 1]);
    //     }
    //     else if (item.length > 0) {
    //         this.props.patchListItemCount(listItemCount[listItemCount.length - 1]);
    //     }

    // }
    // getLastItemOfListItemCountFail() {
    //     alert("Kiểm tra đường truyền mạng và F5 lại trang !! (1) ");
    // }

    // doingWhenPatchListItemCountSucsess = (listItemCount) => {// doingWhenPatchListItemCountSucsess
    //     let item = this.props.itemExcelReload.listItem;
    //     item = _.toPairs(item);
    //     if (item.length > 0) {
    //         if (listItemCount.length > 0) {
    //             listItemCount.pop();
    //             localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
    //             if (listItemCount.length > 0) { this.props.getLastItemOflistItemCountPatch(listItemCount[listItemCount.length - 1]); }
    //         }
    //     }
    //     else {// doingWhenPatchListItemCountFail
    //         alert("Kiểm tra đường truyền mạng và F5 lại trang !! (2) ");
    //     }
    // }
    // doingWhenPostListItemCountPatchFailSucsess(listItemCount) {
    //     if (listItemCount.length > 0) {
    //         listItemCount.pop();
    //         localStorage.setItem("listItemCountPatch", JSON.stringify(listItemCount));
    //         if (listItemCount.length > 0) { this.props.getLastItemOflistItemCountPatch(listItemCount[listItemCount.length - 1]); }
    //     }
    // }
    // doingWhenPostListItemCountPatchFailFail() {
    //     alert("Kiểm tra đường truyền mạng và F5 lại trang !! (3) ");
    // }




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
                this.setState({ userChange: [...this.state.userChange, userTrue] });
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
                />
            })
        }


        return (
            <div className="App mt-4">

                {(JSON.parse(localStorage.getItem("ItemsExcelFail")).length === 0 ) ?
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