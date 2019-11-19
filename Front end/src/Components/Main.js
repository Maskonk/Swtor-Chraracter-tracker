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
        }
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/characters';

        fetch(url)
            .then(res => res.json())
            .then(characters => {this.setState({ characters: characters })})
            .catch(err => console.error);
    }

    findCharacterById(id) {
        console.log(this.state.characters);
        const character = this.state.characters.find(character => character.character_id === id);
        console.log(character);
        return character
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
                        return <EditCharacter character={character} {...props}/>
                    }}/>
                    <Route exact path="/parses" component={Parses} />
                    <Route exact path="/stats" component={Stats} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Main;