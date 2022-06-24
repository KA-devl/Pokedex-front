import POKEMONS from "../models/mock-pokemons";
  
export default class PokemonService {
  
  static pokemons = POKEMONS;
  
  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  
  static getPokemons() {
    //Ici on recoit les donnees de la source JSON server (Si on est dans un environnement dev, on recoit de notre serveur, sinon, voir l'autre condition)
    if(this.isDev) {
      return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  //Si on est PAS en dev, sa veut dire quon est en PROD : donc on recoit les donnees d'une autre source
    return new Promise(resolve => {
      resolve(this.pokemons);
    });
  }
  
  static getPokemon(id){
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      resolve(this.pokemons.find(pokemon => id == pokemon.id))
    }); 
  }
  
  static updatePokemon(pokemon) {
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'PUT',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    }); 
  }
  
  static deletePokemon(pokemon) {
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      const { id } = pokemon;
      this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
      resolve({});
    }); 
  }
  
  static postPokemon(pokemon) {
    //pokemon.created = new Date(pokemon.created);
  
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons`, {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      this.pokemons.push(pokemon);
      resolve(pokemon);
    }); 
  }
  
  static searchPokemon(term) {
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      const results = this.pokemons.filter(pokemon => pokemon.name.includes(term));
      resolve(results);
    });
  
  }
  
  static isEmpty(data) {
    return Object.keys(data).length === 0;
  }
  
  static handleError(error) {
    console.error(error);
  }
}







/**
 * DEV API REST CALLS FOR LOCAL JSON SERVER
 * export default class PokemonService{

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

//DELETE POKEMON REQUEST

static deletePokemon(pokemon){
  return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,
  { method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(reponse => reponse.json())
  .catch(error => this.handleError(error))
}

//POST UN NOUVEAU POKEMON

static postPokemon(pokemon){
 delete pokemon.created;
  return fetch(`http://localhost:3001/pokemons/`, 
  {method : 'POST', 
  body: JSON.stringify(pokemon),
  headers: { 'Content-Type' : 'application/json'}})
  .then(response => response.json())
  .then(error => this.handleError(error))
}

//Chercher un pokemon specifique
static searchPokemon(term){
  return fetch(`http://localhost:3001/pokemons?q=${term}`)
  .then(reponse => reponse.json())
  .catch(error => this.handleError(error))
}

//Anticiper les erreurs HTTP
static handleError(error){
  console.error(error)
}




}
 * 
 * 
 */