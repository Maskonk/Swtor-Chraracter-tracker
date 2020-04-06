import React, {Component} from 'react';
import Characters from "../Containers/Characters/Characters";
import Home from "./Home";
import Parses from "../Containers/Parses/Parses";
import Stats from "../Containers/Stats";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import NewCharacter from "./Characters/NewCharacter";
import EditCharacter from "./Characters/EditCharacter";
import NewParse from "./Parses/NewParse";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            guildList: [],
            parses: [],
            specs:[],
            sortedData: [],
            parsingStats: [],
            characterCount: [],
            selectedCharacter: {},
            sort: {
                column: null,
                direction: 'desc',
            }
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
            .then(characters => {this.setState({ characters: characters, sortedData: characters })})
            .catch(err => console.error);

        fetch(url + "guilds")
            .then(res => res.json())
            .then(guilds => {this.setState({ guildList: guilds })})
            .catch(err => console.error);

        fetch(url + "parses")
            .then(res => res.json())
            .then(parses => {this.setState({ parses: parses })})
            .catch(err => console.error);

        fetch(url + "specs")
            .then(res => res.json())
            .then(specs => {this.setState({specs: specs})})
            .catch(err => console.error);

        fetch(url + "parse_stats")
            .then(res => res.json())
            .then(stats => {this.setState({parsingStats: stats})})
            .catch(err => console.error);
    }

    findCharacterById(id) {
        const character = this.state.characters.find(character => character.character_id === id);
        if (this.state.selectedCharacter !== character) {
            this.setState({selectedCharacter: character});
        }
        return character;
    }

    handleNameChange(event) {
        let character = this.state.selectedCharacter;
        character.character_name = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleClassChange(event) {
        let character = this.state.selectedCharacter;
        character.class_id = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleRoleChange(event) {
        let character = this.state.selectedCharacter;
        character.role = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleLevelChange(event) {
        let character = this.state.selectedCharacter;
        character.level = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleRenownChange(event) {
        let character = this.state.selectedCharacter;
        character.renown_rank = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleSocialChange(event) {
        let character = this.state.selectedCharacter;
        character.social_rank = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleValorChange(event) {
        let character = this.state.selectedCharacter;
        character.valor_rank = event.target.value;
        this.setState({selectedCharacter: character});
    }

    handleGuildChange(event) {
        let character = this.state.selectedCharacter;
        character.guild_id = event.target.value;
        this.setState({selectedCharacter: character});
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
            sortedData: sortedData,
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
                                                                              sortedCharacters={this.state.sortedData}
                                                                              onSort={this.onSort}
                                                                              sortFields={this.state.sort}
                                                                              guilds={this.state.guildList}/>} />
                    <Route exact path="/character/new" render={(props) => <NewCharacter guilds={this.state.guildList}
                                      {...props}/>} />
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
                                              selectedCharacter={this.state.selectedCharacter}
                                              guilds={this.state.guildList}
                                              {...props} />
                    }}/>
                    <Route exact path="/parses" render={(props) => <Parses parses={this.state.parses}
                                                                      specs={this.state.specs}
                                                                      {...props}/>} />
                    <Route exact path="/parse/new" render={(props) => <NewParse characters={this.state.characters}
                                                                           specs={this.state.specs}
                                                                           {...props}/>} />
                    <Route exact path="/stats" render={(props) => <Stats stats={this.state.parsingStats}
                                                                            {...props}/>} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Main;