import React, { Component } from 'react';
import './SplitResults.css';
import ResultTable from "./ResultTable";
import FilteredMultiSelect from 'react-filtered-multiselect';//Found at https://react.rocks/example/react-filtered-multiselect
import Inspector from 'react-inspector';//Found at https://www.npmjs.com/package/react-inspector
import {Stats} from "./index";


class SplitResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompare: false,
            showJson: true,
        };
    }

    handleSelectionChange = () => {
        //TODO Add something to a "what to compare" list.
    };

    showReturnInJson = () => {
        this.setState({showCompare: false, showJson: true});
    };

    showReturnInCompare = () => {
        this.setState({showCompare: true, showJson: false});
    };

    getTabButtons(){
        if(this.props.results1.data !== undefined){
            return  <div className="Split Display Return Select">
                <button className={'compare'} onClick={this.showReturnInCompare}>Compare</button>
                <button className={'json'} onClick={this.showReturnInJson}>JSON</button>
            </div>
        }
    }

    getJsonTree(results){
        if(results.data !== undefined && this.state.showJson){
            return <Inspector data={ results.data } />
        }
    }

    getResultsTable(results){
        if(results.data !== undefined && this.state.showCompare){
            return <ResultTable results={results.data}/>
        }
    }

    getStats(results){
        if(results.data !== undefined){
            return <Stats took={results.data.took}/>
        }
    }

    getMultiSelect(){
        let selectIds = [];
        if (this.props.results1.data !== undefined) {
            this.findAllKeys('', selectIds, this.props.results1.data);
        }
        if(selectIds.length > 0){
            return <FilteredMultiSelect
                onChange={this.handleSelectionChange}
                options={selectIds}
                textProp="text"
                valueProp="value"
                size={6}
            />;
        }
    }

    findAllKeys(base, keyArray, jsonObject){
        Object.keys(jsonObject).forEach((keyValue) => {
            if(typeof jsonObject[keyValue] == 'object' && jsonObject[keyValue] !== null) {//If it's an object we need to call this function on the object to get the child keys
                //get the children
                if(jsonObject[keyValue] !== null ){ //TODO simplify this conditional
                    if(jsonObject instanceof Array) {
                        if (keyValue !== '0') {
                            return;
                        }
                    }
                    if(base === ''){
                        this.findAllKeys(keyValue , keyArray, jsonObject[keyValue]);
                    } else {
                        this.findAllKeys(base + '.' + keyValue , keyArray, jsonObject[keyValue]);
                    }
                }
            } else {
                if(base === ''){//TODO would love some guidelines or thoughts on using the comparison operators - without strongly typed variables, which do you choose? New concept for me.
                    keyArray.push({text: keyValue, value: keyValue});
                } else {
                    keyArray.push({text: base + '.' + keyValue, value: base + '.' + keyValue});
                }

            }
        });
    };

    render() {
        let compareItem = "SplitItem";
        if (!this.props.split) {
            compareItem += " SplitHidden";
        }
        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItemResult">
                        {this.getStats(this.props.results1)}
                        {this.getTabButtons()}
                        {this.getJsonTree(this.props.results1)}
                        {this.getResultsTable(this.props.results1)}
                    </div>
                    <div className={compareItem}>
                        {this.getMultiSelect()}
                    </div>
                    <div className={compareItem}>
                        {this.getStats(this.props.results2)}
                        {this.getJsonTree(this.props.results2)}
                        {this.getResultsTable(this.props.results2)}
                    </div>
                </div>
            </div>
        );
    }
}

export default SplitResults;