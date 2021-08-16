const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const router = Router();

/****************** [ ] GET /pokemons: ****************/

router.get('/', async (req, res) => {

    try {
        const firstCallAPI = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const firstCallRes = firstCallAPI.data.results;
        let firstCallMap = firstCallRes.map(pokemon => axios.get(pokemon.url));

        var dbPokemons = await Pokemon.findAll({
            include: Type
        })

        let apiPokemonsProm = Promise.all(firstCallMap)
            .then(pokemon => {
                let apiPokemonMap = pokemon.map(p => p.data)
                let apiPokemons = []
                apiPokemonMap.map(p => {
                    apiPokemons.push({
                        id: p.id,
                        name: p.name,
                        hp: p.stats[0].base_stat,
                        streght: p.stats[1].base_stat,
                        defense: p.stats[2].base_stat,
                        speed: p.stats[5].base_stat,
                        height: p.height,
                        weight: p.weight,
                        picture: p.sprites.other.dream_world.front_defult,
                        types: p.types.map(t => t.type.name)
                    })
                })
                res.json(apiPokemons.concat(dbPokemons));
            })
    } catch (error) {
        res.sendStatus(404);
    }
})

/************* [ ] GET /pokemons/{idPokemon}: *************/

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id.length);
    // Si existe un id.
    if (id) {
        //if(typeof id === 'number') { // Si es un numero, busca en la API.
        if (id.length < 4) {
            const searchById = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            let target = [searchById.data];

            let targetPokemon = target.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    img: p.sprites.other['official-artwork'].front_default,
                    types: p.types.map(t => t.type.name),
                    streght: p.stats[1].base_stat
                }
            })
            res.json(targetPokemon);
        } else {
            let targetPokemon;
            targetPokemon = await Pokemon.findOne({
                where: {
                    id: id
                },
                include: Type
            }).then(p => {
                return {
                    id: p.id,
                    name: p.name,
                    hp: p.hp,
                    //img: p.sprites.other['official-artwork'].front_default,
                    types: p.types,
                    streght: p. streght
                }
            })
            //console.log(targetPokemon);
            res.json(targetPokemon);
        }

        //}
        //if(typeof id === 'number') { // Si no es un numero, busca en la Base de Datos.

        //}
        // Si no existe un id.    
    } else {
        return 'Necessary params is not provided';
    }
})

/****************** [ ] POST /pokemons: ******************/
router.post('/', async (req, res) => {
    const { name } = req.body;
    await Pokemon.create({
        name
    }).then((createdPokemon) => {
        res.json(createdPokemon)
    }).catch(err => {
        res.sendStatus(404)
    })
})



module.exports = router;