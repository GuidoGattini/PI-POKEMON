/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../redux/actions/index";
import { useEffect } from "react";
import "./detail.css"

export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, props.match.params.id]);

    const myPokemons = useSelector((state) => state.details)
    return (
        <div className="carta">
            {
                myPokemons.length > 0 ?
                    <div className="detalle">
                        <h1>{myPokemons[0].name}</h1>
                        <img src={myPokemons[0].img} />
                        <h2>Hp: {myPokemons[0].hp}</h2>
                        <h2>Ataque: {myPokemons[0].ataque}</h2>
                        <h2>Peso:{myPokemons[0].peso}</h2>
                        <h2>Altura:{myPokemons[0].altura}</h2>
                        <h2>Velocidad: {myPokemons[0].velocidad}</h2>
                        {/* <h2>Tipo: {!myPokemons[0].createdInDb ? myPokemons[0].types + " " : myPokemons[0].types.map(el => el.name + (' '))}</h2>  */}
                        


                    </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )

}
