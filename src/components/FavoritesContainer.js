import FavoriteMeal from './FavoriteMeal'
import '../styles/FavoritesContainer.css'

const FavoritesContainer = ({
  favorites,
  onRemoveFavorite,
  onMealClick,
  onClearAll,
}) => {
  return (
    <div className='fav-container'>
      <div className='fav-header'>
        <h3>Favorite Meals</h3>
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
      {favorites.length > 0 ? (
        <ul className='fav-meals' id='fav-meals'>
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
  )
}

export default FavoritesContainer
