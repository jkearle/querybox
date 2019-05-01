import React, {Component} from 'react';
import './SplitResults.css';
import Inspector from 'react-inspector'; //Found at https://www.npmjs.com/package/react-inspector
import {Stats, ResultTable} from "./index";
import {connect} from 'react-redux';


class SplitResults extends Component {
    getJsonTree(results) {
        if (results.data !== undefined && this.props.showJson) {
            return <Inspector data={results.data}/>
        }
    }

    getResultsTable(returnData, compareReturnData, originalTable) {
        if (returnData.data !== undefined && !this.props.showJson) {
            return <ResultTable
                returnData={returnData.data}
                compareReturnData={compareReturnData.data}
                compareKeyChains={this.props.compareKeyChains}
                originalTable={originalTable}
            />
        }
    }

    getStats(results) {
        if (results.data !== undefined &&
            results.data['took'] !== undefined) {
            return <Stats took={results.data['took']}/>
        }
    }


    render() {
        const {returnData1, returnData2, split} = this.props;

        let compareItem = "SplitItem";

        if (!split) {
            compareItem += " SplitHidden";
        }

        return (
            <div className="Split">
                <div className="SplitGridResults">
                    <div className="SplitItemResult">
                        {this.getStats(returnData1)}
                        {this.getJsonTree(returnData1)}
                        {this.getResultsTable(returnData1, returnData2, true)}
                    </div>
                    <div className={compareItem}>
                        {this.getStats(returnData2)}
                        {this.getJsonTree(returnData2)}
                        {this.getResultsTable(returnData2, returnData1, false)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        returnData1: state.returnData.returnData1,
        returnData2: state.returnData.returnData2,
        split: state.visualState.split,
        compareKeyChains: state.visualState.selectedKey,
        showJson: state.visualState.showJson,
    };
};

export default connect(mapStateToProps)(SplitResults);