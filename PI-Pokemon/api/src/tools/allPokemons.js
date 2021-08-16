const axios = require('axios');
const {Pokemon, Type } = require('../db.js') ;

const getAllPokemons = async () => {
    const pokemonsLinksInExtDb = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`).then(p => p.data.results);
    const pokemonsInExtDbProms = pokemonsLinksInExtDb.map(async function(p) {
        return axios.get(p.url).then(p => p.data);
    });
    const pokemonsInExtDb = await Promise.all(pokemonsInExtDbProms);
    
    const FEPokemons = pokemonsInExtDb.map(p => { 
        return {
            id: p.id,
            name: p.name, 
            img: p.sprites.other['official-artwork'].front_default, 
            types: p.types.map(t => t.type.name),
            attack: p.stats[1].base_stat
        }   
    });
    return FEPokemons;
}


module.exports = { getAllPokemons }