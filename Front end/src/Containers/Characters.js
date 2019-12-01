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
        this.setState({filtered_data: newFilter})
    }

    // handleAll() {
    //     this.filterData("All");
    // }
    //
    // // handle75() {
    // //     this.filterData("75");
    // // }
    // //
    // // handleNot75() {
    // //     this.filterData("!75");
    // // }
    //
    // handleTank() {
    //     this.filterData("Tank");
    // }
    //
    // handleDamage() {
    //     this.filterData("DPS");
    // }
    // handleHeals() {
    //     this.filterData("Healer");
    // }

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
                    <button>All</button>
                    <label htmlFor="level">Level: </label>
                    <select id="level" onChange={this.handleLevelChange}>
                        <option value="All">All</option>
                        <option value="75">75s</option>
                        <option value="!75">Non 75s</option>
                    </select>
                    {/*<button onClick={this.handle75}>75s</button>*/}
                    {/*<button onClick={this.handleNot75}> Non 75s</button>*/}
                    <button> Tanks </button>
                    <button> DPS </button>
                    <button> Healers </button>
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