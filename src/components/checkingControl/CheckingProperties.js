import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';

class CheckingProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false
            }
      }

      changePrintStatus = (param) => {
            this.props.changePrintStatus(param)
      }
      saveChange = (param, id) => {
            this.setState({ change: false });
            console.log(param);

            let arrObj = {};
            for (let i = 0; i <= param.length - 1; i++) {
                  if (this.refs[param[i][0]] !== undefined && this.refs[param[i][0]].value !== "") {
                        arrObj[param[i][0]] = this.refs[param[i][0]].value;
                  }
            }
            arrObj = { value: arrObj, id: id }
            this.props.patchItemCheckingProperties(arrObj);
            // console.log(arrObj);


      }
      deleteItemChecking = (param) => {
            this.handleDeleteClose();
            this.props.deleteItemChecking({ id: param })
      }


      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      render() {
            let item = this.props.proppertiesitem;
      console.log(item);
      
            item.day=(new Date(item.day)).toLocaleDateString();
            item = _.toPairs(item); // props.proppertiesitem là object => array
            let printStatus = item.filter(param => { return param[0] === "printStatus" });
            let idStatus = item.filter(param => { return param[0] === "id" });

            // console.log(Math.random());
            // console.log(printStatus);

            return (
                  <React.Fragment>
                        <div className="row border-item-checking">
                              <div className="col-12">
                                    <button onClick={() => this.changePrintStatus({ printStatus: !printStatus[0][1], idStatus: idStatus[0][1] })} type="button" className={"btn btn-" + ((printStatus[0][1] === true) ? "primary" : "danger") + " checking-right-state"}>
                                          {(printStatus[0][1] === true) ? "Done !" : "Print ..."}
                                    </button>
                                    {
                                          item.map((param, id) => {
                                                if (param[0] !== "id" && param[0] !== "printStatus")
                                                      return <p className="checking-item-altribute" key={id}><span className="checking-item-title">{param[0]}:</span><span>{param[1]}</span></p>
                                          })
                                    }
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
                                          {
                                                item.map((param, id) => {
                                                      if (param[0] !== "id" && param[0] !== "printStatus")
                                                            return <p className="checking-item-altribute" key={id}>
                                                                  <span className="checking-item-title">{param[0]}:</span>
                                                                  <input type="text" className="form-control" placeholder="" ref={param[0]} defaultValue={param[1]} />
                                                            </p>

                                                })
                                          }
                                    </Modal.Body>
                                    <Modal.Footer>
                                          <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                    </Button>
                                          <Button variant="primary" onClick={() => this.saveChange(item, idStatus[0][1])}>
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
                                          <Button variant="primary" onClick={() => this.deleteItemChecking(idStatus[0][1])}>
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

export default CheckingProperties;