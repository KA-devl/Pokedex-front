export default class Pokemon {
  // 1. Typage des propiétés d'un pokémon.
  id;
  hp;
  cp;
  name;
  picture;
  types;
  created;
   
  // 2. Définition des valeurs par défaut des propriétés d'un pokémon.
  constructor(
   id,
   hp = 100,
   cp = 10,
   name = '...',
   picture = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png',
   types= ['Normal'],
   created= new Date()
  ) {
   // 3. Initialisation des propiétés d'un pokémons.
   this.id = id;
   this.hp = hp;
   this.cp = cp;
   this.name = name;
   this.picture = picture;
   this.types = types;
   this.created = created;
  }
 }