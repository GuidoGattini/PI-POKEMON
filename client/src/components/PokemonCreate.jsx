import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../redux/actions";
import './PokemonCreate.css';



const validate = (p) => {
    const errors = {}
    if (!p.name) errors.name = 'Introducir nombre';
    if (p.name.length > 0 && p.name.length < 3) errors.name = 'El nombre debe contener al menos 3 letras'

    if (!p.hp || (p.hp && Number(p.hp) === 0)) errors.hp = 'El número debe ser mayor a 0'

    if (!p.defensa || (p.defensa && Number(p.defensa) === 0)) errors.defensa = 'El número debe ser mayor a 0'

    if (!p.ataque || (p.ataque && Number(p.ataque) === 0)) errors.ataque = 'El número debe ser mayor a 0'

    if (!p.velocidad || (p.velocidad && Number(p.velocidad) === 0)) errors.velocidad = 'El número debe ser mayor a 0'

    if (!p.altura || (p.altura && Number(p.altura) === 0)) errors.altura = 'El número debe ser mayor a 0'

    if (!p.peso || (p.peso && Number(p.peso) === 0)) errors.peso = 'El número debe ser mayor a 0'

    return errors;
}

const Form = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.allTypes);
    const history = useHistory();
    const [error, setError] = useState({});
    const [data, setData] = useState({
        name: '',
        hp: '',
        defensa: '',
        ataque: '',
        velocidad: '',
        altura: '',
        peso: '',
        img: '',
        types: []
    });

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])




    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validate(data));
        if (!data.name) return alert('Por favor, completar todos los campos')
        if (Object.keys(error).length > 0) {
            return alert('Completar todos los datos correctamente')
        }
        if (!data.types.length) {
            data.types = ['normal'];
        }
        dispatch(postPokemon(data));
        alert('Pokemon creado');
        history.push('/home');
    };

    const handleSelectType = (e) => {
        setData({
            ...data,
            types: [...data.types, e.target.value]
        });
        e.target.value = "default"
        console.log("data de la img:", data)

    }

    const handleChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...data,
            [e.target.name]: e.target.value
        }))
    };

    const handleDeleteType = (type) => {
        setData({
            ...data,
            types: data.types.filter(t => t !== type)
        })
    }

    return (
        <div className="container-created">
            <div className="formulario">
                <div className="title">
                    <h2>Crear Pokemon</h2>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="datos_1">
                        <div>
                            <label htmlFor="name">Nombre: </label>
                            <input type="text" name="name" id="name" value={data.name} onChange={handleChangeData} />
                        </div>
                        {error.name && <span>{error.name}</span>}
                        <div>
                            <label htmlFor="hp">Hp: </label>
                            <input min='0' max='1000' name="hp" id="hp" value={data.hp} onChange={handleChangeData} />
                        </div>
                        {error.hp && <span>{error.hp}</span>}
                        <div>
                            <label htmlFor="defensa">Defensa: </label>
                            <input min='0' max='1000' name="defensa" id="defensa" value={data.defensa} onChange={handleChangeData} />
                        </div>
                        {error.defensa && <span>{error.defensa}</span>}
                        <div>
                            <label htmlFor="ataque">Ataque: </label>
                            <input min='0' max='1000' name="ataque" id="ataque" value={data.ataque} onChange={handleChangeData} />
                        </div>
                        {error.ataque && <span>{error.ataque}</span>}
                    </div>
                    <div className="datos_2">
                        <div>
                            <label htmlFor="velocidad">Velocidad: </label>
                            <input min='0' max='1000' name="velocidad" id="velocidad" value={data.velocidad} onChange={handleChangeData} />
                        </div>
                        {error.velocidad && <span>{error.velocidad}</span>}
                        <div>
                            <label htmlFor="altura">Altura: </label>
                            <input min='0' max='1000' name="altura" id="altura" value={data.altura} onChange={handleChangeData} />
                        </div>
                        {error.altura && <span>{error.altura}</span>}
                        <div>
                            <label htmlFor="peso">Peso: </label>
                            <input min='0' max='1000' name="peso" id="peso" value={data.peso} onChange={handleChangeData} />
                        </div>
                        {error.peso && <span>{error.peso}</span>}
                        <div>
                            <label htmlFor="img">Imagen: </label>
                            <input type="text" name="img" value={data.img} onChange={handleChangeData} />
                        </div>
                        <div>
                            <label htmlFor="type">Tipo/s: </label>
                            <select name="type" onChange={handleSelectType}>
                                {types && types.map(t => {
                                    return <option key={t.id} value={t.name}>{t.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="selected-type">
                            {data.types?.map(type => {
                                return <span key={type}>{type}  <button id="delete-type" onClick={() => handleDeleteType(type)}>x</button></span>
                            })}
                        </div>


                    </div>
                    <div className="botones">
                        <Link to="/home">CANCELAR</Link>
                        {Object.keys(error).length > 0 ? <button type="submit" id="button-create" >CREATE</button> : <button type="submit" id="button-create">CREAR</button>}
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Form;