import React, { useState, useEffect } from 'react';
import PokemonForm from '../components/pokemon-form';
import POKEMONS from '../models/mock-pokemon';
import { useParams } from 'react-router-dom';
 

  
function PokemonEdit (){
  const {id} = useParams();
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    POKEMONS.forEach(pokemon => {
      if (id === pokemon.id.toString()) {
        setPokemon(pokemon);
      }
    })
  }, [id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;