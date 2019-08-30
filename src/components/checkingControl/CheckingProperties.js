import React, { Component } from 'react';

class CheckingProperties extends Component {


      render() {
            let item = this.props.proppertiesitem;
            let {
                  baseCost,
                  id,
                  day,
                  checking,
                  shippingName,
                  shippingAddress1,
                  shippingAddress2,
                  shippingCity,
                  shippingZip,
                  shippingProvince,
                  shippingCountry,
                  shippingPhone,
                  fee,
                  lineitemQuantity,
                  lineitemName,
                  print } = item;
            console.log(baseCost);

            return (
                  <React.Fragment>
                        <button type="button" className="btn btn-primary checking-right-state">{print}</button>
                        <p className="checking-item-altribute"><span className="checking-item-title">Day: </span><span>{day}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Đối tác: </span><span>Dũng AZ</span></p>
                        <p className="checking-item-name"><span className="checking-itemname-title">Checking: </span><span>{checking}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Name: </span><span>{shippingName}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Address1:</span><span>{shippingAddress1}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Address2:</span><span>{shippingAddress2}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping City:</span><span>{shippingCity}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Zip: </span><span>{shippingZip}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Province: </span><span>{shippingProvince}</span> </p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Country: </span><span>{shippingCountry}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Shipping Phone: </span><span>{shippingPhone}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Base cost: </span><span>{baseCost}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Fee: </span><span>{fee}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Lineitem quantity: </span><span>{lineitemQuantity}</span></p>
                        <p className="checking-item-altribute"><span className="checking-item-title">Lineitem name: </span><span>{lineitemName}</span></p>

                  </React.Fragment>
            );
      }
}

export default CheckingProperties;