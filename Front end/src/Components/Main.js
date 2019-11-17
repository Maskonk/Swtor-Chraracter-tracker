import React, {Component} from 'react';
import Characters from "../Containers/Characters";
import Home from "./Home";
import Parses from "../Containers/Parses";
import Stats from "../Containers/Stats";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";

class Main extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Nav/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/characters" component={Characters} />
                    <Route exact path="/parses" component={Parses} />
                    <Route exact path="/stats" component={Stats} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Main;