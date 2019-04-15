import React, { Component } from 'react';
import './Mode.css';

class Mode extends Component {
    render() {
        const {single, compare} = this.props;

        let singleClass = "selected";
        let compareClass = "";
        if (this.props.split) {
            singleClass = "";
            compareClass = "selected";
        }
        return (
            <div className="Mode Component">
                <button className={singleClass} onClick={single}>Single</button>
                <button className={compareClass} onClick={compare}>Compare</button>
            </div>
        );
    }
}

export default Mode;