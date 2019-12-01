import React, {Component} from 'react';

class TableHeader extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onSort(this.props.headerId)
    }

    render() {
        return (
            <th onClick={this.handleClick}>{this.props.headerName}</th>
        )

    }

}

export default TableHeader;