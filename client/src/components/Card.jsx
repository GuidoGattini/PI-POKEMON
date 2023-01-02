import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";

export default function Card({name,img,hp,ataque,types,id}){
    return (
        <div className="card">
            <div className="card-nombre">
                <Link to={`/pokemons/${id}`}>{name}</Link>
            </div>
            <div>
                <img src={img} alt="La imagen no funciona" width="200px" height="200px" />
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
                <h3>{types}</h3>
                {/* {console.log(types)} */}
            </div> 
          </div>  
        </div>
    )
}
