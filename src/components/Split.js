import React, { Component } from 'react';
import './Split.css';
import Query from "./Query";
import ResultTable from "./ResultTable";
import FilteredMultiSelect from 'react-filtered-multiselect';
//Found at https://react.rocks/example/react-filtered-multiselect

class Split extends Component {

    handleSelectionChange = () => {
        //TODO Add something to a "what to compare" list.
    };

    render() {
        let seconditem = "SplitItem";
        if (!this.props.split) {
            seconditem += " SplitHidden";
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
            for (let i = 0; i < this.props.results1.data.hits.hits.length; i++) {
                selectIds.push({text: this.props.results1.data.hits.hits[i]._id, value: i});
                console.log(this.props.results1.data.hits.hits[i]._id);
            }
        }
        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItem">
                        <Query query={this.props.query1} onClick={() => this.props.queryClick(1)}/>

                        <FilteredMultiSelect
                            onChange={this.handleSelectionChange}
                            options={selectIds}
                            textProp="text"
                            valueProp="value"
                        />

                        <ResultTable results={this.props.results1.data}/>
                    </div>
                    <div className={seconditem}>
                        <Query query={this.props.query2} onClick={() => this.props.queryClick(2)}/>
                        <ResultTable results={this.props.results2.data}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Split;