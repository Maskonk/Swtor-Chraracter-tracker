import React, {Component, Fragment} from 'react';
import './NewCharacter.css';

class NewParse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: 0,
            spec: 0,
            date: "",
            dps: 0
        };

        this.handleCharacterChange = this.handleCharacterChange.bind(this);
        this.handleSpecChange = this.handleSpecChange.bind(this);
        this.handleDPSChange = this.handleDPSChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCharacterChange(event) {
        this.setState({character: event.target.value});
    }

    handleSpecChange(event) {
        this.setState({spec: event.target.value});
    }

    handleDPSChange(event) {
        this.setState({dps: event.target.value});
    }

    handleDateChange(event) {
        this.setState({date: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.character || !this.state.spec || !this.state.dps || !this.state.date) {
            return
        }
        const payload = {
            character_id: this.state.character,
            spec_id: this.state.spec,
            dps: this.state.dps,
            date: this.state.date,
        };

        fetch("http://127.0.0.1:3000/parses", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/parses/'));
    }

    render() {
        const spec_data = this.props.specs.map(spec => {
            return(
                <option key={spec.id} value={spec.id}>{spec.spec_name}</option>
            )});
        const character_data = this.props.characters.map(character => {
            return(
                <option key={character.character_id} value={character.character_id}>{character.character_name}</option>
            )});
        return(
            <Fragment>
                <h1>New Parse</h1>
                <div className="form">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <label htmlFor="character"> Character: </label>
                        <select name="character" defaultValue="Select" onChange={this.handleCharacterChange}>
                            <option disabled> Select </option>
                            {character_data}
                        </select><br/>
                        <label htmlFor="spec">Spec: </label>
                        <select name="spec" defaultValue="Select" onChange={this.handleSpecChange}>
                            <option disabled> Select </option>
                            {spec_data}
                        </select><br/>
                        <label htmlFor="dps"> DPS </label>
                        <input id="dps" type="number" onChange={this.handleDPSChange}/><br/>
                        <label htmlFor="date"> Date: </label>
                        <input id="date" type="date" onChange={this.handleDateChange}/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </Fragment>)
    }
}

export default NewParse;