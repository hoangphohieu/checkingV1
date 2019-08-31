import React, { Component } from 'react';
import _ from 'lodash';

class CheckingProperties extends Component {
      // constructor(props, context) {
      //       super(props, context);
      //       this.state={
      //             item:this.props.proppertiesitem
      //       }
      // }
      
      changePrintStatus = (param) => {
            this.props.changePrintStatus(param)
      }

      render() {
            let item = _.toPairs(this.props.proppertiesitem); // props.proppertiesitem là object => array
            let printStatus = item.filter(param => { return param[0] == "printStatus" });
            let idStatus = item.filter(param => { return param[0] == "id" });
            console.log(printStatus[0][1]);
            
            return (
                  <React.Fragment>
                        <button onClick={() => this.changePrintStatus({ printStatus: !printStatus[0][1], idStatus: idStatus[0][1] })} type="button" className={"btn btn-" + ((printStatus[0][1] === true) ? "primary" : "danger") + " checking-right-state"}>
                              {(printStatus[0][1] === true) ? "Done !" : "Print ..."}
                        </button>
                        {
                              item.map((param, id) => {
                                    if (param[0] !== "id" && param[0] !== "printStatus")
                                          return <p className="checking-item-altribute" key={id}><span className="checking-item-title">{param[0]}:</span><span>{param[1]}</span></p>
                              })
                        }
                  </React.Fragment>
            );
      }
}

export default CheckingProperties;