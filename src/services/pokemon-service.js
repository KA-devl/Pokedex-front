export default class PokemonService{

//GET REQUEST
static getPokemons(){
  return fetch('http://localhost:3001/pokemons')
  .then(reponse => reponse.json())
  .catch(error => this.handleError(error))
}

static getPokemon(id){
  return fetch(`http://localhost:3001/pokemons/${id}`)
  .then(reponse => reponse.json())
  .then(data => this.isEmpty(data) ? null : data)
  .catch(error => this.handleError(error))
}

static isEmpty(data){
  return Object.keys(data).length === 0
}

//UPDATE POKEMON

static updatePokemon(pokemon){
  return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {method : 'PUT', 
  body: JSON.stringify(pokemon),
  headers: { 'Content-Type' : 'application/json'}
})
.then(reponse => reponse.json())
.catch(error => this.handleError(error))
}

//Anticiper les erreurs HTTP
static handleError(error){
  console.error(error)
}




}