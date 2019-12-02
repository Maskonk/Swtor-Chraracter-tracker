import React, {Component} from 'react';
import Characters from "../Containers/Characters";
import Home from "./Home";
import Parses from "../Containers/Parses";
import Stats from "../Containers/Stats";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import NewCharacter from "./NewCharacter";
import EditCharacter from "./EditCharacter";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            selected_character: {},
            sort: {
                column: null,
                direction: 'desc',
            },
            guild_list: []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleRenownChange = this.handleRenownChange.bind(this);
        this.handleSocialChange = this.handleSocialChange.bind(this);
        this.handleValorChange = this.handleValorChange.bind(this);
        this.handleGuildChange = this.handleGuildChange.bind(this);
        this.onSort = this.onSort.bind(this);
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/';

        fetch(url + "characters")
            .then(res => res.json())
            .then(characters => {this.setState({ characters: characters })})
            .catch(err => console.error);

        fetch(url + "guilds")
            .then(res => res.json())
            .then(guilds => {this.setState({ guild_list: guilds })})
            .catch(err => console.error);
    }

    findCharacterById(id) {
        const character = this.state.characters.find(character => character.character_id === id);
        if (this.state.selected_character !== character) {
            this.setState({selected_character: character});
        }
        return character;
    }

    handleNameChange(event) {
        let character = this.state.selected_character;
        character.character_name = event.target.value;
        this.setState({selected_character: character});
    }

    handleClassChange(event) {
        let character = this.state.selected_character;
        character.class_id = event.target.value;
        this.setState({selected_character: character});
    }

    handleRoleChange(event) {
        let character = this.state.selected_character;
        character.role = event.target.value;
        this.setState({selected_character: character});
    }

    handleLevelChange(event) {
        let character = this.state.selected_character;
        character.level = event.target.value;
        this.setState({selected_character: character});
    }

    handleRenownChange(event) {
        let character = this.state.selected_character;
        character.renown_rank = event.target.value;
        this.setState({selected_character: character});
    }

    handleSocialChange(event) {
        let character = this.state.selected_character;
        character.social_rank = event.target.value;
        this.setState({selected_character: character});
    }

    handleValorChange(event) {
        let character = this.state.selected_character;
        character.valor_rank = event.target.value;
        this.setState({selected_character: character});
    }

    handleGuildChange(event) {
        let character = this.state.selected_character;
        character.guild_id = event.target.value;
        this.setState({selected_character: character});
    }

    onSort(column, characters)  {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = characters.sort((a, b) => {
            if (isNaN(a[column])) {
                if (a[column] > b[column]) {
                    return 1
                }
                if (a[column] < b[column]) {
                    return -1
                }
                return 0
            }
            else {
                return a[column] - b[column]
            }

        });

        if (direction === 'desc') {
            sortedData.reverse();
        }

        this.setState({
            characters: sortedData,
            sort: {
                column,
                direction,
            }
        });
    };


    render() {
        return (
            <Router>
                <React.Fragment>
                    <Nav/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/characters" render={() => <Characters characters={this.state.characters}
                                                                              onSort={this.onSort}
                                                                              sortFields={this.state.sort}
                                                                              guilds={this.state.guild_list}/>} />
                    <Route exact path="/character/new" render={() => <NewCharacter guilds={this.state.guild_list}/>} />
                    <Route path="/character/edit/:id" render={(props) => {
                        const id = props.match.params.id;
                        const character = this.findCharacterById(id);
                        return <EditCharacter character={character}
                                              handleNameChange={this.handleNameChange}
                                              handleClassChange={this.handleClassChange}
                                              handleRoleChange={this.handleRoleChange}
                                              handleLevelChange={this.handleLevelChange}
                                              handleRenownChange={this.handleRenownChange}
                                              handleSocialChange={this.handleSocialChange}
                                              handleValorChange={this.handleValorChange}
                                              handleGuildChange={this.handleGuildChange}
                                              selected_character={this.state.selected_character}
                                              guilds={this.state.guild_list}
                                              {...props} />
                    }}/>
                    <Route exact path="/parses" component={Parses} />
                    <Route exact path="/stats" component={Stats} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Main;