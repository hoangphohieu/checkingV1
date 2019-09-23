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
        this.props.getListDayById("listdaylistPartner");


    }
    componentDidMount() {

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
                {/* <button type="button" className="btn btn-primary button_loc" onClick={this.getdataFromServer}>Lọc</button> */}
                <SelectDate partnerSelect={this.state.partnerSelect} {...this.props} />
            </React.Fragment>
        );
    }
}

export default SelectPartnerAndDay;