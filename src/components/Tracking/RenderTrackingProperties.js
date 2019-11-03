import React, { Component } from 'react';

class RenderTrackingProperties extends Component {
      render() {
            // console.log(JSON.parse(localStorage.listNameTrackingSuccess));
            let trackings = JSON.parse(localStorage.listNameTrackingSuccess)[0];

            console.log(trackings);


            return (
                  <div>
                        haha
                        <div className="container-fluid bg-toWhite">
                              <div className="row">
                                    <div className="col-2">
                                          Tracking No
                                     </div>
                                    <div className="col-2">
                                          Order No
                                    </div>
                                    <div className="col-6">
                                          Parcel Status
                                     </div>
                                    <div className="col-2">
                                          Transit Time
                                     </div>
                              </div>

                              {/* properties */}
                              <div className="row">
                                    <div className="col-2">
                                          {trackings.tracking_number}

                                    </div>
                                    <div className="col-2">
                                          {trackings.order_id}
                                    </div>
                                    <div className="col-6">
                                          <span class={"border-" + trackings.status}>{trackings.status}</span>
                                          <span >{trackings.lastEvent}</span>
                                    </div>
                                    <div className="col-2">
                                          {trackings.itemTimeLength}

                                    </div>
                              </div>
                              {/* properties */}

                              {/* more */}
                              <div className="row">
                                    <div className="col-12">
                                          <h5>Other Information</h5>
                                          <span class="more-tracking-info">Courier:{trackings.carrier_code}</span>
                                          <span class="more-tracking-info">Goods Title:{trackings.title}</span>
                                          <span class="more-tracking-info">Customer Name:{trackings.customer_name}</span>
                                          <h5>Destination Country - {trackings.destination_country}:</h5>
                                          {trackings.destination_info.trackinfo.map(param => <p class="more-tracking-info">{param.Date},{param.StatusDescription},{param.Details}</p>)}
                                          <h5>Origin Country - {trackings.original_country}:</h5>
                                          {trackings.origin_info.trackinfo.map(param => <p class="more-tracking-info">{param.Date},{param.StatusDescription},{param.Details}</p>)}



                                    </div>

                              </div>
                              {/* more */}
                        </div>
                  </div>
            );
      }
}

export default RenderTrackingProperties;