import React from 'react';
import './App.css';
import CheckingControlContainer from './containers/CheckingControlContainer';
import ExcelImportContainer from './containers/ExcelImportContainer';


function App() {
  return (
    <div className="App">
      {/* nav bar */}
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-4 nav-item-h">Partner</div>
            <div className="col-4 nav-item-h">Checking Control</div>
            <div className="col-4 nav-item-h">Excel Upload</div>
          </div>
        </div>
      </div>
      {/* end nav bar */}
     {/* <CheckingControlContainer/> */}
     <ExcelImportContainer/>
    </div>
  );
}

export default App;
