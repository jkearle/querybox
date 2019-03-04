import React, { Component } from 'react';
import './MenuIcon.css';

class MenuIcon extends Component {
    render() {
        return (
            <div className="MenuIcon" onClick={this.props.onClick}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default MenuIcon;