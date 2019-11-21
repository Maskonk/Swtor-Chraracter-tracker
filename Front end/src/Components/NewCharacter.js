import React, {Component, Fragment} from 'react';
import './NewCharacter.css';

class NewCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            class_name: "",
            role: "",
            level: 1,
            renown_rank: 1,
            social: 1,
            valor: 1,
            guild: "",
            class_list: [],
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
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
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
        if (!this.state.name || !this.state.class_name || !this.state.role || !this.state.guild) {
            return
        }
        const payload = {
            name: this.state.name,
            class_name: this.state.class_name,
            role: this.state.role,
            level: this.state.level,
            renown_rank: this.state.renown_rank,
            social: this.state.social,
            valor: this.state.valor,
            guild: this.state.guild,
        };

        fetch("http://127.0.0.1:3000/new_character", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/characters/'));
    }

    render() {
        const class_data = this.state.class_list.map(class_name => {
            return (
                <option key={class_name.id} value={class_name.id}>{class_name.class_name}</option>
            )});

        const guild_data = this.state.guild_list.map(guild => {
            return (
                <option key={guild.id} value={guild.id}>{guild.guild_name}</option>
            )});

        return (
            <Fragment>
                <h1> New Character </h1>
                <div className="form">
                    <form method="post" onSubmit={this.handleSubmit}>
                        <label htmlFor="name"> Name: </label>
                        <input id="name" type="text" placeholder="Name" onChange={this.handleNameChange}/>
                        <br />
                        <label htmlFor="class">Class: </label>
                        <select name="class" defaultValue="Select" onChange={this.handleClassChange}>
                            <option disabled> Select </option>
                            {class_data}
                        </select>
                        <br/>
                        <label htmlFor="role"> Role: </label>
                        <select name="role" defaultValue="Select" onChange={this.handleRoleChange}>
                            <option disabled> Select </option>
                            <option>Damage</option>
                            <option>Healer</option>
                            <option>Tank</option>
                        </select>
                        <br />
                        <label htmlFor="level"> Level: </label>
                        <input id="name" type="number" defaultValue="1" onChange={this.handleLevelChange} min="1" max="75"/>
                        <br />
                        <label htmlFor="renown"> Renown Rank: </label>
                        <input id="renown" type="number" defaultValue="1" onChange={this.handleRenownChange} min="0" max="999"/>
                        <br />
                        <label htmlFor="social"> Social Rank: </label>
                        <input id="social" type="number" defaultValue="1" onChange={this.handleSocialChange} min="1" max="10"/>
                        <br />
                        <label htmlFor="valor"> Valor Rank: </label>
                        <input id="valor" type="number" defaultValue="1" onChange={this.handleValorChange} min="1" max="100"/>
                        <br />
                        <label htmlFor="guild"> Guild: </label>
                        <select name="guild" defaultValue="Select" onChange={this.handleGuildChange}>
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

export default NewCharacter;