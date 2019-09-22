import React, { Component } from 'react';
import ChartPartner from './ChartPartner';
import _ from 'lodash';

class AllChartsPartner extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataChart: null
        }
    }
    componentDidUpdate() {
        this.CDU_setStateDataChart();


    }
    CDU_setStateDataChart = () => {
        if (this.props.items.type === "getListByCustom") {
            if (this.state.dataChart !== this.props.items.listItem) { this.setState({ dataChart: this.props.items.listItem }) };
        }
    }

    sumAndDelete = (dataChart) => {


        for (let i = 0; i <= dataChart.length - 2; i++) {
            if (dataChart[i].dayNumber === dataChart[i + 1].dayNumber) {
                dataChart[i + 1].Sum_basecost += dataChart[i].Sum_basecost;
                dataChart[i + 1].Sum_lineitemquantity += dataChart[i].Sum_lineitemquantity;
                dataChart[i + 1].Sum_luminous += dataChart[i].Sum_luminous;
                dataChart[i + 1].Sum_us += dataChart[i].Sum_us;
                dataChart[i] = null;

            }
        }
        dataChart = dataChart.filter(param => { return param !== null });

        return [...dataChart];
    }
    Math_rangeDay = () => {
        let dayFrom = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from.toDateString()) : undefined;
        let dayTo = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to.toDateString()) : undefined;
        let rangeDay = [];
        if (dayFrom !== undefined && dayTo !== undefined) {
            for (let i = dayFrom; i <= dayTo; i = i + 24 * 60 * 60 * 1000) {
                rangeDay.push(i)
            }
        }
        else if (dayFrom !== undefined || dayTo !== undefined) {
            let daySelect = (dayFrom !== undefined) ? dayFrom : dayTo;
            rangeDay.push(daySelect)
        }
        return rangeDay;

    }
    Math_dataChart = (dataChart, rangeDay) => {

        if (dataChart !== undefined) {
            if (rangeDay.length == 0) {
                dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
                dataChart = this.sumAndDelete(dataChart);
                dataChart = dataChart.map(param => {
                    return {
                        day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
                        Sum_lineitemquantity: param.Sum_lineitemquantity,
                        Sum_basecost: Number(param.Sum_basecost.toFixed(1))
                    }
                })
                return dataChart;
            }
            else if (rangeDay.length <= 14) {
                console.log("< 14");
                
                dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
                dataChart = this.sumAndDelete(dataChart);
                dataChart = dataChart.filter(param => {
                    let stateParam = rangeDay.filter(day => { return day === param.dayNumber })[0];
                    return param.dayNumber === stateParam;
                })
                dataChart = dataChart.map(param => {
                    return {
                        day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
                        Sum_lineitemquantity: param.Sum_lineitemquantity,
                        Sum_basecost: Number(param.Sum_basecost.toFixed(1))
                    }
                })
                return dataChart;
            }
            else if (rangeDay.length <= 119) {
                rangeDay = _.chunk(rangeDay, 7);
                // console.log(rangeDay); 
                dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
                dataChart = this.sumAndDelete(dataChart);

                let weekDataChart = rangeDay.map((rangeDayParam, id) => {
                    let dataChartSelect = dataChart.filter(param => {
                        let stateParam = rangeDayParam.filter(day => { return day === param.dayNumber })[0];
                        return param.dayNumber === stateParam;
                    })
                    dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual);
                    console.log(rangeDayParam);
                    let startDayParam = rangeDayParam[0];
                    let endDayParam = rangeDayParam[rangeDayParam.length - 1];
                    let datePrint;
                    if ((new Date(startDayParam)).getMonth() === (new Date(endDayParam)).getMonth()) {
                        datePrint = (new Date(startDayParam)).getDate() +"-"+ (new Date(endDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1)

                    }
                    else{
                        datePrint = (new Date(startDayParam)).getDate()+ "/" + ((new Date(startDayParam)).getMonth() + 1)+"-"+(new Date(endDayParam)).getDate()+ "/" + ((new Date(endDayParam)).getMonth() + 1)

                    }

                    let sumData = { day:datePrint, Sum_lineitemquantity: 0, Sum_basecost: 0 };
                    for (let i = 0; i <= dataChartSelect.length - 1; i++) {
                        sumData.Sum_lineitemquantity += dataChartSelect[i].Sum_lineitemquantity;
                        sumData.Sum_basecost += Number(dataChartSelect[i].Sum_basecost.toFixed(1));
                    }
                    return sumData;


                    // dataChart = dataChart.map(param => {
                    //     return {
                    //         day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
                    //         Sum_lineitemquantity: param.Sum_lineitemquantity,
                    //         Sum_basecost: Number(param.Sum_basecost.toFixed(1))
                    //     }
                    // })
                })

                return weekDataChart;
            }
            return dataChart;
        }

    }
    render() {
        let rangeDay = this.Math_rangeDay();  // tính arr=[xxx]  la khoang thoi gian select
        let dataChart = this.Math_dataChart(JSON.parse(JSON.stringify(this.state.dataChart)), rangeDay);

        // console.log(dataChart);




        return (
            <React.Fragment>
                <ChartPartner dataChart={dataChart} styleChart="Sum_lineitemquantity" />
                <ChartPartner dataChart={dataChart} styleChart="Sum_basecost" />
            </React.Fragment>
        );
    }
}

export default AllChartsPartner;