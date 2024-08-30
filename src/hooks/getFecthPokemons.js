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

  const { favorites } = usePokemonStore(); // Acceso a favoritos desde Zustand

  // Función para obtener los datos de Pokémon (solo al cambiar de página)
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
        console.log({pokemonDetails})

        return {
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          isFavorite: favorites.includes(pokemonDetails.name), // Verificar favoritos al obtener los datos
        };
      });

      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      setData(pokemonDetails);
      setNextPage(result.next);
      setPreviousPage(result.previous);
      setTotalPages(Math.ceil(result.count / 20)); // Calcula el total de páginas
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // No incluyas 'favorites' aquí para evitar la nueva consulta al cambiar favoritos

  // Efecto para obtener datos al cambiar de página
  useEffect(() => {
    fetchData(currentUrl);
  }, [currentUrl, fetchData]);

  // Efecto para actualizar 'isFavorite' al cambiar favoritos sin nueva consulta
  useEffect(() => {
    setData((prevData) =>
      prevData.map((pokemon) => ({
        ...pokemon,
        isFavorite: favorites.includes(pokemon.name), // Actualizar solo el estado de isFavorite
      }))
    );
  }, [favorites]);

  return { loading, data, setData, error, nextPage, previousPage, totalPages, setCurrentUrl };
};