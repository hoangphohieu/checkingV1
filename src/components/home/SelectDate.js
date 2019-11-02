

import React, { Component } from 'react';
import { DatePicker, AppProvider, Button, ActionList, Popover } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';


class PopoverWithActionListExample extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            popoverActive: false,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            selectedDates: {
                start: new Date(),
                end: new Date()
            }


        }
    }
    togglePopoverActive = () => {
        this.setState({ popoverActive: !this.state.popoverActive })
    }
    handleMonthChange = (month, year) => { this.setState({ month: month, year: year }) }
    setSelectedDates = (param) => {
        this.setState({ selectedDates: param })
    }
    checkYesterday=()=>{
        console.log("checkYesterday");
        
    }
    checkOnWeak=()=>{
        console.log("checkOnWeak");
        
    }
    render() {
        console.log(this.state.selectedDates);
        const activator = <Button onClick={this.togglePopoverActive} disclosure >More actions</Button>;

        return (
            <AppProvider i18n={enTranslations}>
                <div style={{ width: "300px" }}>
                    <Popover active={this.state.popoverActive} activator={activator} onClose={this.togglePopoverActive} fixed={false} fullWidth={false} preferredPosition="mostSpace" preventAutofocus={true}>
                        <ActionList items={[{ content: 'Ngày hôm qua', onAction: this.checkYesterday }, { content: 'Trong tuần',onAction: this.checkOnWeak }]} />
                        <DatePicker month={this.state.month} year={this.state.year} onChange={this.setSelectedDates} onMonthChange={this.handleMonthChange} selected={this.state.selectedDates} allowRange={true} />
                    </Popover>

                </div>
            </AppProvider>

        );
    }
}

export default PopoverWithActionListExample;







// class SelectDate extends Component {
//                 constructor(props, context) {
//                 super(props, context);
//         this.state = {
//                 month: new Date().getMonth(),
//             year: new Date().getFullYear(),
//             selectedDates: {
//                 start: new Date(),
//             end: new Date()
//         }

//     }
// }
//     handleMonthChange = (month, year) => {this.setState({ month: month, year: year })}
//             setSelectedDates = (param) => {
//                 this.setState({ selectedDates: param })
//             }
//             render() {
//                 console.log(this.state.selectedDates);

//             return (
//             <AppProvider i18n={enTranslations}>
//                 <DatePicker month={this.state.month} year={this.state.year} onChange={this.setSelectedDates} onMonthChange={this.handleMonthChange} selected={this.state.selectedDates} allowRange={true} />
//             </AppProvider>
//             );
//         }
//     }

//     export default SelectDate;



































    // import React from 'react';
    // import Helmet from 'react-helmet';
// import DayPicker, {DateUtils} from 'react-day-picker';
            // import 'react-day-picker/lib/style.css';
            // import _ from 'lodash';
// import {join} from 'path';

// export default class Example extends React.Component {
//     static defaultProps = {
//         numberOfMonths: 2,
//     };

//     constructor(props) {
//         super(props);
//         this.handleDayClick = this.handleDayClick.bind(this);
//         this.handleResetClick = this.handleResetClick.bind(this);
//         this.state = this.getInitialState();
//     }

//     getInitialState() {
//         return {
//             from: undefined,
//             to: undefined,
//             listDay: [[]],
//         };
//     }


//     componentDidUpdate() {
//         this.CDU_setStateListDay(); // lấy listDay của partner được GET(getListDayById) ở  component (SelectPartnerAndDay)
//     }
//     CDU_setStateListDay = () => {
//         if (this.props.items !== undefined) {
//             if (this.props.items.type === "getListDayById") {
//                 let listDay = JSON.parse(JSON.stringify(this.props.items.listItem));
//                 console.log(listDay);


//                 listDay = listDay.map(listDayCon => _.toPairs(listDayCon).filter(param => { return param[0] !== "id" }).map(param => param[1]));
//                 listDay = _.flatten(listDay);
//                 listDay.length = 300;


//                 // let userProperties = JSON.parse(localStorage.UserProperties);
//                 if (JSON.parse(localStorage.UserProperties)[1] !== "all") {
//                     let userProperties = JSON.parse(localStorage.UserProperties)[1].map(param => param[0]);
//                     listDay = listDay.map(param => {
//                         if (userProperties.some(param2 => param2 === param[0])) { return param }
//                         else { return undefined }
//                     });
//                 }
//                 console.log(listDay);
//                 listDay = _.uniq(listDay);

//                 listDay = listDay.filter(param => { return param !== undefined });
//                 console.log(this.state.listDay);



//                 // let paramId = _.toPairs(JSON.parse(JSON.stringify(this.props.items.listItem))[0]).filter(param => { return param[0] === "id" });
//                 // listDay.push(paramId[0]);
//                 if (listDay.length !== 0) {
//                     console.log(this.state.listDay);
//                     console.log(listDay);
//                     if (_.flattenDeep(this.state.listDay).join("")!==_.flattenDeep(listDay).join("") ) {


//                         this.setState({ listDay: listDay })
//                     }
//                 }

//             }
//         }
//     }
//     handleDayClick(day) { // click khi select Date
//         const range = DateUtils.addDayToRange(day, this.state);
//         this.setState(range);
//         this.props.sentDayToProps(range);   //  gọi tới  component (Home)  để setState và truyền date cho toàn bộ component
//         this.getdataFromServer(); // gọi tới hàm nội bộ  (getdataFromServer) để GET   khi click select Date
//     }
//     handleResetClick() {
//         this.props.sentDayToProps(this.getInitialState()); // gọi tới  component (Home)  để setState và truyền date cho toàn bộ component
//         this.setState({ from: undefined, to: undefined }); // setState lại

