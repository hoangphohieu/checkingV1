import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';

class UserProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false
            }
      }

      saveChange = (id) => {
            this.setState({ change: false });
            console.log(this.refs["routerUse"].value);



      }
      deleteItemChecking = (param) => {
            this.handleDeleteClose();
      }


      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      render() {
            let item = this.props.userProperties;
            console.log(item);

            return (
                  <React.Fragment>
                        <div className="row border-item-checking">
                              <div className="col-12">
                                    <p className="checking-item-altribute"><span className="checking-item-title">User:</span><span>{item.nameUse}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">PassWord:</span><span>{item.passWordUse}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Chứ Năng:</span><span>{(item.routerUse === "R") ? "Đọc" : "Đọc và Sửa"}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">Đối tượng:</span><span>{item.partnerTypeUse.join(",")}</span></p>
                                    <p className="checking-item-altribute"><span className="checking-item-title">SDT:</span><span>{item.phoneUse}</span></p>

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
                                                <span className="checking-item-title">Chức Năng:</span>
                                                <input type="text" className="form-control" placeholder="" ref="routerUse" defaultValue={item.routerUse} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">Đối tượng:</span>
                                                <input type="text" className="form-control" placeholder="" ref="partnerTypeUse" defaultValue={item.partnerTypeUse} />
                                          </p>
                                          <p className="checking-item-altribute">
                                                <span className="checking-item-title">SDT:</span> <br />
                                                <input type="text" className="form-control" placeholder="" ref="phoneUse" defaultValue={item.phoneUse} />
                                          </p>




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


