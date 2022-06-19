import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';

function CreatePokemon() {
  
  const [form, setForm] = useState({
    picture: {value : 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png', isValid : true},
    name: {value: '...', isValid : true},
    hp: {value: 100, isValid : true},
    cp: {value: 10, isValid : true},
    types: {value: ['Normal'], isValid : true}

  });
  
  const navigate = useNavigate();
  
  const types = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];
  const hasType = (type) =>{
    return form.types.value.includes(type)
  }
  const selectType = (type, e) => {
    const checked = e.target.checked;
    let newField;

    if(checked) {
      // Si l'utilisateur coche un type, à l'ajoute à la liste des types du pokémon.
      const newTypes = form.types.value.concat([type]);
      newField = { value: newTypes };

     
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
      const newTypes = form.types.value.filter((currentType) => currentType !== type);
      newField = { value: newTypes };
    }

    setForm({...form, ...{ types: newField }});
    console.log(form.types.value)
  }
 

  
  const handleInputChange = (e) =>{
    const fieldName = e.target.name
    console.log(fieldName)
    const fieldValue = e.target.value
    const newField = {[fieldName]: {value : fieldValue}}

    setForm({...form, ...newField})
  }
  
 
 
  const handleSubmit = (e)=>{
    form.name = form.name.value
    form.hp = form.hp.value
   form.cp =form.cp.value
    form.picture = form.picture.value
    form.types = form.types.value
    
    PokemonService.postPokemon(form).then(navigate('/pokemons/'))
  }


  return (
    <form onSubmit={e=>handleSubmit (e)} noValidate>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-stacked">
            
              <div className="card-content">
              {/* Image input */ }
              <div className="form-group">
                  <label htmlFor="picture">Image</label>
                  <input id="picture" name="picture" type="text" className="form-control" value = {form.picture.value} onChange={e=> handleInputChange(e)}></input>
                 
                </div>
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value = {form.name.value} onChange={e=> handleInputChange(e)}></input>
                  
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input name ="hp" id="hp" type="number" className="form-control" value = {form.hp.value} onChange={e=> handleInputChange(e)}></input>
                  {/* {form.hp.error &&
                  <div className='card-panel red accent-1'>{form.hp.error} </div>} */}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input name="cp" id="cp" type="number" className="form-control" value = {form.cp.value} onChange={e=> handleInputChange(e)}></input>
                  
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in"  checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn" >Valider</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePokemon