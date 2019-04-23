import React, {Component} from 'react';
import './Split.css';
import {SplitQuery, SplitResults} from "../components";

export default class Split extends Component {
    render() {
        return (
            <div className="Split">
                <SplitQuery />
                <SplitResults/>
            </div>
        );
    }
}
