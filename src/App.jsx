import { Navigate, Route, Routes } from "react-router-dom"
import { FavoritesPage, NotFoundPage, PokemonDetailPage, PokemonsPage } from "./pages"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemons" />} />

        <Route path="/pokemons" element={<PokemonsPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="/pokemons/favorites" element={<FavoritesPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
