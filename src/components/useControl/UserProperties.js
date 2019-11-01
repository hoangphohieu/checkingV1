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
                  id: id,
                  routerUse: this.state.RouterUse,
                  partnerTypeUse: this.state.partnerTypeUse,
                  phoneUse: this.refs["phoneUse"].value,
                  noteUse: this.refs["noteUse"].value,
                  codeUse: this.refs["code"].value,
                  passWordUse: this.refs["passWordUse"].value,
                  
            };
            console.log(obj);
            if (this.state.RouterUse === null) {
                  alert("Không thành Công, hãy chọn chức năng !");
            }
            else if (this.state.partnerTypeUse.length === 0) {
                  alert("Không thành Công, hãy chọn quyền !");

            }
            else {
                  obj.codeUse = obj.codeUse.split(",").filter(param => param !== "");
                  this.props.changeUserProperties(obj);
            }



      }
      deleteItemChecking = (param) => {
            this.handleDeleteClose();
            this.props.deleteUser(param);
      }
      setRouterUse = (e) => {
            this.setState({ RouterUse: e.target.value })
      }

      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      render() {
            let item = this.props.userProperties;
            let listPartner = { ... this.props.listPartner };
            listPartner = _.toPairs(listPartner).filter(param => { return param[0] !== "id" }).map(param => param[1]);

            const options = listPartner.map(param => { return { label: param[0] + ": " + param[1], value: param } })


            console.log(this.state.partnerTypeUse);
            console.log(this.state.RouterUse);

            return (
                  <React.Fragment>
                        <div className="row border-item-checking">
                              <div className="col-12">
                                    <p className="checking-item-altribute"><span className="checking-item-title">User:</span><span>{item.nameUse.substr(4)}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">PassWord:</span><span>{item.passWordUse}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Chứ Năng:</span><span>{(item.routerUse === "R") ? "Đọc" : "Đọc, thêm, sửa, xóa"}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Đối tượng:</span><span>{(item.partnerTypeUse !== "all") ? item.partnerTypeUse.join(",") : "all"}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">SDT:</span><span>{item.phoneUse}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Chú thích:</span><span>{item.noteUse}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Code:</span><span>{item.codeUse.join(",")}</span></p>

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
                                                <input type="text" className="form-control" placeholder="" ref="passWordUse" defaultValue={item.passWordUse} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">SDT:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="phoneUse" defaultValue={item.phoneUse} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Chú thích:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="noteUse" defaultValue={item.noteUse} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Code:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="code" defaultValue={item.codeUse.join(",")} />
                                          </p>

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
                        </div>

                  </React.Fragment>
            );
      }
}

export default UserProperties;


