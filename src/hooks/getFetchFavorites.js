import { useState, useEffect, useCallback } from 'react';
import { usePokemonStore } from '../store/usePokemonStore';

export const getFetchFavorites = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { favorites } = usePokemonStore(); // Acceso a favoritos desde Zustand

  // Función para obtener los datos de Pokémon favoritos
  const fetchFavoritesData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Si no hay favoritos, no hace falta hacer una consulta
      if (favorites.length === 0) {
        setData([]);
        return;
      }

      // Obtener detalles de cada Pokémon favorito
      const pokemonDetailsPromises = favorites.map(async (pokemonName) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error(`Error fetching data for ${pokemonName}`);
        }
        const pokemonDetails = await response.json();
        return {
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          isFavorite: true // Siempre es true porque estamos en la vista de favoritos
        };
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setData(pokemonDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [favorites]); // Actualiza los datos cuando cambian los favoritos

  useEffect(() => {
    fetchFavoritesData();
  }, [fetchFavoritesData]);

  return { loading, data, error };
};
