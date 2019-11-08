import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';

import MultiSelect from "@khanacademy/react-multi-select";
class UserProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false,
                  partner: this.props.userProperties.item_post.partner,
                  router: this.props.userProperties.item_post.router,
                  show: false

            }
      }

      saveChange = (id) => {
            let item = this.props.userProperties.item_post;
            console.log(item);

            this.setState({ change: false });
            let obj = {
                  id: id,
                  router: this.state.router,
                  partner: this.state.partner,
                  phone: this.refs["phone"].value,
                  note: this.refs["note"].value,
                  code: this.refs["code"].value,
                  pass: this.refs["pass"].value,
                  paid: item.paid


            };
            console.log(obj);
            if (this.state.router === null) {
                  alert("Không thành Công, hãy chọn chức năng !");
            }
            else if (this.state.partner === null) {
                  alert("Không thành Công, hãy chọn quyền !");

            }

            else {
                  if (this.refs["paid"].value !== "0") {
                        obj.paid = [...obj.paid, [Date.parse(new Date().toDateString()), this.refs["paid"].value]];
                  }
                  obj.code = obj.code.split(",").filter(param => param !== "");
                  obj = { ...this.props.userProperties, item_post: obj };
                  this.props.changeUserProperties(obj);
            }



      }
      deleteItemChecking = (item) => {
            this.handleDeleteClose();
            item = { ...this.props.userProperties, item_post: item };
            this.props.deleteUser(item);
      }
      setrouter = (e) => {
            this.setState({ router: e.target.value });
      }
      setPartner = (e) => {
            this.setState({ partner: e.target.value });
      }
      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      showProperties = () => {
            this.setState({ show: !this.state.show })
      }
      render() {
            let item = this.props.userProperties.item_post;
            let paid = 0;
            if (item.paid.length !== 0) item.paid.forEach(param => {
                  paid += parseInt(param[1]);
            })


            // console.log(this.state.router); 

            return (
                  <React.Fragment>

                        {/* properties */}
                        <div className="row p-2 hover-pointer one-properties-tracking align-items-center" onClick={this.showProperties}>
                              <div className="col-2 text-center">
                                    {item.name.substr(4)}
                              </div>
                              <div className="col-2 text-center">
                                    {item.sumBaseCost}
                              </div>
                              <div className="col-2 text-center">
                                    {paid}
                              </div>
                              <div className="col-2 text-center">
                                    {Math.abs(item.sumBaseCost - paid)}
                              </div>
                              <div className="col-2 text-center">
                                    {(item.sumBaseCost - paid>0)?"còn nợ":"còn dư"}
                              </div>
                              <div className="col-2 text-center">
                                    some thing !
                              </div>
                        </div>
                        {/* properties */}

                        {/* more */}
                        {(this.state.show === true) ? <div className="row mb-1">
                              <div className="col-12">
                                    <h6 className="titletracking-properties">Other Information</h6>
                                    <p className="more-tracking-info">Courie</p>
                              </div>

                              <div className="col-12">
                                    <p className="checking-item-altribute"><span className="checking-item-title">User:</span><span>{item.name.substr(4)}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Base Cost:</span><span>{item.sumBaseCost}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Sản phẩm:</span><span>{item.product.join(",")}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">PassWord:</span><span>{item.pass}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Chứ Năng:</span><span>{(item.router === "R") ? "Đọc" : "Đọc, thêm, sửa, xóa"}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Phân quyền:</span><span>{item.partner.substr(4)}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">SDT:</span><span>{item.phone}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Chú thích:</span><span>{item.note}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Code:</span><span>{item.code.join(",")}</span></p>

                              </div>


                              {/* modal */}
                              <div className="state_itemChecking">
                                    <Button className="state_itemChecking_button" variant="primary" onClick={this.handleShow}>
                                          Thay đổi
                              </Button>
                                    <Button className="state_itemChecking_button" variant="danger" onClick={this.handleDeleteShow}>
                                          Xóa
                              </Button>
                              </div>

                              <Modal show={this.state.change} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                          <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>


                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Mật khẩu:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="pass" defaultValue={item.pass} />
                                          </p>

                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">SDT:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="phone" defaultValue={item.phone} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Chú thích:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="note" defaultValue={item.note} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Code:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="code" defaultValue={item.code.join(",")} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">paid:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="paid" defaultValue={0} />
                                          </p>

                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Chức Năng:</span>
                                                <select className="browser-default custom-select" onChange={this.setrouter}>
                                                      <option selected value={item.router} className="d-none ">{(item.router === "R") ? "Chỉ Đọc" : "Đọc, thêm, sửa,xóa"}</option>
                                                      <option value="CRUD">Đọc, thêm, sửa, xóa</option>
                                                      <option value="R">Chỉ Đọc</option>
                                                </select>
                                          </p>
                                          <div className="checking-item-altribute">
                                                <span className="checking-item-title">Phân quyền:</span>
                                                <select className="browser-default custom-select" onChange={this.setPartner}>
                                                      <option selected value={item.partner} className="d-none ">{item.partner.substr(4)}</option>
                                                      <option value="userall">all</option>
                                                      <option value={item.name}>{item.name.substr(4)}</option>
                                                </select>

                                          </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                          <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                    </Button>
                                          <Button variant="primary" onClick={() => this.saveChange(item.id)}>
                                                Save Changes
                                     </Button>
                                    </Modal.Footer>
                              </Modal>




                              {/* modal */}


                              <Modal show={this.state.delete} onHide={this.handleDeleteClose}>
                                    <Modal.Header closeButton>
                                          <Modal.Title>Ấn oke để xóa</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Footer>
                                          <Button variant="primary" onClick={() => this.deleteItemChecking(item)}>
                                                OK
                                          </Button>
                                          <Button variant="secondary" onClick={this.handleDeleteClose}>
                                                Close
                                          </Button>
                                    </Modal.Footer>
                              </Modal>
                        </div> : ""}
                        {/* more */}




                  </React.Fragment>
            );
      }
}

export default UserProperties;


