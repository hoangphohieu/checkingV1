import React, { Component } from 'react';
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
            this.props.searchChecking(this.state.valueInput)
      }
      SearchItemByEnter = (e) => {
            if (e.key === "Enter") { this.searchChecking() }
      }
      render() {
            
            // console.log(this.props);
            // console.log(this.state.valueInput);
            return (
                  <React.Fragment>
                        <input type="text" className="form-control" placeholder="Recipient's username" onChange={this.changeValueInput} onKeyDown={this.SearchItemByEnter} />
                        <button type="button" className="btn btn-primary" onClick={this.searchChecking}>Search</button>
                  </React.Fragment>
            );
      }
}

export default CheckingInput;