import React, {Component} from 'react';
import './Characters.css';
import { Link } from "react-router-dom";
import TableHeader from "../Components/TableHeader";

class Characters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            filtered_data: [],
            filters: {
                level: null,
                faction: null,
                role: null
            }
        };

        this.filterData = this.filterData.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleFactionChange = this.handleFactionChange.bind(this);
    }

    componentDidMount() {
        this.setState({filtered_data: this.props.characters})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({filtered_data: this.props.characters})
        }
    }

    filterData() {
        let newFilter = this.props.characters;

        if (this.state.filters.level) {
            if (this.state.filters.level === "!75") {
                newFilter = newFilter.filter(character => {return character.level !== "75"})
            }
            else {
                newFilter = newFilter.filter(character => {
                    return character.level === this.state.filters.level
                })
            }
        }
        if (this.state.filters.role) {
                newFilter = newFilter.filter(character => {
                    return character.role === this.state.filters.role
            })
        }
        if (this.state.filters.faction) {
            newFilter = newFilter.filter(character => {
                return character.faction_name === this.state.filters.faction
            })
        }
        this.setState({filtered_data: newFilter})
    }

    handleLevelChange(event) {
        let filters = this.state.filters;
        if (event.target.value === "All"){
                        filters.level = null;
            this.setState({filters: filters})
        }
        else {
            filters.level = event.target.value;
            this.setState({filters: filters})
        }
        this.filterData();
    }

    handleRoleChange(event) {
        let filters = this.state.filters;
        if (event.target.value === "All"){
            filters.role = null;
            this.setState({filters: filters});
        }
        else {
            filters.role = event.target.value;
            this.setState({filters: filters});
        }
        this.filterData();
    }

    handleFactionChange(event) {
        let filters = this.state.filters;
        if (event.target.value === "All"){
            filters.faction = null;
            this.setState({filters: filters});
        }
        else {
            filters.faction = event.target.value;
            this.setState({filters: filters});
        }
        this.filterData();
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

        const guild_data = this.props.guilds.map(guild => {
            return (
                <option key={guild.id} value={guild.id}>{guild.guild_name}</option>
            )});

        return (
            <React.Fragment>
                <h2>Characters</h2>
                <button><Link to="/character/new"> Add new character </Link> </button>
                <h3>Filters</h3>
                <div className="filters">
                    <button>All</button>&emsp;
                    <label htmlFor="level">Level: </label>&ensp;
                    <select id="level" onChange={this.handleLevelChange}>
                        <option value="All">All</option>
                        <option value="75">75s</option>
                        <option value="!75">Non 75s</option>
                    </select>&emsp;
                    <label htmlFor="role">Role: </label>&ensp;
                    <select id="role" onChange={this.handleRoleChange}>
                        <option value="All">All</option>
                        <option value="Tank">Tanks</option>
                        <option value="Damage">DPS</option>
                        <option value="Healer">Healers</option>
                    </select>&emsp;
                    <label htmlFor="faction">Faction: </label>&ensp;
                    <select id="faction" onChange={this.handleFactionChange}>
                        <option value="All">All</option>
                        <option value="Imperial">Imperial</option>
                        <option value="Republic">Republic</option>
                    </select>&emsp;
                    <label htmlFor="guild">Guild: </label>&ensp;
                    <select id="guild" onChange={this.handleRoleChange}>
                        <option value="All">All</option>
                        {guild_data}
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <TableHeader headerName="Name" headerId="character_name" onSort={this.props.onSort} sortFields={this.props.sortFields} characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Class" headerId="class_name" onSort={this.props.onSort} sortFields={this.props.sortFields}  characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Faction" headerId="faction_name" onSort={this.props.onSort} sortFields={this.props.sortFields}  characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Role" headerId="role" onSort={this.props.onSort} sortFields={this.props.sortFields}  characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Level" headerId="level" onSort={this.props.onSort} sortFields={this.props.sortFields}  characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Renown Rank" headerId="renown_rank" onSort={this.props.onSort} sortFields={this.props.sortFields} characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Social" headerId="social_rank" onSort={this.props.onSort} sortFields={this.props.sortFields} characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Valor" headerId="valor_rank" onSort={this.props.onSort} sortFields={this.props.sortFields} characterSet={this.state.filtered_data}/>
                            <TableHeader headerName="Guild" headerId="guild_name" onSort={this.props.onSort} sortFields={this.props.sortFields} characterSet={this.state.filtered_data}/>
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