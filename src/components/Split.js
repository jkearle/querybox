import React, { Component } from 'react';
import './Split.css';
import Query from "./Query";
import ResultTable from "./ResultTable";

class Split extends Component {
    render() {
        let seconditem = "SplitItem";
        if (!this.props.split) {
            seconditem += " SplitHidden";
        }
        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItem">
                        <Query query={this.props.query1} onClick={() => this.props.queryClick(1)}/>
                        <ResultTable results={this.props.results1}/>
                    </div>
                    <div className={seconditem}>
                        <Query query={this.props.query2} onClick={() => this.props.queryClick(2)}/>
                        <ResultTable results={this.props.results2}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Split;