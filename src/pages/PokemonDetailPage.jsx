import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/button';

import { getTypeColor } from '../helpers';
import { usePokemonStore } from '../store/usePokemonStore';
import { ErrorMessage, Loading, HeartIcon } from '../components';

import PokemonLogo from '../assets/pokemon-logo.png';

export const PokemonDetailPage = () => {

  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, toggleFavorite } = usePokemonStore();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

        if (!response.ok) {
          throw new Error('Error fetching Pokémon details');
        }
        const data = await response.json();
        let description = ' '
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
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
  }, [name]);

  if (loading) return <Loading />
  if (error) return <ErrorMessage message="Pokémon could not be found. Please try another name." />;

  return (
    <div className='container mx-auto'>
      <div className='container mx-auto p-4 h-screen flex justify-center items-center'>
        <div className="max-w-sm h-auto rounded overflow-hidden shadow-lg bg-white">
          <div className="bg-purple-100 p-4 flex justify-center">
            <img
              className="w-32 h-32 object-contain"
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

          <div className="px-6 pt-4 pb-2 flex justify-between">
            <Button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-white bg-purple-500 rounded-2xl hover:bg-purple-700"
            >
              Go Back
            </Button>

            <Button
              onClick={() => toggleFavorite(pokemon.name)}
              className="bg-black text-white">
              <HeartIcon
                isFavorite={isFavorite(pokemon.name)}
                className="h-6 w-6 inline-block" />
              Add to Favorites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};