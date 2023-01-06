import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";

export default function Card({ id, name, types, img, hp, ataque }) {
    return (
        <div className="card">
            <div className="card-nombre">
                <Link to={`/pokemons/${id}`}>{name} </Link>
            </div>
            <div>
                <img src={img} alt="Pokemon" width="200px" height="200px" />
            </div>
            <div className="contenedor">
                <div className="vida">
                    <p>Hp:</p>
                    <h3>{hp}</h3>
                </div>
                <div className="attack">
                    <p> Ataque:</p>
                    <h3>{ataque}</h3>
                </div>
                <div className="types">
                    <p>Tipo/s:</p>
                     <h3>{types[0].name ? types[0].name + " " + types[1].name : types.map(el => el + (" "))}</h3>  

                     {/* <h3>{types[0].name ? types[0].name + " " + types[1].name : types}</h3>   */}

                     {/* <h3>{types.createdInDb = true ? types + " " : types.map(el =>el.name +(' '))  }</h3>  */}
                     
                </div>


            </div>
        </div>
    )
}

