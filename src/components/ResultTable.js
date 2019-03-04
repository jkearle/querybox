import React, { Component } from 'react';
import './ResultTable.css'
import Result from './Result'

class ResultTable extends Component {
    render() {
        let results = [];
        if (this.props.results.hits && this.props.results.hits.hits) {
            for (let i = 0; i < this.props.results.hits.hits.length; i++) {
                results.push(<Result result={this.props.results.hits.hits[i]}/>)
            }
        }
        return (
            <div className="ResultTable Component">
                <table>
                    <tbody>
                        {results}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultTable;