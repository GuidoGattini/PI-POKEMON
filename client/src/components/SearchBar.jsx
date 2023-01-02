import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons, getPokemons } from "../redux/actions/index";
import './searchBar.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState('');

    function handleInputChange(event){
        event.preventDefault();
        setInputName(event.target.value)
        console.log(inputName);
    };

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getNamePokemons(inputName));
        setInputName("");
    };



    return (
        <div>
            <input type='text' placeholder='Search poke...' onChange={(e) => handleInputChange(e)} value={inputName} className="search"/>
            <button type= "submit" onClick={(e) => handleSubmit(e)} className="btn-search">Search</button>
        </div>
    )
};

export default SearchBar;