/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, getTypes, filterPokemonsByFilter, filterCreated, orderByName } from "../redux/actions";
import { Link } from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import "./home.css"

import NavBar from "./SearchBar";



export default function Home() {

    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector(state => state.allTypes);
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsXpage] = useState(8)
    const indexOfLastPokemon = currentPage * pokemonsXpage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsXpage
    const currentPokes = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    const pages = Math.ceil(allPokemons.length / pokemonsXpage);
    const paginado = (pageNumber) => { setCurrentPage(pageNumber); };
    const [order, setOrder] = useState('')
    console.log(order)
    

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [dispatch]);
    

    const handleFilterTypes = (e) => {
        dispatch(filterPokemonsByFilter(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterAsc = (e) => {
        dispatch(orderByName(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    }

    const handleFilterCreate = (e) => {
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }


    const handleReset = (e) => {
        e.preventDefault();
        dispatch(getTypes());
        dispatch(getPokemons());
        document.getElementById('order').value = 'order';
        document.getElementById('created').value = 'all';
        document.getElementById('types').value = 'type';
        setCurrentPage(1);
        alert('Recargando página...');
    };

    return (
        <>
            <NavBar />

            <div className="filtros">

                <Link className="reset" to='/pokemon'>Create Pokemon</Link>

                <button type="submit" className="reset" onClick={(e) => handleReset(e)}>Reset Page</button>
                <select id="order" defaultValue="Select the order" onChange={(e) => handleFilterAsc(e)}>
                    <option value="order">Select the order</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>

                <select id="types" defaultValue="Select the type" onChange={e => handleFilterTypes(e)}>
                    <option value="type">Select the type</option>
                    <option value="All">All</option>
                    {allTypes?.map(types => (
                        <option key={types.id} value={types.name}>{types.name}</option>
                    ))}
                    {/* <option value="All">Todos</option>
                    <option value="steel">Acero</option>
                    <option value="water">Agua</option>
                    <option value="unknown">Desconocido</option>
                    <option value="dragon">Dragon</option>
                    <option value="electric">Electrico</option>
                    <option value="ghost">Fantasma</option>
                    <option value="fire">Fuego</option>
                    <option value="fairy">Hada</option>
                    <option value="ice">Hielo</option>
                    <option value="bug">Insecto</option>
                    <option value="fighting">Lucha</option>
                    <option value="normal">Normal</option>
                    <option value="dark">Oscuro</option>
                    <option value="grass">Planta</option>
                    <option value="psychic">Psíquico</option>
                    <option value="rock">Roca</option>
                    <option value="shadow">Sombra</option>
                    <option value="ground">Terrestre</option>
                    <option value="flying">Volador</option>
                    <option value="poison">Veneno</option> */}


                </select>
                <select id="created" onChange={(e) => handleFilterCreate(e)}>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="api">Api</option>
                </select>
            </div>

            <div className="container-pokemon">
                <div className="container-home">
                    {!currentPokes.length ?
                        <div className="loading">
                            <br />
                        </div> :

                        currentPokes.length ? currentPokes.map(poke => {
                            return (
                                <Card
                                    id={poke.id}
                                    hp={poke.hp}
                                    name={poke.name}
                                    types={poke.types}
                                    img={poke.img}
                                    ataque={poke.ataque}
                                    peso={poke.peso}
                                    key={poke.id}
                                />)
                        })
                            : null}
                </div>

                {currentPokes.length > 0 && allPokemons.length > 8 ?
                    <div className="pag">
                        <Paginado pokemonsXpage={pokemonsXpage} allPokes={allPokemons.length} paginado={paginado} currentPage={currentPage} />
                    </div> : null}
            </div>
        </>
    )
};
