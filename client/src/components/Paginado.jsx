import React from "react";
import './paginado.css'


export default function Paginado({ pokemonsXpage, allPokes, paginado, currentPage }) {
    const numberOfPage = [];

    const maxPage = Math.ceil(allPokes / pokemonsXpage); // Me devuelve un entero mayor o igual a el número que le dé
    for (let i = 1; i <= maxPage; i++) {
        numberOfPage.push(i)
    }
    return (
        <div className="container-paginado">
            <nav>
                <ul className="paginado">
                    {currentPage > 1 ? (
                        <li className="page" onClick={() => paginado(currentPage - 1)}>
                            <button>Atras</button>
                        </li>
                    ) : null}
                    <li className="page" onClick={() => paginado(currentPage)}>
                        <button>{currentPage}</button>
                    </li>
                    {currentPage < allPokes / pokemonsXpage ? (
                        <li className="page" onClick={() => paginado(currentPage + 1)}>
                            <button>Next</button>
                        </li>
                    ) : null}


                </ul>
            </nav>
        </div>
    );

}