import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import CheckingControlContainer from './containers/CheckingControlContainer';
import ExcelImportContainer from './containers/ExcelImportContainer';
import PartnerControlContainer from "./containers/PartnerControlContainer";
import ExcelExport from './components/checkingControl/ExcelExport';
import JsBarcode from './components/JsBarcode';
function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="container">
          <div className="row ">
            <Link to="/partner" className="col-4 nav-item-h"> Partner</Link>
            <Link to="/" className="col-4 nav-item-h"> Checking Control</Link>
            <Link to="/excelImport" className="col-4 nav-item-h">Excel Import</Link>
          </div>
        </div>
      </div>
      {/* end nav bar */}

      <Switch >
        <Route exact path="/" render={(props) => <CheckingControlContainer {...props} />} />
        <Route exact path="/excelImport" render={(props) => <ExcelImportContainer {...props} />} />
        <Route exact path="/partner" render={(props) => <PartnerControlContainer {...props} />} />
      </Switch>

      {/* <CheckingControlContainer/> */}
      
    </div>
  );
}

export default App;
