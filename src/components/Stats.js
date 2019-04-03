import React, { Component } from 'react';
import './Stats.css';

class Stats extends Component {
    render() {
        const {took} = this.props;

        let tookString = "n/a";
        if (typeof this.props.took !== "undefined") {
            tookString = this.props.took;
        }

        return (
            <table className="Stats" align="center">
                <tbody>
                    <tr>
                        <th>Took:</th>
                        <td>{tookString}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Stats;