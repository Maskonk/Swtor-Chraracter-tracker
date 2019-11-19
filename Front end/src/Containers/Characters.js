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
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/characters';

        fetch(url)
            .then(res => res.json())
            .then(characters => {this.setState({ characters2: characters })})
            .catch(err => console.error);
    }

    render() {
        const table_data = this.state.characters2.map(character => {
            return (
                <tr>
                    <td>{character.character_name}</td>
                    <td>{character.class_name}</td>
                    <td>{character.level}</td>
                    <td>{character.renown_rank}</td>
                    <td>{character.social_rank}</td>
                    <td>{character.valor_rank}</td>
                    <td>{character.guild_name}</td>
                </tr>
            )});
        console.log(this.state.characters2);
        return (
            <React.Fragment>
                <h1>Characters</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Level</th>
                            <th>Command Rank</th>
                            <th>Social</th>
                            <th>Valor</th>
                            <th>Guild</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table_data}
                    </tbody>
                </table>
            </React.Fragment>

        )
    }
}

export default Characters;