import axios from "axios";

// dando um GET na api de pokemons e criando a ferramenta de busca por nome
async function Api(nome_pokemon) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`
  );
  return res
}

export default { Api };
