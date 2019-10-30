import React, { Component } from 'react';
import _ from "lodash";
import { Dropdown } from 'react-bootstrap';
class RenderTrackingProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  listItemsRender: [],
                  itemSelect: null,
                  valueItemRequest: null,
                  searchBy: "byTracking"
            }
      }
      componentDidUpdate() {
            this.CDU_checkRequest();
      }
      renderStateItems = (param) => {
            this.setState({ listItemsRender: param });
      }
      CDU_checkRequest = () => {
            if (this.props.itemsPayload.type === "GET_ONE_TRACKING_SUCSESS") { this.WhenGetOneTrackingSuccess() }
            else if (this.props.itemsPayload.type === "GET_ONE_TRACKING_RFAILURE") { this.WhenGetOneTrackingFail() }
      }
      WhenGetOneTrackingSuccess = () => {
            let items = this.props.itemsPayload.listItem;
            console.log(items);

            if (items.meta.code === 200) this.setState({ valueItemRequest: items.data.items[0] })
            else {
                  alert(items.meta.message);
                  alert("Có lỗi xảy ra, vui lòng thực hiện lại");
            }
            this.props.setStateStoreToDefault();

      }
      WhenGetOneTrackingFail = () => {
            alert("Lỗi internet, vui lòng kiểm tra đường truyền, F5 lại trang và thực hiện lại");
      }

      setStateItemSelect = (param, searchBy) => {
            this.setState({ itemSelect: param, searchBy: searchBy })
      }
      setValueSearchTracking = (e) => {
            this.setState({ itemSelect: e.target.value })
      }
      searchOneTracking = () => {
            let _this = this;
            let endPoint = ((this.state.searchBy === "byTracking") ? ("?numbers=" + this.state.itemSelect) : ("?orders=" + _.replace(this.state.itemSelect, '#', '%23')));
            if (this.state.itemSelect !== null)
                  setTimeout(function () {
                        _this.props.SearchOneTracking(endPoint);
                  }, 1000);
      }
      setStateSearchBy = (param) => {
            this.setState({ searchBy: param })
      }
      render() {
            console.log(this.props.itemsPayload);

            let trackingFail = JSON.parse(this.props.trackingFail);
            let trackingSuccess = JSON.parse(this.props.trackingSuccess);
            let pending = [], notfound = [], transit = [], pickup = [], delivered = [], undelivered = [], exception = [], expired = [];
            if (trackingSuccess !== null) {
                  transit = trackingSuccess.filter(param => param[2] === "transit");
                  delivered = trackingSuccess.filter(param => param[2] === "delivered");
                  pickup = trackingSuccess.filter(param => param[2] === "pickup"); // Out For Delivery
                  exception = trackingSuccess.filter(param => param[2] === "exception");
                  expired = trackingSuccess.filter(param => param[2] === "expired");
                  notfound = trackingSuccess.filter(param => param[2] === "notfound");
                  undelivered = trackingSuccess.filter(param => param[2] === "undelivered"); //Failed Attempt
                  pending = trackingSuccess.filter(param => param[2] === "pending");
            }
            let renderStateItems = null;
            if (this.state.listItemsRender.length !== 0) {
                  renderStateItems = <table className="table ">
                        <thead>
                              <tr className="nav-table-item">
                                    <th scope="col">STT</th>
                                    <th scope="col">Order</th>
                                    <th scope="col">Tracking Number</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    this.state.listItemsRender.map((param, id) => {
                                          return <tr key={id} className={(id % 2 === 0) ? ("border-" + param[2]) : ""}>
                                                <th scope="row">{id + 1}</th>
                                                <td className="cursor-item-tracking" onClick={() => this.setStateItemSelect(param[0], "byOrder")}> {param[0]}</td>
                                                <td className="cursor-item-tracking" onClick={() => this.setStateItemSelect(param[1], "byTracking")}>{param[1]}</td>
                                          </tr>
                                    })
                              }


                        </tbody>
                  </table>
            }


            let renderTrackingFail = null;
            if (trackingFail !== null) {
                  renderTrackingFail = trackingFail.map((param, id) => <div className=" btn btn-danger mr-2 mt-2" key={id}>{param}</div>)
            }
            let item;
            if (this.state.valueItemRequest !== null) {

                  item = { ...this.state.valueItemRequest };
                  item = _.omit(item, ['id', 'track_update', 'created_at', 'updated_at', 'order_create_time', 'archived', 'service_code', 'status_info', 'substatus']);

                  console.log(item);

            }
            console.log(transit);

            return (
                  <div className="container-fluid">
                        {/* trackingFail */}
                        <div className="container">
                              <div className="row">
                                    <div className="col-12">
                                          {(renderTrackingFail !== null) ? <div>
                                                <p className="title-render-tracking title-render-tracking-fail">Order Fail {trackingFail.length}</p>
                                                <p className="title-render-tracking-fail-more">
                                                      Là những Order chưa <span className="bold">update Tracking </span>
                                                      hoặc chứa ký tự đặc biệt không phải là  <span className="bold">#</span> hoặc <span className="bold">-</span>  Ví dụ như /,%,&, khoảng trắng,...</p>
                                          </div> : ""

                                          }
                                    </div>
                              </div>
                              <div className="row">
                                    {renderTrackingFail}
                              </div>
                        </div>

                        {/* trackingSuccess */}
                        <div className="container mt-5">
                              {/* khai báo trạng thái item */}
                              <div className="row">
                                    <div className="col-12">
                                          {(renderTrackingFail !== null) ?
                                                <p className="title-render-tracking title-render-tracking-success">Order Success {trackingSuccess.length}</p> : ""
                                          }
                                          {(transit.length !== 0) ? <div className="mb-1 text-left"><span className="border-transit hover-cursor" onClick={() => this.renderStateItems(transit)}>Transit: {transit.length}</span>      đang trên đường đến địa chỉ của người nhận.</div> : ""}
                                          {(delivered.length !== 0) ? <div className="mb-1 text-left"><span className="border-delivered hover-cursor" onClick={() => this.renderStateItems(delivered)}>Delivered: {delivered.length}</span>      đã được gửi thành công.</div> : ""}
                                          {(pickup.length !== 0) ? <div className="mb-1 text-left"><span className="border-pickup hover-cursor" onClick={() => this.renderStateItems(pickup)}>Out For Delivery: {pickup.length}</span>     chuẩn bị giao hàng.</div> : ""}
                                          {(exception.length !== 0) ? <div className="mb-1 text-left"><span className="border-exception hover-cursor" onClick={() => this.renderStateItems(exception)}>Exception: {exception.length}</span>      người nhận từ trối do hỏng hóc, hàng hoàn trả.</div> : ""}
                                          {(expired.length !== 0) ? <div className="mb-1 text-left"><span className="border- hover-cursor" onClick={() => this.renderStateItems(expired)}>Expired: {expired.length}</span>      hết hạn, hàng đã không được giao trong 30 ngày.</div> : ""}
                                          {(notfound.length !== 0) ? <div className="mb-1 text-left"><span className="border-notfound hover-cursor" onClick={() => this.renderStateItems(notfound)}>Not Found: {notfound.length}</span>  chưa có thông tin theo dõi nào.</div> : ""}
                                          {(undelivered.length !== 0) ? <div className="mb-1 text-left"><span className="border-undelivered hover-cursor" onClick={() => this.renderStateItems(undelivered)}>Failed Attempt: {undelivered.length}</span>      nỗ lực giao hàng không thành công.</div> : ""}
                                          {(pending.length !== 0) ? <div className="mb-1 text-left"><span className="border-pending hover-cursor" onClick={() => this.renderStateItems(pending)}>Pending: {pending.length}</span>      các gói mới được thêm đang chờ xử lý.</div> : ""}
                                    </div>
                              </div>

                              {/* hiển thị list item khi click chuột */}
                              <div className="row mt-5 mb-5">
                                    <div className="col-5">
                                          {renderStateItems}
                                    </div>
                                    <div className="col-7">
                                          <div className="input-group mb-3">
                                                <input className="text" class="form-control" placeholder="Tìm kiếm Tracking bằng  Tracking Number" aria-describedby="button-addon2" value={this.state.itemSelect} onChange={this.setValueSearchTracking} />


                                                <Dropdown>
                                                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            {this.state.searchBy}
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => this.setStateSearchBy("byOrder")}>By Order</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.setStateSearchBy("byTracking")}>By Tracking</Dropdown.Item>
                                                      </Dropdown.Menu>
                                                </Dropdown>

                                                <div className="input-group-append">
                                                      <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.searchOneTracking}>Tìm Kiếm</button>
                                                </div>
                                          </div>

                                          {(this.state.valueItemRequest !== null) ?
                                                <div>
                                                      <p className="value-soo"><span className="title-soo">Trạng thái: </span>{item.status}</p>
                                                      <p className="value-soo"><span className="title-soo">Mã Order: </span>{item.order_id}</p>
                                                      <p className="value-soo"><span className="title-soo">Mã Tracking: </span>{item.tracking_number}</p>
                                                      <p className="value-soo"><span className="title-soo">Tên khách hàng: </span>{item.customer_name}</p>
                                                      <p className="value-soo"><span className="title-soo">Email khách hàng: </span>{item.customer_email}</p>
                                                      <p className="value-soo"><span className="title-soo">Ghi chú: </span>{item.comment}</p>
                                                      <p className="value-soo"><span className="title-soo">Tên sản phẩm: </span>{item.title}</p>
                                                      <p className="value-soo"><span className="title-soo">Đơn vị vận chuyển: </span>{item.carrier_code}</p>
                                                      <p className="value-soo"><span className="title-soo">Quốc gia bắt đầu: </span>{item.original_country}</p>
                                                      <p className="value-soo"><span className="title-soo">Quốc gia kết thúc: </span>{item.destination_country}</p>
                                                      <p className="value-soo"><span className="title-soo">Thời gian vận chuyển: </span>{item.itemTimeLength} ngày</p>
                                                      <p className="value-soo"><span className="title-soo">Thông tin cuối cùng: </span>{item.lastEvent}</p>
                                                      <p className="value-soo"><span className="title-soo">Thời gian cập nhật cuối: </span>{item.lastUpdateTime}</p>
                                                      <p className="value-soo-info">Thông tin nước bắt đầu</p>
                                                      <p className="value-soo"><span className="title-soo">Thời gian tiếp nhận: </span>{item.origin_info.ItemReceived}</p>
                                                      <p className="value-soo"><span className="title-soo">ItemDispatched: </span>{item.origin_info.ItemDispatched}</p>
                                                      <p className="value-soo"><span className="title-soo">DepartfromAirport: </span>{item.origin_info.DepartfromAirport}</p>
                                                      <p className="value-soo"><span className="title-soo">ArrivalfromAbroad: </span>{item.origin_info.ArrivalfromAbroad}</p>
                                                      <p className="value-soo"><span className="title-soo">CustomsClearance: </span>{item.origin_info.CustomsClearance}</p>
                                                      <p className="value-soo"><span className="title-soo">DestinationArrived: </span>{item.origin_info.DestinationArrived}</p>
                                                      <p className="value-soo"><span className="title-soo">Web thông tin: </span>{item.origin_info.weblink}</p>
                                                      <p className="value-soo"><span className="title-soo">SDT liên lạc bên vận chuyển: </span>{item.origin_info.phone}</p>
                                                      <p className="value-soo"><span className="title-soo">Mã đơn vị vận chuyển: </span>{item.origin_info.carrier_code}</p>

                                                      <table className="table table-striped">
                                                            <thead>
                                                                  <tr>
                                                                        <th scope="col">STT</th>
                                                                        <th scope="col">Ngày</th>
                                                                        <th scope="col">Thông tin</th>
                                                                        <th scope="col">Chú thích</th>
                                                                        <th scope="col">Trạng thái</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {(item.origin_info.trackinfo !== null) ? item.origin_info.trackinfo.map((param, id) => {
                                                                        return <tr key={id}>
                                                                              <th scope="row">{id + 1}</th>
                                                                              <td>{param.Date}</td>
                                                                              <td>{param.StatusDescription}</td>
                                                                              <td>{param.Details}</td>
                                                                              <td>{param.checkpoint_status}</td>
                                                                        </tr>
                                                                  }) : ""
                                                                  }
                                                            </tbody>
                                                      </table>



                                                      <p className="value-soo-info">Thông tin nước kết thúc</p>
                                                      <p className="value-soo"><span className="title-soo">Thời gian tiếp nhận: </span>{item.destination_info.ItemReceived}</p>
                                                      <p className="value-soo"><span className="title-soo">ItemDispatched: </span>{item.destination_info.ItemDispatched}</p>
                                                      <p className="value-soo"><span className="title-soo">DepartfromAirport: </span>{item.destination_info.DepartfromAirport}</p>
                                                      <p className="value-soo"><span className="title-soo">ArrivalfromAbroad: </span>{item.destination_info.ArrivalfromAbroad}</p>
                                                      <p className="value-soo"><span className="title-soo">CustomsClearance: </span>{item.destination_info.CustomsClearance}</p>
                                                      <p className="value-soo"><span className="title-soo">DestinationArrived: </span>{item.destination_info.DestinationArrived}</p>
                                                      <p className="value-soo"><span className="title-soo">Web thông tin: </span>{item.destination_info.weblink}</p>
                                                      <p className="value-soo"><span className="title-soo">SDT liên lạc bên vận chuyển: </span>{item.destination_info.phone}</p>
                                                      <p className="value-soo"><span className="title-soo">Mã đơn vị vận chuyển: </span>{item.destination_info.carrier_code}</p>

                                                      <table className="table table-striped">
                                                            <thead>
                                                                  <tr>
                                                                        <th scope="col">STT</th>
                                                                        <th scope="col">Ngày</th>
                                                                        <th scope="col">Thông tin</th>
                                                                        <th scope="col">Chú thích</th>
                                                                        <th scope="col">Trạng thái</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {(item.destination_info.trackinfo !== null) ? item.destination_info.trackinfo.map((param, id) => {
                                                                        return <tr key={id}>
                                                                              <th scope="row">{id + 1}</th>
                                                                              <td>{param.Date}</td>
                                                                              <td>{param.StatusDescription}</td>
                                                                              <td>{param.Details}</td>
                                                                              <td>{param.checkpoint_status}</td>
                                                                        </tr>
                                                                  }) : ""
                                                                  }
                                                            </tbody>
                                                      </table>

                                                </div>
                                                :
                                                ""}
                                    </div>
                              </div>
                        </div>








                  </div >
            );
      }
}

export default RenderTrackingProperties;