import React from "react";
import { Link } from 'react-router-dom';
import './navbar.css';
import SearchBar from "./SearchBar";

const NavBar = () => {

    return (
        <div className="navbar">
            <Link to="/" className= "logotipo"/>
            <SearchBar/>
            <ul className="rutas">
                <li><Link to="/create">Create Pokemon</Link></li>
            </ul>
        </div>
    );
};

export default NavBar;