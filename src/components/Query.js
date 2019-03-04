import React, { Component } from 'react';
import './Query.css'

class Query extends Component {
    render() {
        return (
            <div className="Query Component">
                <textarea
                    readOnly="readOnly"
                    onClick={this.props.onClick}
                    value={this.props.query}
                    placeholder="Enter your Elasticsearch query here...">
                </textarea>
            </div>
        );
    }
}

export default Query;