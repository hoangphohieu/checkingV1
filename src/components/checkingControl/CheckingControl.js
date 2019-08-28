import React, { Component } from 'react';
import CheckingProperties from './CheckingProperties';
import CheckingImage from './CheckingImage';
import CheckingInput from './CheckingInput';

class CheckingControl extends Component {
    
      render() {


            return (
                  <React.Fragment>
                        <div>
                              <div className="container-fluid">
                                    <div className="container">
                                          {/* input and search  */}
                                          <div className="row mt-3">
                                                <div className="col-12">
                                                      <div className="row justify-content-center">
                                                            <div className="col-5 d-flex">
                                                                  <CheckingInput {...this.props}/>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          {/* end input search  */}
                                          <div className="row">
                                                {/* left  */}
                                                <div className="col-6 checking-right mt-3">
                                                      <CheckingProperties />
                                                </div>
                                                {/* end left  */}
                                                {/* right  */}
                                                <div className="col-6 checking-left mt-3">
                                                      <CheckingImage />
                                                </div>
                                                {/* end right  */}
                                          </div>
                                    </div>
                              </div></div>
                  </React.Fragment>
            );
      }
}

export default CheckingControl;