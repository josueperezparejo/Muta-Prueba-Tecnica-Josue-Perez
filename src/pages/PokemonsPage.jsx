import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@nextui-org/react';

import { Loading, HeartIcon, ErrorMessage, PokemonSearchForm, Footer, Title } from '../components';
import { usePokemonStore } from '../store/usePokemonStore';
import { getFetchPokemons } from '../hooks/getFecthPokemons';

import PokemonLogo from '../assets/pokemon-logo.png'
import { POKEAPI } from '../config';

export const PokemonsPage = () => {

  const storedPage = sessionStorage.getItem('currentPage');

  const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);

  const { favorites, toggleFavorite } = usePokemonStore();

  const {
    data,
    error,
    loading,
    nextPage,
    previousPage,
    setCurrentUrl,
    setData,
    totalPages,
  } = getFetchPokemons(`${POKEAPI}pokemon?offset=${(currentPage - 1) * 20}&limit=20`);

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
    const url = `${POKEAPI}pokemon?offset=${offset}&limit=20`;
    setCurrentUrl(url);
  }, [currentPage, setCurrentUrl]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message="Pokémon could not be found. Please try another name." />;

  return (
    <div className='container mx-auto h-full' >

      <Title />

      <PokemonSearchForm title={'Find Your Pokémon'} />

      <ul className='flex flex-wrap justify-center gap-4'>
        {data.map((pokemon, index) => (
          <div key={index} className="w-48 bg-white max-h-full  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

            <Link to={`/pokemon/${pokemon.name}`}>
              <div className="p-4 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-100 hover:bg-purple-200 transition duration-300 ease-in-out rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={pokemon.image ? pokemon.image : PokemonLogo}
                    alt={pokemon.name}
                    className="w-20 h-20 object-contain animate__animated animate__fadeIn"
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

      <Footer />
    </div>
  );
};
