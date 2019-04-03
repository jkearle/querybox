import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
    render() {
        let compClass = "Menu";
        if (this.props.open) {
            compClass = "Menu visible"
        }
        return (
            <div className={compClass}>

            </div>
        );
    }
}

export default Menu;