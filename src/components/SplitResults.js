import React, {Component} from 'react';
import './SplitResults.css';
import Inspector from 'react-inspector'; //Found at https://www.npmjs.com/package/react-inspector
import {Stats, ResultTable, KeySelect} from "./index";


class SplitResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompare: true,
            showJson: false,
            compareKeyChains: []
        };
    }

    handleSelectionChange = (selectedKeys) => {
        this.setState({compareKeyChains: selectedKeys});
    };


    showReturnInJson = () => {
        this.setState({showCompare: false, showJson: true});
    };

    showReturnInCompare = () => {
        this.setState({showCompare: true, showJson: false});
    };

    getTabButtons() {
        const {returnData1} = this.props;

        let jsonButtonName = '';
        let compareButtonName = '';
        if (this.state.showCompare) {
            compareButtonName = 'selected';
        } else {
            jsonButtonName = 'selected';
        }

        if (returnData1.data !== undefined) {
            return <div className="split_display_return_select">
                <button className={compareButtonName} onClick={this.showReturnInCompare}>Compare</button>
                <button className={jsonButtonName} onClick={this.showReturnInJson}>JSON</button>
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
                compareKeyChains={this.state.compareKeyChains}
            />
        }
    }

    getKeySelect() {
        const {returnData1, keys} = this.props;
        if (returnData1.data !== undefined) {
            return <KeySelect
                returnData={returnData1}
                keys={keys}
                compareKeyChains={this.state.compareKeyChains}
                selectedKeysUpdated={(selectedKeys) => this.handleSelectionChange(selectedKeys)}
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
                        {this.getResultsTable(returnData1, returnData2)}
                    </div>
                    <div className={compareItem}>
                        {this.getTabButtons()}
                        {this.getKeySelect()}
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