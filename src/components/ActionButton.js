import React, { Component } from 'react';
import './ActionButton.css';

class ActionButton extends Component {
    render() {
        return (
            <button className="ActionButton" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default ActionButton;