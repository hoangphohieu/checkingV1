import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, LabelList
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 590, pv: 800, amt: 1400,
  },
  {
    name: 'Page B', uv: 868, pv: 967, amt: 1506,
  },
  {
    name: 'Page C', uv: 1397, pv: 1098, amt: 989,
  },
  {
    name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
  },
  {
    name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
  },
  {
    name: 'Page F', uv: 1400, pv: 680, amt: 1700,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/94sebfL8/';

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

        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
        dataChart = this.sumAndDelete(dataChart);
        dataChart = dataChart.filter(param => {
          let stateParam = rangeDay.filter(day => { return day === param.dayNumber })[0];
          return param.dayNumber === stateParam;
        })
        dataChart = dataChart.map(param => {
          let dayparm = { day: 0, Sum_lineitemquantity: 0, Sum_basecost: 0 }

          dayparm.day = (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1);
          dayparm.Sum_lineitemquantity = param.Sum_lineitemquantity;
          dayparm.Sum_basecost = Number(param.Sum_basecost.toFixed(1));
          return dayparm;
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
          let startDayParam = rangeDayParam[0];
          let endDayParam = rangeDayParam[rangeDayParam.length - 1];
          let datePrint;
          if ((new Date(startDayParam)).getMonth() === (new Date(endDayParam)).getMonth()) {
            datePrint = (new Date(startDayParam)).getDate() + "-" + (new Date(endDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1)

          }
          else {
            datePrint = (new Date(startDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1) + "-" + (new Date(endDayParam)).getDate() + "/" + ((new Date(endDayParam)).getMonth() + 1)

          }

          let sumData = { day: datePrint, Sum_lineitemquantity: 0, Sum_basecost: 0 };
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

    let dataChart = [];

    let rangeDay = this.Math_rangeDay();  // tính arr=[xxx]  la khoang thoi gian select
    if (this.props.items.type === "getListByCustom") {
      dataChart = this.Math_dataChart(JSON.parse(JSON.stringify(this.props.items.listItem)), rangeDay);
      console.log(dataChart, rangeDay);

    }
    let style = this.props.styleChart;


    let payload = (this.props.styleChart === "Sum_lineitemquantity" ? [{ value: 'Số lượng', type: 'line' }] : [{ value: 'Tổng Base Cost', type: 'line' }])
    return (
      <ComposedChart
        width={(dataChart.length > 5) ? dataChart.length * 100 : 500}
        height={400}
        data={dataChart}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend payload={payload} />
        <Bar dataKey={style} barSize={20} fill="#413ea0" >
          <LabelList dataKey={style} position="top" />
        </Bar>
      </ComposedChart>
    );
  }
}
