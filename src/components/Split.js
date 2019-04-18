import React, {Component} from 'react';
import './Split.css';
import {SplitQuery, SplitResults} from "../components";


class Split extends Component {
    render() {
        const {queryClick} = this.props;

        return (
            <div className="Split">
                <SplitQuery split={this.props.split}
                            query1={this.props.query1}
                            query2={this.props.query2}
                            queryClick={queryClick}/>
                <SplitResults/>
            </div>
        );
    }
}

export default Split;