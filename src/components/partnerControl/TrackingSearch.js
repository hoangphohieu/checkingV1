import React, { Component } from 'react';
import _ from 'lodash';

class TrackingSearch extends Component {
    searchTracking(param) {
        param = [...param].join(",");
        let endPoint = "?orders=" + param+"&limit=500";

        this.props.getTracking(endPoint);
        // console.log(endPoint);

    }
    render() {
        console.log(this.props.listItems);

        let numberPerTrack = 150;
        let listOrder = [];
        this.props.items.listItem.forEach(param => { listOrder.push(param.Sumorder) });
        listOrder = _.chunk(_.flattenDeep(listOrder).map(param => { return _.replace(param, '#', '%23') }), numberPerTrack);
        let listButton = listOrder.map((param, id) => {
            return <button type="button" key={id} className="btn btn-info" onClick={() => this.searchTracking(param)}>Search {id + 1}</button>
        })
        console.log(listOrder);

        return (
            <div>
                {listButton}

            </div>
        );
    }
}

export default TrackingSearch;