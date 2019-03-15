import React, { Component } from 'react';
import './Stats.css';

class Stats extends Component {
    render() {
        let took = "n/a";
        if (typeof this.props.took !== "undefined") {
            took = this.props.took;
        }

        return (
            <table className="Stats" align="center">
                <tbody>
                    <tr>
                        <th>Took:</th>
                        <td>{took}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Stats;