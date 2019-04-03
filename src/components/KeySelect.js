import React, {Component} from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import './KeySelect.css';


class KeySelect extends Component {
    handleSelectionChange = (selection) => {
        const {selectedKeysUpdated} = this.props;
        selection.forEach((s) => {
            if (this.props.compareKeyChains !== undefined  && Array.isArray(this.props.compareKeyChains)) {
                if (!this.props.compareKeyChains.includes(s.value)) {
                    this.props.compareKeyChains.push(s.value)
                }
            }
        });
        if(selectedKeysUpdated !== undefined) {
            selectedKeysUpdated(this.props.compareKeyChains);
        }
    };

    getMultiSelect() {
        const {keys} = this.props;

        if (keys.length > 0) {
            return <FilteredMultiSelect
                onChange={this.handleSelectionChange}
                options={keys}
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
                    <td className={'cellAlignLeft'}
                        key={singleCompareKeyChain + 'cell'}>
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


    clearSelected = () => {
        const {selectedKeysUpdated} = this.props;
        if (selectedKeysUpdated !== undefined) {
            selectedKeysUpdated([]);
        }
    };

    render() {
        return (
            <div className="KeySelect">
                {this.getMultiSelect()}
                <button className={'clearButton'} onClick={this.clearSelected}>{'Clear'} </button>
                {this.getSelectedKeys()}
            </div>
        );
    }
}

export default KeySelect;