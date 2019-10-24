import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import CheckingControlContainer from './containers/CheckingControlContainer';
import ExcelImportContainer from './containers/ExcelImportContainer';
import PartnerControlContainer from "./containers/PartnerControlContainer";
import UseControlContainer from './containers/UseControlContainer';

class App extends Component {

  componentWillMount() {
    if (JSON.parse(localStorage.getItem("UserProperties")) === null) {
      localStorage.setItem("UserProperties", JSON.stringify([]));
    }
  }

  render() {
    let userProperties = JSON.parse(localStorage.UserProperties);
    // console.log(userProperties);
    let partnerTypeUser = userProperties[0];
    console.log(partnerTypeUser);

    return (
      <React.Fragment>

        <div className="App back_ground_all">
          <div className="container-fluid background_nav_top">
            <div className="container">
              <div className="row justify-content-around">


                {(partnerTypeUser === undefined) ? ""
                  : <Link to="/" className=" nav-item-h"> Partner</Link>}

                {(partnerTypeUser !== "R" && partnerTypeUser !== undefined) ? <>

                  <Link to="/checkingControl" className=" nav-item-h"> Checking Control</Link>
                  <Link to="/excelImport" className=" nav-item-h">Excel Import</Link>
                </>
                  : ""}
                {/* <Link to="/excelImport" className=" nav-item-h">Excel Import</Link> */}


                {(partnerTypeUser === undefined) ? <Link to="/" className=" nav-item-h">User</Link>
                  : <Link to="/useControl" className=" nav-item-h">User</Link>}

              </div>
            </div>
          </div>
          {/* end nav bar */}

          <Switch >

            {(partnerTypeUser !== undefined) ?
              <Route exact path="/" render={(props) => <PartnerControlContainer {...props} />} />
              : ""}

            {(partnerTypeUser !== "R" && partnerTypeUser !== undefined) ?
              <Route exact path="/checkingControl" render={(props) => <CheckingControlContainer {...props} />} />
              : ""}
            {(partnerTypeUser !== "R" && partnerTypeUser !== undefined) ?
              <Route exact path="/excelImport" render={(props) => <ExcelImportContainer {...props} />} />
              : ""}


            {(partnerTypeUser === undefined) ? <Route exact path="/" render={(props) => <UseControlContainer {...props} />} />
              : <Route exact path="/useControl" render={(props) => <UseControlContainer {...props} />} />}

          </Switch>

          {/* <CheckingControlContainer/> */}

        </div>
      </React.Fragment>
    );
  }
}
export default App;



