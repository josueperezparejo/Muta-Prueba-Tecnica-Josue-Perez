import { useCallback, useEffect, useState } from "react";
import { usePokemonStore } from "../store/usePokemonStore";

export const getFetchPokemons = (initialUrl) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const { favorites } = usePokemonStore();

  const fetchData = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const result = await response.json();

      const pokemonDetailsPromises = result.results.map(async (pokemon) => {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();

        return {
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          isFavorite: favorites.includes(pokemonDetails.name),
        };
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      setData(pokemonDetails);
      setNextPage(result.next);
      setPreviousPage(result.previous);
      setTotalPages(Math.ceil(result.count / 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentUrl);
  }, [currentUrl, fetchData]);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((pokemon) => ({
        ...pokemon,
        isFavorite: favorites.includes(pokemon.name),
      }))
    );
  }, [favorites]);

  return {
    data,
    error,
    loading,
    nextPage,
    previousPage,
    setCurrentUrl,
    setData,
    totalPages,
  };
};