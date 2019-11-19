import React, {Component} from 'react';
import './Characters.css';
import { Link } from "react-router-dom";

class Characters extends Component {

    render() {
        const table_data = this.props.characters.map(character => {
            return (
                <tr key={character.id}>
                    <td>{character.character_name}</td>
                    <td>{character.class_name}</td>
                    <td>{character.level}</td>
                    <td>{character.renown_rank}</td>
                    <td>{character.social_rank}</td>
                    <td>{character.valor_rank}</td>
                    <td>{character.guild_name}</td>
                    <td><button><Link to={`/character/edit/${character.id}`}>Edit</Link></button></td>
                </tr>
            )});
        return (
            <React.Fragment>
                <h1>Characters</h1>
                <button><Link to="/new_character"> Add new character </Link> </button>
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