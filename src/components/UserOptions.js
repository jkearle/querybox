import React, {Component} from 'react';
import './SplitResults.css';
import {KeySelect} from "./index";
import {connect} from 'react-redux';
import {showJson, setSelectedKeys} from "../actions/actions";

class UserOptions extends Component {

    handleSelectionChange = () => {
        this.props.setSelectedKeys([...this.props.compareKeyChains]);//pass a copy for now, TODO looks to replace with calls that add and clear the original
    };

    showReturnInJson = () => {
        this.props.showJsonDispatch(true);
    };

    showReturnInCompare = () => {
        this.props.showJsonDispatch(false);
    };

    getTabButtons() {
        const {returnData1} = this.props;

        let jsonButtonName = '';
        let compareButtonName = '';
        if (!this.props.showJson) {
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

    getKeySelect() {
        const {returnData1, keys, compareKeyChains} = this.props;
        if (returnData1.data !== undefined) {
            return <KeySelect
                returnData={returnData1}
                keys={keys}
                compareKeyChains={compareKeyChains}
                selectedKeysUpdated={(selectedKeys) => this.handleSelectionChange(selectedKeys)}
            />
        }
    }

    render() {
        return (
            <div className='User Options'>
                {this.getTabButtons()}
                {this.getKeySelect()}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        returnData1: state.returnData.returnData1,
        keys: state.returnData.returnKeys,
        compareKeyChains: state.visualState.selectedKeys,
        showJson: state.visualState.showJson,
    };
};

const mapDispatchToProps = {
    setSelectedKeys: (selectedKeys) => setSelectedKeys(selectedKeys),
    showJsonDispatch: (show) => showJson(show)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions);