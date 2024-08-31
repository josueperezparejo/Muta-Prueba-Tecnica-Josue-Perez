import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@nextui-org/button';

import { getTypeColor } from '../helpers';
import { usePokemonStore } from '../store/usePokemonStore';
import { ErrorMessage, Loading, HeartIcon, PokemonSearchForm, Footer, Title } from '../components';

import PokemonLogo from '../assets/pokemon-logo.png';
import { POKEAPI } from '../config';

export const PokemonDetailPage = () => {

  const { name } = useParams();
  const lowerCaseName = name.toLowerCase().trim();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, toggleFavorite } = usePokemonStore();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${POKEAPI}pokemon/${lowerCaseName}/`);

        if (!response.ok) {
          throw new Error('Error fetching Pokémon details');
        }
        const data = await response.json();
        let description = ' '
        const speciesResponse = await fetch(`${POKEAPI}pokemon-species/${lowerCaseName}/`);
        if (!speciesResponse.ok) {
          description = 'No description available'
        } else {
          const speciesData = await speciesResponse.json();

          description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available';
        }

        setPokemon({
          ...data,
          description,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [lowerCaseName]);

  if (loading) return <Loading />
  if (error) return (
    <>
      <ErrorMessage message={`The Pokémon ${lowerCaseName} could not be found. Please try another name.`} />;
      <Footer />
    </>
  )

  return (
    <div className='container mx-auto'>
      <Title />
      <PokemonSearchForm title={`Discover the Power of ${lowerCaseName}!`} />
      <div className='mb-8 h-auto flex justify-center'>
        <div className="max-w-sm p-4 h-auto rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="bg-purple-100 rounded flex justify-center">
            <img
              className="w-32 h-32 object-contain animate__animated animate__fadeIn"
              src={pokemon.sprites.front_default || PokemonLogo}
              alt={pokemon.name}
            />
          </div>

          <div className="px-6 py-4">
            <div className="font-bold text-purple-600 text-xl mb-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
            <p className="text-gray-500 text-base mb-2">
              {pokemon.description}
            </p>
            <div className="flex space-x-2 mb-2">
              {pokemon.types.map(type => (
                <div key={type.type.name} className={`px-2 py-1 text-sm font-semibold text-white rounded-full ${getTypeColor(type.type.name)}`}>
                  {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold text-purple-500">Height:</span> {pokemon.height / 10} m
              </div>
              <div>
                <span className="font-semibold text-purple-500">Weight:</span> {pokemon.weight / 10} kg
              </div>
              <div>
                <span className="font-semibold text-purple-500">Category:</span> {pokemon.species.name}
              </div>
              <div>
                <span className="font-semibold text-purple-500">Abilities:</span> {pokemon.abilities.map(ab => ab.ability.name).join(', ')}
              </div>
            </div>
          </div>

          <div className="px-6 pt-4 pb-2">
            <div className="font-semibold text-blue-700 mb-2">Base Stats:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name}>
                  <p className='text-gray-700 font-semibold'>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)} : <span className='text-gray-500'>{stat.base_stat}</span></p></div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => toggleFavorite(pokemon.name)}
              className="bg-black text-white w-full px-3">
              <HeartIcon
                isFavorite={isFavorite(pokemon.name)}
                className="h-6 w-6 inline-block" />
              Add to Favorites
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};