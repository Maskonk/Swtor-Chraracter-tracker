import React, {Component} from 'react';
import './Characters.css';

class Characters extends Component {
    constructor() {
        super();
        this.state = {
            characters: [{"name": "Fighterman", "class": "Sniper", "level": 70, "command_rank": 300, "social": 10, "valor": 60, "guild": "Darc"},
                {"name": "Temido", "class": "Assassin", "level": 70, "command_rank": 300, "social": 10, "valor": 60, "guild": "Untempered Dread"}],
            characters2: []
        };

        fetch('127.0.0.1:3000/characters').then(res => console.log(res))//.then(data => {this.setState({characters2: data}); console.log(data)})
    }

    render() {
        const table_data = this.state.characters.map(character => {
            return (
                <tr>
                    <td>{character.name}</td>
                    <td>{character.class}</td>
                    <td>{character.level}</td>
                    <td>{character.command_rank}</td>
                    <td>{character.social}</td>
                    <td>{character.valor}</td>
                    <td>{character.guild}</td>
                </tr>
            )});
        return (
            <React.Fragment>
                <h1>Characters</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Level</th>
                        <th>Command Rank</th>
                        <th>Social</th>
                        <th>Valor</th>
                        <th>Guild</th>
                    </tr>
                    {table_data}
                </table>
            </React.Fragment>

        )
    }
}

export default Characters;