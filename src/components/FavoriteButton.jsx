import React from 'react'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteButton({ item }) {
    const { favorites, toggleFavorite } = useFavorites()
    const isFav = favorites.some(
        f => f.uid === item.uid && f.type === item.type
    )

    return (
        <button
            onClick={() => toggleFavorite(item)}
            className={`mt-1 px-2 py-1 rounded ${
                isFav ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
        >
            {isFav ? '★ Favorito' : '☆ Añadir'}
        </button>
    )
}
