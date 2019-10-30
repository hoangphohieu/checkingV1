import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import _ from 'lodash';
import { join } from 'path';

export default class Example extends React.Component {
    static defaultProps = {
        numberOfMonths: 2,
    };

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            from: undefined,
            to: undefined,
            listDay: [[]],
        };
    }


    componentDidUpdate() {
        this.CDU_setStateListDay(); // lấy listDay của partner được GET(getListDayById) ở  component (SelectPartnerAndDay)
    }
    CDU_setStateListDay = () => {
        if (this.props.items !== undefined) {
            if (this.props.items.type === "getListDayById") {
                let listDay = JSON.parse(JSON.stringify(this.props.items.listItem));
                console.log(listDay);


                listDay = listDay.map(listDayCon => _.toPairs(listDayCon).filter(param => { return param[0] !== "id" }).map(param => param[1]));
                listDay = _.flatten(listDay);
                listDay.length = 300;


                // let userProperties = JSON.parse(localStorage.UserProperties);
                if (JSON.parse(localStorage.UserProperties)[1] !== "all") {
                    let userProperties = JSON.parse(localStorage.UserProperties)[1].map(param => param[0]);
                    listDay = listDay.map(param => {
                        if (userProperties.some(param2 => param2 === param[0])) { return param }
                        else { return undefined }
                    });
                }
                console.log(listDay);
                listDay = _.uniq(listDay);

                listDay = listDay.filter(param => { return param !== undefined });
                console.log(this.state.listDay);



                // let paramId = _.toPairs(JSON.parse(JSON.stringify(this.props.items.listItem))[0]).filter(param => { return param[0] === "id" });
                // listDay.push(paramId[0]);
                if (listDay.length !== 0) {
                    console.log(this.state.listDay);
                    console.log(listDay);
                    if (_.flattenDeep(this.state.listDay).join("")!==_.flattenDeep(listDay).join("") ) {


                        this.setState({ listDay: listDay })
                    }
                }

            }
        }
    }
    handleDayClick(day) { // click khi select Date
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
        this.props.sentDayToProps(range);   //  gọi tới  component (PartnerControl)  để setState và truyền date cho toàn bộ component
        this.getdataFromServer(); // gọi tới hàm nội bộ  (getdataFromServer) để GET   khi click select Date
    }
    handleResetClick() {
        this.props.sentDayToProps(this.getInitialState()); // gọi tới  component (PartnerControl)  để setState và truyền date cho toàn bộ component
        this.setState({ from: undefined, to: undefined }); // setState lại

    }
    getdataFromServer = () => {
        let partnerSelect = this.props.partnerSelect; // props lấy từ  component (SelectPartnerAndDay)
        let partnerType = this.props.partnerType; // props lấy từ  component (SelectPartnerAndDay)
        let dateFrom = null;
        let dateTo = null;
        if (this.props.date !== null) { // tính dateFrom và dateTo là số 121212121212121, lấy từ component (PartnerControl)
            dateFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
            dateTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
        }
        let endPoint = null;

        if (partnerType !== null) {  // tính endPoint ứng với partnerSelect và date select
            endPoint = this.getEndPoint(partnerSelect, partnerType, dateFrom, dateTo);
        }
        else if (partnerType === null) {
            endPoint = this.getEndPoint("allPartner", partnerType, dateFrom, dateTo);
        }
        this.props.getListByCustom(endPoint); // GET API
    }
    getEndPoint = (partnerSelect, partnerType, dateFrom, dateTo) => {
        let timeNow = new Date();
        let monthNow = timeNow.getMonth() + 1;
        let endPoint = null;
        partnerSelect = (partnerSelect !== "allPartner" && partnerSelect !== null) ? ("?namePartner=" + partnerSelect + "&Sumpartnertype=" + partnerType) : ("?namePartner=allPartner" + ((partnerType !== null) ? ("&Sumpartnertype=" + partnerType) : ""));

        if (dateFrom === null && dateTo === null) {
            endPoint = partnerSelect
                + "&monthNumber=" + monthNow
                + "&monthNumber=" + ((monthNow === 1) ? "12" : (monthNow - 1));
        }
        else if (dateFrom !== null && dateTo !== null) {
            let monthDateFrom = new Date(dateFrom).getMonth() + 1;
            let monthdateTo = new Date(dateTo).getMonth() + 1;
            if (monthDateFrom === monthdateTo) {
                endPoint = partnerSelect
                    + "&monthNumber=" + monthdateTo
                    + "&monthNumber=" + ((monthdateTo === 1) ? "12" : (monthdateTo - 1));
            }
            else if (monthDateFrom < monthdateTo) {
                endPoint = partnerSelect;
                for (let i = monthDateFrom; i <= monthdateTo; i++) {
                    endPoint = endPoint + "&monthNumber=" + i
                }
            }
            else if (monthDateFrom > monthdateTo) {
                endPoint = partnerSelect;
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
            endPoint = partnerSelect
                + "&monthNumber=" + monthNowSelect
                + "&monthNumber=" + ((monthNowSelect === 1) ? "12" : (monthNowSelect - 1));
        }
        return endPoint;
    }

    render() {


        let listDay = (this.props.partnerType !== null) ? this.state.listDay.filter(param => { return param[0] === this.props.partnerType }) : this.state.listDay.filter(param => { return param[0] !== "id" });
        listDay = listDay.map(param => { return (new Date(param[1])) })
        // listDay =.map(param => param[1]).map(param => { return (new Date(param)) });



        let { from, to } = this.props.date;
        let modifiers = { start: from, end: to, highlighted: [] };  // obj chứa date select và ngày nổi trội hơn 
        modifiers.highlighted = listDay;
        return (
            <div className="RangeExample">
                <p className="p_reset_day">
                    {!from && !to && 'Click to select range date'}
                    {from && !to && 'Click to select range date'}
                    {from &&
                        to &&
                        `From${from.toLocaleDateString()} To
                ${to.toLocaleDateString()}`}{' '}
                    {from && to && (
                        <button className="link button_reset_day" onClick={this.handleResetClick}>
                            Reset
            </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
                <Helmet>
                    <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #d2e4f5  !important;
    color: #000;
  }
  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover{
    background-color: #c0ded9 !important;
    color: #fff;
    
  }

  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .DayPicker-Day--highlighted {
    background-color: #ffb337;
    color: white;
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
                </Helmet>
            </div>
        );
    }
}