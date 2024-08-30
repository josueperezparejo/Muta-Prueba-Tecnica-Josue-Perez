import { create } from 'zustand'; // Correct import syntax

// Define the Zustand store
export const usePokemonStore = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],

  // Toggle function to add or remove a Pokémon from the favorites
  toggleFavorite: (pokemon) => {
    const { favorites } = get();
    let updatedFavorites;

    if (favorites.includes(pokemon)) {
      // If it's already in the list, remove it
      updatedFavorites = favorites.filter(fav => fav !== pokemon);
    } else {
      // If it's not in the list, add it
      updatedFavorites = [...favorites, pokemon];
    }

    // Update the store and localStorage
    set({ favorites: updatedFavorites });
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  },

  // Function to check if a Pokémon is in the favorites list
  isFavorite: (pokemon) => {
    return get().favorites.includes(pokemon);
  },

  clearFavorites: () => {
    set({ favorites: [] });
    localStorage.setItem('favorites', JSON.stringify([]));
  }
}));
