
import { Route} from "react-router";
import { BrowserRouter, Link , Routes} from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonList from "./pages/pokemon-list";
import PokemonEdit from "./components/pokemon-edit";

function App() {

  
  return(<BrowserRouter>
    <nav>
    <div className="nav-wrapper teal">
    <Link to="/" className="brand-logo center">Pokedex</Link>
    </div>
    </nav>
    <Routes>
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemons" element={<PokemonList />} />
      <Route path="/pokemons/:id" element={<PokemonsDetail/>} />
    
    </Routes>
    
    </BrowserRouter>
   
    )
 
}

export default App;
