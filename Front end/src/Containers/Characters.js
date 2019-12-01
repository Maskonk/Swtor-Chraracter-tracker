import React, {Component} from 'react';
import './Characters.css';
import { Link } from "react-router-dom";
import TableHeader from "../Components/TableHeader";

class Characters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            filtered_data: []
        };

        this.handleAll = this.handleAll.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handle75 = this.handle75.bind(this);
        this.handleNot75 = this.handleNot75.bind(this);
        this.handleTank = this.handleTank.bind(this);
        this.handleDamage = this.handleDamage.bind(this);
    }

    componentDidMount() {
        this.setState({filtered_data: this.props.characters})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({filtered_data: this.props.characters})
        }
    }

    filterData(filter) {
        let newFilter = [];
        if (filter === "All") {
            this.setState({filtered_data: this.props.characters})
        }
        else if (filter === "75") {
            newFilter = this.props.characters.filter(character => {return character.level === "75"});
            this.setState({filtered_data: newFilter});
        }
        else if (filter === "!75") {
            newFilter = this.props.characters.filter(character => {return character.level !== "75"});
            this.setState({filtered_data: newFilter});
        }
        else if (filter === "Tank") {
            newFilter = this.props.characters.filter(character => {return character.role === "Tank"});
            this.setState({filtered_data: newFilter});
        }
        else if (filter === "DPS") {
            newFilter = this.props.characters.filter(character => {return character.role === "Damage"});
            this.setState({filtered_data: newFilter});
        }
    }

    handleAll() {
        this.filterData("All");
    }

    handle75() {
        this.filterData("75");
    }

    handleNot75() {
        this.filterData("!75");
    }

    handleTank() {
        this.filterData("Tank");
    }

    handleDamage() {
        this.filterData("DPS");
    }

    render() {
        const table_data = this.state.filtered_data.map((character, index) => {
            return (
                <tr key={index}>
                    <td> {index+1} </td>
                    <td>{character.character_name}</td>
                    <td>{character.class_name}</td>
                    <td className={character.faction_name}>{character.faction_name}</td>
                    <td className={character.role}>{character.role}</td>
                    <td>{character.level}</td>
                    <td>{character.renown_rank}</td>
                    <td>{character.social_rank}</td>
                    <td>{character.valor_rank}</td>
                    <td>{character.guild_name}</td>
                    <td><button><Link to={`/character/edit/${character.character_id}`}>Edit</Link></button></td>
                </tr>
            )});
        return (
            <React.Fragment>
                <h2>Characters</h2>
                <button><Link to="/character/new"> Add new character </Link> </button>
                <h3>Filters</h3>
                <div className="filters">
                    <button onClick={this.handleAll}>All</button>
                    <button onClick={this.handle75}>75s</button>
                    <button onClick={this.handleNot75}> Non 75s</button>
                    <button onClick={this.handleTank}> Tanks </button>
                    <button onClick={this.handleDamage}> DPS </button>
                    <button> Healers </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <TableHeader headerName="Name" headerId="character_name" onSort={this.props.onSort} sortFields={this.props.sortFields} />
                            <TableHeader headerName="Class" headerId="class_name" onSort={this.props.onSort} sortFields={this.props.sortFields}  />
                            <TableHeader headerName="Faction" headerId="faction_name" onSort={this.props.onSort} sortFields={this.props.sortFields}  />
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