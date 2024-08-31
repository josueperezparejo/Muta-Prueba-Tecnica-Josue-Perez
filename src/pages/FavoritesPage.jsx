import React, { useEffect } from 'react'
import { usePokemonStore } from '../store/usePokemonStore';
import { Link, useNavigate } from 'react-router-dom';
import { getFetchFavorites } from '../hooks/getFetchFavorites';
import { Button } from '@nextui-org/button';
import { HeartIcon } from '../components/HeartIcon';
import { ErrorMessage, Footer, Loading, PokemonSearchForm, Title } from '../components';

export const FavoritesPage = () => {

  const { toggleFavorite, favorites } = usePokemonStore();
  const { loading, data, error } = getFetchFavorites();

  if (loading) return <Loading />
  if (error) return (
    <>
      <ErrorMessage message="Pokémon could not be found. Please try another name." />;
      <Footer />
    </>
  )


  const handleAddFavorite = (args) => {
    toggleFavorite(args)
  }
  
  return (
    <div className='container mx-auto h-full'>
      <Title />

      <PokemonSearchForm title={'Discover the Power of Your Favorite Pokémon!'}/>

      <div className='my-4'>
        {
          favorites.length ?
            <ul className='flex flex-wrap justify-center gap-4'>
              {data.map((pokemon, index) => (
                <div key={index} className="w-48 bg-white max-h-full  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

                  <Link to={`/pokemon/${pokemon.name}`}>
                    <div className="p-4 flex flex-col items-center">
                      <div className="w-24 h-24 bg-gray-100 hover:bg-purple-200 transition duration-300 ease-in-out rounded-full flex items-center justify-center overflow-hidden">
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
            : <div className="flex flex-col items-center justify-center min-h-[400px] p-4  rounded-lg  animate-fade-in">
              <div className="text-center">
                {/* <Frown className="w-24 h-24 mx-auto mb-4 text-gray-400" /> */}
                <h2 className="text-3xl font-bold mb-2 text-gray-700">Oops! No Favorites Yet</h2>
                <p className="text-xl text-gray-600 mb-6">
                  It looks like you haven't added any Pokémon to your favorites yet.
                  <br />
                  Explore more Pokémons
                </p>
              </div>
            </div>
        }
      </div>

      <Footer />
    </div>
  )
}