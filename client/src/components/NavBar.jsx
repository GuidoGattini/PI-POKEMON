import React from "react";
import logo from '../img/logo3.png';
import { Link } from 'react-router-dom';
import style from './navbar.module.css';
import SearchBar from "./SearchBar";

const NavBar = () => {

    return (
        <div className={style.navbar}>
            <Link to="/" className={style.logotipo}>
                <img src={logo} alt="" />
            </Link>
            <SearchBar/>
            <ul className={style.rutas}>
                <li><Link to="/create">Create Pokemon</Link></li>
            </ul>
        </div>
    );
};

export default NavBar;