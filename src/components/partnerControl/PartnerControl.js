import React, { Component } from 'react';
import _ from 'lodash';
import ChartPartner from './ChartPartner';
import SelectPartnerAndDay from './SelectPartnerAndDay';
class PartnerControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataChart: null,
            listPartner: null
        }
    }

    componentWillMount() {
        let timeNow = new Date();
        let dayNow = timeNow.getDate();
        let monthNow = timeNow.getMonth() + 1;
        let yearNow = timeNow.getFullYear();
        this.props.getListById("listPartner");

        // sửa lại cái API này cho xịn hơn chút
        this.props.getListByCustom("?namePartner=allPartner&monthNumber=" + monthNow + "&monthNumber=" + ((monthNow === 1) ? "12" : (monthNow - 1)));

    }


    componentDidUpdate() {
        if (this.props.items.type === "getListById" && this.state.listPartner === null) {
            // let obj = {}; obj[this.props.items.listItem[0].id] = this.props.items.listItem; // tạo obj ={} để setstate
            // if (this.state[this.props.items.listItem[0].id] === undefined) { this.setState({ ...obj }) };  // nếu chưa có trường state đó thì tạo state đó
            this.setState({ listPartner: this.props.items.listItem })
            console.log(this.props.items.listItem);
        }

        if (this.props.items.type === "getListDayById") {
            let listDay=this.props.items.listItem;
            listDay=_.toPairs(listDay[0]).filter(param=>{return param[0]!=="id"}).map(param=>param[0])
            // console.log(listDay);
            
        }

        if (this.props.items.type === "getListByCustom") {
            if (this.state.dataChart !== this.props.items.listItem) { this.setState({ dataChart: this.props.items.listItem }) };
        }
    }
    sumAndDelete = (dataChart) => {
        for (let i = 0; i <= dataChart.length - 2; i++) {
            if (dataChart[i].dayNumber === dataChart[i + 1].dayNumber) {
                dataChart[i].Sum_basecost += dataChart[i + 1].Sum_basecost;
                dataChart[i].Sum_lineitemquantity += dataChart[i + 1].Sum_lineitemquantity;
                dataChart[i].Sum_luminous += dataChart[i + 1].Sum_luminous;
                dataChart[i].Sum_us += dataChart[i + 1].Sum_us;
                dataChart[i + 1] = null;
                dataChart = dataChart.filter(param => { return param !== null })
                dataChart = this.sumAndDelete(dataChart);
            }
        }
        return dataChart;
    }
    render() {
        let dataChart;
        if (this.state.dataChart !== null) dataChart = this.state.dataChart;

        if (dataChart !== undefined) {
            dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
            dataChart = this.sumAndDelete(dataChart);
            dataChart = dataChart.map(param => {
                return {
                    day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
                    Sum_lineitemquantity: param.Sum_lineitemquantity,
                    Sum_basecost: Number(param.Sum_basecost.toFixed(1))
                }
            })
        }

        let listPartner = this.state.listPartner;
        if (listPartner !== null) {
            listPartner = _.toPairs(listPartner[0]).filter(param => { return param[0] !== "id" }).map(param => param[1]);
        }



        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <p>select col-4</p>
                            <SelectPartnerAndDay listPartner={listPartner}  {...this.props} />
                        </div>
                        <div className="col-8 d-flex-column align-item-center">
                            <p>Biểu đồ col-8</p>
                            <ChartPartner dataChart={dataChart} styleChart="Sum_lineitemquantity" />
                            <ChartPartner dataChart={dataChart} styleChart="Sum_basecost" />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default PartnerControl;