import React, {Component} from 'react';
import './SplitResults.css';
import {KeySelect} from "./index";
import {connect} from 'react-redux';
import {setSelectedKeys} from "../actions/actions";

class UserOptions extends Component {

    handleSelectionChange = () => {
        this.props.setSelectedKeys([...this.props.compareKeyChains]);//pass a copy for now, TODO looks to replace with calls that add and clear the original
    };

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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions);