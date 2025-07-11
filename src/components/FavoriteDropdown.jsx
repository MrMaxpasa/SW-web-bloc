import React, { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { Link } from 'react-router-dom'

export default function FavoriteDropdown() {
    const { favorites } = useFavorites()
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Mis Favoritos ({favorites.length})
            </button>
            {open && (
                <ul className="absolute mt-2 bg-white shadow-lg rounded w-48">
                    {favorites.length === 0 ? (
                        <li className="p-2">Sin favoritos</li>
                    ) : (
                        favorites.map(f => (
                            <li
                                key={`${f.type}-${f.uid}`}
                                className="p-2 hover:bg-gray-100"
                            >
                                <Link to={`/${f.type}/${f.uid}`}>
                                    {f.name}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    )
}
