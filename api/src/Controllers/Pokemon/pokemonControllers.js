const axios = require("axios");
const { Pokemon, Tipo } = require('../../db')


const getApiPokemon = async () => {
    try {
        const respuesta01 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        const respuesta02 = await axios.get(respuesta01.data.next)
        const data = respuesta01.data.results.concat(respuesta02.data.results)
        const pokemons = await Promise.all(data.map(async (obj) => {
            let poke = await axios(obj.url)
            return {
                id: poke.data.id,
                img: poke.data.sprites.front_default,
                name: poke.data.name,
                hp: poke.data.stats[0].base_stat,
                ataque: poke.data.stats[1].base_stat,
                defensa: poke.data.stats[2].base_stat,
                velocidad: poke.data.stats[5].base_stat,
                altura: poke.data.height,
                peso: poke.data.weight,
                types: poke.data.types.map((el) => el.type.name),
            }
        }))
        console.log(pokemons)
        return pokemons;
    } catch (error) {
        console.log(error);
    }
}

// const getApiPokemon = async () => {
//     try {
//         const api = await axios.get('https://pokeapi.co/api/v2/pokemon');
//         await Promise.all(api.data.results.map(async (poke) => {
//             const result = await axios.get(poke.url);
//             const data = result.data;
//             const pokemon = {
//                 id: data.id,
//                 name: data.name,
//                 hp: data.stats[0].base_stat,
//                 ataque: data.stats[1].base_stat,
//                 defensa: data.stats[2].base_stat,
//                 velocidad: data.stats[5].base_stat,
//                 altura: data.height,
//                 peso: data.weight,
//                 img: data.sprites.other.home.front_default,
//                 types: data.types.map((el) => el.type.name),
//             }
//             return pokemon
//         }));
//     } catch (error) {
//         console.log(error);
//     }
// }




// function getApiPokemon() {
//     axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
//         .then(({ data }) => {
//             let name = data.name
//             axios.get(data.url)
//                 .then(({ data }) => {
//                     return (
//                         {
//                             id: data.id,
//                             img: data.sprites.front_default,
//                             name: name,
//                             hp: data.stats[0].base_stat,
//                             ataque: data.stats[1].base_stat,
//                             defensa: data.stats[2].base_stat,
//                             velocidad: data.stats[5].base_stat,
//                             altura: data.height,
//                             peso: data.weight,
//                             types: data.types.map((el) => el.type.name),
//                         }
//                     )
//                 })

//         })
// }





const getDbInfo = async () => {
    return await Pokemon.findAll({ //Buscamos
        include: {
            model: Tipo,
            attributes: ['name'],
            through: {
                attributes: [], // Compruebo según los atributos
            },
        }
    })
}



const getAllPokemon = async () => {
    let apiInfo = await getApiPokemon();
    let dbInfo = await getDbInfo();
    //let infoTotal = apiInfo.concat(dbInfo)
    let infoTotal = [apiInfo, dbInfo].flat();
    return infoTotal;
}


// const getAllPokemon = async () => {
//     try {
//         const pokesApi = await getApiPokemon();
//         const pokesDb = await getDbInfo();
//         const allPokemons = [...pokesApi, ...pokesDb]

//         return allPokemons;
//     } catch (error) {
//         console.log(error);
//     }
// }




module.exports = {
    getApiPokemon,
    getDbInfo,
    getAllPokemon
};