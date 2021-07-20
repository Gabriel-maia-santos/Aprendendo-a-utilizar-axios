import axios from "axios";
import readline from "readline-sync";

function Nome() {
  const name = readline.question("Digite o nome de um pokemon: ");
  return name;
}

function Dados() {
  const nome_pokemon = Nome();
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${nome_pokemon}`)
    .then((response) => {
      const api = response.data;

      let experiencia = api.base_experience;
      let peso = api.weight;
      let status = api.stats[0].base_stat;
      let altura = api.height;
      let tipo = api.types[0].type.name;

      const species = axios.get(api.species.url).then((response) => {
        const api = response.data;

        let evolucao = ``;

        if (api.evolves_from_species) {
          evolucao = api.evolves_from_species.name;
        } else {
          evolucao = `Este pokemon não possui evolução, ou ainda não evoluiu`;
        }

        let pokemon = {
          pokemon: nome_pokemon,
          experiencia: experiencia,
          peso: peso,
          status: status,
          tipo: tipo,
          altura: altura,
          evolucao: evolucao,
          bebe: api.is_baby,
          mitico: api.is_mythical,
          lendario: api.is_legendary,
        };

        console.log(pokemon);
      });
    });
}

Dados();
