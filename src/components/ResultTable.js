import React, { Component } from 'react';
import './ResultTable.css'
import Result from './Result'

class ResultTable extends Component {
    render() {
        return (
            <div className="ResultTable Component">
                <table>
                    <Result/>
                </table>
            </div>
        );
    }
}

export default ResultTable;