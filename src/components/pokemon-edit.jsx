import React, { useState, useEffect } from 'react';
import PokemonForm from '../components/pokemon-form';
import { useParams } from 'react-router-dom';
import PokemonService from '../services/pokemon-service';
 import PageLoading from './page-loading';

  
function PokemonEdit (){
  const {id} = useParams();
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    PokemonService.getPokemon(id)
    .then(pokemon => {setPokemon(pokemon)})
  }, [id])
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center"><PageLoading/></h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;