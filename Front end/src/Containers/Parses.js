import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

class Parses extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const table_data = this.props.parses.map(parse => {return(
            <tr key={parse.id}>
                <td>{parse.character_name}</td>
                <td>{parse.class_name}</td>
                <td>{parse.spec_name}</td>
                <td>{parse.dps}</td>
                <td>{parse.date}</td>
            </tr>
        )});
        return (
            <Fragment>
                <h1>Parses</h1>
                <button><Link to="/parse/new"> Add new character </Link> </button>
                <table>
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Class</th>
                            <th>Spec</th>
                            <th>Parse</th>
                            <th>Date</th>
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

export default Parses;