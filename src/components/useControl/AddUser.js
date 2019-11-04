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
                  partner: null,
                  router: "R",
                  name: ""

            }
      }

      saveChange = (id) => {
            this.setState({ change: false });
            let obj = {
                  id: "user" + this.state.name,
                  router: this.state.router,
                  partner:"User"+  this.state.partner,
                  phone: this.refs["phone"].value.trim(),
                  name: "user" + this.state.name,
                  note: this.refs["note"].value,
                  pass: this.refs["pass"].value.trim(),
                  datatype: "user",
                  product:[],
                  code: this.refs["code"].value.trim(),
     
            };


            console.log(obj);
            if (this.state.router === null) {
                  alert("Không thành Công, hãy chọn chức năng !");
            }

            else if (this.state.name === "") {
                  alert("Không thành Công, hãy đặt tên đăng nhập !");
            }

            else if (this.refs["pass"].value === "") {
                  alert("Không thành Công, hãy đặt mật khẩu !");
            }
            else if (this.refs["code"].value === "") {
                  alert("Không thành Công, hãy đặt code !");
            }
            else {


                  obj.code = obj.code.split(",").filter(param => param !== "");
                  console.log(obj.code);

                  this.props.createUser(obj);

            }



      }
      deleteItemChecking = (param) => {
            this.handleDeleteClose();
      }
      setrouter = (e) => {
            this.setState({ router: e.target.value })
      }
      setpartner = (e) => {
            this.setState({ partner: e.target.value })

      }
      setname = (e) => {
            this.setState({ name: e.target.value.trim() })
      }
      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      render() {
            let listPartner = { ... this.props.listPartner };
            listPartner = _.toPairs(listPartner).filter(param => { return param[0] !== "id" }).map(param => param[1]);

            const options = listPartner.map(param => { return { label: param[0] + ": " + param[1], value: param } })


            console.log(this.props.listPartner);

            return (
                  <React.Fragment>
                        <div className="row border-item-checking">


                              {/* modal */}
                              <div className="state_itemChecking">
                                    <Button className="state_itemChecking_button" variant="warning" onClick={this.handleShow}>
                                          Thêm
                              </Button>

                              </div>

                              <Modal show={this.state.change} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                          <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Tên:</span> <br />
                                                <input type="text" className="form-control" placeholder="" onChange={this.setname} placeholder="Tên đăng nhập" value={this.state.name} />
                                          </p>

                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Mật khẩu:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="pass" placeholder="Mật khẩu là..." defaultValue="" />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">SDT:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="phone" defaultValue="000" />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Chú thích:</span> <br />
                                                <input type="text" className="form-control" placeholder="Chú thích" ref="note" />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Code: (cách nhau bởi dấy phẩy ,)</span> <br />
                                                <input type="text" className="form-control" placeholder="Chú thích" ref="code" />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Chức Năng:</span>
                                                <select className="browser-default custom-select" onChange={this.setrouter}>
                                                      <option selected value="R" className="d-none ">Chỉ đọc</option>
                                                      <option value="CRUD">Đọc, thêm, sửa, xóa</option>
                                                      <option value="R">Chỉ Đọc</option>
                                                </select>
                                          </p>
                                          <div className="checking-item-altribute">
                                                <span className="checking-item-title">Phân Quyền:</span>
                                                <select className="browser-default custom-select" onChange={this.setpartner}>
                                                      <option selected value={this.state.name} className="d-none ">{this.state.name}</option>
                                                      <option value="userall">all</option>
                                                      <option value={this.state.name}>{this.state.name}</option>
                                                </select>


                                          </div>




                                    </Modal.Body>
                                    <Modal.Footer>
                                          <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                    </Button>
                                          <Button variant="primary" onClick={this.saveChange}>
                                                Tạo tài khoản
                                     </Button>
                                    </Modal.Footer>
                              </Modal>




                              {/* modal */}


                              <Modal show={this.state.delete} onHide={this.handleDeleteClose}>
                                    <Modal.Header closeButton>
                                          <Modal.Title>Ấn oke để xóa</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Footer>
                                          <Button variant="primary" onClick={this.deleteItemChecking}>
                                                OK
                                          </Button>
                                          <Button variant="secondary" onClick={this.handleDeleteClose}>
                                                Close
                                          </Button>
                                    </Modal.Footer>
                              </Modal>
                        </div>

                  </React.Fragment>
            );
      }
}

export default UserProperties;


