import React, {useState, useEffect } from 'react';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
import { Link } from 'react-router-dom';
  
function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  
  useEffect(() => {
    PokemonService.getPokemons()
    .then(pokemons => setPokemons(pokemons))
    
  }, []);
  


  return (
    
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container"> 
        <div className="row"> 
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        
        </div>
        
      </div>
      <Link to ="/pokemons/create" className="btn btn-floating halfway-fab waves-effect waves-light"> <i className='material-icons'>add</i></Link>
    </div> 
    
  );
}
  
export default PokemonList;