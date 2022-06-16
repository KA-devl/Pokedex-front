import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
  
function PageNotFound (){
  
  return (
    <div className="center">
      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png" alt="Page non trouvée"/>
      <h1>Erreur 404, la page n'existe pas !</h1> 
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Retourner à l'accueil
      </Link>
    </div>
  );
}
  
export default PageNotFound;