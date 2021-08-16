const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
//const axios = require('axios');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const types = await Type.findAll()
        res.json(types)
    } catch (error) {
        res.sendStatus(404)
    }
})

router.post('/', async (req, res) => {
    const {name} = req.body;
    try {
        const createdType = await Type.create({
        name
    })
    res.json(createdType)
    } catch (error) {
        res.sendStatus(404)
    }
})

  

module.exports = router;