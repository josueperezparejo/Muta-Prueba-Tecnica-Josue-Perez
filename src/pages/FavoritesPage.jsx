import React, { useEffect } from 'react'
import { usePokemonStore } from '../store/usePokemonStore';
import { Link, useNavigate } from 'react-router-dom';
import { getFetchFavorites } from '../hooks/getFetchFavorites';
import { Button } from '@nextui-org/button';
import { HeartIcon } from '../components/HeartIcon';

export const FavoritesPage = () => {

  const navigate = useNavigate(-1)
  const { toggleFavorite, favorites, clearFavorites } = usePokemonStore();
  const { loading, data, error } = getFetchFavorites();

  const handleAddFavorite = (args) => {
    toggleFavorite(args)
  }

  const handleClearFavorites = () => {
    clearFavorites()
  }

  useEffect(() => {
    console.log({ favorites })
  }, [])

  return (
    <div>
      <h1 className="text-4xl text-center my-4 md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 animate-gradient-x">
        PokéAPI Characters
      </h1>

      <button
        className="px-4 py-2 text-white bg-purple-500 rounded-2xl hover:bg-purple-700"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <button
        className="px-4 py-2 text-white bg-purple-500 rounded-2xl hover:bg-purple-700"
        onClick={handleClearFavorites}
      >
        Clear
      </button>

      <div>
        <h1>Favorite Pokémon</h1>
        <ul className='flex flex-wrap justify-center gap-4'>
          {data.map((pokemon, index) => (
            <div key={index} className="w-48 bg-white max-h-full  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

              <Link to={`/pokemon/${pokemon.name}`}>
                <div className="p-4 flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={pokemon.image ? pokemon.image : PokemonLogo}
                      alt={pokemon.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{pokemon.name}</h2>

                </div>
              </Link>
              <div className='flex justify-center p-2'>
                <Button onClick={() => handleAddFavorite(pokemon.name)} className="bg-black text-white">
                  <HeartIcon isFavorite={pokemon.isFavorite} className="h-6 w-6 inline-block" />
                  Add to Favorites
                </Button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
