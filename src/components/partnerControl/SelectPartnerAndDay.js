import React, { Component } from 'react';
import SelectDate from './SelectDate';
import _ from 'lodash';

class SelectPartnerAndDay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            partnerSelect: null,
            listPartner: null,
            listDay: []
        }
    }

    componentWillMount() {
        let timeNow = new Date();
        let dayNow = timeNow.getDate();
        let monthNow = timeNow.getMonth() + 1;
        let yearNow = timeNow.getFullYear();
        this.props.getListById("listPartner");

    }
    componentDidMount() {
        this.props.getListDayById("listdaylistPartner");

    }
    componentDidUpdate() {
        this.CDU_setStateListPartner();
        this.CDU_setStateListDay();

    }
    CDU_setStateListPartner = () => {
        if (this.props.items.type === "getListById" && this.state.listPartner === null) {
            this.setState({ listPartner: this.props.items.listItem })
        }
    }

    CDU_setStateListDay = () => {
        if (this.props.items.type === "getListDayById") {
            let listDay = this.props.items.listItem;
            listDay = _.toPairs(listDay[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
            listDay.sort((a, b) => { return b - a });
            listDay.length = 7;
            listDay = listDay.filter(param => { return param !== undefined });
            if (this.state.listDay.join("") !== listDay.join("")) {
                this.setState({ listDay: listDay });
                let endPoint = "?namePartner=allPartner";
                for (let i = 0; i <= listDay.length - 1; i++) {
                    endPoint = endPoint + "&dayNumber=" + listDay[i];
                }
                this.props.getListByCustom(endPoint);
            }
        }
    }


    setPartnerSelect = (param) => {
        this.setState({ partnerSelect: param });
        this.props.getListDayById("listday" + param); // API toi dnh sach partner voi list day
    }

    getdataFromServer = () => {
        let partnerSelect = this.state.partnerSelect;
        let dateFrom = null;
        let dateTo = null;
        if (this.props.date !== null) {
            dateFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
            dateTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
        }
        let endPoint = null;

        if (partnerSelect !== null) {
            endPoint = this.getEndPoint(partnerSelect, dateFrom, dateTo);
        }
        else if (partnerSelect === null) {
            endPoint = this.getEndPoint("allPartner", dateFrom, dateTo);
        }
        this.props.getListByCustom(endPoint);
    }
    getEndPoint = (partnerSelect, dateFrom, dateTo) => {
        let timeNow = new Date();
        // let dayNow = timeNow.getDate();
        let monthNow = timeNow.getMonth() + 1;
        let yearNow = timeNow.getFullYear();
        let endPoint = null;
        if (dateFrom === null && dateTo === null) {
            endPoint = "?namePartner=" + partnerSelect
                + "&monthNumber=" + monthNow
                + "&monthNumber=" + ((monthNow === 1) ? "12" : (monthNow - 1));
        }
        else if (dateFrom !== null && dateTo !== null) {
            let monthDateFrom = new Date(dateFrom).getMonth() + 1;
            let monthdateTo = new Date(dateTo).getMonth() + 1;
            console.log(monthDateFrom, monthdateTo);
            if (monthDateFrom === monthdateTo) {
                endPoint = "?namePartner=" + partnerSelect
                    + "&monthNumber=" + monthdateTo
                    + "&monthNumber=" + ((monthdateTo === 1) ? "12" : (monthdateTo - 1));
            }
            else if (monthDateFrom < monthdateTo) {
                endPoint = "?namePartner=" + partnerSelect;
                for (let i = monthDateFrom; i <= monthdateTo; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
            }
            else if (monthDateFrom > monthdateTo) {
                endPoint = "?namePartner=" + partnerSelect;
                for (let i = monthDateFrom; i <= 12; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
                for (let i = 1; i <= monthdateTo; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
            }
        }
        else if (dateFrom !== null || dateTo !== null) {
            let monthNowSelect = new Date(((dateFrom !== null) ? dateFrom : dateTo)).getMonth() + 1;
            endPoint = "?namePartner=" + partnerSelect
                + "&monthNumber=" + monthNowSelect
                + "&monthNumber=" + ((monthNowSelect === 1) ? "12" : (monthNowSelect - 1));
        }
        return endPoint;
    }

    render() {
        let listPartner = this.state.listPartner;
        if (listPartner !== null) {
            listPartner = _.toPairs(listPartner[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
        }

        let renderListPartner;
        if (listPartner !== null) {
            renderListPartner = listPartner.map((param, id) => { return <p className={"renderListPartner" + ((this.state.partnerSelect === param) ? " renderListPartner_select" : "")} key={id} onClick={() => this.setPartnerSelect(param)}>{param}</p> })
        }
        return (
            <React.Fragment>
                {renderListPartner}
                <button type="button" className="btn btn-primary button_loc" onClick={this.getdataFromServer}>Lọc</button>
                <SelectDate {...this.props} />
            </React.Fragment>
        );
    }
}

export default SelectPartnerAndDay;