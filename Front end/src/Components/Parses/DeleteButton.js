import React, {Component, Fragment} from 'react';

class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const payload = {
            id: this.props.id
        };
        fetch("http://127.0.0.1:3000/parses/" + this.props.id, {
            method: 'DELETE',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json'}
        })
            .then(res => this.props.history.push('/parses/'));
    }

    render() {
        return (
            <button onClick={this.handleDelete}>Delete</button>
        )
    }
}

export default DeleteButton;