//     }
//     getdataFromServer = () => {
//         let partnerSelect = this.props.partnerSelect; // props lấy từ  component (SelectPartnerAndDay)
//         let product = this.props.product; // props lấy từ  component (SelectPartnerAndDay)
//         let dateFrom = null;
//         let dateTo = null;
//         if (this.props.date !== null) { // tính dateFrom và dateTo là số 121212121212121, lấy từ component (Home)
//             dateFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
//             dateTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
//         }
//         let endPoint = null;

//         if (product !== null) {  // tính endPoint ứng với partnerSelect và date select
//             endPoint = this.getEndPoint(partnerSelect, product, dateFrom, dateTo);
//         }
//         else if (product === null) {
//             endPoint = this.getEndPoint("allPartner", product, dateFrom, dateTo);
//         }
//         this.props.getListByCustom(endPoint); // GET API
//     }
//     getEndPoint = (partnerSelect, product, dateFrom, dateTo) => {
//         let timeNow = new Date();
//         let monthNow = timeNow.getMonth() + 1;
//         let endPoint = null;
//         partnerSelect = (partnerSelect !== "allPartner" && partnerSelect !== null) ? ("?namePartner=" + partnerSelect + "&Sumproduct=" + product) : ("?namePartner=allPartner" + ((product !== null) ? ("&Sumproduct=" + product) : ""));

//         if (dateFrom === null && dateTo === null) {
//             endPoint = partnerSelect
//                 + "&monthNumber=" + monthNow
//                 + "&monthNumber=" + ((monthNow === 1) ? "12" : (monthNow - 1));
//         }
//         else if (dateFrom !== null && dateTo !== null) {
//             let monthDateFrom = new Date(dateFrom).getMonth() + 1;
//             let monthdateTo = new Date(dateTo).getMonth() + 1;
//             if (monthDateFrom === monthdateTo) {
//                 endPoint = partnerSelect
//                     + "&monthNumber=" + monthdateTo
//                     + "&monthNumber=" + ((monthdateTo === 1) ? "12" : (monthdateTo - 1));
//             }
//             else if (monthDateFrom < monthdateTo) {
//                 endPoint = partnerSelect;
//                 for (let i = monthDateFrom; i <= monthdateTo; i++) {
//                     endPoint = endPoint + "&monthNumber=" + i
//                 }
//             }
//             else if (monthDateFrom > monthdateTo) {
//                 endPoint = partnerSelect;
//                 for (let i = monthDateFrom; i <= 12; i++) {
//                     endPoint = endPoint + "&monthNumber=" + i
//                 }
//                 for (let i = 1; i <= monthdateTo; i++) {
//                     endPoint = endPoint + "&monthNumber=" + i
//                 }
//             }
//         }
//         else if (dateFrom !== null || dateTo !== null) {
//             let monthNowSelect = new Date(((dateFrom !== null) ? dateFrom : dateTo)).getMonth() + 1;
//             endPoint = partnerSelect
//                 + "&monthNumber=" + monthNowSelect
//                 + "&monthNumber=" + ((monthNowSelect === 1) ? "12" : (monthNowSelect - 1));
//         }
//         return endPoint;
//     }

//     render() {


//         let listDay = (this.props.product !== null) ? this.state.listDay.filter(param => { return param[0] === this.props.product }) : this.state.listDay.filter(param => { return param[0] !== "id" });
//         listDay = listDay.map(param => { return (new Date(param[1])) })
//         // listDay =.map(param => param[1]).map(param => { return (new Date(param)) });



//         let { from, to } = this.props.date;
//         let modifiers = { start: from, end: to, highlighted: [] };  // obj chứa date select và ngày nổi trội hơn 
//         modifiers.highlighted = listDay;
//         return (
//             <div className="RangeExample">
//                 <p className="p_reset_day">
//                     {!from && !to && 'Click to select range date'}
//                     {from && !to && 'Click to select range date'}
//                     {from &&
//                         to &&
//                         `From${from.toLocaleDateString()} To
//                 ${to.toLocaleDateString()}`}{' '}
//                     {from && to && (
//                         <button className="link button_reset_day" onClick={this.handleResetClick}>
//                             Reset
//             </button>
//                     )}
//                 </p>
//                 <DayPicker
//                     className="Selectable"
//                     numberOfMonths={this.props.numberOfMonths}
//                     selectedDays={[from, { from, to }]}
//                     modifiers={modifiers}
//                     onDayClick={this.handleDayClick}
//                 />
//                 <Helmet>
//                     <style>{`
//   .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
//     background-color: #d2e4f5  !important;
//     color: #000;
//   }
//   .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover{
//     background-color: #c0ded9 !important;
//     color: #fff;

//   }

//   .Selectable .DayPicker-Day {
//     border-radius: 0 !important;
//   }
//   .Selectable .DayPicker-Day--start {
//     border-top-left-radius: 50% !important;
//     border-bottom-left-radius: 50% !important;
//   }
//   .Selectable .DayPicker-Day--end {
//     border-top-right-radius: 50% !important;
//     border-bottom-right-radius: 50% !important;
//   }
//   .DayPicker-Day--highlighted {
//     background-color: #ffb337;
//     color: white;
//     border-top-right-radius: 50% !important;
//     border-bottom-right-radius: 50% !important;
//   }
// `}</style>
//                 </Helmet>
//             </div>
//         );
//     }
// }