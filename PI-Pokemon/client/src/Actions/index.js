import axios from 'axios';
import {BASE_URL} from '../../../api/src/tools/constants.js'
import { GET_POKEMONS } from './constants.js';


export function getPokemons () {
 return function (dispatch) {
     return axios.get(BASE_URL)
     .then((pokemons) => {
         dispatch({
             type: GET_POKEMONS,
             payload: pokemons
         })
     })
 }
}

/* export function orderPokemonsAsc () {
   return {
       type: ORDER_POKEMONS_ASC,
       payload: pokemons
   }
} */