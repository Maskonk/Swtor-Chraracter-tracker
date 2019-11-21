import React, {Component} from 'react';
import Characters from "../Containers/Characters";
import Home from "./Home";
import Parses from "../Containers/Parses";
import Stats from "../Containers/Stats";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import NewCharacter from "./NewCharacter";
import EditCharacter from "./EditCharacter";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            selected_character: {}
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleRenownChange = this.handleRenownChange.bind(this);
        this.handleSocialChange = this.handleSocialChange.bind(this);
        this.handleValorChange = this.handleValorChange.bind(this);
        this.handleGuildChange = this.handleGuildChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/characters';

        fetch(url)
            .then(res => res.json())
            .then(characters => {this.setState({ characters: characters })})
            .catch(err => console.error);
    }

    findCharacterById(id) {
        const character = this.state.characters.find(character => character.character_id === id);
        if (this.state.selected_character !== character) {
            this.setState({selected_character: character});
        }
        console.log(this.state);
        return character;
    }

    handleNameChange(event) {
        let character = this.state.selected_character;
        character.character_name = event.target.value;
        this.setState({selected_character: character});
    }

    handleClassChange(event) {
        this.setState({class_name: event.target.value});
    }

    handleRoleChange(event) {
        this.setState({role: event.target.value});
    }

    handleLevelChange(event) {
        this.setState({level: event.target.value});
    }

    handleRenownChange(event) {
        this.setState({renown_rank: event.target.value});
    }

    handleSocialChange(event) {
        this.setState({social: event.target.value});
    }

    handleValorChange(event) {
        this.setState({valor: event.target.value});
    }

    handleGuildChange(event) {
        this.setState({guild: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("here");
        if (!this.state.selected_character.character_name || !this.state.selected_character.class_name ||
            !this.state.selected_character.role || !this.state.selected_character.guild_id) {
            return
        }
        const payload = {
            name: this.state.selected_character.character_name,
            class_name: this.state.selected_character.class_id,
            role: this.state.selected_character.role,
            level: this.state.selected_character.level,
            renown_rank: this.state.selected_character.renown_rank,
            social: this.state.selected_character.social_rank,
            valor: this.state.selected_character.valor_rank,
            guild: this.state.selected_character.guild_id,
        };
        console.log(payload);
        fetch("http://127.0.0.1:3000/character/edit/" + this.state.selected_character.character_id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/characters/'));
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Nav/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/characters" render={() => <Characters characters={this.state.characters} />} />
                    <Route exact path="/character/new" component={NewCharacter} />
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
                                              handleSubmit={this.handleSubmit}
                                              {...props}/>
                    }}/>
                    <Route exact path="/parses" component={Parses} />
                    <Route exact path="/stats" component={Stats} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Main;