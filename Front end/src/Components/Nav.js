import React from 'react';
import './Nav.css'
import { Link } from "react-router-dom";

const Nav = () => (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/characters">Characters</Link>
        </li>
        <li>
            <Link to={{pathname: '/parses', state: {test: true}}}> Parses </Link>
        </li>
        <li>
            <Link to="/stats"> Parsing Stats </Link>
        </li>
    </ul>
);

export default Nav;