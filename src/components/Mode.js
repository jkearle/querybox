import React, { Component } from 'react';
import './Mode.css';

class Mode extends Component {
    render() {
        let singleclass = "selected";
        let compareclass = "";
        if (this.props.split) {
            singleclass = "";
            compareclass = "selected";
        }
        return (
            <div className="Mode Component">
                <button className={singleclass} onClick={this.props.single}>Single</button>
                <button className={compareclass} onClick={this.props.compare}>Compare</button>
            </div>
        );
    }
}

export default Mode;