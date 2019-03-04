import React, { Component } from 'react';
import './Endpoint.css';

class Endpoint extends Component {
    render() {
        return (
            <div className="Endpoint Component">
                <label htmlFor="endpoint">Search Endpoint</label>
                <input
                    name="endpoint"
                    type="text"
                    value={this.props.endpoint}
                    placeholder="Example: https://127.0.0.1/_all/_search"
                    onChange={(event) => this.props.save(event.target.value)}/>
            </div>
        );
    }
}

export default Endpoint;