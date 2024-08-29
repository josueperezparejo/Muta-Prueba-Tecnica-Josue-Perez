import { useState, useEffect, useCallback } from 'react';

export const getFetchPokemons = (initialUrl) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

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
        };
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      setData(pokemonDetails);
      setNextPage(result.next);
      setPreviousPage(result.previous);
      setTotalPages(Math.ceil(result.count / 20)); // Calculate total pages based on the count
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentUrl);
  }, [currentUrl, fetchData]);

  return { loading, data, error, nextPage, previousPage, totalPages, setCurrentUrl };
};
