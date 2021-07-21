import api from "./utils/axios.js";
import axios from "axios";
import readline from "readline-sync";

//utilizando biblioteca de input simples
function Name() {
  return readline.question("Digite o nome de um pokemon: ");
}

async function Pokemon() {
  //realizando a pesquisa por nome e puxando da api
  const nome_pokemon = Name();
  const get = await api.Api(nome_pokemon);

  //pegando todos os dados nescessarios da api e passando no console.log
  const experience = get.data.base_experience;
  const weight = get.data.weight;
  const height = get.data.height;
  const status = get.data.stats[0].base_stat;
  const type = get.data.types[0].type.name;

  //agora pegando os dados para as species do pokemon
  async function Dados() {
    const dado = axios.get(get.data.species.url);
    return dado;
  }

  const get_species = await Dados();

  async function Evolui() {
    const data = axios.get(get_species.data.evolution_chain.url);
    return data;
  }

  const get_evolucao = await Evolui();

  //passando os dados
  let evolucao = ``;
  const baby = get_species.data.is_baby;
  const mythical = get_species.data.is_mythical;
  const legendary = get_species.data.is_legendary;

  let evolui_para = null;
  //pegando a evolução do pokemon
  if (await get_species.data.evolves_from_species) {
    
    if ( get.data.species.url === get_evolucao.data.chain.evolves_to[0].species.url) {
      evolucao = get_species.data.evolves_from_species.name;
      evolui_para = get_evolucao.data.chain.evolves_to[0].evolves_to[0].species.name;
    }
    else {
      evolucao = get_species.data.evolves_from_species.name;
      evolui_para = "este pokemon já evoluiu até o seu máximo";
    }
  } 

  else if (await get_species.data.is_legendary == false && get_species.data.is_mythical == false) {
    evolucao = `Este pokemon ainda não evoluiu`;
    evolui_para = get_evolucao.data.chain.evolves_to[0].species.name;
  }
  else if(await get_species.data.is_mythical == true && nome_pokemon != 'meltan'){
    evolucao = `Este pokemon não possui evolução ou ainda não evoluiu`;
  }
  else if(await get_species.data.is_mythical == true && nome_pokemon == 'meltan'){
    evolucao = `Este pokemon não possui evolução ou ainda não evoluiu`;
    evolui_para = get_evolucao.data.chain.evolves_to[0].species.name;
  }
  else{
    evolucao = `Este pokemon não possui evolução`;
  }

  let pokemon = {
    pokemon: nome_pokemon,
    experiencia: experience,
    peso: weight,
    status: status,
    altura: height,
    tipo: type,
    bebe: baby,
    mitico: mythical,
    lendario: legendary,
    evoluiu_do: evolucao,
    evolui_para: evolui_para,
  };
  console.log(pokemon);
}

Pokemon();
