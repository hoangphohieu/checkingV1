import React, { Component } from 'react';
// import SelectDate from './SelectDate';
import AllChartsPartner from './AllChartsPartner';
import { DatePicker, AppProvider, Button, ActionList, Popover } from '@shopify/polaris';

import enTranslations from '@shopify/polaris/locales/en.json';

class Home extends Component {
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
    componentWillMount() {
        let user = JSON.parse(localStorage.UserProperties)[1];
        user = user.substr(4);
        if (user === "all") {
            this.props.getSumItem(this.getEndPoint("", this.state.selectedDates.start, this.state.selectedDates.end));
        }
        else {
            this.props.getSumItem(this.getEndPoint("?partner=" + user, this.state.selectedDates.start, this.state.selectedDates.end));

        }
    }
    togglePopoverActive = () => {
        this.setState({ popoverActive: !this.state.popoverActive })
    }
    handleMonthChange = (month, year) => { this.setState({ month: month, year: year }) };

    setSelectedDates = (param) => {
        this.setState({ selectedDates: param });
        let user = JSON.parse(localStorage.UserProperties)[1];
        user = user.substr(4);
        if (user === "all") { this.props.getSumItem(this.getEndPoint("", param.start, param.end)); }
        else { this.props.getSumItem(this.getEndPoint("?partner=" + user, param.start, param.end)); }
        console.log(user);


    }
    checkYesterday = () => {
        console.log("checkYesterday");

    }
    checkOnWeak = () => {
        console.log("checkOnWeak");

    }


    getEndPoint = (partner, start, end) => {
        let endPoint = "sumitem/?datatype=item";
        let monthStart = new Date(start).getMonth() + 1;
        let monthEnd = new Date(end).getMonth() + 1;
        if (monthStart === monthEnd) {
            endPoint += partner
                + "&month=" + monthEnd
                + "&month=" + ((monthEnd === 1) ? "12" : (monthEnd - 1));
        }
        else if (monthStart < monthEnd) {
            endPoint += partner;
            for (let i = monthStart; i <= monthEnd; i++) {
                endPoint += endPoint + "&month=" + i
            }
        }
        else if (monthStart > monthEnd) {
            endPoint += partner;
            for (let i = monthStart; i <= 12; i++) {
                endPoint += endPoint + "&month=" + i
            }
            for (let i = 1; i <= monthEnd; i++) {
                endPoint += endPoint + "&month=" + i
            }
        }
        return endPoint;
    }
    render() {
        const activator = <Button onClick={this.togglePopoverActive} disclosure >More actions</Button>;

        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <p>select col-4</p>
                            <AppProvider i18n={enTranslations}>
                                <div style={{ width: "300px" }}>
                                    <Popover active={this.state.popoverActive} activator={activator} onClose={this.togglePopoverActive} fixed={false} fullWidth={false} preferredPosition="mostSpace" preventAutofocus={true}>
                                        <ActionList items={[{ content: 'Ngày hôm qua', onAction: this.checkYesterday }, { content: 'Trong tuần', onAction: this.checkOnWeak }]} />
                                        <DatePicker month={this.state.month} year={this.state.year} onChange={this.setSelectedDates} onMonthChange={this.handleMonthChange} selected={this.state.selectedDates} allowRange={true} />
                                    </Popover>

                                </div>
                            </AppProvider>
                        </div>
                        <div className="col-8 d-flex-column align-item-center over-flow-control">
                            <p>Biểu đồ col-8</p>
                            <AllChartsPartner date={this.state.selectedDates}  {...this.props} />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;