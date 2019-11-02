import React, { Component } from 'react';
import SelectDate from './SelectDate';
import _ from 'lodash';

class SelectPartnerAndDay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            partnerSelect: null,
            listPartner: null,
            listDay: [],
        }
    }

    componentWillMount() {
        this.props.getListById("listPartner"); // lấy danh sách các tên đối tác

        let UserProperties = JSON.parse(localStorage.UserProperties);
        if (UserProperties[1] === "all") { this.props.getListDayById("?id=listdaylistPartner"); } // lấy danh sách các ngày của tổng  các Partner (listPartner) 
        else {
            let name = UserProperties[1].map(param => param[1]);
            let endPoint = name.map(param => { let str = "id=listday" + param; return str });
            this.props.getListDayById("?" + endPoint.join("&"));
        }



    }

    componentDidUpdate() {
        this.CDU_setStateListPartner();   //khi GET (getListById)  được danh sách các đối tác thì setstate vào (listPartner)
        this.CDU_setStateListDay(); //khi GET (getListDayById) được danh sách các ngày thì setstate vào (listDay) và  GET (getListByCustom) để lấy danh sách tính toán với các ngày tương ứng

    }
    CDU_setStateListPartner = () => {
        if (this.props.items.type === "getListById" && this.state.listPartner === null) { //nếu type =getListById
            this.setState({ listPartner: this.props.items.listItem })
        }
    }

    CDU_setStateListDay = () => {
        if (this.props.items.type === "getListDayById") { // nếu type = getListDayById

            if ((this.props.date.from === undefined && this.props.date.to === undefined) && this.props.product === null) {  // khi chưa  select Date thì GET (getListByCustom) với endpoint với 7 ngày gần nhaatys ứng với (partnerSelect)
                let UserProperties = JSON.parse(localStorage.UserProperties);
                let endPoint;
                let now = new Date();
                if (UserProperties[1] === "all") {
                    endPoint = "?namePartner=" + ((this.state.partnerSelect !== null) ? this.state.partnerSelect : "allPartner") + "&monthNumber=" + (now.getMonth() + 1) + "&yearNumber=" + now.getFullYear();

                }
                else {
                    let listPartner = UserProperties[1].map(param => param[1]);
                    endPoint = "?" + ((this.state.partnerSelect !== null) ? ("namePartner=" + this.state.partnerSelect) : (listPartner.map(param => { return "namePartner=" + param }).join("&"))) + "&monthNumber=" + (now.getMonth() + 1) + "&yearNumber=" + now.getFullYear();

                }
                this.props.getListByCustom(endPoint);
            }
            else { // khi đã select date thì end Point sẽ khác
                let dateFrom = null;
                let dateTo = null;
                if (this.props.date !== null) { // chuyển dateFrom và dateTo sang dạng 1101101010101
                    dateFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
                    dateTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
                }
                let endPoint = this.getEndPoint(this.state.partnerSelect, this.props.product, dateFrom, dateTo); // gọi hàm tạo endpoint ứng với date đã select
                this.props.getListByCustom(endPoint); // GET (getListByCustom) với endpoint ở trên
            }


        }
    }


    callAPIAndSetPartnerSelect = (param) => { //  khi click vào <p>partner</p> thì setState (partnerSelect) mới và GET (getListDayById) để lấy danh sách partnet đó với các ngày tương ứng
        this.setState({ partnerSelect: param });
        this.props.getListDayById("?id=listday" + param); // API toi dnh sach partner voi list day        
        // console.log("hahahaha................................................................................");


    }

    getEndPoint = (partnerSelect, product, dateFrom, dateTo) => {  // hàm để tạo endpoint
        let timeNow = new Date();
        let monthNow = timeNow.getMonth() + 1;
        let endPoint = null;
        let UserProperties = JSON.parse(localStorage.UserProperties)[1];
        if (UserProperties === "all") {
            partnerSelect = (partnerSelect !== null) ? ("?namePartner=" + partnerSelect + "&Sumproduct=" + product) : ("?namePartner=allPartner" + "&Sumproduct=" + product);
        }
        else {
            partnerSelect = (partnerSelect !== null) ? ("?namePartner=" + partnerSelect + "&Sumproduct=" + product) : ("?" + UserProperties.map(param => "namePartner=" + param[1]).join("&") + "&Sumproduct=" + product);
        }
        if (dateFrom === null && dateTo === null) { // khi chưa chọn gì , From và To = null thì  endpoint bằng 2 tháng gần nhất
            endPoint = partnerSelect
                + "&monthNumber=" + monthNow
                + "&monthNumber=" + ((monthNow === 1) ? "12" : (monthNow - 1));
        }
        else if (dateFrom !== null && dateTo !== null) { // khi chọn cả From và To thì endpoint thay đổi tùy theo From và To
            let monthDateFrom = new Date(dateFrom).getMonth() + 1; // from là tháng From
            let monthdateTo = new Date(dateTo).getMonth() + 1; // To là tháng To
            if (monthDateFrom === monthdateTo) { // nếu From = To  thì endpoint bằng 2 tháng gần nhất
                endPoint = partnerSelect
                    + "&monthNumber=" + monthdateTo
                    + "&monthNumber=" + ((monthdateTo === 1) ? "12" : (monthdateTo - 1));
            }
            else if (monthDateFrom < monthdateTo) {// nếu From < To  thì endpoint bằng từ tháng From đến tháng To
                endPoint = partnerSelect;
                for (let i = monthDateFrom; i <= monthdateTo; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
            }
            else if (monthDateFrom > monthdateTo) { // nếu From > To thì lấy  từ From => 12, 1=> To
                endPoint = partnerSelect;
                for (let i = monthDateFrom; i <= 12; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
                for (let i = 1; i <= monthdateTo; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
            }
        }

        else if (dateFrom !== null || dateTo !== null) { //  nếu chọn 1 trong 2 ( From hoặc To) thì endPoint lấy 2 tháng gần nhất
            let monthNowSelect = new Date(((dateFrom !== null) ? dateFrom : dateTo)).getMonth() + 1;
            endPoint = partnerSelect
                + "&monthNumber=" + monthNowSelect
                + "&monthNumber=" + ((monthNowSelect === 1) ? "12" : (monthNowSelect - 1));
        }
        return endPoint;
    }
    changeproduct(param) {
        // console.log(param);

        let dateFrom = null;
        let dateTo = null;
        if (this.props.date !== null) { // chuyển dateFrom và dateTo sang dạng 1101101010101
            dateFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
            dateTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
        }
        // this.setState({ product: param });
        this.props.setproduct(param);
        let endPoint = this.getEndPoint(null, param, dateFrom, dateTo);
        this.props.getListByCustom(endPoint);
        this.setState({ partnerSelect: null });

        let UserProperties = JSON.parse(localStorage.UserProperties);
        if (UserProperties[1] === "all") { this.props.getListDayById("?id=listdaylistPartner"); } // lấy danh sách các ngày của tổng  các Partner (listPartner) 
        else {
            let name = UserProperties[1].map(param => param[1]);
            let endPoint = name.map(param => { let str = "id=listday" + param; return str });
            this.props.getListDayById("?" + endPoint.join("&"));
        }
        
    

    }
    render() {
        let listPartner = this.state.listPartner;
        console.log();
        // console.log(this.state.listDay);

        let renderListPartner, renderlistproduct;
        if (listPartner !== null) { // chuyển listPartner=[] thành các DOM <p/> để render ra màn hình
            listPartner = _.toPairs(listPartner[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            let listproduct = _.uniq(listPartner.map(param => param[0]));

            let listproductLS = JSON.parse(localStorage.UserProperties);
            listproductLS = listproductLS[1];
            if (listproductLS !== "all") {
                listproductLS = listproductLS.map(param => param[0]);
                listproduct = _.uniq(listproductLS);
            }
            renderlistproduct = listproduct.map((param, id) => {
                return <button type="button" className={"btn btn-" + (this.props.product === param ? "primary" : "info")} key={id} onClick={() => this.changeproduct(param)}>{param}</button>
            });

            let listPartnerLS = listPartner.filter(param => { return param[0] === this.props.product });
            if (listproductLS !== "all") {
                listPartnerLS = JSON.parse(localStorage.UserProperties)[1].filter(param => { return param[0] === this.props.product });

            }

            renderListPartner = listPartnerLS.map((param, id) => {
                return <p className={"renderListPartner" + ((this.state.partnerSelect === param[1]) ? " renderListPartner_select" : "")}
                    key={id} onClick={() => this.callAPIAndSetPartnerSelect(param[1])}>{param[1]}</p>
            })
        }
        return (
            <React.Fragment>
                
                {renderlistproduct}
                {renderListPartner}
                <SelectDate partnerSelect={this.state.partnerSelect} product={this.props.product} {...this.props} /> {/* component để select Date*/}
            </React.Fragment>
        );
    }
}

export default SelectPartnerAndDay;