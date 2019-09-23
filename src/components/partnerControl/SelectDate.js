import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import _ from 'lodash';

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
            listDay: [],
        };
    }


    componentDidUpdate() {
        this.CDU_setStateListDay();
    }
    CDU_setStateListDay = () => {
        if (this.props.items !== undefined) {
            if (this.props.items.type === "getListDayById") {
                let listDay = this.props.items.listItem;
                // console.log(listDay);

                listDay = _.toPairs(listDay[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]).map(param => { return (new Date(param)) });

                listDay.length = 300;
                listDay = listDay.filter(param => { return param !== undefined });
                if (this.state.listDay.join("") !== listDay.join("")) {
                    this.setState({ listDay: listDay })
                }
            }
        }
    }
    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
        this.props.sentDayToProps(range);
        this.getdataFromServer();
    }
    handleResetClick() {
        this.setState(this.getInitialState());
    }
    getdataFromServer = () => {
        let partnerSelect = this.props.partnerSelect;
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
        const { from, to } = this.state;
        let modifiers = { start: from, end: to, highlighted: [] };
        modifiers.highlighted = this.state.listDay;



        return (
            <div className="RangeExample">
                <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                        to &&
                        `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {from && to && (
                        <button className="link" onClick={this.handleResetClick}>
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
    background-color: #f0f8ff !important;
    color: #4a90e2;
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
    background-color: orange;
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