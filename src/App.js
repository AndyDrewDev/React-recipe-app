import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import FavoritesContainer from './components/FavoritesContainer'
import MealsContainer from './components/MealsContainer'
import MealInfo from './components/MealInfo'
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

  // Завантаження випадкового рецепту при першому рендері
  useEffect(() => {
    const fetchRandomMeal = async () => {
      setIsLoading(true)
      const randomMeal = await getRandomMeal()
      if (randomMeal) {
        setMeals([{ ...randomMeal, isRandom: true }])
      }
      setIsLoading(false)
    }

    fetchRandomMeal()
  }, [])

  // Завантаження улюблених рецептів при зміні favoriteIds
  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteMeals = []
      for (const id of favoriteIds) {
        const meal = await getMealById(id)
        if (meal) {
          favoriteMeals.push(meal)
        }
      }
      setFavorites(favoriteMeals)
    }

    fetchFavorites()
  }, [favoriteIds])

  const handleSearch = async (query) => {
    setIsLoading(true)
    const searchResults = await getMealsBySearch(query)
    setMeals(searchResults)
    setIsLoading(false)
  }

  const handleFavoriteToggle = (meal) => {
    const isFavorite = favoriteIds.includes(meal.idMeal)
    if (isFavorite) {
      setFavoriteIds(favoriteIds.filter((id) => id !== meal.idMeal))
    } else {
      setFavoriteIds([...favoriteIds, meal.idMeal])
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

  return (
    <div className='App'>
      <div className='mobile-container'>
        <SearchBar onSearch={handleSearch} />
        <FavoritesContainer
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          onMealClick={handleSelectMeal}
          onClearAll={handleClearAllFavorites}
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
