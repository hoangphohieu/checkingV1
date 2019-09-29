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
            partnerType: null
        }
    }

    componentWillMount() {
        this.props.getListById("listPartner"); // lấy danh sách các tên đối tác
        this.props.getListDayById("listdaylistPartner"); // lấy danh sách các ngày của tổng  các Partner (listPartner)


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
            let listDay = JSON.parse(JSON.stringify(this.props.items.listItem)); // listDay là state nội bộ, không liên quan đến component khác
            listDay = _.toPairs(listDay[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            listDay.sort((a, b) => { return b[1] - a[1] });

            listDay.length = 7;
            listDay = listDay.filter(param => { return param !== undefined });
            listDay.push(this.props.items.listItem[0].id); // đã lọc listDay=[] với 7 ngày  gần nhất +  tên  là id tương ứng với  (getListDayById)
            if (this.state.listDay.join("") !== listDay.join("")) { // khi listDay thay đổi thì mới setState (listDay) mới
                this.setState({ listDay: listDay });
                if ((this.props.date.from === undefined && this.props.date.to === undefined) && this.state.partnerType === null) {  // khi chưa  select Date thì GET (getListByCustom) với endpoint với 7 ngày gần nhaatys ứng với (partnerSelect)
                    let endPoint = "?namePartner=" + ((this.state.partnerSelect !== null) ? this.state.partnerSelect : "allPartner");
                    for (let i = 0; i <= listDay.length - 1; i++) {
                        endPoint = endPoint + "&dayNumber=" + listDay[i][1];
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
                    let endPoint = this.getEndPoint(this.state.partnerSelect, this.state.partnerType, dateFrom, dateTo); // gọi hàm tạo endpoint ứng với date đã select
                    this.props.getListByCustom(endPoint); // GET (getListByCustom) với endpoint ở trên
                }

            }
        }
    }


    callAPIAndSetPartnerSelect = (param) => { //  khi click vào <p>partner</p> thì setState (partnerSelect) mới và GET (getListDayById) để lấy danh sách partnet đó với các ngày tương ứng
        this.setState({ partnerSelect: param });
        this.props.getListDayById("listday" + param); // API toi dnh sach partner voi list day        

    }

    getEndPoint = (partnerSelect, partnerType, dateFrom, dateTo) => {  // hàm để tạo endpoint
        let timeNow = new Date();
        let monthNow = timeNow.getMonth() + 1;
        let endPoint = null;
        partnerSelect = (partnerSelect !== null) ? ("?namePartner=" + partnerSelect + "&Sumpartnertype=" + partnerType) : ("?namePartner=allPartner" +"&Sumpartnertype=" + partnerType);
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
    changePartnerType(param) {
        let dateFrom = null;
        let dateTo = null;
        if (this.props.date !== null) { // chuyển dateFrom và dateTo sang dạng 1101101010101
            dateFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
            dateTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
        }
        this.setState({ partnerType: param });
        let endPoint = this.getEndPoint(this.state.partnerSelect, param, dateFrom, dateTo);
        this.props.getListByCustom(endPoint);

    }
    render() {
        let listPartner = this.state.listPartner;
        let renderListPartner, renderlistPartnerType;
        if (listPartner !== null) { // chuyển listPartner=[] thành các DOM <p/> để render ra màn hình
            listPartner = _.toPairs(listPartner[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            let listPartnerType = _.uniq(listPartner.map(param => param[0]));
            renderlistPartnerType = listPartnerType.map((param, id) => { return <button type="button" className={"btn btn-" + (this.state.partnerType === param ? "primary" : "info")} key={id} onClick={() => this.changePartnerType(param)}>{param}</button> });
            renderListPartner = listPartner.filter(param => { return param[0] === this.state.partnerType }).map((param, id) => {
                return <p className={"renderListPartner" + ((this.state.partnerSelect === param[1]) ? " renderListPartner_select" : "")}
                    key={id} onClick={() => this.callAPIAndSetPartnerSelect(param[1])}>{param[1]}</p>
            })
        }
        return (
            <React.Fragment>
                {renderlistPartnerType}
                {renderListPartner}
                <SelectDate partnerSelect={this.state.partnerSelect} partnerType={this.state.partnerType} {...this.props} /> {/* component để select Date*/}
            </React.Fragment>
        );
    }
}

export default SelectPartnerAndDay;