const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
const axios = require('axios');


async function searchByPokemon(nome_pokemon) {
  //realizando a pesquisa por nome e puxando da api
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`);
  const dados = await response

  let pokemon = new Object();

  pokemon.nome_pokemon = dados.data.name
  pokemon.id = dados.data.id
  pokemon.experience = dados.data.base_experience
  pokemon.peso = dados.data.weight
  pokemon.altura = pokemon.height
  pokemon.status = dados.data.stats
  pokemon.tipo = dados.data.types

  return pokemon
}

async function searchBySpecies(idPokemon) {
    //aqui eu tenho q passar id
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`)
    const species = await response

    let pokemon = new Object();

    pokemon.bebe = species.data.is_baby
    pokemon.mitico = species.data.is_mythical
    pokemon.legendario = species.data.is_legendary
    pokemon.evolution_url = species.data.evolution_chain.url

    return pokemon
} 

async function searchByEvolution(evolution) {
    const response = await axios.get(evolution);
    const evolucao = await response

    let pokemon = new Object();

    pokemon.evolucao = evolucao.data.chain.species.name
    pokemon.segunda_evolucao = evolucao.data.chain.evolves_to[0].species.name
    pokemon.terceira_evolucao = evolucao.data.chain.evolves_to[0].evolves_to[0].species.name

    return pokemon
}

module.exports = {searchByPokemon, searchBySpecies, searchByEvolution}
