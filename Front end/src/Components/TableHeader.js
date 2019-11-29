import React, {Component} from 'react';

class TableHeader extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.setArrow = this.setArrow.bind(this);
    }

    handleClick(event) {
        this.props.onSort(this.props.headerId)
    }

    setArrow() {
        let className = 'sort-direction';

        if (this.props.sortFields.column === this.props.headerId) {
            className += this.props.sortFields.direction === 'asc' ? ' asc' : ' desc';
        }

        console.log(className);

        return className;
    };

    render() {
        return (
            <th onClick={this.handleClick}>{this.props.headerName}
            <span className={this.setArrow}/></th>
        )

    }

}

export default TableHeader;