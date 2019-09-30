import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import CheckingControlContainer from './containers/CheckingControlContainer';
import ExcelImportContainer from './containers/ExcelImportContainer';
import PartnerControlContainer from "./containers/PartnerControlContainer";
import TrackingImportContainer from "./containers/TrackingImportContainer";

function App() {
  return (
    <React.Fragment>

      <div className="App back_ground_all">
        <div className="container-fluid background_nav_top">
          <div className="container">
            <div className="row ">
              <Link to="/partner" className="col-3 nav-item-h"> Partner</Link>
              <Link to="/" className="col-3 nav-item-h"> Checking Control</Link>
              <Link to="/excelImport" className="col-3 nav-item-h">Excel Import</Link>
              <Link to="/trackingImport" className="col-3 nav-item-h">Tracking Import</Link>
            </div>
          </div>
        </div>
        {/* end nav bar */}

        <Switch >
          <Route exact path="/" render={(props) => <CheckingControlContainer {...props} />} />
          <Route exact path="/excelImport" render={(props) => <ExcelImportContainer {...props} />} />
          <Route exact path="/partner" render={(props) => <PartnerControlContainer {...props} />} />
          <Route exact path="/trackingImport" render={(props) => <TrackingImportContainer {...props} />} />
        </Switch>

        {/* <CheckingControlContainer/> */}

      </div>
    </React.Fragment>
  );
}

export default App;
