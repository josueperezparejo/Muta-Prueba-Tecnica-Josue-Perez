import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@nextui-org/react'; // Ensure correct import path
import { getFetchPokemons } from '../hooks/getFecthPokemons';
import PokemonLogo from '../assets/pokemon-logo.png'
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';


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
      <Background />
      <h1 className="text-4xl text-center my-4 md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 animate-gradient-x">
        PokéAPI Characters
      </h1>
      <ul className='flex flex-wrap justify-center gap-4'>
        {data.map((pokemon, index) => (
          <Link key={index} to={`/pokemon/${pokemon.name}`}>
            <div className="w-48 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={pokemon.image ? pokemon.image : PokemonLogo}
                    alt={pokemon.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{pokemon.name}</h2>
              </div>
            </div>
          </Link>
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
