import React, {Component, Fragment} from 'react';
import './Stats.css'
import DeleteButton from "../Components/Parses/DeleteButton";

class Stats extends Component {
    componentDidMount() {
        document.title = "Stat Tracker - SWTOR Character Tracker"
    }

    render() {
        const table_data = this.props.stats.map(stat => {return(
            <tr key={stat.spec_name}>
                <td>{stat.spec_name}</td>
                <td>{stat.count}</td>
                <td>{Math.round(stat.max)}</td>
                <td>{Math.round(stat.avg)}</td>
            </tr>
        )});
        return (
            <Fragment>
                <h1>Parses</h1>
                <table>
                    <thead>
                        <tr>
                            <td> Spec </td>
                            <td> No.of Parses </td>
                            <td> Highest Parse </td>
                            <td> Average Parse </td>
                        </tr>
                    </thead>
                    <tbody>
                        {table_data}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default Stats;
