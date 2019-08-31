import React, { Component } from 'react';

class Exceltable extends Component {
    render() {
        // console.log(this.props.dataExcelTable);
        let ten = [...this.props.dataExcelTable];
        ten.shift();
        // console.log(ten);
        return (
            <React.Fragment>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {(this.props.dataExcelTable[0] !== undefined) ? (this.props.dataExcelTable[0].map((param, id) => <th scope="col" key={id}>{param}</th>)) : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {(ten !== undefined) ?
                            ten.map((param, id2) => {
                                let arrItem = [];
                                for (let j = 0; j <= param.length - 1; j++) {
                                    arrItem.push(<td key={j + 1}>{param[j]}</td>)
                                }
                                return <tr key={id2}>{arrItem}</tr>
                            }
                            )
                            : ""
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Exceltable;