import React, { Component } from 'react';
import './SplitResults.css';
import ResultTable from "./ResultTable";
import FilteredMultiSelect from 'react-filtered-multiselect';
//Found at https://react.rocks/example/react-filtered-multiselect
import Inspector from 'react-inspector';
import {Stats} from "./index";
//Found at https://www.npmjs.com/package/react-inspector

class SplitResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompare1: false,
            showJson1: true,
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

    getMultiSelect(selectIds){
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

    render() {
        let compareItem = "SplitItem";
        if (!this.props.split) {
            compareItem += " SplitHidden";
        }

        console.log("Split " + this.props.results1.data);
      /*  let options = [
            {value: 1, text: 'Item One'},
            {value: 2, text: 'Item Two'}
        ]; */

        let selectIds = [];
        if (this.props.results1.data !== undefined &&
            this.props.results1.data.hits !== undefined &&
            this.props.results1.data.hits.hits !== undefined) {

            Object.keys(this.props.results1.data.hits.hits[0]._source).forEach(function(keyValue){
                selectIds.push({text: keyValue, value: keyValue});
            });

            //for (let i = 0; i < this.props.results1.data.hits.hits.length; i++) {
                //selectIds.push({text: this.props.results1.data.hits.hits[i]._id, value: i});
                //console.log(this.props.results1.data.hits.hits[i]._id);
            //}
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
                        {this.getMultiSelect(selectIds)}
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