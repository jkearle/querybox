import React, { Component } from 'react';
import './Query.css';
import PropTypes from "prop-types";

export default class Query extends Component {
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

Query.propTypes = {
    query: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};