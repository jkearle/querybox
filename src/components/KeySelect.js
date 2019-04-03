import React, {Component} from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import './KeySelect.css';


class KeySelect extends Component {
    handleSelectionChange = (selection) => {
        selection.forEach((s) => {
            if (!this.props.compareKeyChains.includes(s.value)) {
                this.props.compareKeyChains.push(s.value)//TODO Do we need to guarantee this is an array?
            }
        });
        this.props.selectedKeysUpdated(this.props.compareKeyChains);
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
        this.props.selectedKeysUpdated([]);//TODO should we be checking that this prop is not undefined?
    }

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