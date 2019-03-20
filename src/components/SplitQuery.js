import React, { Component } from 'react';
import './SplitQuery.css';
import {Query}  from "../components";

class SplitQuery extends Component {
    render() {
        let secondItem = "SplitItem";
        if (!this.props.split) {
            secondItem += " SplitHidden";
        }

        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItem">
                        <Query query={this.props.query1} onClick={() => this.props.queryClick(1)}/>
                    </div>
                    <div className={secondItem}>
                        <Query query={this.props.query2} onClick={() => this.props.queryClick(2)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplitQuery;