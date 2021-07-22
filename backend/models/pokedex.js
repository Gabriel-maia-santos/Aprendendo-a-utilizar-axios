const axios = require('axios');


async function searchByPokemon(nome_pokemon) {
  //realizando a pesquisa por nome e puxando da api
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)
  const pokemon = response.data
  return {
    pokemon: pokemon.name,
    idPokemon: pokemon.id,
    experiencia: pokemon.base_experience,
    peso: pokemon.weight,
    status: pokemon.stats,
    altura: pokemon.height,
    tipo: pokemon.types,
}
}

async function searchBySpecies(idPokemon) {
    //aqui eu tenho q passar id
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`)
    const species = response.data
    return {
        bebe: species.is_baby,
        mitico: species.is_mythical,
        lendario: species.is_legendary,
        evolucao_url: species.evolution_chain.url
    }
} 

async function searchByEvolution(evolution) {
    const response = await axios.get(evolution);
    const evolucao = response.data

    return {
        primeira_evolucao: evolucao.chain.species.name,
        segunda_evolucao: evolucao.chain.evolves_to[0].species.name,
        terceira_evolucao: evolucao.chain.evolves_to[0].evolves_to[0].species.name
    }
}

searchByPokemon('charmander').then(pokemon => {
    console.log(pokemon)
    searchBySpecies(pokemon.idPokemon).then(species => {
        console.log(species)
        searchByEvolution(species.evolucao_url).then(evolution => {
            console.log(evolution)
        })
    })
})
