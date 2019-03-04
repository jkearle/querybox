import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
    render() {
        let compclass = "Menu";
        if (this.props.open) {
            compclass = "Menu visible"
        }
        return (
            <div className={compclass}>

            </div>
        );
    }
}

export default Menu;