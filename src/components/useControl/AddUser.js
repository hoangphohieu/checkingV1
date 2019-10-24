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
                  partnerTypeUse: [],
                  RouterUse: null,

            }
      }

      saveChange = (id) => {
            this.setState({ change: false });
            let obj = {
                  id: this.refs["nameUse"].value.trim() + this.refs["passWordUse"].value.trim(),
                  routerUse: this.state.RouterUse,
                  partnerTypeUse: this.state.partnerTypeUse,
                  phoneUse: this.refs["phoneUse"].value,
                  nameUse: this.refs["nameUse"].value,
                  passWordUse: this.refs["passWordUse"].value,
                  dataType: "user"
            };


            console.log(obj);
            if (this.state.RouterUse === null) {
                  alert("Không thành Công, hãy chọn chức năng !");
            }
            else if (this.state.partnerTypeUse.length === 0) {
                  alert("Không thành Công, hãy chọn quyền !");
            }
            else if (this.refs["nameUse"].value === "") {
                  alert("Không thành Công, hãy đặt tên đăng nhập !");
            }

            else if (this.refs["passWordUse"].value === "") {
                  alert("Không thành Công, hãy đặt mật khẩu !");
            }
            else {
                  let arrPTU = this.state.partnerTypeUse.map(param => param.join(""));
                  let arrPTUProps = _.toPairs(this.props.listPartner).filter(param => { return param[0] !== "id" });
                  arrPTUProps = arrPTUProps.map(param => param[1].join(""));
                  let differenceArr = _.difference(arrPTUProps, arrPTU);
                  if (differenceArr.length === 0) {
                        obj.partnerTypeUse = "all";
                  }

                  this.props.createUser(obj);

            }



      }
      deleteItemChecking = (param) => {
            this.handleDeleteClose();
      }
      setRouterUse = (e) => {
            this.setState({ RouterUse: e.target.value })
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
                                                <span className="checking-item-title">Chức Năng:</span>
                                                <select className="browser-default custom-select" onChange={this.setRouterUse}>
                                                      <option selected value="NOTSELECT" className="d-none ">Chọn</option>
                                                      <option value="CRUD">Đọc, thêm, sửa, xóa</option>
                                                      <option value="R">Chỉ Đọc</option>
                                                </select>
                                          </p>
                                          <div className="checking-item-altribute">
                                                <span className="checking-item-title">Đối tượng:</span>

                                                <MultiSelect
                                                      options={options}
                                                      selected={this.state.partnerTypeUse}
                                                      onSelectedChanged={partnerTypeUse => this.setState({ partnerTypeUse })}
                                                      overrideStrings={{
                                                            selectSomeItems: "Chọn",
                                                            allItemsAreSelected: "all",
                                                            selectAll: "Tất cả !",
                                                            search: "Tìm kiếm",
                                                      }}
                                                />
                                          </div>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">SDT:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="phoneUse" defaultValue="000" />
                                          </p>

                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Tên:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="nameUse" placeholder="Tên đăng nhập" defaultValue="" />
                                          </p>

                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Mật khẩu:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="passWordUse" placeholder="Mật khẩu là..." defaultValue="" />
                                          </p>


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


