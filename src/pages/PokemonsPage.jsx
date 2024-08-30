import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination } from '@nextui-org/react';



import { pokemonsTypes } from '../config';
import { Loading, HeartIcon, ErrorMessage } from '../components';
import { usePokemonStore } from '../store/usePokemonStore';
import { getFetchPokemons } from '../hooks/getFecthPokemons';

import PokemonLogo from '../assets/pokemon-logo.png'

export const PokemonsPage = () => {

  const storedPage = sessionStorage.getItem('currentPage');

  const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);

  const { favorites, toggleFavorite } = usePokemonStore();

  const navigate = useNavigate()

  const {
    data,
    error,
    loading,
    nextPage,
    previousPage,
    setCurrentUrl,
    setData,
    totalPages,
  } = getFetchPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((pokemon) => ({
        ...pokemon,
        isFavorite: favorites.includes(pokemon.name),
      }))
    );
  }, [favorites, nextPage, previousPage]);

  useEffect(() => {

    sessionStorage.setItem('currentPage', currentPage);

    const offset = (currentPage - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
    setCurrentUrl(url);
  }, [currentPage, setCurrentUrl]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message="Pokémon could not be found. Please try another name." />;

  return (
    <div className='container mx-auto' >

      <h1 className="text-4xl text-center my-4 md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 animate-gradient-x">
        PokéAPI Characters
      </h1>

      <div className='flex justify-end my-4 mr-8'>
        <Button
          size='md'
          className="px-4 font-semibold py-2 text-white bg-purple-500 rounded-2xl hover:bg-purple-700"
          onClick={() => navigate('/pokemons/favorites')}>
          go to Favorites ➡️
        </Button>
      </div>

      <div className='flex gap-3 flex-wrap justify-center'>
        {pokemonsTypes.map(pokemon => (
          <div key={pokemon.name} className={`cursor-pointer px-2 py-1 text-sm font-semibold text-white rounded-full ${pokemon.color}`}>
            {pokemon.name}
          </div>
        ))}
      </div>

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
              <Button onClick={() => toggleFavorite(pokemon.name)} className="bg-black text-white">
                <HeartIcon isFavorite={pokemon.isFavorite} className="h-6 w-6 inline-block" />
                Add to Favorites
              </Button>
            </div>
          </div>
        ))}
      </ul>

      <div className="flex flex-col gap-5 items-center my-5">
        <p className="text-small text-default-500">Selected Page: {currentPage}</p>
        <Pagination
          total={totalPages}
          color="secondary"
          page={currentPage}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            color="secondary"
            onPress={() => {
              if (previousPage) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
            isDisabled={!previousPage}
          >
            Previous
          </Button>
          <Button
            size="sm"
            color="secondary"
            onPress={() => {
              if (nextPage) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
            isDisabled={!nextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
