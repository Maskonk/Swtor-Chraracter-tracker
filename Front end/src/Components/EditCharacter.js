import React, {Component, Fragment} from 'react';
import './NewCharacter.css';
import {withRouter} from 'react-router-dom';

class EditCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {},
            class_list: [],
            guild_list: [],
            character_fetched: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/';

        fetch(url + "classes")
            .then(res => res.json())
            .then(classes => {this.setState({ class_list: classes })})
            .catch(err => console.error);

        fetch(url + "guilds")
            .then(res => res.json())
            .then(guilds => {this.setState({ guild_list: guilds })})
            .catch(err => console.error);

        this.setState({character_fetched: true})
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.selected_character.character_name || !this.props.selected_character.class_name ||
            !this.props.selected_character.role || !this.props.selected_character.guild_id) {
            return
        }
        const payload = {
            name: this.props.selected_character.character_name,
            class_name: this.props.selected_character.class_id,
            role: this.props.selected_character.role,
            level: this.props.selected_character.level,
            renown_rank: this.props.selected_character.renown_rank,
            social: this.props.selected_character.social_rank,
            valor: this.props.selected_character.valor_rank,
            guild: this.props.selected_character.guild_id,
        };
        return fetch("http://127.0.0.1:3000/character/edit/" + this.props.selected_character.character_id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/characters/'));
    }

    // handleLocalSubmit(event) {
    //     this.props.handleSubmit(event)
    //         .then(res => this.props.history.push('/characters/'))
    // }


    render() {
        const class_data = this.state.class_list.map(class_name => {
            return (
                <option key={class_name.id} value={class_name.id}>{class_name.class_name}</option>
            )});

        const guild_data = this.state.guild_list.map(guild => {
            return (
                <option key={guild.id} value={guild.id}>{guild.guild_name}</option>
            )});

        if (!this.state.character_fetched) {
            return null
        }

        return (
            <Fragment>
                <h1> Edit Character  </h1>
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