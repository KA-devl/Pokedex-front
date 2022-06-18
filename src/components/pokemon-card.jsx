import React from 'react'
import { useState } from 'react';
import './pokemon-card.css'
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import { useNavigate } from 'react-router-dom';

function PokemonCard({pokemon, borderColor = 'yellow'}) {

  const [color, setColor] = useState();
  const navigate = useNavigate();

  const showBorder = ()=> {
    setColor(borderColor);
  }
  const hideBorder = ()=> {
    setColor('#f5f5f5');
  }

  const goToPokemon = (id) => {
    navigate(`/pokemons/${id}`)
  }
  
  
  return (
    <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={()=> goToPokemon(pokemon.id)} >
      <div className="card horizontal" style={{borderColor: color}}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p><small> {formatDate(pokemon.created)}</small> </p>
            {pokemon.types.map((type)=> <span key={type} className={formatType(type)}>{type}</span>) }
           
          </div>
         
        </div>
      </div> 
    </div>
  );
}
export default PokemonCard