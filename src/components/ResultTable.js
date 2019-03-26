import React, {Component} from 'react';
import './ResultTable.css'
import {ResultRow} from './index'
import NO_DIFF from './ResultRow'
import SAME from './ResultRow'
import DIFFERENT from './ResultRow'

class ResultTable extends Component {

    getCompareTable() {
        if (this.areAllNeededPropsValid()) {
            let resultTableRowElements = [];//this should contain the final array of ResultsRow elements
            let colHeadersRowElement = [];
            let arrayOfSingleColumnAllRowsTextArrays = [];
            let arrayOfSingleColumnAllRowsComparisonsArrays = [];
            let numberOfRows = 0;
            this.props.compareKeyChain.forEach((singleCompareKeyChain) => {
                let keys = singleCompareKeyChain.split('.');
                let headerText = keys[keys.length - 1];
                colHeadersRowElement.push(<th key={headerText}> {headerText} </th>);
                let textArray = [];
                let compareArray = [];
                if (singleCompareKeyChain.includes('0')) {
                    this.getResultsArray(singleCompareKeyChain, textArray, compareArray);
                } else {
                    this.getResultsSingle(singleCompareKeyChain, textArray, compareArray);
                }

                arrayOfSingleColumnAllRowsTextArrays.push(textArray);
                arrayOfSingleColumnAllRowsComparisonsArrays.push(compareArray);

                if (textArray.length > numberOfRows) {
                    numberOfRows = textArray.length;
                }
            });

            resultTableRowElements.push(<tr key={'header row'}>{colHeadersRowElement}</tr>);

            for (let i = 0; i < numberOfRows; i++) {
                let singleRowTextValue = [];
                let singleRowCompareValue = [];
                for (let j = 0; j < arrayOfSingleColumnAllRowsTextArrays.length; j++) {
                    singleRowTextValue.push(arrayOfSingleColumnAllRowsTextArrays[j][i]);
                    singleRowCompareValue.push(arrayOfSingleColumnAllRowsComparisonsArrays[j][i]);
                }
                resultTableRowElements.push(<ResultRow
                    key={'Result Table Row ' + i}
                    cellsText={singleRowTextValue}
                    cellsDiffState={singleRowCompareValue}/>);
            }

            return <table className="compareTable">
                <tbody>
                {resultTableRowElements}
                </tbody>
            </table>
        }
    }

    areAllNeededPropsValid() {
        const {returnData} = this.props;
        return this.props.compareKeyChain !== undefined &&
            this.props.compareKeyChain.length > 0 &&
            returnData !== undefined;
    }

    /**
     * Retrieves the text for the given key path, places the text into textValueArray. If the
     * compareReturn Data is valid, then it will check if the key path is valid, then compare that
     * value to the previous text found. The state of the comparison (either Different, same, or nothing
     * when the key path is not valid in the compare data) is placed into the diffStateArray.
     * This method is used if the key path contains an arrays along the path.
     * @param singleCompareKeyChain - Period separated key values for the JSON object.
     * @param textValueArray - This method will push the text values found at the end of the key path,
     * for all each of the array paths.
     * @param diffStateArray - This method will push the compare value found at the end of the key path
     * for all each of the array paths.
     */
    getResultsArray(singleCompareKeyChain, textValueArray, diffStateArray) {
        const {returnData, compareReturnData} = this.props;

        let keys = singleCompareKeyChain.split('.');
        let arrayObject = undefined;
        let compareArrayObject = undefined;
        let arrayIndex = 0;
        let checkDiff = true;

        for (let i = 0; i < keys.length; i++) {
            let s = keys[i];
            if (s === '0') {
                arrayIndex = i;
                i = keys.length;
            } else {
                if (arrayObject === undefined) {
                    arrayObject = returnData[s];
                } else {
                    arrayObject = arrayObject[s];
                }
            }
        }

        //If we have a compare object then let's compare
        if (compareReturnData !== undefined && compareReturnData !== null) {
            for (let i = 0; i < keys.length; i++) {
                let s = keys[i];
                if (s === '0') {
                    i = keys.length;
                } else {
                    if (compareArrayObject === undefined) {
                        compareArrayObject = compareReturnData[s];
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
            checkDiff = true;
            if (compareArrayObject !== undefined) {
                compareFinalObject = compareArrayObject[i];//add key check here
            }
            for (let i = arrayIndex + 1; i < keys.length; i++) {
                finalObject = finalObject[keys[i]];
                compareFinalObject = compareFinalObject[keys[i]];
            }

            if (finalObject === compareFinalObject) {
                diffStateArray.push(SAME);
            } else if (checkDiff) {
                diffStateArray.push(DIFFERENT);
            } else {
                diffStateArray.push(NO_DIFF);
            }

            textValueArray.push(finalObject);
        }
    }

    /**
     * Retrieves the text for the given key path, places the text into textValueArray. If the
     * compareReturn Data is valid, then it will check if the key path is valid, then compare that
     * value to the previous text found. The state of the comparison (either Different, same, or nothing
     * when the key path is not valid in the compare data) is placed into the diffStateArray.
     * This method is used if the key path does not have any arrays along the path.
     * @param singleCompareKeyChain - Period separated key values for the JSON object.
     * @param textValueArray - This method will push the text value found at the end of the key path
     * @param diffStateArray - This method will push the compare value found at the end of the key path
     */
    getResultsSingle(singleCompareKeyChain, textValueArray, diffStateArray) {
        const {returnData, compareReturnData} = this.props;

        let keys = singleCompareKeyChain.split('.');
        let currentObject = undefined;
        let compareObject = undefined;
        let checkDiff = true;

        keys.forEach((s) => {//TODO should there be try catches or check that key is valid
            if (currentObject === undefined) {
                currentObject = returnData[s];
            } else {
                currentObject = currentObject[s];
            }
        });

        //If we have a compare object then let's compare
        if (compareReturnData !== undefined && compareReturnData !== null) {
            keys.forEach((s) => {
                if (compareObject === undefined) {
                    if (s in compareReturnData) {
                        compareObject = compareReturnData[s];
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
            diffStateArray.push(SAME);
        } else if (checkDiff) {
            diffStateArray.push(DIFFERENT);
        } else {
            diffStateArray.push(NO_DIFF);
        }

        textValueArray.push(currentObject);
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