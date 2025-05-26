import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import FavoritesContainer from './components/FavoritesContainer'
import MealsContainer from './components/MealsContainer'
import MealInfo from './components/MealInfo'
import ErrorMessage from './components/ErrorMessage'
import {
  getRandomMeal,
  getMealById,
  getMealsBySearch,
} from './services/mealService'
import { useLocalStorage } from './hooks/useLocalStorage'
import './styles/index.css'
import 'font-awesome/css/font-awesome.min.css'

function App() {
  const [meals, setMeals] = useState([])
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favoriteIds, setFavoriteIds] = useLocalStorage('mealIds', [])
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false)
  const [error, setError] = useState(null)

  // Auto-close error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error])

  // Load random meal on first render
  useEffect(() => {
    const fetchRandomMeal = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const randomMeal = await getRandomMeal()
        if (randomMeal) {
          setMeals([{ ...randomMeal, isRandom: true }])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRandomMeal()
  }, [])

  // Load favorite recipes when favoriteIds change
  useEffect(() => {
    const fetchFavorites = async () => {
      // Show loader only if there are favorite meal IDs
      if (favoriteIds.length > 0) {
        setIsFavoritesLoading(true)
      }

      const favoriteMeals = []
      // Keep the order of favoriteIds (newest first)
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
          // Don't show error for individual favorite recipes
          // to avoid spamming the user
        }
      }
      setFavorites(favoriteMeals)
      setIsFavoritesLoading(false)
    }

    fetchFavorites()
  }, [favoriteIds])

  const handleSearch = async (query) => {
    setIsLoading(true)
    setError(null)
    try {
      const searchResults = await getMealsBySearch(query)
      setMeals(searchResults)
    } catch (err) {
      setError(err.message)
      // Clear search results on error
      setMeals([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFavoriteToggle = (meal) => {
    const isFavorite = favoriteIds.includes(meal.idMeal)
    if (isFavorite) {
      setFavoriteIds(favoriteIds.filter((id) => id !== meal.idMeal))
    } else {
      // Add new favorite meal to the beginning of the array
      setFavoriteIds([meal.idMeal, ...favoriteIds])
    }
  }

  const handleRemoveFavorite = (id) => {
    setFavoriteIds(favoriteIds.filter((mealId) => mealId !== id))
  }

  const handleClearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite meals?')) {
      setFavoriteIds([])
    }
  }

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal)
  }

  const handleClosePopup = () => {
    setSelectedMeal(null)
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <div className='App'>
      <ErrorMessage error={error} onClose={handleCloseError} />
      <div className='mobile-container'>
        <SearchBar onSearch={handleSearch} />
        <FavoritesContainer
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          onMealClick={handleSelectMeal}
          onClearAll={handleClearAllFavorites}
          isLoading={isFavoritesLoading}
        />
        {isLoading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <MealsContainer
            meals={meals}
            favoriteIds={favoriteIds}
            onFavoriteToggle={handleFavoriteToggle}
            onMealClick={handleSelectMeal}
          />
        )}
      </div>
      {selectedMeal && (
        <MealInfo meal={selectedMeal} onClose={handleClosePopup} />
      )}
    </div>
  )
}

export default App
