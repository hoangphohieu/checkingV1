import React, { PureComponent } from 'react';
import _ from 'lodash';

import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, LabelList
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/94sebfL8/';

  sumAndDelete = (dataChart) => { // hàm tính những ngày bị trùng nhau, cộng lại là để lại 1 ngày duy nhất
    for (let i = 0; i <= dataChart.length - 2; i++) {
      if (dataChart[i].dayNumber === dataChart[i + 1].dayNumber) {
        dataChart[i + 1].Sumbasecost += dataChart[i].Sumbasecost;
        dataChart[i + 1].Sumlineitemquantity += dataChart[i].Sumlineitemquantity;
        dataChart[i + 1].Sumluminous += dataChart[i].Sumluminous;
        dataChart[i + 1].Sumus += dataChart[i].Sumus;
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
    if (dataChart !== undefined) { // TH1: select date = -
      if (rangeDay.length === 0) {
        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']); // xắp xếp
        dataChart = this.sumAndDelete(dataChart); // lọc
        dataChart = dataChart.map(param => { // đổi sang dữ liệu biểu đồ
          return {
            day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
            Sumlineitemquantity: param.Sumlineitemquantity,
            Sumbasecost: Number(param.Sumbasecost.toFixed(1))
          }
        })
        return dataChart;
      }

      else if (rangeDay.length <= 14) { // TH2: select date là khoảng thời gian 14 ngày
        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']); // xếp
        dataChart = this.sumAndDelete(dataChart); // lọc
        let dayDataChart = rangeDay.map(rangeDayParam => { // với từng item của khoảng thời gian selectDate
          let dataChartSelect = dataChart.filter(param => { // trả về với item (dataChart)  nào trùng với ngày của item selectDate 
            return param.dayNumber === rangeDayParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual); // đồng thời (dataChart) xóa những cái vừa lọc ở trên đi 
          let datePrint = (((new Date(rangeDayParam)).getDate()) + "/" + ((new Date(rangeDayParam)).getMonth() + 1));
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumbasecost: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumbasecost += Number(dataChartSelect[i].Sumbasecost.toFixed(1)); // làm tròn tới số thập phân thứ 1
          }

          return sumData;
        })
        return dayDataChart;
      }
      else if (rangeDay.length <= 119) { // TH3: seledate là khoảng thời gian 4 tháng, chia thành các tuần
        rangeDay = _.chunk(rangeDay, 7); // chia thành  từng 7 ngày
        console.log(rangeDay);

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
          if ((new Date(startDayParam)).getMonth() === (new Date(endDayParam)).getMonth()) { // tính ngày datePrint 7-9/10
            datePrint = (new Date(startDayParam)).getDate() + "-" + (new Date(endDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1)
          }
          else {
            datePrint = (new Date(startDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1) + "-" + (new Date(endDayParam)).getDate() + "/" + ((new Date(endDayParam)).getMonth() + 1)
          }
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumbasecost: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) { //  tính item= tổng 7 item còn lại
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumbasecost += Number(dataChartSelect[i].Sumbasecost.toFixed(1));
          }
          sumData.Sumbasecost = Number(sumData.Sumbasecost.toFixed(1));
          return sumData;

        })

        return weekDataChart;
      }

      else if (rangeDay.length <= 730) { // giới hạn 2 năm, chia thàng các tháng
        rangeDay = rangeDay.map(param => { return { date: param, month: new Date(param).getMonth() } }) // tính toán để chia range day thành các tháng
        rangeDay = _.groupBy(rangeDay, "month"); // group thành các tháng
        rangeDay = _.toPairs(rangeDay).map(param => param[1]);
        rangeDay.sort((a, b) => { return (a[0].date - b[0].date) }); // lọc từ tháng trước đến tháng sau
        rangeDay = rangeDay.map(param => { param = param.map(param2 => param2.date); return param })
        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
        dataChart = this.sumAndDelete(dataChart);
        // het tinh rangeDay

        let monthDataChart = rangeDay.map(rangeDayParam => {
          let dataChartSelect = dataChart.filter(param => {
            let stateParam = rangeDayParam.filter(day => { return day === param.dayNumber })[0];
            return param.dayNumber === stateParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual);
          let startDayParam = rangeDayParam[0];
          let datePrint = (((new Date(startDayParam)).getMonth() + 1) + "/" + ((new Date(startDayParam)).getFullYear()));
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumbasecost: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumbasecost += Number(dataChartSelect[i].Sumbasecost.toFixed(1));
          }
          sumData.Sumbasecost = Number(sumData.Sumbasecost.toFixed(1));
          return sumData;
        })
        return monthDataChart;
      }
      return dataChart;
    }
  }
  render() {
    let dataChart = [];
    console.log(this.props.items.listItem);

    let rangeDay = this.Math_rangeDay();  // tính arr=[xxx]  la khoang thoi gian select
    if (this.props.items.type === "getListByCustom") { // nêu GET (getListByCustom), gọi hàm  nội bộ (Math_dataChart) dể tính và xuất ra  data của biểu đồ
      dataChart = this.Math_dataChart(JSON.parse(JSON.stringify(this.props.items.listItem)), rangeDay);
    }
    let style = this.props.styleChart;
    let payload = (this.props.styleChart === "Sumlineitemquantity" ? [{ value: 'Số lượng', type: 'line' }] : [{ value: 'Tổng Base Cost', type: 'line' }])
    return (
      <ComposedChart
        width={(dataChart.length > 5) ? dataChart.length * 100 : 500}
        height={400}
        data={dataChart}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#fff" />  {/* đường sọc ngang dọc, chia ô */}
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend payload={payload} /> {/* tên của biểu đồ */}
        <Bar dataKey={style} barSize={20} fill="#c0ded9" >  {/* cột của biểu đò */}
          <LabelList dataKey={style} position="top" />
        </Bar>
      </ComposedChart>
    );
  }
}
