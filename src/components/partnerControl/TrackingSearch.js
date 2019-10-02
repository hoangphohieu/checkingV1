import React, { Component } from 'react';
import _ from 'lodash';

class TrackingSearch extends Component {

    componentDidMount() {
        if (JSON.parse(localStorage.getItem("listNameForTracking")) === null) {
            localStorage.setItem("listNameForTracking", JSON.stringify([]));
        }
        else { localStorage.setItem("listNameForTracking", JSON.stringify([])); }

        if (JSON.parse(localStorage.getItem("listNameForTrackingFail")) === null) {
            localStorage.setItem("listNameForTrackingFail", JSON.stringify([]));
        }
        else { localStorage.setItem("listNameForTrackingFail", JSON.stringify([])); }
    }

    componentDidUpdate() {
        this.CDU_checkRequest();
    }
    CDU_checkRequest = () => {

        if (this.props.itemsPayload.type === "GET_TRACKING_SUCSESS") { this.WhenGetTrackingSuccess() }
        else if (this.props.itemsPayload.type === "GET_TRACKING_RFAILURE") { this.WhenGetTrackingFail() }


    }
    WhenGetTrackingSuccess = () => {
        console.log("haha");
        let _this = this;
        let items = this.props.itemsPayload.listItem;
        if (items.meta.code === 200) {
            let listNameForTracking = JSON.parse(localStorage.listNameForTracking);
            if (listNameForTracking.length > 0) {
                items = [...items.data.items];
                let listTrackingSuccess = items.map(param => param.order_id)
                let listTrackingFail = _.difference(listNameForTracking[listNameForTracking.length - 1], listTrackingSuccess);
                let listNameForTrackingFail = JSON.parse(localStorage.listNameForTrackingFail);
                listTrackingFail.forEach(param => { listNameForTrackingFail.push(param) })
                localStorage.setItem("listNameForTrackingFail", JSON.stringify(listNameForTrackingFail));
                listNameForTracking.pop();
                localStorage.setItem("listNameForTracking", JSON.stringify(listNameForTracking));
                if (listNameForTracking.length > 0) {
                    let listName = listNameForTracking[listNameForTracking.length - 1];
                    listName = listName.map(param => { return _.replace(param, '#', '%23') });
                    listName = listName.map(param => { return _.replace(param, ' ', '%20') });
                    listName = [...listName].join(",");
                    let endPoint = "?orders=" + listName + "&limit=500";
                    console.log(endPoint);
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
        console.log(endPoint);

    }
    render() {
        console.log(this.props.itemsPayload);




        // console.log(listOrder);

        return (
            <div>
                <button type="button" className="btn btn-info" onClick={this.searchTracking}>Search</button>
            </div>
        );
    }
}

export default TrackingSearch;