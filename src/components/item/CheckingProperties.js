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
            let item = JSON.parse(this.props.proppertiesitem);
            let valueItem = JSON.parse(this.props.proppertiesitem).item_post;
            console.log(item);

            valueItem = _.toPairs(valueItem); // props.proppertiesitem là object => array
            let printStatus = valueItem.filter(param => { return param[0] === "printStatus" });
            if (printStatus.length === 0) { printStatus = [["printStatus", false]] }

            let idStatus = valueItem.filter(param => { return param[0] === "id" });

            return (
                  <React.Fragment>
                        <div className="row">
                              <div className=" col-6">
                                    <div className="row border-card">
                                          <div className="col-4">
                                                <div className="p-1 pt-5 text-muted">
                                                      <div className="row justify-content-center">
                                                            <div className="col-8">
                                                                  <img className="card-img-top" src={"https://res.cloudinary.com/hieudz/image/upload/c_scale,q_80,w_500/v1573400959/demo%20tool/" + item.item_post.lineitemname.trim().split(" ").pop() + ".jpg"} alt="has no file" />
                                                            </div>
                                                            <div className="col-10">
                                                                  <div className="state_itemChecking">
                                                                        <button onClick={() => this.changePrintStatus({ printStatus: !printStatus[0][1], idStatus: idStatus[0][1] })} type="button"
                                                                              className={" mt-2 mb-2 btn btn-" + ((printStatus[0][1] === true) ? "primary" : "danger") + " checking-right-state"}>
                                                                              {(printStatus[0][1] === true) ? "Done !" : "Print ..."}
                                                                        </button>
                                                                        <Button className="state_itemChecking_button" variant="primary" onClick={this.handleShow}>
                                                                              Change
                                                      </Button>
                                                                        <Button className="state_itemChecking_button" variant="danger" onClick={this.handleDeleteShow}>
                                                                              Delele
                                                      </Button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="col-8">
                                                <div className="card-body">
                                                      <h5 className="card-title">{item.item_post.name}</h5>
                                                      {
                                                            valueItem.map((param, id) => {
                                                                  if (param[0] !== "id" && param[0] !== "printStatus")
                                                                        return <p className="checking-item-altribute" key={id}><span className="checking-item-title">{param[0]}:</span><span>{[param[1]]}</span></p>
                                                            })
                                                      }
                                                </div>
                                          </div>
                                    </div>


                              </div>
                        </div>


                        <Modal show={this.state.change} onHide={this.handleClose}>
                              <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                    {
                                          valueItem.map((param, id) => {
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
                                    <Button variant="primary" onClick={() => this.saveChange(valueItem, idStatus[0][1])}>
                                          Save Changes
                                     </Button>
                              </Modal.Footer>
                        </Modal>


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


                  </React.Fragment >
            );
      }
}

export default CheckingProperties;