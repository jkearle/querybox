import React, {Component} from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import './KeySelect.css';

class KeySelect extends Component {
    handleSelectionChange = (selection) => {
        const {selectedKeysUpdated} = this.props;
        if(selectedKeysUpdated !== undefined) {
            selectedKeysUpdated(selection[0].value);
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
                size={6} />;
        }
    }

    render() {
        return (
            <div className="KeySelect">
                {this.getMultiSelect()}
            </div>
        );
    }
}

export default KeySelect;