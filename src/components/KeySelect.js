import React, {Component} from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import ActionButton from "./ActionButton"; //Found at https://react.rocks/example/react-filtered-multiselect


class KeySelect extends Component {
    handleSelectionChange = (selection) => {
        selection.forEach((s) => {
            if (!this.props.compareKeyChains.includes(s.value)) {
                this.props.compareKeyChains.push(s.value)//FIXME we need to guarantee this is an array
            }
        });
        this.props.selectedKeysUpdated(this.props.compareKeyChains);
    };

    getMultiSelect() {
        const {returnData} = this.props;

        let selectIds = [];
        if (returnData.data !== undefined) {
            this.findAllKeys('', selectIds, returnData.data);
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

    getSelectedKeys() {
        if (this.props.compareKeyChains.length > 0) {
            let selectedRows = [];

            this.props.compareKeyChains.forEach((singleCompareKeyChain) => {
                selectedRows.push(<tr key={singleCompareKeyChain + 'row'}>
                    <td key={singleCompareKeyChain + 'cell'}>
                        {singleCompareKeyChain}
                    </td>
                </tr>)
            });

            return <table>
                <tbody>
                {selectedRows}
                </tbody>
            </table>
        } else {
            return <div/>
        }
    }

    findAllKeys(base, keyArray, jsonObject) {//TODO Fireside is there a more efficient way to not call this every time - could move it to the parent element????
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

    clearSelected = () => {//TODO - mention this in Fireside and ask opinion. Putting the phat arrow function on the declaration.
        this.props.selectedKeysUpdated([]);//TODO should we be checking that this prop is not undefined?
    }

    render() {
        return (
            <div className="KeySelect">
                {this.getMultiSelect()}
                <ActionButton text=" Clear " onClick={this.clearSelected}/>
                {this.getSelectedKeys()}
            </div>
        );
    }
}

export default KeySelect;