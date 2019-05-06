import React, { Component } from 'react';
import './ActionButton.css';
import PropTypes from 'prop-types';

export default class ActionButton extends Component {
    render() {
        return (
            <button className="ActionButton" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

ActionButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};