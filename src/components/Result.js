import React, {Component} from 'react';

class Result extends Component {
    render() {
        let color = "white";
        if (this.props.diff === true) {
            color = "#ff4500";
        } else if (this.props.same === true) {
            color = "#9acd32";
        }

        return (
            <tr bgcolor={color}>{this.props.result}</tr>
        );
    }
}

export default Result;