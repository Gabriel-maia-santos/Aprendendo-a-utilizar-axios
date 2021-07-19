import axios from './utils/axios.js'
import readline from 'readline-sync'

//utilizando biblioteca de input simples
function Name(){
    return readline.question('Digite o nome de um pokemon: ')
}

async function Pokemon(){
    //realizando a pesquisa por nome e puxando da api
    const pokemon = Name()
    const Get_api = await axios.GET(pokemon)

    //pegando todos os dados nescessarios da api e passando no console.log
    const Experience = Get_api.data.base_experience
    const Weight = Get_api.data.weight
    const Height = Get_api.data.height
    const Status = Get_api.data.stats[0].base_stat
    const Species = Get_api.data.types[0].type.name

    //passando os dados em formato de string
    console.log(`
        Nome Pokemon: ${pokemon}
        experiencia base: ${Experience} xp
        peso: ${Weight} kg
        altura: ${Height} cm
        Status: ${Status}
        especie: ${Species}
    `)
}

Pokemon()