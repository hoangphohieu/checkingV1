import React, { Component } from 'react';
import _ from "lodash";
class CheckingInput extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  valueInput: "",
            }
      }
      changeValueInput = (e) => {
            this.setState({ valueInput: e.target.value });
      }
      searchChecking = () => {
           
            this.props.searchChecking("?datatype=item&name=" +_.replace(this.state.valueInput, '#', '%23') );
      }
      SearchItemByEnter = (e) => {
            if (e.key === "Enter") { this.searchChecking() }
      }
      render() {
            
            // console.log(this.props);
            // console.log(this.state.valueInput);
            return (
                  <React.Fragment> 
                        <input type="text" className="form-control" placeholder="Recipient's username" onChange={this.changeValueInput} onKeyDown={this.SearchItemByEnter}  autoFocus />
                        <button type="button" className="btn btn-primary" onClick={this.searchChecking}>Search item</button>
                  </React.Fragment>
            );
      }
}

export default CheckingInput;