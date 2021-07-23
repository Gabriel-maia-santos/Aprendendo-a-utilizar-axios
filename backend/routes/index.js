var express = require('express');
const pokedex = require('../models/pokedex.js')
var router = express.Router();

/* criando a rota de searchByPokemon. */
router.get('/searchByPokemon/:nome_pokemon', async function(req, res, next) {
  const pokemon = await pokedex.searchByPokemon(req.params.nome_pokemon)
  res.json(pokemon)
});

/* criando a rota de searchBySpecies. */
router.get('/searchBySpecies/:id', async function(req, res, next) {
  const pokemon = await pokedex.searchBySpecies(req.params.id)
  res.json(pokemon)
});

/* criando a rota de searchByEvolution. */
router.get('/searchByEvolution/:id', async function(req, res, next) {
   const urlEvolucao = await pokedex.searchBySpecies(req.params.id)
   const evolution = urlEvolucao.evolution_url
   const pokemon = await pokedex.searchByEvolution(evolution)

   res.json(pokemon)
});

module.exports = router;
