import React, {Component} from 'react';
import './ResultTable.css'
import {ResultRow} from './index'
import {NO_DIFF_BACKGROUND, ADD_SAME_BACKGROUND, ADD_DIFF_BACKGROUND, REMOVE_DIFF_BACKGROUND, REMOVE_SAME_BACKGROUND} from './ResultRow'
import {diffArrays} from 'diff';//https://github.com/kpdecker/jsdiff or https://www.npmjs.com/package/diff
import PropTypes from "prop-types";


const NO_DIFF = 0,
    ADD = 1,
    REMOVE = 2;

export default class ResultTable extends Component {


    getCompareTable() {
        if (this.areAllNeededPropsValid()) {

            let arrayOfOriginalTextArrays = [];
            let arrayOfComparisonTextArrays = [];
            let compareArray = [];
            let keys = this.props.compareKeyChains;//should be an array of full keys
            let resultTableRowElements = [];//this should contain the final array of ResultsRow elements
            let colHeadersRowElement = [];//Header Value which will correspond the last value of the complete key path
            let longestArrayLength = 0;
            let first = true;
            //check for change - the number of columns to display depends on this check
            let noDiff = true;

            //need to iterate over each key selected
            keys.forEach((key) => {

                let keyComponentsArray = key.split('.');
                let headerText = keyComponentsArray[keyComponentsArray.length - 1];
                let textArrayOriginal = [];
                let textArrayComparison = [];


                if (first) {//For the first one we use the entire object of each array element to get the comparison, this will be used for the diffing
                    this.getJsonStringRepresentationForJsonArray(key, textArrayOriginal, textArrayComparison);
                    //create the diff tokens between the two and place into array of arrays
                    this.getDiffValues(textArrayOriginal, textArrayComparison, compareArray);
                    console.log({textArrayOriginal, textArrayComparison, compareArray});
                    textArrayOriginal.length = 0;
                    textArrayComparison.length = 0;
                    first = false;

                    for (let rowIndex = 0; rowIndex < compareArray.length; rowIndex++) {
                        if (compareArray[rowIndex] !== NO_DIFF_BACKGROUND) {
                            noDiff = false;
                            rowIndex = compareArray.length;
                        }
                    }

                    if(noDiff){
                        //Need a header for first column which is reserved to display the index numbers
                        colHeadersRowElement.push(<th key={'firstColumn'}> {''} </th>);
                    } else {
                        //Need a header for first two columns
                        colHeadersRowElement.push(<th key={'firstColumn'}> {''} </th>);
                        colHeadersRowElement.push(<th key={'secondColumn'}> {''} </th>);
                    }
                }

                //convert JSON to Array for both and put into an array of arrays
                this.getTextArraysFromJson(key,textArrayOriginal, textArrayComparison);

                //if no change then set colHeadersRowElement.push(<th key={headerText}> {headerText} </th>);
                if(noDiff){
                    //Need a header for first column which is reserved to display the index numbers
                    colHeadersRowElement.push(<th key={headerText}> {headerText} </th>);
                } else {
                    //Need a header for first two columns
                    colHeadersRowElement.push(<th key={headerText}> {headerText} </th>);
                    colHeadersRowElement.push(<th key={headerText + 'SecondColumn'}> {''} </th>);
                }

                arrayOfOriginalTextArrays.push(textArrayOriginal);
                arrayOfComparisonTextArrays.push(textArrayComparison);

                if(compareArray.length > longestArrayLength){
                    longestArrayLength = compareArray.length;
                }
            });


            resultTableRowElements.push(<tr key={'header row'}>{colHeadersRowElement}</tr>);
            let numColumns = this.props.compareKeyChains.length;

            //Convert the Text Array and the comparison info to rows
            let originalTextIndex = 0;
            let compareTextIndex = 0;
            for (let rowIndex = 0; rowIndex < longestArrayLength; rowIndex++) {

                //for each no change - add current (first++, and second++) index++, and value for two cells - in white
                //for each removal, add current (first++, and second) index++, add value for first cell - cells in Red
                //for each addition, add current (first, and second++) index, value in second cell - cells in green
                let singleRowTextValue = [];
                let singleRowCompareValue = [];
                let rowComparison = NO_DIFF_BACKGROUND;

                for (let colIndex = 0; colIndex < numColumns; colIndex++) {

                    let textArrayOriginal = arrayOfOriginalTextArrays[colIndex];
                    let textArrayComparison = arrayOfComparisonTextArrays[colIndex];

                    //need to add a remove_same and remove_diff, add_same and add_diff

                    if (compareArray[rowIndex] === REMOVE) {
                        if(colIndex === 0) {//first columns are reserved to display index
                            singleRowTextValue.push(originalTextIndex + 1);
                            singleRowTextValue.push('');
                            singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                            singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                        }
                        singleRowTextValue.push(textArrayOriginal[originalTextIndex]);
                        singleRowTextValue.push('');
                        //check if both text values are the same
                        if(textArrayOriginal === textArrayComparison) {
                            singleRowCompareValue.push(REMOVE_SAME_BACKGROUND);
                        } else {
                            singleRowCompareValue.push(REMOVE_DIFF_BACKGROUND);
                        }
                        singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                        rowComparison = REMOVE;
                    } else if (compareArray[rowIndex] === ADD) {
                        if(colIndex === 0) {
                            singleRowTextValue.push('');
                            singleRowTextValue.push(compareTextIndex + 1);
                            singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                            singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                        }
                        singleRowTextValue.push('');
                        singleRowTextValue.push(textArrayComparison[compareTextIndex]);
                        singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                        if(textArrayOriginal === textArrayComparison) {
                            singleRowCompareValue.push(ADD_SAME_BACKGROUND);
                        } else {
                            singleRowCompareValue.push(ADD_DIFF_BACKGROUND);
                        }
                        rowComparison = ADD;
                    } else {
                        //should be in both
                        if(colIndex === 0) {
                            singleRowTextValue.push(originalTextIndex + 1);
                            singleRowTextValue.push(compareTextIndex + 1);
                            singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                            singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                        }
                        singleRowTextValue.push(textArrayOriginal[originalTextIndex]);
                        singleRowTextValue.push(textArrayComparison[compareTextIndex]);
                        singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                        singleRowCompareValue.push(NO_DIFF_BACKGROUND);
                    }
                }

                if (rowComparison === REMOVE) {
                    originalTextIndex++;
                } else if (rowComparison === ADD) {
                    compareTextIndex++;
                } else {
                    originalTextIndex++;
                    compareTextIndex++;
                }

                resultTableRowElements.push(<ResultRow
                    key={'Result Table Row ' + rowIndex}
                    rowIndex={rowIndex}
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

    getTextArraysFromJson(key, textArrayOriginal, textArrayComparison) {
        if (key.includes('0')) {
            this.getTextArrayFromJsonArray(key, textArrayOriginal, textArrayComparison);
        } else {
            this.getTextArrayFromJsonSingle(key, textArrayOriginal, textArrayComparison);
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

        diffReturn = diffArrays(textArrayOriginal, textArrayComparison);
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
     * Retrieves the JSON string representation for a JSON array for the given key path,
     * places the text into textValueArray. If the
     * compareReturn Data is valid, then it will check if the key path is valid, and grab the comparison text
     * value as well.
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
     * compareReturn Data is valid, then it will check if the key path is valid, then popular the
     * textCompareArray with thee corresponding JSON string
     * @param singleCompareKeyChain - Period separated key values for the JSON object.
     * @param textValueArray - This method will push the text value for the entire JSON object in the array.
     * @param textCompareArray - This method will push the text value for comparison JSON object.
     */
    getJsonStringRepresentationForJsonArray(singleCompareKeyChain, textValueArray, textCompareArray) {
        const {returnData, compareReturnData} = this.props;

        let keys = singleCompareKeyChain.split('.');
        let arrayObject = undefined;
        let compareArrayObject = undefined;

        for (let i = 0; i < keys.length; i++) {
            let s = keys[i];
            if (s === '0') {
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

            if (compareFinalObject === undefined || compareFinalObject === null) {
                compareFinalObject = '';
            } else {
                compareFinalObject = JSON.stringify(compareFinalObject);
            }

            if (finalObject === undefined || finalObject === null) {
                finalObject = '';
            } else {
                finalObject = JSON.stringify(finalObject);
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

ResultTable.propTypes = {
    compareKeyChains: PropTypes.array.isRequired,
    returnData: PropTypes.object.isRequired,
    compareReturnData: PropTypes.object,
};