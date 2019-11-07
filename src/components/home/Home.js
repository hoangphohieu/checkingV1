import React, { Component } from 'react';
import AllChartsPartner from './AllChartsPartner';
import { DatePicker, AppProvider, Button, ActionList, Popover } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import _ from "lodash";
import { Dropdown } from 'react-bootstrap';
class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            popoverActive: false,
            dataChart: [],
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            selectedDates: {
                start: new Date(Date.parse(new Date()) - new Date().getDay() * 24 * 60 * 60 * 1000),
                end: new Date()
            }
        }
    }
    componentWillMount() {
        console.log("jkgskjsddsf");

        localStorage.setItem("SumOrderHome", JSON.stringify([]));

        let user = JSON.parse(localStorage.UserProperties)[1];
        user = user.substr(4);
        if (user === "all") { this.props.getSumItem("sumitem/?datatype=item") }
        else { this.props.getSumItem("sumitem/?datatype=item&partner=user" + user) }

        // if (user === "all") {  this.props.getSumItem(this.getEndPoint("", this.state.selectedDates.start, this.state.selectedDates.end));}
        // else { this.props.getSumItem(this.getEndPoint("?partner=" + user, this.state.selectedDates.start, this.state.selectedDates.end));}
    }
    togglePopoverActive = () => {
        this.setState({ popoverActive: !this.state.popoverActive })
    }
    handleMonthChange = (month, year) => { this.setState({ month: month, year: year }) };

    setSelectedDates = (param) => {
        this.setState({ selectedDates: param });
        let user = JSON.parse(localStorage.UserProperties)[1];
        user = user.substr(4);
        // if (user === "all") { this.props.getSumItem(this.getEndPoint("", param.start, param.end)); }
        // else { this.props.getSumItem(this.getEndPoint("?partner=" + user, param.start, param.end)); }
        console.log(user);


    }
    checkYesterday = () => {
        console.log("checkYesterday");

    }
    checkOnWeak = () => {
        console.log("checkOnWeak");

    }
    componentDidUpdate() {
        this.CDU_checkRequest();
    }
    CDU_checkRequest = () => {
        if (this.props.items.type === "GET_SUM_ITEM_SUCSESS") { this.getSumItemSucsess() }
        else if (this.props.items.type === "GET_HOME_RFAILURE") { this.getFail() }
    }

    getSumItemSucsess = () => {
        localStorage.setItem("SumOrderHome", JSON.stringify(_.toPairs(this.props.items.listItem)));
        this.props.stateStoreHomeToDefault();
        this.setState({ dataChart: _.toPairs(this.props.items.listItem) })
        // console.log(this.props.items.listItem);

    }
    getFail = () => {
        alert("Vui lòng kiểm tra đường truyền internet !")
    }


    // getEndPoint = (partner, start, end) => {
    //     let endPoint = "sumitem/?datatype=item";
    //     let monthStart = new Date(start).getMonth() + 1;
    //     let monthEnd = new Date(end).getMonth() + 1;
    //     if (monthStart === monthEnd) {
    //         endPoint += partner
    //             + "&month=" + monthEnd
    //             + "&month=" + ((monthEnd === 1) ? "12" : (monthEnd - 1));
    //     }
    //     else if (monthStart < monthEnd) {
    //         endPoint += partner;
    //         for (let i = monthStart; i <= monthEnd; i++) {
    //             endPoint += endPoint + "&month=" + i
    //         }
    //     }
    //     else if (monthStart > monthEnd) {
    //         endPoint += partner;
    //         for (let i = monthStart; i <= 12; i++) {
    //             endPoint += endPoint + "&month=" + i
    //         }
    //         for (let i = 1; i <= monthEnd; i++) {
    //             endPoint += endPoint + "&month=" + i
    //         }
    //     }
    //     return endPoint;
    // }
    setproduct = (e) => {
        console.log(e.target.value);

    }
    render() {
        const activator = <Button onClick={this.togglePopoverActive} disclosure >More actions</Button>;
        console.log(JSON.parse(localStorage.SumOrderHome));
        let data = this.state.dataChart;
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <AppProvider i18n={enTranslations}>
                                <div style={{ width: "300px" }}>
                                    <Popover active={this.state.popoverActive} activator={activator} onClose={this.togglePopoverActive} fixed={false} fullWidth={false} preferredPosition="mostSpace" preventAutofocus={true}>
                                        <ActionList items={[{ content: 'Ngày hôm qua', onAction: this.checkYesterday }, { content: 'Trong tuần', onAction: this.checkOnWeak }]} />
                                        <DatePicker month={this.state.month} year={this.state.year} onChange={this.setSelectedDates} onMonthChange={this.handleMonthChange} selected={this.state.selectedDates} allowRange={true} />
                                    </Popover>

                                </div>
                            </AppProvider>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                             </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.setState({ dataChart: JSON.parse(localStorage.SumOrderHome) })}>All Product</Dropdown.Item>
                                    {JSON.parse(localStorage.SumOrderHome).map((param, id) => <Dropdown.Item key={id} onClick={() => this.setState({ dataChart: [param] })}>{param[0]} </Dropdown.Item>)}

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <AllChartsPartner date={this.state.selectedDates} data={JSON.stringify(data)} product="all" />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;