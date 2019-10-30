import React, { Component } from 'react';
import _ from 'lodash';
import RenderTrackingProperties from './RenderTrackingProperties';

class TrackingSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            trackingFail: null,
            trackingSuccess: null,
            listStatus: null
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

    componentDidUpdate() {
        this.CDU_checkRequest();

        if (localStorage.listNameForTracking === "[]" && (localStorage.listNameForTrackingFail !== "[]" || localStorage.listNameTrackingSuccess !== "[]"))
            this.CDU_checkRequestDone();

    }
    CDU_checkRequest = () => {

        if (this.props.itemsPayload.type === "GET_TRACKING_SUCSESS") { this.WhenGetTrackingSuccess() }
        else if (this.props.itemsPayload.type === "GET_TRACKING_RFAILURE") { this.WhenGetTrackingFail() }

    }
    CDU_checkRequestDone = () => {
        let trackingFail = (localStorage.listNameForTrackingFail === "[]") ? null : localStorage.listNameForTrackingFail;
        let trackingSuccess = (localStorage.listNameTrackingSuccess === "[]") ? null : localStorage.listNameTrackingSuccess;
        let listStatus;
        if (trackingSuccess !== "[]") {
            listStatus = JSON.parse(trackingSuccess).map(param => param[2]);
            listStatus = JSON.stringify(_.uniq(listStatus));
        }

        localStorage.listNameForTrackingFail = "[]";
        localStorage.listNameTrackingSuccess = "[]";
        this.setState({ trackingFail, trackingSuccess, listStatus });
        this.props.setStateStoreToDefault();



    }

    WhenGetTrackingSuccess = () => {
        // console.log("haha");
        let _this = this;
        let items = this.props.itemsPayload.listItem;
        if (items.meta.code === 200) {
            let listNameForTracking = JSON.parse(localStorage.listNameForTracking);
            let listNameTrackingSuccess = JSON.parse(localStorage.listNameTrackingSuccess);

            if (listNameForTracking.length > 0) {
                items = [...items.data.items];
                let ordersTrackingSuccess = items.map(param => param.order_id);
                let listTrackingFail = _.difference(listNameForTracking[listNameForTracking.length - 1], ordersTrackingSuccess);
                let listNameForTrackingFail = JSON.parse(localStorage.listNameForTrackingFail);
                listTrackingFail.forEach(param => { listNameForTrackingFail.push(param) })
                localStorage.setItem("listNameForTrackingFail", JSON.stringify(listNameForTrackingFail));// lưu những item fail vào localstorage

                items.forEach(param => { listNameTrackingSuccess.push([param.order_id, param.tracking_number, param.status]) });
                localStorage.setItem("listNameTrackingSuccess", JSON.stringify(listNameTrackingSuccess));// lưu những item success vào localstorage

                listNameForTracking.pop();
                localStorage.setItem("listNameForTracking", JSON.stringify(listNameForTracking));
                if (listNameForTracking.length > 0) {
                    let listName = listNameForTracking[listNameForTracking.length - 1];
                    listName = listName.map(param => { return _.replace(param, '#', '%23') });
                    listName = listName.map(param => { return _.replace(param, ' ', '%20') });
                    listName = [...listName].join(",");
                    let endPoint = "?orders=" + listName + "&limit=500";
                    // console.log(endPoint);
                    setTimeout(function () { _this.props.getTracking(endPoint); }, 1000);
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
        let listOrder = [];
        this.props.items.listItem.forEach(param => { listOrder.push(param.Sumorder) });
        listOrder = _.flattenDeep(listOrder);
        let listOrderGet = [...listOrder];
        localStorage.setItem("listNameForTracking", JSON.stringify(_.chunk(listOrderGet, numberPerTrack)));
        listOrderGet = listOrderGet.map(param => { return _.replace(param, '#', '%23') });
        listOrderGet = listOrderGet.map(param => { return _.replace(param, ' ', '%20') });
        listOrderGet = _.chunk(listOrderGet, numberPerTrack);
        let listName = listOrderGet[listOrderGet.length - 1];
        listName = [...listName].join(",")
        let endPoint = "?orders=" + listName + "&limit=500";
        this.props.getTracking(endPoint);
        // console.log(endPoint);

    }
    render() {
        // console.log(this.props.itemsPayload);
        // console.log(this.state);




        // console.log(listOrder);

        return (
            <div className="relative">
                <button type="button" className="btn btn-info search-tracking" onClick={this.searchTracking}>Search Tracking</button>
                <RenderTrackingProperties trackingFail={this.state.trackingFail} trackingSuccess={this.state.trackingSuccess} listStatus={this.state.listStatus} {...this.props} />
            </div>
        );
    }
}

export default TrackingSearch;