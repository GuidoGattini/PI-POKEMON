import React from "react";
import './paginado.css'

const Paginado = ({pokemonsXpage, allPokes, paginado, currentPage}) => {
    const pagesNumber = [];
    const maxPage = Math.ceil(allPokes/pokemonsXpage);
    for(let i = 1; i <= Math.ceil(allPokes/pokemonsXpage);i++){
        pagesNumber.push(i);
    }

    return (
        <div className="container-paginado">
            <ul className="paginado">
                { pagesNumber && pagesNumber.map(num => {
                    return <li className="page" key={num}>
                        {currentPage === num ? <a id="primer-paginado" onClick={() => paginado(num)}>{num}</a> : <a id="segundo-paginado" onClick={() => paginado(num)}>{num}</a>}
                    </li>
                })}
            </ul>
        </div>
    )
};

export default Paginado;