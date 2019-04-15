import React, {Component} from 'react';
import './Endpoint.css';
import {setUrl} from '../actions/actions';
import {connect} from 'react-redux';


class Endpoint extends Component {
    render() {
        console.log('Endpoint render');
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
                        (event) => {this.props.dispatch(setUrl(event.target.value))}

                            //dispatch(updateUrl(event.target.value))

                            //
                        //(event) => this.props.save(event.target.value)
                    }/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('state.url - ' + state.url.url);
    //debugger;
    return {endpoint: state.url.url};
};

/*const mapDispatchToProps = dispatch => {
    return {
        updateUrl: url => dispatch(setUrl(url))
    }
}*/

export default connect(mapStateToProps )(Endpoint);