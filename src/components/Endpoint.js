import React, {Component} from 'react';
import './Endpoint.css';

class Endpoint extends Component {
    render() {
        return (
            <div className="Endpoint Component">
                <div className={'labelsDiv'}>
                    <div className={'endpointLabelDiv'}>
                        <label htmlFor="endpoint">Search Endpoint</label>
                    </div>
                    <div className={'statusLabelDiv'}>
                        <label>{'Status:' + this.props.statusText}</label>
                    </div>
                </div>
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