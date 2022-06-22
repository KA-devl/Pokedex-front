
import { Route} from "react-router";
import { BrowserRouter, Link , Routes} from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonList from "./pages/pokemon-list";
import PokemonEdit from "./components/pokemon-edit";
import CreatePokemon from "./pages/create-pokemon";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";

function App() {

  
  return(<BrowserRouter>
    <nav>
    <div className="nav-wrapper teal">
    <Link to="/" className="brand-logo center">Pokedex</Link>
    </div>
    </nav>
    <Routes>
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/login" element={<Login/>}/>

      <Route element={<PrivateRoute/>}>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemons" element={<PokemonList/>} />
        <Route path="/pokemons/create" element={<CreatePokemon/>}/>
        <Route path="/pokemons/:id" element={<PokemonsDetail/>} />
        <Route path="/pokemons/edit/:id" element={<PokemonEdit/>}/>
      </Route>
    
    </Routes>
    
    </BrowserRouter>
   
    )
 
}

export default App;
