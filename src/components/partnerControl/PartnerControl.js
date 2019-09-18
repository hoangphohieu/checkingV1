import React, { Component } from 'react';
import _ from 'lodash';
import ChartPartner from './ChartPartner';

class PartnerControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    componentWillMount() {
        let timeNow = new Date();
        let dayNow = timeNow.getDate();
        let monthNow = timeNow.getMonth() + 1;
        let yearNow = timeNow.getFullYear();
        this.props.getListById("listPartner");

        // sửa lại cái API này cho xịn hơn chút
        this.props.getListByCustom("?namePartner=allPartner&monthNumber=" + monthNow + ((monthNow > 1) ? ("&monthNumber=" + (monthNow - 1)) : "") + "&yearNumber=" + yearNow);

    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.props.items.listItem[0].namePartner === undefined) {
            let obj = {}; obj[this.props.items.listItem[0].id] = this.props.items.listItem; // tạo obj ={} để setstate
            if (this.state[this.props.items.listItem[0].id] === undefined) { this.setState({ ...obj }) };  // nếu chưa có trường state đó thì tạo state đó
        }
        else {
            let obj = {}; obj[this.props.items.listItem[0].namePartner] = this.props.items.listItem; // tạo obj ={} để setstate
            if (this.state[this.props.items.listItem[0].namePartner] === undefined) { this.setState({ ...obj }) };  // nếu chưa có trường state đó thì tạo state đó
        }
        // console.log(this.props.items.listItem[0].namePartner);


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
        let timeNow = new Date();
        // let dayNow = timeNow.getDate();
        // let monthNow = timeNow.getMonth() + 1;
        // let yearNow = timeNow.getFullYear();

        let listPartner = this.state.listPartner;
        listPartner = _.toPairs(listPartner).filter(param => { return param[0] !== "id" }).map(param => param[1]);
        let dataChart = _.toPairs(this.state).filter(param => { return param[0] !== "listPartner" }).map(param2 => param2[1])[0];
        if (dataChart !== undefined) {
            dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
            dataChart = this.sumAndDelete(dataChart);
            console.log(dataChart);
            dataChart = dataChart.map(param => {
                console.log(param);

                return {
                    day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
                    Sum_lineitemquantity: param.Sum_lineitemquantity,
                    Sum_basecost: param.Sum_basecost
                }
            })




        }
        console.log(dataChart);

        let data = [
            {
                name: 'Page A', uv: 590
            },
            {
                name: 'Page B', uv: 868
            },
            {
                name: 'Page C', uv: 1397
            },
            {
                name: 'Page D', uv: 1480
            },
            {
                name: 'Page E', uv: 1520
            },
            {
                name: 'Page F', uv: 1400
            },
        ];




        return (
            <div className="App">
                <ChartPartner dataChart={dataChart}  styleChart="Sum_lineitemquantity"/>
                <ChartPartner dataChart={dataChart} styleChart="Sum_basecost" />
            </div>

        );
    }
}

export default PartnerControl;