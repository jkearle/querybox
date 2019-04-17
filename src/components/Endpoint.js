import React, {Component} from 'react';
import './Endpoint.css';
import {setUrl} from '../actions/actions';
import {connect} from 'react-redux';


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
                    onChange={
                        (event) => this.props.updateUrl(event.target.value)
                    }/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {endpoint: state.url.url};
};

//Two different ways of hooking up the dispatch functions. This one is with functions, the latter is with objects
/*const mapDispatchToProps = dispatch => {
    return {
        updateUrl: url => dispatch(setUrl(url))//this particular pattern will add updateUrl to props
    }
}
 */

const mapDispatchToProps = {
    updateUrl: (url) => setUrl(url)//this particular pattern will add updateUrl to props
}

export default connect(mapStateToProps, mapDispatchToProps)(Endpoint);