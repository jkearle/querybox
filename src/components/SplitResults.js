import React, {Component} from 'react';
import './SplitResults.css';
import FilteredMultiSelect from 'react-filtered-multiselect'; //Found at https://react.rocks/example/react-filtered-multiselect
import Inspector from 'react-inspector'; //Found at https://www.npmjs.com/package/react-inspector
import {Stats, ResultTable} from "./index";


class SplitResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompare: true,
            showJson: false,
            compareKeyChain: []
        };
    }

    handleSelectionChange = (selection) => {
        console.log(selection);
        let keyValues = [];
        selection.forEach((s) => {
            keyValues.push(s.value)
        });
        this.setState({compareKeyChain: keyValues});
    };

    showReturnInJson = () => {
        this.setState({showCompare: false, showJson: true});
    };

    showReturnInCompare = () => {
        this.setState({showCompare: true, showJson: false});
    };

    getTabButtons() {
        const {returnData1} = this.props;

        if (returnData1.data !== undefined) {
            return <div className="Split Display Return Select">
                <button className={'compare'} onClick={this.showReturnInCompare}>Compare</button>
                <button className={'json'} onClick={this.showReturnInJson}>JSON</button>
            </div>
        }
    }

    getJsonTree(results) {
        if (results.data !== undefined && this.state.showJson) {
            return <Inspector data={results.data}/>
        }
    }

    getResultsTable(returnData, compareReturnData) {
        if (returnData.data !== undefined && this.state.showCompare) {
            return <ResultTable
                returnData={returnData.data}
                compareReturnData={compareReturnData.data}
                compareKeyChain={this.state.compareKeyChain}
            />
        }
    }

    getStats(results) {
        if (results.data !== undefined &&
            results.data.took !== undefined) {
            return <Stats took={results.data.took}/>
        }
    }

    getMultiSelect() {
        const {returnData1} = this.props;

        let selectIds = [];
        if (returnData1.data !== undefined) {
            this.findAllKeys('', selectIds, returnData1.data);
        }
        if (selectIds.length > 0) {
            return <FilteredMultiSelect
                onChange={this.handleSelectionChange}
                options={selectIds}
                textProp="text"
                valueProp="value"
                size={6}
            />;
        }
    }

    findAllKeys(base, keyArray, jsonObject) {
        Object.keys(jsonObject).forEach((keyValue) => {
            if (typeof jsonObject[keyValue] == 'object' && jsonObject[keyValue] !== null) {//If it's an object we need to call this function on the object to get the child keys
                //get the children
                if (jsonObject instanceof Array && keyValue !== '0') {//If it's an array, just iterate over the first one and return on the rest
                    return;
                }
                if (base === '') {
                    this.findAllKeys(keyValue, keyArray, jsonObject[keyValue]);
                } else {
                    this.findAllKeys(base + '.' + keyValue, keyArray, jsonObject[keyValue]);
                }
            } else {
                if (base === '') {
                    keyArray.push({text: keyValue, value: keyValue});
                } else {
                    keyArray.push({text: base + '.' + keyValue, value: base + '.' + keyValue});
                }

            }
        });
    };

    render() {
        const {returnData1, returnData2, split} = this.props;

        let compareItem = "SplitItem";

        if (!split) {
            compareItem += " SplitHidden";
        }
        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItemResult">
                        {this.getStats(returnData1)}
                        {this.getTabButtons()}
                        {this.getJsonTree(returnData1)}
                        {this.getResultsTable(returnData1, returnData2)}
                    </div>
                    <div className={compareItem}>
                        {this.getMultiSelect()}
                    </div>
                    <div className={compareItem}>
                        {this.getStats(returnData2)}
                        {this.getJsonTree(returnData2)}
                        {this.getResultsTable(returnData2, returnData1)}
                    </div>
                </div>
            </div>
        );
    }
}

export default SplitResults;