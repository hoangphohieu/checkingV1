import React, { PureComponent } from 'react';
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

  render() {
    let dataChart = this.props.dataChart;
    let style = this.props.styleChart;
    // let style=(this.props.styleChart==="Sum_lineitemquantity"?[{ value: 'Số lượng'}]:[{ value: 'Tổng Base Cost'}]);

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
