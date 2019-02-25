import React, { Component } from 'react';
import './Endpoint.css';

class Endpoint extends Component {
    render() {
        return (
            <div className="Endpoint Component">
                <label for="endpoint">Search Endpoint</label>
                <input name="endpoint" type="text" placeholder="Example: https://127.0.0.1/_all/_search"/>
            </div>
        );
    }
}

export default Endpoint;