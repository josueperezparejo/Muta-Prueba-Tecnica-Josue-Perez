import { useState, useEffect, useCallback } from 'react';
import { usePokemonStore } from '../store/usePokemonStore';
import { POKEAPI } from '../config';

export const getFetchFavorites = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { favorites } = usePokemonStore();

  const fetchFavoritesData = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {

      if (favorites.length === 0) {
        setData([]);
        return;
      }

      const pokemonDetailsPromises = favorites.map(async (pokemonName) => {
        const response = await fetch(`${POKEAPI}pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error(`Error fetching data for ${pokemonName}`);
        }

        const pokemonDetails = await response.json();

        return {
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          isFavorite: true
        };
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setData(pokemonDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    fetchFavoritesData();
  }, [fetchFavoritesData]);

  return { loading, data, error };
};
