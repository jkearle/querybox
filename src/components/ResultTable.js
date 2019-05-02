import React, {Component} from 'react';
import './ResultTable.css'
import {ResultRow} from './index'
import {NO_DIFF, ADD, REMOVE} from './ResultRow'
import {diffArrays} from 'diff';//https://github.com/kpdecker/jsdiff or https://www.npmjs.com/package/diff


class ResultTable extends Component {

    getCompareTable() {
        if (this.areAllNeededPropsValid()) {
            let resultTableRowElements = [];//this should contain the final array of ResultsRow elements
            let colHeadersRowElement = [];
            let keys = this.props.compareKeyChains.split('.');
            let headerText = keys[keys.length - 1];
            colHeadersRowElement.push(<th key={headerText}> {headerText} </th>);
            let textArrayOriginal = [];
            let textArrayComparison = [];
            let compareArray = [];

            //convert JSON to Array for both
            this.getTextArraysFromJson(textArrayOriginal, textArrayComparison);

            //create the diff tokens between the two
            this.getDiffValues(textArrayOriginal, textArrayComparison, compareArray);

            resultTableRowElements.push(<tr key={'header row'}>{colHeadersRowElement}</tr>);

            console.log(compareArray);


            //Convert the Text Array and the comparison info to rows
            for (let i = 0; i < compareArray.length; i++) {

                //for each no change - add current (first++, and second++) index++, and value for two cells - in white
                //for each removal, add current (first++, and second) index++, add value for first cell - cells in Red
                //for each addition, add current (first, and second++) index, value in second cell - cells in green
                let singleRowTextValue = [];
                let singleRowCompareValue = [];
                let originalTextIndex = 0;
                let compareTextIndex = 0;

                if (compareArray[i] === REMOVE) {
                    singleRowTextValue.push(textArrayOriginal[originalTextIndex++]);
                    singleRowTextValue.push('');
                    singleRowCompareValue.push(REMOVE);
                    singleRowCompareValue.push(NO_DIFF);
                } else if (ADD) {
                    singleRowTextValue.push('');
                    singleRowTextValue.push(textArrayComparison[compareTextIndex++]);
                    singleRowCompareValue.push(NO_DIFF);
                    singleRowCompareValue.push(ADD);
                } else {
                    //should be in both
                    console.log('No diff row');
                    singleRowTextValue.push(textArrayOriginal[originalTextIndex++]);
                    singleRowTextValue.push(textArrayComparison[compareTextIndex++]);
                    singleRowCompareValue.push(NO_DIFF);
                    singleRowCompareValue.push(NO_DIFF);
                }

                resultTableRowElements.push(<ResultRow
                    key={'Result Table Row ' + i}
                    cellsText={singleRowTextValue}
                    cellsDiffState={singleRowCompareValue}/>);
            }

            return <table className="results">
                <tbody>
                {resultTableRowElements}
                </tbody>
            </table>
        }
    }

    getTextArraysFromJson(textArrayOriginal, textArrayComparison) {
        if (this.props.compareKeyChains.includes('0')) {
            this.getTextArrayFromJsonArray(this.props.compareKeyChains, textArrayOriginal, textArrayComparison);
        } else {
            this.getTextArrayFromJsonSingle(this.props.compareKeyChains, textArrayOriginal, textArrayComparison);
        }
    }

    /**
     * Method that uses the diff library to retrieve the differences between the two text arrays.
     * When calculating the changes to the original value, we only mark values that are the same, or removed.
     * When calculating the changes to the compare values, we mark values that are the same, or added.
     * @param textArrayOriginal the original text array
     * @param textArrayComparison - the new text array to compare to
     * @param compareArray - array that will be populated with the comparison results
     */
    getDiffValues(textArrayOriginal, textArrayComparison, compareArray) {
        let diffReturn;

        let textArrayOriginalOriginal = [...textArrayOriginal];
        let textArrayComparisonOriginal = [...textArrayComparison];

        diffReturn = diffArrays(textArrayOriginalOriginal, textArrayComparisonOriginal);
        console.log(diffReturn);

        compareArray.length = 0;//This is the way to clear an array
        if (diffReturn.length > 0) {
            diffReturn.forEach((diff) => {
                diff.value.forEach((diffSingleRow) => {
                    if (diff.removed !== undefined && diff.removed) {
                        compareArray.push(REMOVE);
                    } else if (diff.added !== undefined && diff.added) {
                        compareArray.push(ADD);
                    } else {
                        compareArray.push(NO_DIFF);
                    }
                });
            });
        }
    }

