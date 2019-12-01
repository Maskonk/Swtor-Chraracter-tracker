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
        let newFilter = [];
        if (this.state.filter === null) {
            this.setState({filtered_data: this.props.characters})
        }
        else if (this.state.filter === "75") {
            newFilter = this.state.filtered_data.filter(character => {return character.level === "75"});
            this.setState({filtered_data: newFilter})
        }
        this.render()
    }

    handleAll() {
        this.setState({filter: null});
        this.filterData();
    }

    handle75() {
        this.setState({filter: "75"});
        this.filterData();
    }

    render() {
        const table_data = this.state.filtered_data.map((character, index) => {
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