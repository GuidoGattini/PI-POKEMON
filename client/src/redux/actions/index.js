import axios from 'axios';

//  export function getPokemons(){
//      return async function(dispatch){
//        axios.get("http://localhost:3001/pokemons")
//        .then((res)=>{
//          return dispatch({
//            type: 'GET_POKEMONS',
//            payload: res.data
//          });
//        })
//        .catch((error)=> console.log(error));
//      }
//  }

 export function getPokemons() {   //conexión con el back
   return async function (dispatch) {
       const response = await axios.get('http://localhost:3001/pokemons');
       return dispatch({
           type: 'GET_POKEMONS',
           payload: response.data
       })
   }
 }


export const getNamePokemons = (name) => async (dispatch) => {
  try {
      let info = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
          type: "GET_NAME_POKEMONS",
          payload: info.data
      })
  } catch (error) {
      return alert('Pokemon no encontrado');
  }
};


export function getTypes(){
  return async function (dispatch){
    var info = await axios.get("http://localhost:3001/types");
    console.log(info)
    return dispatch({
      type: "GET_TYPES",
      payload:info.data
    })
  }
}


export function postPokemon(payload){
  return async function(){
    var response = await axios.post("http://localhost:3001/pokemon", payload);
    console.log(response)
    return response;
  } 
}
export function filterPokemonsByFilter(payload){
  console.log(payload)
  return{
    type: 'FILTER_BY_FILTER',
    payload
  }
}
export function orderByName(payload){
  return{
    type: 'ORDER_BY_NAME',
    payload
  }
}

// Filtro creados, existentes 
export function filterCreated(payload){
  return{
    type: 'FILTER_CREATED',
    payload
  }
}


export const getDetail = (id) => async (dispatch) => {
  try {
      console.log('numero', id);
      let detail = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
          type: "GET_DETAIL",
          payload: detail.data
      })
  } catch (error) {
      console.log(error)
  }
};


export const clearDetail = () => {
    return {
        type: "CLEAR_DETAIL"
    }
};