import React, {Component, Fragment} from 'react';
import './NewCharacter.css';
import {withRouter} from 'react-router-dom';

class EditCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {},
            classList: [],
            character_fetched: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/';

        fetch(url + "classes")
            .then(res => res.json())
            .then(classes => {this.setState({ classList: classes })})
            .catch(err => console.error);


        this.setState({character_fetched: true});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.title = `Edit ${this.props.selectedCharacter.character_name} - SWTOR Character Tracker`;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.selectedCharacter.character_name || !this.props.selectedCharacter.class_name ||
            !this.props.selectedCharacter.role || !this.props.selectedCharacter.guild_id) {
            return
        }
        const payload = {
            name: this.props.selectedCharacter.character_name,
            class_name: this.props.selectedCharacter.class_id,
            role: this.props.selectedCharacter.role,
            level: this.props.selectedCharacter.level,
            renown_rank: this.props.selectedCharacter.renown_rank,
            social: this.props.selectedCharacter.social_rank,
            valor: this.props.selectedCharacter.valor_rank,
            guild: this.props.selectedCharacter.guild_id,
        };
        return fetch("http://127.0.0.1:3000/characters/" + this.props.selectedCharacter.character_id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/characters/'));
    }

    handleDelete(event) {
        console.log(this.props.character.character_id);
        const payload = {
            id: this.props.character.character_id
        };
        fetch("http://127.0.0.1:3000/characters/" + this.props.selectedCharacter.character_id, {
            method: 'DELETE',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/characters/'));
    }

    render() {
        const class_data = this.state.classList.map(class_name => {
            return (
                <option key={class_name.id} value={class_name.id}>{class_name.class_name}</option>
            )});

        const guild_data = this.props.guilds.map(guild => {
            return (
                <option key={guild.id} value={guild.id}>{guild.guild_name}</option>
            )});

        if (!this.props.character) {
            return null
        }

        return (
            <Fragment>
                <h1> Edit Character  </h1>
                <button onClick={this.handleDelete}>Delete Character</button>
                <div className="form">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <label htmlFor="name"> Name: </label>
                        <input id="name" type="text" defaultValue={this.props.character.character_name} onChange={this.props.handleNameChange}/>
                        <br />
                        <label htmlFor="class">Class: </label>
                        <select name="class" value={this.props.character.class_id} onChange={this.props.handleClassChange}>
                            <option disabled> Select </option>
                            {class_data}
                        </select>
                        <br/>
                        <label htmlFor="role"> Role: </label>
                        <select name="role" defaultValue={this.props.character.role} onChange={this.props.handleRoleChange}>
                            <option disabled> Select </option>
                            <option>Damage</option>
                            <option>Healer</option>
                            <option>Tank</option>
                        </select>
                        <br />
                        <label htmlFor="level"> Level: </label>
                        <input id="name" type="number" defaultValue={this.props.character.level} onChange={this.props.handleLevelChange} min="1" max="75"/>
                        <br />
                        <label htmlFor="renown"> Renown Rank: </label>
                        <input id="renown" type="number" defaultValue={this.props.character.renown_rank} onChange={this.props.handleRenownChange} min="0" max="999"/>
                        <br />
                        <label htmlFor="social"> Social Rank: </label>
                        <input id="social" type="number" defaultValue={this.props.character.social_rank} onChange={this.props.handleSocialChange} min="1" max="10"/>
                        <br />
                        <label htmlFor="valor"> Valor Rank: </label>
                        <input id="valor" type="number" defaultValue={this.props.character.valor_rank} onChange={this.props.handleValorChange} min="1" max="100"/>
                        <br />
                        <label htmlFor="guild"> Guild: </label>
                        <select name="guild" value={this.props.character.guild_id} onChange={this.props.handleGuildChange}>
                            <option disabled> Select </option>
                            {guild_data}
                        </select>
                        <br />
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </Fragment>
        )
    }

}

export default withRouter(EditCharacter);