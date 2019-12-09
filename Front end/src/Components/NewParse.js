import React, {Component, Fragment} from 'react';
import './NewCharacter.css';

class NewParse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: "",
            spec: "",
            date: "",
            dps: 0
        }
    }

    render() {
        const spec_data = this.props.specs.map(spec => {return(<option key={spec.id} value={spec.id}>{spec.spec_name}</option>)});
        return(
            <Fragment>
                <h1>Hello</h1>
                <div className="form">
                    <select>
                        {spec_data}
                    </select>
                </div>
            </Fragment>)
    }
}

export default NewParse;