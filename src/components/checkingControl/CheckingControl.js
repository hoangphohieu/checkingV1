import React, { Component } from 'react';
import CheckingProperties from './CheckingProperties';
import CheckingImage from './CheckingImage';
import CheckingInput from './CheckingInput';
import UtilitiesChecking from './UtilitiesChecking';
class CheckingControl extends Component {

      render() {

            let itemChecking = this.props.dataChecking.listItem;
            console.log(itemChecking);

            // itemChecking = itemChecking.map(param => { let day = (new Date((param.day - 25569) * 24 * 60 * 60 * 1000)).toLocaleDateString(); return { ...param, day: day } })
            let newItems=itemChecking;

            if (itemChecking !== []) {
                  itemChecking = itemChecking.map((param, id) => { return <CheckingProperties {...this.props} proppertiesitem={param} key={id} /> })
            }

            return (
                  <React.Fragment>
                        <div>
                              <div className="container-fluid">
                                    <div className="container relative">
                                          {/* input and search  */}
                                          <div className="row mt-3">
                                                <div className="col-12">
                                                      <div className="row justify-content-center">
                                                            <div className="col-5 d-flex">
                                                                  <CheckingInput {...this.props} />
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          {/* end input search  */}
                                          <div className="row">
                                                {/* left  */}
                                                <div className="col-6 checking-right mt-3">
                                                      {itemChecking}
                                                </div>
                                                {/* end left  */}
                                                {/* right  */}
                                                <div className="col-6 checking-left mt-3">
                                                      <CheckingImage {...this.props} newItems={newItems} />
                                                </div>
                                                {/* end right  */}
                                          </div>


                                          <div className="row UtilitiesChecking_position">
                                                <UtilitiesChecking {...this.props} newItems={newItems}  />
                                          </div>
                                    </div>
                              </div></div>
                  </React.Fragment>
            );
      }
}

export default CheckingControl;