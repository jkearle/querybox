import React, { Component } from 'react';

class Result extends Component {
    render() {
        return (
            <tr key={this.props.i}>{this.props.result}</tr>
        );
    }
}

export default Result;