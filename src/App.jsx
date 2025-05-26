import SearchBar from './components/SearchBar.jsx'
import FavoritesContainer from './components/FavoritesContainer.jsx'
import MealsContainer from './components/MealsContainer.jsx'
import MealInfo from './components/MealInfo.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import { useMeals, useFavorites, useModal } from './hooks'
import './styles/index.css'
import 'font-awesome/css/font-awesome.min.css'

function App() {
  const { meals, isLoading, error, searchMeals, clearError } = useMeals()
  const {
    favoriteIds,
    favorites,
    isFavoritesLoading,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  } = useFavorites()
  const { selectedMeal, openMeal, closeMeal } = useModal()

  return (
    <div className='App'>
      <ErrorMessage error={error} onClose={clearError} />
      <div className='mobile-container'>
        <SearchBar onSearch={searchMeals} />
        <FavoritesContainer
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
          onMealClick={openMeal}
          onClearAll={clearAllFavorites}
          isLoading={isFavoritesLoading}
        />
        {isLoading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <MealsContainer
            meals={meals}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
            onMealClick={openMeal}
          />
        )}
      </div>
      {selectedMeal && <MealInfo meal={selectedMeal} onClose={closeMeal} />}
    </div>
  )
}

export default App
