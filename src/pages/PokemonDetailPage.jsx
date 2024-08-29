import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import PokemonLogo from '../assets/pokemon-logo.png'
import { Loading } from '../components/Loading';
import { Background } from '../components/Background';

export const PokemonDetailPage = () => {
  const { name } = useParams(); // Obtiene el ID del Pokémon de la URL
  const navigate = useNavigate(); // Hook para navegar a páginas anteriores
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Obtener el Pokémon en inglés para descripción
        let description = ' '
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
        if (!speciesResponse.ok) {
          // throw new Error('Error fetching Pokémon species');
          description = 'No description available'
        } else {
          const speciesData = await speciesResponse.json();

          // Extraer la descripción en inglés
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
  if (!pokemon) return <div>No Pokémon found</div>;

  return (
    <>
      <Background />
      <div className='h-screen flex justify-center items-center'>
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
          <div className="px-6 pt-4 pb-2">
            <button
              className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-700"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Función para obtener el color del tipo de Pokémon
const getTypeColor = (type) => {
  switch (type) {
    case 'fire':
      return 'bg-red-500';
    case 'water':
      return 'bg-blue-500';
    case 'grass':
      return 'bg-green-500';
    case 'electric':
      return 'bg-yellow-500';
    case 'psychic':
      return 'bg-purple-500';
    case 'bug':
      return 'bg-green-400';
    case 'normal':
      return 'bg-gray-500';
    case 'fighting':
      return 'bg-red-600';
    case 'flying':
      return 'bg-blue-400';
    case 'poison':
      return 'bg-purple-600';
    case 'ground':
      return 'bg-brown-500';
    case 'rock':
      return 'bg-gray-700';
    case 'ice':
      return 'bg-cyan-400';
    case 'dragon':
      return 'bg-blue-600';
    case 'dark':
      return 'bg-gray-800';
    case 'steel':
      return 'bg-gray-600';
    case 'fairy':
      return 'bg-pink-500';
    default:
      return 'bg-gray-200';
  }
};
