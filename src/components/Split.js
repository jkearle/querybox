import React, {Component} from 'react';
import './Split.css';
import {SplitQuery, SplitResults} from "../components";


class Split extends Component {
    render() {
        return (
            <div className="Split">
                <SplitQuery split={this.props.split}
                            query1={this.props.query1}
                            query2={this.props.query2}
                            queryClick={this.props.queryClick}/>
                <SplitResults split={this.props.split}
                              returnData1={this.props.results1}
                              returnData2={this.props.results2}
                              keys={this.props.keys}/>
            </div>
        );
    }
}

export default Split;