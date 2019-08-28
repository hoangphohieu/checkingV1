import React, { Component } from 'react';

class CheckingImage extends Component {
      render() {
            return (
                  <React.Fragment>
                        <img className="checking-img-cdn" src="https://res.cloudinary.com/hieudz/image/upload/v1566581774/demo%20tool/DK1882.jpg" alt="" />
                        <button type="button" className="btn btn-success checking-print">Print</button>
                  </React.Fragment>
            );
      }
}

export default CheckingImage;