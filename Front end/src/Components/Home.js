import React, {Component, Fragment} from "react";

class Home extends Component {

    componentDidMount() {
        document.title = "Home - SWTOR Character Tracker"
    }

    render() {
        return (
            <Fragment>
                <h1>Welcome to SWTOR character tracker</h1>
            </Fragment>
        )
    }
};

export default Home;

