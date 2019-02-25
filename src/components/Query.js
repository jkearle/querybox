import React, { Component } from 'react';
import './Query.css'

class Query extends Component {
    render() {
        return (
            <div className="Query Component">
                <textarea readOnly="readOnly"></textarea>
            </div>
        );
    }
}

export default Query;