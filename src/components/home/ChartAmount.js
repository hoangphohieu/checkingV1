import React, { PureComponent } from 'react';
import _ from 'lodash';

// import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

export default class Example extends PureComponent {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/94sebfL8/';
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9hjfkp73/';
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

  sumAndDeleteAll = (dataChart) => { // hàm tính những ngày bị trùng nhau, cộng lại là để lại 1 ngày duy nhất
    for (let i = 0; i <= dataChart.length - 2; i++) {
      if (dataChart[i].dayNumber === dataChart[i + 1].dayNumber) {
        dataChart[i + 1].Sumbasecost += dataChart[i].Sumbasecost;
        dataChart[i + 1].Sumlineitemquantity += dataChart[i].Sumlineitemquantity;
        dataChart[i + 1].Sumus += dataChart[i].Sumus;
        dataChart[i] = null;

      }
    }
    dataChart = dataChart.filter(param => { return param !== null });

    return [...dataChart];
  }
  Math_dataChartAll = (dataChart, rangeDay) => {
    if (dataChart !== undefined) { // TH1: select date = -
      if (rangeDay.length === 0) {

        let userProperties = JSON.parse(localStorage.UserProperties);
        if (userProperties[1] !== "all") {
          userProperties = userProperties[1].map(param => param[0]);
          dataChart = dataChart.map(param => {
            if (userProperties.some(param2 => param2 === param.Sumproduct)) { return param }
            else { return undefined }
          });
        }
        dataChart = dataChart.filter(param => { return param !== undefined });

        // console.log(dataChart);


        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']); // xắp xếp
        dataChart = this.sumAndDeleteAll(dataChart); // lọc
        dataChart = dataChart.map(param => { // đổi sang dữ liệu biểu đồ
          return {
            day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
            Sumlineitemquantity: param.Sumlineitemquantity,
            Sumus: param.Sumus
          }
        })
        return dataChart;
      }

      else if (rangeDay.length <= 14) { // TH2: select date là khoảng thời gian 14 ngày
        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']); // xếp
        dataChart = this.sumAndDeleteAll(dataChart); // lọc
        let dayDataChart = rangeDay.map(rangeDayParam => { // với từng item của khoảng thời gian selectDate
          let dataChartSelect = dataChart.filter(param => { // trả về với item (dataChart)  nào trùng với ngày của item selectDate 
            return param.dayNumber === rangeDayParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual); // đồng thời (dataChart) xóa những cái vừa lọc ở trên đi 
          let datePrint = (((new Date(rangeDayParam)).getDate()) + "/" + ((new Date(rangeDayParam)).getMonth() + 1));
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumus: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumus += dataChartSelect[i].Sumus;
          }

          return sumData;
        })
        return dayDataChart;
      }
      else if (rangeDay.length <= 119) { // TH3: seledate là khoảng thời gian 4 tháng, chia thành các tuần
        rangeDay = _.chunk(rangeDay, 7); // chia thành  từng 7 ngày
        // console.log(rangeDay);

        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
        dataChart = this.sumAndDeleteAll(dataChart);

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
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumus: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) { //  tính item= tổng 7 item còn lại
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumus += dataChartSelect[i].Sumus;
          }

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
        dataChart = this.sumAndDeleteAll(dataChart);
        // het tinh rangeDay

        let monthDataChart = rangeDay.map(rangeDayParam => {
          let dataChartSelect = dataChart.filter(param => {
            let stateParam = rangeDayParam.filter(day => { return day === param.dayNumber })[0];
            return param.dayNumber === stateParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual);
          let startDayParam = rangeDayParam[0];
          let datePrint = (((new Date(startDayParam)).getMonth() + 1) + "/" + ((new Date(startDayParam)).getFullYear()));
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumus: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumus += dataChartSelect[i].Sumus;
          }
          return sumData;
        })
        return monthDataChart;
      }
      return dataChart;
    }
  }


  sumAndDeletePhoneCase = (dataChart) => { // hàm tính những ngày bị trùng nhau, cộng lại là để lại 1 ngày duy nhất
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
  Math_dataChartPhoneCase = (dataChart, rangeDay) => {
    if (dataChart !== undefined) { // TH1: select date = -
      if (rangeDay.length === 0) {
        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']); // xắp xếp
        // console.log(dataChart);

        dataChart = this.sumAndDeletePhoneCase(dataChart); // lọc
        dataChart = dataChart.map(param => { // đổi sang dữ liệu biểu đồ
          return {
            day: (new Date(param.dayNumber)).getDate() + "/" + ((new Date(param.dayNumber)).getMonth() + 1),
            Sumlineitemquantity: param.Sumlineitemquantity,
            Sumluminous: param.Sumluminous,
            Sumus: param.Sumus,
          }
        })
        return dataChart;
      }

      else if (rangeDay.length <= 14) { // TH2: select date là khoảng thời gian 14 ngày
        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']); // xếp
        dataChart = this.sumAndDeletePhoneCase(dataChart); // lọc
        let dayDataChart = rangeDay.map(rangeDayParam => { // với từng item của khoảng thời gian selectDate
          let dataChartSelect = dataChart.filter(param => { // trả về với item (dataChart)  nào trùng với ngày của item selectDate 
            return param.dayNumber === rangeDayParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual); // đồng thời (dataChart) xóa những cái vừa lọc ở trên đi 
          let datePrint = (((new Date(rangeDayParam)).getDate()) + "/" + ((new Date(rangeDayParam)).getMonth() + 1));
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumluminous: 0, Sumus: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumluminous += dataChartSelect[i].Sumluminous;
            sumData.Sumus += dataChartSelect[i].Sumus;
          }

          return sumData;
        })
        return dayDataChart;
      }
      else if (rangeDay.length <= 119) { // TH3: seledate là khoảng thời gian 4 tháng, chia thành các tuần
        rangeDay = _.chunk(rangeDay, 7); // chia thành  từng 7 ngày
        // console.log(rangeDay);

        dataChart = _.orderBy(dataChart, ['dayNumber'], ['asc']);
        dataChart = this.sumAndDeletePhoneCase(dataChart);

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
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumluminous: 0, Sumus: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) { //  tính item= tổng 7 item còn lại
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumluminous += dataChartSelect[i].Sumluminous;
            sumData.Sumus += dataChartSelect[i].Sumus;
          }
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
        dataChart = this.sumAndDeleteAll(dataChart);
        // het tinh rangeDay

        let monthDataChart = rangeDay.map(rangeDayParam => {
          let dataChartSelect = dataChart.filter(param => {
            let stateParam = rangeDayParam.filter(day => { return day === param.dayNumber })[0];
            return param.dayNumber === stateParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual);
          let startDayParam = rangeDayParam[0];
          let datePrint = (((new Date(startDayParam)).getMonth() + 1) + "/" + ((new Date(startDayParam)).getFullYear()));
          let sumData = { day: datePrint, Sumlineitemquantity: 0, Sumluminous: 0, Sumus: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.Sumlineitemquantity += dataChartSelect[i].Sumlineitemquantity;
            sumData.Sumluminous += dataChartSelect[i].Sumluminous;
            sumData.Sumus += dataChartSelect[i].Sumus;
          }
          return sumData;
        })
        return monthDataChart;
      }
      return dataChart;
    }
  }
  render() {
    let rangeDay = this.Math_rangeDay();  // tính arr=[xxx]  la khoang thoi gian select , ko lien quan partnerSelect
    let dataChart = [];
    // console.log(this.props.items.listItem);

    if (this.props.items.type === "getListByCustom") { // nêu GET (getListByCustom), gọi hàm  nội bộ (Math_dataChartAll) dể tính và xuất ra  data của biểu đồ
      if (this.props.product === "phoneCase") {
        dataChart = this.Math_dataChartPhoneCase(JSON.parse(JSON.stringify(this.props.items.listItem)), rangeDay);
        dataChart = dataChart.map(param => {
          let obj = {};
          obj["day"] = param.day;
          obj["all"] = param.Sumlineitemquantity;
          obj["luminous"] = param.Sumluminous;
          obj["glass"] = param.Sumlineitemquantity - param.Sumluminous;
          obj["us"] = param.Sumus;
          obj["ww"] = param.Sumlineitemquantity - param.Sumus;
          return obj
        })
      }
      else {
        dataChart = this.Math_dataChartAll(JSON.parse(JSON.stringify(this.props.items.listItem)), rangeDay);
        dataChart = dataChart.map(param => {
          let obj = {};
          obj["day"] = param.day;
          obj["all"] = param.Sumlineitemquantity;
          obj["us"] = param.Sumus;
          obj["ww"] = param.Sumlineitemquantity - param.Sumus;
          return obj
        })
      }
    }
    // console.log(dataChart);

    let payload = [{ value: 'Số lượng', type: 'line' }];
    let writeChart = null;
    if (this.props.product === "phoneCase") {
      writeChart = <BarChart
        width={(dataChart.length > 5) ? dataChart.length * 100 : 500}
        height={300}
        data={dataChart}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ww" stackId="a" barSize={20} fill="#034f84" ></Bar>
        <Bar dataKey="us" stackId="a" barSize={20} fill="#eea29a" ></Bar>
        <Bar dataKey="luminous" stackId="b" barSize={20} fill="#b1cbbb" ></Bar>
        <Bar dataKey="glass" stackId="b" barSize={20} fill="#c94c4c" ><LabelList dataKey="all" position="top" /></Bar>
        {/* 
        <Bar dataKey="all" barSize={20} fill="#ffc658" ><LabelList dataKey="all" position="top" /></Bar> */}
      </BarChart>
    }
    else {
      writeChart = <BarChart
        width={(dataChart.length > 5) ? dataChart.length * 100 : 500}
        height={300}
        data={dataChart}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ww" stackId="a" barSize={20} fill="#034f84" ></Bar>
        <Bar dataKey="us" stackId="a" barSize={20} fill="#eea29a" ></Bar>

        <Bar dataKey="all" barSize={20} fill="#ffc658" ><LabelList dataKey="all" position="top" /></Bar>
      </BarChart>
    }
    // return (
    //   <ComposedChart
    //     width={(dataChart.length > 5) ? dataChart.length * 150 : 700}
    //     height={400}
    //     data={dataChart}
    //     margin={{
    //       top: 20, right: 20, bottom: 20, left: 20,
    //     }}
    //   >
    //     <CartesianGrid stroke="#fff" />  {/* đường sọc ngang dọc, chia ô */}
    //     <XAxis dataKey="day" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend payload={payload} /> {/* tên của biểu đồ */}
    //     <Bar dataKey="ww" barSize={20} fill="#c0ded9" ><LabelList dataKey="ww" position="top" /></Bar>
    //     <Bar dataKey="us" barSize={20} fill="#c0ded9" ><LabelList dataKey="us" position="top" /></Bar>
    //     <Bar dataKey="luminous" barSize={20} fill="#c0ded9" ><LabelList dataKey="luminous" position="top" /></Bar>
    //     <Bar dataKey="glass" barSize={20} fill="#c0ded9" ><LabelList dataKey="glass" position="top" /></Bar>
    //     <Bar dataKey="all" barSize={20} fill="#c0ded9" ><LabelList dataKey="all" position="top" /></Bar>
    //   </ComposedChart>
    // );
    // name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    return (
      <>
        {writeChart}
      </>
    );
  }
}


