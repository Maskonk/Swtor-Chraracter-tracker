import React, {Component, Fragment} from 'react';

class Parses extends Component {
    constructor() {
        super();
        this.state = {
            parses: [{"character": "Fighterman", "class": "Sniper", "spec": "Virulence", "parse": 9557, "date":"05/11/19"},
                {"character": "Temido", "class": "Assassin", "spec": "Hatred", "parse": 10208, "date":"01/11/19"}]
        }
    }

    render() {
        const table_data = this.state.parses.map(parse => {return(
            <tr>
                <td>{parse.character}</td>
                <td>{parse.class}</td>
                <td>{parse.spec}</td>
                <td>{parse.parse}</td>
                <td>{parse.date}</td>
            </tr>
        )});
        return (
            <Fragment>
                <h1>Parses</h1>
                <table>
                    <tr>
                        <th>Character</th>
                        <th>Class</th>
                        <th>Spec</th>
                        <th>Parse</th>
                        <th>Date</th>
                    </tr>
                    {table_data}
                </table>
            </Fragment>
        )
    }
}

export default Parses;