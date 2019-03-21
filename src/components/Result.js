import React, {Component} from 'react';

class Result extends Component {
    render() {
        return (
            <tr>{this.props.result}</tr>
        );
    }
}

export default Result;