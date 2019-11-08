import React, { Component } from 'react';
import CheckingProperties from './CheckingProperties';
import CheckingImage from './CheckingImage';
import CheckingInput from './CheckingInput';
import UtilitiesChecking from './UtilitiesChecking';
class Item extends Component {

      render() {

            let items = this.props.ItemPayload.listItem;
            console.log(items);

            let newItems = items;

            if (items.length > 0) {
                  items.pop();
                  items = items.map((param, id) => { return <CheckingProperties {...this.props} proppertiesitem={JSON.stringify(param)} key={id} /> })
            }

            return (
                  <React.Fragment>

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
                              <div className="col-12 checking-right mt-3">
                                    {items}
                              </div>
                              {/* end left  */}
                              {/* right  */}
                              {/* <div className="col-6 checking-left mt-3">
                                                      <CheckingImage {...this.props} newItems={newItems} />
                                                </div> */}
                              {/* end right  */}
                        </div>


                        <div className="row UtilitiesChecking_position">
                              <UtilitiesChecking {...this.props} newItems={newItems} />
                        </div>

                  </React.Fragment>
            );
      }
}

export default Item;