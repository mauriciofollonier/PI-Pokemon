const { Router } = require('express');
const pokemonsRoutes = require('./pokemons.js');
const typesRoutes = require('./types.js');
//const { Pokemon, Type } = require('../db.js');
//const axios = require('axios');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use('/pokemons', pokemonsRoutes);
router.use('/types', typesRoutes);

module.exports = router;
