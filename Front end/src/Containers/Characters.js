import React, {Component} from 'react';
import './Characters.css';
import { Link } from "react-router-dom";
import TableHeader from "../Components/TableHeader";

class Characters extends Component {

    render() {
        const table_data = this.props.characters.map((character, index) => {
            return (
                <tr key={index}>
                    <td> {index+1} </td>
                    <td className={character.faction_name}>{character.character_name}</td>
                    <td className={character.faction_name}>{character.class_name}</td>
                    <td className={character.role}>{character.role}</td>
                    <td>{character.level}</td>
                    <td>{character.renown_rank}</td>
                    <td>{character.social_rank}</td>
                    <td>{character.valor_rank}</td>
                    <td>{character.guild_name}</td>
                    <td><button><Link to={`/character/edit/${character.character_id}`}>Edit</Link></button></td>
                    {/*<td><form action={`http://127.0.0.1:3000/character/delete/${character.character_id}`}*/}
                    {/*          method="delete"><button type="submit">Delete</button></form></td>*/}
                </tr>
            )});
        return (
            <React.Fragment>
                <h2>Characters</h2>
                <button><Link to="/character/new"> Add new character </Link> </button>
                <h3>Filters</h3>
                <div className="filters">
                    <button>All</button>
                    <button>75s</button>
                    <button> Non 75s</button>
                    <button> Tanks </button>
                    <button> DPS </button>
                    <button> Healers </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <TableHeader headerName="Name" headerId="character_name" onSort={this.props.onSort} sortFields={this.props.sortFields} />
                            <TableHeader headerName="Class" headerId="class_name" onSort={this.props.onSort} sortFields={this.props.sortFields}  />
                            <TableHeader headerName="Role" headerId="role" onSort={this.props.onSort} sortFields={this.props.sortFields}  />
                            <TableHeader headerName="Level" headerId="level" onSort={this.props.onSort} sortFields={this.props.sortFields}  />
                            <TableHeader headerName="Renown Rank" headerId="renown_rank" onSort={this.props.onSort} sortFields={this.props.sortFields} />
                            <TableHeader headerName="Social" headerId="social_rank" onSort={this.props.onSort} sortFields={this.props.sortFields} />
                            <TableHeader headerName="Valor" headerId="valor_rank" onSort={this.props.onSort} sortFields={this.props.sortFields} />
                            <TableHeader headerName="Guild" headerId="guild_name" onSort={this.props.onSort} sortFields={this.props.sortFields} />
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