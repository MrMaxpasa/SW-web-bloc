// src/context/FavoritesContext.jsx
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('sw-favorites', []);

  const toggleFavorite = item => {
    setFavorites(prev =>
      prev.some(f => f.uid === item.uid && f.type === item.type)
        ? prev.filter(f => !(f.uid === item.uid && f.type === item.type))
        : [...prev, item]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
