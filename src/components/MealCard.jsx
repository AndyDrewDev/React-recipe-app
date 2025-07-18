import React from 'react'
import '../styles/MealCard.css'

const MealCard = React.memo(
  ({ meal, isRandom, isFavorite, onFavoriteClick, onMealClick }) => {
    return (
      <div className='meal' onClick={() => onMealClick(meal)}>
        <div className='meal-header'>
          {isRandom && <span className='random'>Random Recipe</span>}
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className='meal-body'>
          <h4>{meal.strMeal}</h4>
          <button
            className={`fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onFavoriteClick(meal)
            }}
          >
            <i className='fas fa-heart'></i>
          </button>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Перерендер тільки якщо змінився стан favorite або meal
    return (
      prevProps.meal.idMeal === nextProps.meal.idMeal &&
      prevProps.isFavorite === nextProps.isFavorite &&
      prevProps.isRandom === nextProps.isRandom
    )
  }
)

export default MealCard
