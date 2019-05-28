import React, {Component} from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import './KeySelect.css';
import PropTypes from "prop-types";

export default class KeySelect extends Component {
    handleSelectionChange = (selection) => {

        //debugger;
        selection.forEach((s) => {
            if (this.props.compareKeyChains !== undefined && Array.isArray(this.props.compareKeyChains)) {
                if (!this.props.compareKeyChains.includes(s.value)) {
                    this.props.compareKeyChains.push(s.value)
                }
            }
        });

        const {selectedKeysUpdated} = this.props;
        if(selectedKeysUpdated !== undefined) {
            selectedKeysUpdated();
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


    clearSelected = () => {
        const {selectedKeysUpdated} = this.props;
        if (selectedKeysUpdated !== undefined) {
            this.props.compareKeyChains.length = 0;
            selectedKeysUpdated();
        }
    };

    render() {
        return (
            <div className="KeySelect">
                {this.getMultiSelect()}
                <button className={'clearButton'} onClick={this.clearSelected}>{'Clear'} </button>
            </div>
        );
    }
}


KeySelect.propTypes = {
    compareKeyChains: PropTypes.array.isRequired,
    selectedKeysUpdated: PropTypes.func.isRequired,
};