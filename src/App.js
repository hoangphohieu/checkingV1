import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import CheckingControlContainer from './containers/CheckingControlContainer';
import ExcelImportContainer from './containers/ExcelImportContainer';
import PartnerControlContainer from "./containers/PartnerControlContainer";
import UseControlContainer from './containers/UseControlContainer';

function App() {
  return (
    <React.Fragment>

      <div className="App back_ground_all">
        <div className="container-fluid background_nav_top">
          <div className="container">
            <div className="row justify-content-around">
              <Link to="/" className=" nav-item-h"> Partner</Link>
              <Link to="/checkingControl" className=" nav-item-h"> Checking Control</Link>
              <Link to="/excelImport" className=" nav-item-h">Excel Import</Link>
              <Link to="/useControl" className=" nav-item-h">User</Link>
            </div>
          </div>
        </div>
        {/* end nav bar */}

        <Switch >
          <Route exact path="/" render={(props) => <PartnerControlContainer {...props} />} />
          <Route exact path="/checkingControl" render={(props) => <CheckingControlContainer {...props} />} />
          <Route exact path="/excelImport" render={(props) => <ExcelImportContainer {...props} />} />
          <Route exact path="/useControl" render={(props) => <UseControlContainer {...props} />} />
        </Switch>

        {/* <CheckingControlContainer/> */}

      </div>
    </React.Fragment>
  );
}

export default App;
