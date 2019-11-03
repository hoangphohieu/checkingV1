


import React, { Component } from 'react';
import _ from 'lodash';
import RenderTrackingProperties from './RenderTrackingProperties';

class TrackingSearch extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  listOrder: []
            }
      }

      componentDidMount() {
            if (JSON.parse(localStorage.getItem("listNameForTracking")) === null) {  // listNameForTracking
                  localStorage.setItem("listNameForTracking", JSON.stringify([]));
            }
            else { localStorage.setItem("listNameForTracking", JSON.stringify([])); }

            if (JSON.parse(localStorage.getItem("listNameForTrackingFail")) === null) { // listNameForTrackingFail
                  localStorage.setItem("listNameForTrackingFail", JSON.stringify([]));
            }
            else { localStorage.setItem("listNameForTrackingFail", JSON.stringify([])); }

            if (JSON.parse(localStorage.getItem("listNameTrackingSuccess")) === null) { // listNameTrackingSuccess
                  localStorage.setItem("listNameTrackingSuccess", JSON.stringify([]));
            }
            else { localStorage.setItem("listNameTrackingSuccess", JSON.stringify([])); }
      }

      componentWillMount() {
            this.CWM_getOrderToday();
      }
      CWM_getOrderToday = () => {
            let day = Date.parse(new Date().toDateString());
            let user = JSON.parse(localStorage.UserProperties);
            if (user[1] === "all") {
                  this.props.getOrderByDay("?namePartner=allPartner" & "dayNumber=" + day);
            }
            else {
                  this.props.getOrderByDay("?namePartner=" + user[1] + "&dayNumber=" + day);
            }

      }


      componentDidUpdate() {
            this.CDU_checkRequest();
      }
      CDU_checkRequest = () => {

            if (this.props.itemsPayload.type === "GET_TRACKING_MORE_SUCSESS") { this.WhenGetTrackingSuccess() }
            else if (this.props.itemsPayload.type === "GET_RFAILURE") { this.WhenGetTrackingFail() }

            if (this.props.itemsPayload.type === "GET_ORDER_BY_DAY_SUCSESS") { this.getOrderByDaySucsess() }
            else if (this.props.itemsPayload.type === "GET_RFAILURE") { this.getRefailure() }

      }
      getOrderByDaySucsess = () => {
            if (this.props.itemsPayload.listItem.length !== 0) {
                  this.setState({ listOrder: this.props.itemsPayload.listItem[0].Sumorder });
                  this.props.StateStoreTrackingToDefault();
            }
            console.log(this.props.itemsPayload);

      }


      WhenGetTrackingSuccess = () => {
            // console.log("haha");
            let _this = this;
            let items = this.props.itemsPayload.listItem;
            if (items.meta.code === 200) {
                  let listNameForTracking = JSON.parse(localStorage.listNameForTracking);
                  let listNameTrackingSuccess = JSON.parse(localStorage.listNameTrackingSuccess);


                  // console.log(listNameForTracking);

                  if (listNameForTracking.length > 0) {
                        items = [...items.data.items];
                        let ordersTrackingSuccess = items.map(param => param.order_id);
                        let listTrackingFail = _.difference(listNameForTracking[listNameForTracking.length - 1], ordersTrackingSuccess);
                        let listNameForTrackingFail = JSON.parse(localStorage.listNameForTrackingFail);
                        listTrackingFail.forEach(param => { listNameForTrackingFail.push(param) })
                        localStorage.setItem("listNameForTrackingFail", JSON.stringify(listNameForTrackingFail));// lưu những item fail vào localstorage
                        listNameTrackingSuccess = [...listNameTrackingSuccess, ...items];
                        localStorage.setItem("listNameTrackingSuccess", JSON.stringify(listNameTrackingSuccess));// lưu những item success vào localstorage

                        listNameForTracking.pop();
                        localStorage.setItem("listNameForTracking", JSON.stringify(listNameForTracking));
                        if (listNameForTracking.length > 0) {
                              let listName = listNameForTracking[listNameForTracking.length - 1];
                              listName = listName.map(param => { return _.replace(param, '#', '%23') });
                              listName = listName.map(param => { return _.replace(param, ' ', '%20') });
                              listName = [...listName].join(",");
                              let endPoint = "?orders=" + listName + "&limit=500";
                              console.log(endPoint);
                              setTimeout(function () { _this.props.getTrackingMore(endPoint); }, 1000);
                        }
                        else {
                              this.props.StateStoreTrackingToDefault();

                        }
                  }

            }
            else {
                  alert(items.meta.message);
                  alert("Có lỗi xảy ra, vui lòng F5 lại trang và thực hiện lại");
            }
      }
      WhenGetTrackingFail = () => {
            alert("Lỗi internet, vui lòng kiểm tra đường truyền, F5 lại trang và thực hiện lại");

      }
      searchTracking = () => {
            let numberPerTrack = 40;

            let listOrderGet = [...this.state.listOrder];
            localStorage.setItem("listNameForTracking", JSON.stringify(_.chunk(listOrderGet, numberPerTrack)));
            listOrderGet = listOrderGet.map(param => { return _.replace(param, '#', '%23') });
            listOrderGet = listOrderGet.map(param => { return _.replace(param, ' ', '%20') });
            listOrderGet = _.chunk(listOrderGet, numberPerTrack);
            let listName = listOrderGet[listOrderGet.length - 1];
            listName = [...listName].join(",")
            let endPoint = "?orders=" + listName + "&limit=500";
            this.props.getTrackingMore(endPoint);
            localStorage.setItem("listNameTrackingSuccess", JSON.stringify([]));// lưu những item success vào localstorage

            // console.log(endPoint);

      }
      render() {
            console.log(this.props.itemsPayload);
            // console.log(this.state);
            // console.log(JSON.parse(localStorage.listNameTrackingSuccess));
            let renderTracking = "";
            if (JSON.parse(localStorage.listNameTrackingSuccess).length !== 0)
                  renderTracking = <RenderTrackingProperties />;


            // console.log(listOrder);

            return (<React.Fragment>
                  <div className="relative">
                        <button type="button" className="btn btn-info " onClick={this.searchTracking}>Search Tracking</button>
                        {renderTracking}
                  </div>

            </React.Fragment>
            );
      }
}

