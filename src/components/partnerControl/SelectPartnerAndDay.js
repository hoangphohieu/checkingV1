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

    setPartnerSelect = (param) => {
        this.setState({ partnerSelect: param })
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

        if (partnerSelect !== null) {
            if (dateFrom !== null && dateTo !== null) {
                let endPoint= "?namePartner=" + partnerSelect + ""
            }
        }




        // this.props.getListByCustomDayAndDate() // param custom end point


    }

    render() {
        // console.log(this.state.partnerSelect);



        let listPartner = this.props.listPartner;
        let renderListPartner;
        if (listPartner !== undefined) {
            renderListPartner = listPartner.map((param, id) => { return <p className={"renderListPartner" + ((this.state.partnerSelect === param) ? " renderListPartner_select" : "")} key={id} onClick={() => this.setPartnerSelect(param)}>{param}</p> })
        }
        return (
            <React.Fragment>
                {renderListPartner}
                <button type="button" className="btn btn-primary button_loc" onClick={this.getdataFromServer}>Lọc</button>
                <SelectDate sentDayToProps={this.setDaySelect} />
            </React.Fragment>
        );
    }
}

export default SelectPartnerAndDay;