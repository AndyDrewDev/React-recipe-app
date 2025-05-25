import { useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import FavoriteMeal from './FavoriteMeal'
import '../styles/FavoritesContainer.css'

const FavoritesContainer = ({
  favorites,
  onRemoveFavorite,
  onMealClick,
  onClearAll,
  isLoading,
}) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    'favorites-collapsed',
    false
  )
  const mealsListRef = useRef(null)

  const handleToggleCollapse = () => {
    if (!isCollapsed && mealsListRef.current) {
      mealsListRef.current.scrollLeft = 0
    }
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className='fav-container'>
      <div className='fav-header'>
        <button
          className='title-collapse-btn'
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? 'Expand favorites' : 'Collapse favorites'}
        >
          <h3>
            {isLoading ? (
              <span className='title-loading'>
                <span className='title-spinner'></span>
              </span>
            ) : favorites.length > 0 ? (
              <span className='count-badge'>{favorites.length}</span>
            ) : null}
            Favorite meals
          </h3>
          <i
            className={`fas fa-chevron-up ${isCollapsed ? 'collapsed' : ''}`}
          ></i>
        </button>
        {favorites.length > 0 && (
          <button
            className='clear-all-btn'
            onClick={onClearAll}
            aria-label='Clear all favorites'
          >
            <i className='fas fa-trash'></i>
          </button>
        )}
      </div>
      <div className={`fav-content ${isCollapsed ? 'collapsed' : ''}`}>
        {isLoading && favorites.length === 0 ? (
          <div className='favorites-loading'>
            <div className='loading-spinner'></div>
            <p>Loading favorites...</p>
          </div>
        ) : favorites.length > 0 ? (
          <ul
            className={`fav-meals ${isCollapsed ? 'collapsed' : ''}`}
            id='fav-meals'
            ref={mealsListRef}
          >
            {favorites.map((meal) => (
              <FavoriteMeal
                key={meal.idMeal}
                meal={meal}
                onRemoveClick={onRemoveFavorite}
                onMealClick={onMealClick}
              />
            ))}
          </ul>
        ) : (
          <p className='no-favorites'>
            No favorite meals yet.
            <br />
            Click the heart icon to add some!
          </p>
        )}
      </div>
    </div>
  )
}

export default FavoritesContainer
