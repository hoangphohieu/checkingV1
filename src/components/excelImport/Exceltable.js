import React, { Component } from 'react';

class Exceltable extends Component {
    render() {
        console.log(this.props.dataExcelTable);
        let ten = [...this.props.dataExcelTable];
        ten.shift();
        console.log(ten);
        // if (ten !== undefined) {
        //     ten.map((param, id2) => {
        //         console.log(param);
        //         return <tr key={id2}>
        //                     <th scope="row" key={id2}>{id2 + 1}</th>
        //                     {
        //                         for(let j=0;j<=param.length;j++){
                                    
        //                         }
        //                     }

        //                     {param.map((param2, id3) => {
        //                         console.log(param2);
        //                         return (param === []) ? <td key={id3}>Z</td> : <td key={id3}>{param2}</td>
        //                         // return <td key={id3}>{param2}</td>
        //                     })}
        //                 </tr>
        //     }
        // }
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
                                console.log(param);

                                return <tr key={id2}>
                                    <th scope="row" key={id2}>{id2 + 1}</th>
                                    {param.map((param2, id3) => {
                                        console.log(param2,id3);
                                        return (param === []) ? <td key={id3}>Z</td> : <td key={id3}>{param2}</td>
                                        // return <td key={id3}>{param2}</td>
                                    })}
                                </tr>
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