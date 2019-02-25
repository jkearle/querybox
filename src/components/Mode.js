import React, { Component } from 'react';
import './Mode.css';

class Mode extends Component {
    render() {
        return (
            <div className="Mode Component">
                <button className="selected">Single</button>
                <button>Compare</button>
            </div>
        );
    }
}

export default Mode;