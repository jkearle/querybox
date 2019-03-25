import React, {Component} from 'react';
import './ResultTable.css'
import Result from './Result'

class ResultTable extends Component {

    //TODO the keychain value is lost when going back and forth between JSON and the Compare tab - look to save with redux update
    getCompareTable() {
        if (this.props.compareKeyChain !== undefined &&
            this.props.compareKeyChain !== '') {
            let results = [];

            if (this.props.compareKeyChain.includes('0')) {
                this.getResultsArray(results);
            } else {
                this.getResultsSingle(results);
            }
            return <table className="compareTable">
                {results}
            </table>
        }
    }

    getResultsArray(resultsArray) {
        let keys = this.props.compareKeyChain.split('.');
        let arrayObject = undefined;
        let compareArrayObject = undefined;
        let arrayIndex = 0;
        let diff = false;
        let checkDiff = true;
        let same = false;

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

        //If we have a compare object then let's compare
        if (this.props.compareResults !== undefined && this.props.compareResults !== null) {
            for (let i = 0; i < keys.length; i++) {
                let s = keys[i];
                if (s === '0') {
                    i = keys.length;
                } else {
                    if (compareArrayObject === undefined) {
                        compareArrayObject = this.props.compareResults[s];
                    } else {
                        compareArrayObject = compareArrayObject[s];
                    }
                }
            }
        }
        /////////////////////////////////////////////

        for (let i = 0; i < arrayObject.length; i++) {
            let finalObject = arrayObject[i];
            let compareFinalObject = undefined;
            diff = false;
            checkDiff = true;
            same = false;
            if (compareArrayObject !== undefined) {
                compareFinalObject = compareArrayObject[i];//add key check here
            }
            for (let i = arrayIndex + 1; i < keys.length; i++) {
                finalObject = finalObject[keys[i]];
                compareFinalObject = compareFinalObject[keys[i]];
            }

            if (finalObject === compareFinalObject) {
                same = true;
            } else if (checkDiff) {
                diff = true;
            }

            resultsArray.push(<Result
                result={finalObject}
                diff={diff}
                same={same}
            />);
        }
    }

    getResultsSingle(resultsArray) {
        let keys = this.props.compareKeyChain.split('.');
        let currentObject = undefined;
        let compareObject = undefined;
        let diff = false;
        let checkDiff = true;
        let same = false;

        keys.forEach((s) => {//TODO should there be try catches or check that key is valid
            if (currentObject === undefined) {
                currentObject = this.props.results[s];
            } else {
                currentObject = currentObject[s];
            }
        });

        //If we have a compare object then let's compare
        if (this.props.compareResults !== undefined && this.props.compareResults !== null) {
            keys.forEach((s) => {
                if (compareObject === undefined) {
                    if (s in this.props.compareResults) {
                        compareObject = this.props.compareResults[s];
                    } else {
                        checkDiff = true;
                    }
                } else {
                    if (s in compareObject) {
                        compareObject = compareObject[s];
                    } else {
                        checkDiff = true;
                    }
                }
            });
        }

        if (currentObject === compareObject) {
            same = true;
        } else if (checkDiff) {
            diff = true;
        }

        resultsArray.push(<Result
            result={currentObject}
            diff={diff}
            same={same}
        />);
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