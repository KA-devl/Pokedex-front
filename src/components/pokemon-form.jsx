import formatType from '../helpers/format-type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonService from '../services/pokemon-service';

  
function PokemonForm ({pokemon, isEditForm}) {
  //Avec cela, on peut set les valeurs pour des valeurs initiale pour chaque form de pokemon
  const [form, setForm] = useState({
    picture:{value:pokemon.picture, isValid:true},
    name: {value: pokemon.name, isValid : true},
    hp: {value: pokemon.hp, isValid : true},
    cp: {value: pokemon.cp, isValid : true},
    types: {value: pokemon.types, isValid : true}

  
  
  });
  const navigate = useNavigate();
  
  const types = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  const hasType = (type) =>{
    return form.types.value.includes(type)
  }
   
  const handleInputChange = (e) =>{
    const fieldName = e.target.name
    const fieldValue = e.target.value
    const newField = {[fieldName]: {value : fieldValue}}

    setForm({...form, ...newField})
  }
 
// Quand le button valider est cliquer
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
  

    if(isFormValid){

   //Set les nouvelles valeurs aux valeurs recentes de form
   pokemon.picture = form.picture.value
   pokemon.name= form.name.value
   pokemon.hp= form.hp.value
   pokemon.cp= form.cp.value
  pokemon.types= form.types.value
    
      isEditForm ? updatePokemon () : addPokemon()
    }
   
  }

  const addPokemon = () =>{
    PokemonService.postPokemon(pokemon).then(navigate('/pokemons'))
  }

 const updatePokemon = () =>{
  PokemonService.updatePokemon(pokemon).then(()=> navigate(`/pokemons/${pokemon.id}`))
 }


//Validation de formulaire

//Pour s'assurer qu'on CREE un nouveau pokemon et qu'on pas entrain de le editer
const isAddForm = () => {
  return !isEditForm
}

const validateForm = () => {
  let newForm= form;

  //Validator picture
  if(isAddForm()){
    const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
    const end = ".png"

    if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
      const errorMsg = "L'url saisi n'est pas valide."
      const newField = { value: form.picture.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ picture: newField } };
    }else {
      const newField = { value: form.picture.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ picture: newField } };
    }
  }

  // Validator name
  if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
    const errorMsg = 'Le nom du pokémon est requis (1-25).';
    const newField = { value: form.name.value, error: errorMsg, isValid: false };
    newForm = { ...newForm, ...{ name: newField } };
  } else {
    const newField = { value: form.name.value, error: '', isValid: true };
    newForm = { ...newForm, ...{ name: newField } };
  }

  // Validator hp
  if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
    const errorMsg = 'Les points de vie du pokémon sont compris entre 0 et 999.';
    const newField = {value: form.hp.value, error: errorMsg, isValid: false};
    newForm = { ...newForm, ...{ hp: newField } };
  } else {
    const newField = { value: form.hp.value, error: '', isValid: true };
    newForm = { ...newForm, ...{ hp: newField } };
  }

  // Validator cp
  if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
    const errorMsg = 'Les dégâts du pokémon sont compris entre 0 et 99';
    const newField = {value: form.cp.value, error: errorMsg, isValid: false};
    newForm = { ...newForm, ...{ cp: newField } };
  } else {
    const newField = { value: form.cp.value, error: '', isValid: true };
    newForm = { ...newForm, ...{ cp: newField } };
  }

  setForm(newForm);
  //Si toutes les valeurs sont value donc true, le formulaire vas etre submit, sinon sa retourne false
  return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
}

const isTypesValid = (type)=> {
  // Cas n°1: Le pokémon a un seul type, qui correspond au type passé en paramètre.
  // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
  if (form.types.value.length === 1 && hasType(type)) {
    return false;
  }
  
  // Cas n°2: Le pokémon a au moins 3 types.
  // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
  if (form.types.value.length >= 3 && !hasType(type)) { 
    return false; 
  } 
  
  // Après avoir passé les deux tests ci-dessus, on renvoie 'true', 
  // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
  return true;
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
}

const deletePokemon = () => {
  PokemonService.deletePokemon(pokemon)
  .then(navigate('/pokemons/'))
}



  return (
    <form onSubmit={e=>handleSubmit (e)} noValidate>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 

          {isEditForm && (<div className="card-image">
          <span className="btn btn-floating halfway-fab waves-effect waves-light" onClick={()=>deletePokemon()} > <i className='material-icons'>delete</i></span>
            <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
          </div>)}
            
            <div className="card-stacked">
            
              <div className="card-content">
              {/* Pokemon picture */}
              {isAddForm() && (
                <div className="form-group">
                  <label htmlFor="picture">Image (NOTE :Remplacer le XXX du lien ci-dessous par un chiffre afin de génerer une photo d'un pokémon)</label>
                  <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e=> handleInputChange(e)}></input>
                  {form.picture.error &&
                  <div className='card-panel red accent-1'>{form.picture.error} </div>}
                </div>
              )}
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e=> handleInputChange(e)}></input>
                  {form.name.error &&
                  <div className='card-panel red accent-1'>{form.name.error} </div>}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input name ="hp" id="hp" type="number" className="form-control" value={form.hp.value}onChange={e => handleInputChange(e)}></input>
                  {form.hp.error &&
                    <div className='card-panel red accent-1'>{form.hp.error} </div>}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input name="cp" id="cp" type="number" className="form-control" value={form.cp.value}
                  onChange={e => handleInputChange(e)}></input>
                  {form.cp.error &&
                    <div className='card-panel red accent-1'>{form.cp.error} </div>}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
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
};
   
export default PokemonForm;