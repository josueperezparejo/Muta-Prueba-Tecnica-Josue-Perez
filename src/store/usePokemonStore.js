import create from 'zustand';

// Define the Zustand store
export const usePokemonStore = create((set, get) => ({
  favorites: [],

  // Toggle function to add or remove a Pokémon from the favorites
  toggleFavorite: (pokemon) => {
    const { favorites } = get();

    if (favorites.includes(pokemon)) {
      // If it's already in the list, remove it
      set({
        favorites: favorites.filter(fav => fav !== pokemon),
      });
    } else {
      // If it's not in the list, add it
      set({
        favorites: [...favorites, pokemon],
      });
    }
  },

  // Function to check if a Pokémon is in the favorites list
  isFavorite: (pokemon) => {
    return get().favorites.includes(pokemon);
  },
}));