export default TrackingSearch;






























// import React, { Component } from 'react';

// class Tracking extends Component {
//       constructor(props, context) {
//             super(props, context);
//             this.state = {
//                   listOrder: []
//             }
//       }

//       componentWillMount() {
//             this.CWM_getOrderToday();
//       }
//       CWM_getOrderToday = () => {
//             let day = Date.parse(new Date().toDateString());
//             let user = JSON.parse(localStorage.UserProperties);
//             if (user[1] === "all") {
//                   this.props.getOrderByDay("?namePartner=allPartner" & "dayNumber=" + day);
//             }
//             else {
//                   this.props.getOrderByDay("?namePartner=" + user[1] + "&dayNumber=" + day);
//             }

//       }





//       componentDidUpdate() {
//             this.CDU_checkRequest();
//       }

//       CDU_checkRequest = () => {
//             if (this.props.itemsPayload.type === "GET_ORDER_BY_DAY_SUCSESS") { this.getOrderByDaySucsess() }
//             else if (this.props.itemsPayload.type === "GET_RFAILURE") { this.getRefailure() }
//       }
//       getOrderByDaySucsess = () => {
//             if (this.props.itemsPayload.listItem.length !== 0) {
//                   this.setState({ listOrder: this.props.itemsPayload.listItem[0].Sumorder });
//                   this.props.StateStoreTrackingToDefault();
//             }
//             console.log(this.props.itemsPayload);

//       }

//       render() {
//             console.log(this.state.listOrder);

//             return (
//                   <div>
//                         tracking
//                   </div>
//             );
//       }
// }

// export default Tracking;