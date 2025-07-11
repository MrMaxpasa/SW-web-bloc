// src/components/FavoriteButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ item }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some(f => f.uid === item.uid && f.type === item.type);

  return (
    <Button
      size="sm"
      onClick={() => toggleFavorite(item)}
      variant={isFav ? 'danger' : 'outline-secondary'}
    >
      {isFav ? '★ Favorito' : '☆ Añadir'}
    </Button>
  );
}
