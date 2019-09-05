import React, { Component } from 'react';
import { json2excel, excel2json } from 'js2excel';
class ExcelExport extends Component {
    downExcel = () => {
        let data = [
            {
                "userId": "hieudz",
                "userPhoneNumber": 1888888888,
                "userAddress": 'xxxx',
                "date": '2013/09/10 09:10'
            },
            {
                "userId": 2,
                "userPhoneNumber": 1888888888,
                "userAddress": 'xxxx',
                "date": new Date()
            },
            {
                "userId": 3,
                "userPhoneNumber": 1888888888,
                "userAddress": 'xxxx',
                "date": new Date()
            }
        ];

        // this will be export a excel and the file's name is user-info-data.xlsx
        // the default file's name is excel.xlsx
        try {
            json2excel({
                data,
                name: 'user-info-data',
                formateDate: 'yyyy/mm/dd'
            });
        } catch (e) {
            console.error('export error');
        }

        // for webpack 3: dynamic import
        
    }
    render() {
        return (
            <div>
                <button onClick={this.downExcel}>
                    skdjsddsdvk
                </button>
            </div>
        );
    }
}

export default ExcelExport;