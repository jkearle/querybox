import React, { Component } from 'react';
import './Split.css';
import Query from "./Query";
import ResultTable from "./ResultTable";
import Stats from "./Stats";

class Split extends Component {
    render() {
        let gridstate = "SplitGrid";
        if (!this.props.split) {
            gridstate += " SplitGridSingle";
        }
        const took = 0;
        return (
            <div className="Split">
                <div className={gridstate}>
                    <div className="SplitQuery1">
                        <Query query={this.props.query1} onClick={() => this.props.queryClick(1)}/>
                        <Stats took={took}/>
                    </div>
                    <div className="SplitQuery2">
                        <Query query={this.props.query2} onClick={() => this.props.queryClick(2)}/>
                        <Stats took={this.props.took2}/>
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