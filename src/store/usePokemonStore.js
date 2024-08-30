import { create } from 'zustand'; // Correct import syntax

export const usePokemonStore = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],

  toggleFavorite: (pokemon) => {
    const { favorites } = get();
    let updatedFavorites;

    if (favorites.includes(pokemon)) {
      updatedFavorites = favorites.filter(fav => fav !== pokemon);
    } else {
      updatedFavorites = [...favorites, pokemon];
    }

    set({ favorites: updatedFavorites });
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  },

  isFavorite: (pokemon) => {
    return get().favorites.includes(pokemon);
  },

  clearFavorites: () => {
    set({ favorites: [] });
    localStorage.setItem('favorites', JSON.stringify([]));
  }
}));
