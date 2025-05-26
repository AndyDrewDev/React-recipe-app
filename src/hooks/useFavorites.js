import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { getMealById } from '../services/mealService'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('mealIds', [])
  const [favorites, setFavorites] = useState([])
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoriteIds.length > 0) {
        setIsFavoritesLoading(true)
      }

      const favoriteMeals = []
      for (const id of favoriteIds) {
        try {
          const meal = await getMealById(id)
          if (meal) {
            favoriteMeals.push(meal)
          }
        } catch (err) {
          console.error(
            `Failed to load favorite meal with id ${id}:`,
            err.message
          )
        }
      }
      setFavorites(favoriteMeals)
      setIsFavoritesLoading(false)
    }

    fetchFavorites()
  }, [favoriteIds])

  const toggleFavorite = (meal) => {
    const isFavorite = favoriteIds.includes(meal.idMeal)
    if (isFavorite) {
      setFavoriteIds(favoriteIds.filter((id) => id !== meal.idMeal))
    } else {
      setFavoriteIds([meal.idMeal, ...favoriteIds])
    }
  }

  const removeFavorite = (id) => {
    setFavoriteIds(favoriteIds.filter((mealId) => mealId !== id))
  }

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite meals?')) {
      setFavoriteIds([])
    }
  }

  return {
    favoriteIds,
    favorites,
    isFavoritesLoading,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  }
}
