import React, { Component } from 'react';
import _ from 'lodash';


class ItemPagination extends Component {
    changeActivePage = () => {
        this.props.changeActivePage(this.props.numberPage);
    }
    render() {

        return (
            <React.Fragment>
                <li className={"page-item " + ((this.props.active) ? "active" : "")}>
                    <a className="page-link" href="#" onClick={this.changeActivePage}>{this.props.numberPage}</a>
                </li>
            </React.Fragment>
        );
    }
}



class Pagination extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activePage: 0
        }
    }
    changeActivePage(param) {

    }
    render() {
        const numberPerTracking = 5;
        // let dataChart = this.Math_dataChart(JSON.parse(JSON.stringify(this.props.items.listItem)));
        console.log(JSON.parse(JSON.stringify(this.props.items.listItem)));
        let listItem = this.props.items.listItem;


        let data = [];
        listItem.forEach(param => { data.push(param.Sumtrackingnumber) });
        data = _.flattenDeep(data).filter(param => param !== null);
        data = _.chunk(data, numberPerTracking);
        console.log(data);

        let totalPage = data.length;
        let activePage = this.state.activePage;
        return (
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {((activePage - 1) > 2) ?
                            <React.Fragment>
                                <ItemPagination numberPage={1} changeActivePage={this.changeActivePage} />
                                <div className="page-link">...</div>
                            </React.Fragment> : ""
                        }
                        {((activePage - 1) > 1) ?
                            <ItemPagination numberPage={activePage - 2} changeActivePage={this.changeActivePage} /> : ""
                        }

                        {((activePage - 1) > 0) ?
                            <ItemPagination numberPage={activePage - 1} changeActivePage={this.changeActivePage} /> : ""
                        }

                        <ItemPagination numberPage={activePage} active={true} changeActivePage={this.changeActivePage} />

                        {((totalPage - activePage) > 0) ?
                            <ItemPagination numberPage={activePage + 1} changeActivePage={this.changeActivePage} /> : ""
                        }

                        {((totalPage - activePage) > 1) ?
                            <ItemPagination numberPage={activePage + 2} changeActivePage={this.changeActivePage} /> : ""
                        }

                        {((totalPage - activePage) > 2) ?
                            <React.Fragment>
                                <div className="page-link">...</div>

                                <ItemPagination numberPage={totalPage} changeActivePage={this.changeActivePage} />
                            </React.Fragment> : ""
                        }

                    </ul>
                </nav>
            </div>
        );
    }
}

export default Pagination;