import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Chip, Pagination } from '@nextui-org/react'; // Ensure correct import path
import { getFetchPokemons } from '../hooks/getFecthPokemons';
import PokemonLogo from '../assets/pokemon-logo.png'
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';
import { HeartIcon } from '../components/HeartIcon';

const pokemonsTypes = [
  {
    name: 'psychic',
    color: 'bg-purple-500',
  },
  {
    name: 'fire',
    color: 'bg-red-500'
  },
  {
    name: 'water',
    color: 'bg-blue-500'
  },
  {
    name: 'grass',
    color: 'bg-green-500'
  },
  {
    name: 'electric',
    color: 'bg-yellow-500'
  },
  {
    name: 'bug',
    color: 'bg-green-400'
  },
  {
    name: 'normal',
    color: 'bg-gray-500'
  },
  {
    name: 'fighting',
    color: 'bg-red-600'
  },
  {
    name: 'flying',
    color: 'bg-blue-400'
  },
  {
    name: 'poison',
    color: 'bg-purple-600'
  },
  {
    name: 'ground',
    color: 'bg-gray-900'
  },
  {
    name: 'rock',
    color: 'bg-gray-700'
  },
  {
    name: 'ice',
    color: 'bg-cyan-400'
  }

]











//     case 'dragon':
// return 'bg-blue-600';
//     case 'dark':
// return 'bg-gray-800';
//     case 'steel':
// return 'bg-gray-600';
//     case 'fairy':
// return 'bg-pink-500';
//     default:
// return 'bg-gray-200';



export const PokemonsPage = () => {
  // Get the stored page or default to 1
  const storedPage = sessionStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);
  const { loading, data, error, nextPage, previousPage, totalPages, setCurrentUrl } = getFetchPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`);

  useEffect(() => {
    // Save the current page in sessionStorage whenever it changes
    sessionStorage.setItem('currentPage', currentPage);

    // Fetch data based on the current page
    const offset = (currentPage - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
    setCurrentUrl(url);
  }, [currentPage, setCurrentUrl]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div >

      <h1 className="text-4xl text-center my-4 md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 animate-gradient-x">
        PokéAPI Characters
      </h1>

      <div className='flex gap-3 flex-wrap justify-center'>
        {pokemonsTypes.map(pokemon => (
          <div key={pokemon.name} className={`px-2 py-1 text-sm font-semibold text-white rounded-full ${pokemon.color}`}>
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
              <Button className="bg-black text-white">
                <HeartIcon className="h-6 w-6 inline-block" />
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
