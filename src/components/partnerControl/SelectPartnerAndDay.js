import React, { Component } from 'react';
import SelectDate from './SelectDate';
class SelectPartnerAndDay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            partnerSelect: null,
            date: null
        }
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        this.props.getListDayById("listDaylistPartner");
    }

    setPartnerSelect = (param) => {
        this.setState({ partnerSelect: param });
        this.props.getListDayById("listday"+param);
    }
    setDaySelect = (param) => {
        this.setState({ date: param })

    }
    getdataFromServer = () => {


        let partnerSelect = this.state.partnerSelect;
        let date = this.state.date;
        let dateFrom = null;
        let dateTo = null;
        if (this.state.date !== null) {
            dateFrom = (this.state.date.from !== undefined) ? Date.parse(this.state.date.from) : null;
            dateTo = (this.state.date.to !== undefined) ? Date.parse(this.state.date.to) : null;
        }
        let endPoint = null;
        // console.log(dateFrom, dateTo);

        if (partnerSelect !== null) {
            endPoint = this.getEndPoint(partnerSelect, dateFrom, dateTo);
        }
        else if (partnerSelect === null) {
            endPoint = this.getEndPoint("allPartner", dateFrom, dateTo);

        }


        console.log(endPoint);
        this.props.getListByCustom(endPoint);

        // this.props.getListByCustomDayAndDate() // param custom end point


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
        // console.log(this.state.partnerSelect);



        let listPartner = this.props.listPartner;
        let renderListPartner;
        if (listPartner !== null) {
            renderListPartner = listPartner.map((param, id) => { return <p className={"renderListPartner" + ((this.state.partnerSelect === param) ? " renderListPartner_select" : "")} key={id} onClick={() => this.setPartnerSelect(param)}>{param}</p> })
        }
        return (
            <React.Fragment>
                {renderListPartner}
                <button type="button" className="btn btn-primary button_loc" onClick={this.getdataFromServer}>Lọc</button>
                <SelectDate sentDayToProps={this.setDaySelect} {...this.props} />
            </React.Fragment>
        );
    }
}

export default SelectPartnerAndDay;