    areAllNeededPropsValid() {
        const {returnData} = this.props;
        return this.props.compareKeyChains !== undefined &&
            returnData !== undefined;
    }

    /**
     * Retrieves the text for the given key path, places the text into textValueArray. If the
     * compareReturn Data is valid, then it will check if the key path is valid, then compare that
     * value to the previous text found. The state of the comparison (either Different, same, or nothing
     * when the key path is not valid in the compare data) is placed into the diffStateArray.
     * This method is used if the key path contains an arrays along the path.
     * @param singleCompareKeyChain - Period separated key values for the JSON object.
     * @param textValueArray - This method will push the text value found at the end of the key path for the source JSON
     * @param textCompareArray - This method will push the text value found at the end of the key path for the comparison JSON
     */
    getTextArrayFromJsonArray(singleCompareKeyChain, textValueArray, textCompareArray) {
        const {returnData, compareReturnData} = this.props;

        let keys = singleCompareKeyChain.split('.');
        let arrayObject = undefined;
        let compareArrayObject = undefined;
        let arrayIndex = 0;

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
            if (compareArrayObject !== undefined) {
                compareFinalObject = compareArrayObject[i];
            }
            for (let i = arrayIndex + 1; i < keys.length; i++) {
                if (finalObject !== undefined) {
                    finalObject = finalObject[keys[i]];
                }
                if (compareFinalObject !== undefined) {
                    compareFinalObject = compareFinalObject[keys[i]];
                }
            }

            if (compareFinalObject === undefined || compareFinalObject === null) {
                compareFinalObject = '';
            }

            if (finalObject === undefined || finalObject === null) {
                finalObject = '';
            }

            textCompareArray.push(compareFinalObject.toString());
            textValueArray.push(finalObject.toString());
        }
    }

    /**
     * Retrieves the text for the given key path, places the text into textValueArray. If the
     * compareReturn Data is valid, then it will check if the key path is valid, then compare that
     * value to the previous text found. The state of the comparison (either Different, same, or nothing
     * when the key path is not valid in the compare data) is placed into the diffStateArray.
     * This method is used if the key path does not have any arrays along the path.
     * @param singleCompareKeyChain - Period separated key values for the JSON object.
     * @param textValueArray - This method will push the text value found at the end of the key path for the source JSON
     * @param textCompareArray - This method will push the text value found at the end of the key path for the comparison JSON
     */
    getTextArrayFromJsonSingle(singleCompareKeyChain, textValueArray, textCompareArray) {
        const {returnData, compareReturnData} = this.props;

        let keys = singleCompareKeyChain.split('.');
        let currentObject = undefined;
        let compareObject = undefined;

        keys.forEach((s) => {
            if (currentObject === undefined) {
                if (s in returnData) {
                    currentObject = returnData[s];
                }
            } else {
                if (s in currentObject) {
                    currentObject = currentObject[s];
                }
            }
        });

        //If we have a compare object then let's compare
        if (compareReturnData !== undefined && compareReturnData !== null) {
            keys.forEach((s) => {
                if (compareObject === undefined) {
                    if (s in compareReturnData) {
                        compareObject = compareReturnData[s];
                    }
                } else {
                    if (s in compareObject) {
                        compareObject = compareObject[s];
                        textCompareArray.push(compareObject);
                    }
                }
            });
        }
        textValueArray.push(currentObject);
    }

    render() {
        return (
            <div className="result.table">
                {this.getCompareTable()}
            </div>
        );
    }
}

export default ResultTable;