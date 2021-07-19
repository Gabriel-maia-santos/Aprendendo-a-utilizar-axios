import axios from "axios";

// dando um GET na api de pokemons e criando a ferramenta de busca por nome
async function GET(pokemon){
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return res
}
export default{GET}