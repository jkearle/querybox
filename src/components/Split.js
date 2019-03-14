import React, { Component } from 'react';
import './Split.css';
import Query from "./Query";
import ResultTable from "./ResultTable";

class Split extends Component {
    render() {
        let gridstate = "SplitGrid";
        if (!this.props.split) {
            gridstate += " SplitGridSingle";
        }
        return (
            <div className="Split">
                <div className={gridstate}>
                    <div className="SplitQuery1">
                        <Query query={this.props.query1} onClick={() => this.props.queryClick(1)}/>
                    </div>
                    <div className="SplitQuery2">
                        <Query query={this.props.query2} onClick={() => this.props.queryClick(2)}/>
                    </div>
                    <div className="SplitResults1">
                        <ResultTable results={this.props.results1}/>
                    </div>
                    <div className="SplitSelection">
                        This is where the multi-select goes
                    </div>
                    <div className="SplitResults2">
                        <ResultTable results={this.props.results2}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Split;