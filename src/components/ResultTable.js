import React, {Component} from 'react';
import './ResultTable.css'
import Result from './Result'

class ResultTable extends Component {

    getCompareTable() {
        if (this.props.compareKeyChain !== undefined &&
            this.props.compareKeyChain !== '') {
            let results = [];

            if (this.props.compareKeyChain.includes('0')) {
                this.getResultsArray(results);
            } else {
                this.getResultsSingle(results);
            }
            return <table>
                <tbody>
                {results}
                </tbody>
            </table>
        }
    }

    getResultsArray(resultsArray) {
        let keys = this.props.compareKeyChain.split('.');
        let arrayObject = undefined;
        let arrayIndex = 0;
        for (let i = 0; i < keys.length; i++) {
            let s = keys[i];
            if (s === '0') {
                arrayIndex = i;
                i = keys.length;
            } else {
                if (arrayObject === undefined) {
                    arrayObject = this.props.results[s];
                } else {
                    arrayObject = arrayObject[s];
                }
            }
        }

        for (let i = 0; i < arrayObject.length; i++) {
            let finalObject = arrayObject[i];
            for (let i = arrayIndex + 1; i < keys.length; i++) {
                finalObject = finalObject[keys[i]];
            }
            resultsArray.push(<Result result={finalObject}/>);
        }
    }

    getResultsSingle(resultsArray) {
        let keys = this.props.compareKeyChain.split('.');
        let currentObject = undefined;
        keys.forEach((s) => {
            if (currentObject === undefined) {
                currentObject = this.props.results[s];
            } else {
                currentObject = currentObject[s];
            }
        });
        resultsArray.push(<Result result={currentObject}/>);
    }

    render() {
        return (
            <div className="ResultTable Component">
                {this.getCompareTable()}
            </div>
        );
    }
}

export default ResultTable;