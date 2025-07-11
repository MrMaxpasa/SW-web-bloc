import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useLocalStorage('sw-favorites', [])

    const toggleFavorite = item => {
        setFavorites(prev =>
            prev.find(f => f.uid === item.uid)
                ? prev.filter(f => f.uid !== item.uid)
                : [...prev, item]
        )
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    return useContext(FavoritesContext)
}
