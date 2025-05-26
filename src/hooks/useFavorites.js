import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { getMealById } from '../services/mealService'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('mealIds', [])
  const [favorites, setFavorites] = useState([])
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsFavoritesLoading(favoriteIds.length > 0)

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

  const toggleFavorite = useCallback(
    (meal) => {
      setFavoriteIds((prevIds) => {
        const isFavorite = prevIds.includes(meal.idMeal)
        if (isFavorite) {
          return prevIds.filter((id) => id !== meal.idMeal)
        } else {
          return [meal.idMeal, ...prevIds]
        }
      })
    },
    [setFavoriteIds]
  )

  const removeFavorite = useCallback(
    (id) => {
      setFavoriteIds((prevIds) => prevIds.filter((mealId) => mealId !== id))
    },
    [setFavoriteIds]
  )

  const clearAllFavorites = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all favorite meals?')) {
      setFavoriteIds([])
    }
  }, [setFavoriteIds])

  return {
    favoriteIds,
    favorites,
    isFavoritesLoading,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  }
}
