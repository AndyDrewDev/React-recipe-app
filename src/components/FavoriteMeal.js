import { useState } from 'react'
import '../styles/FavoriteMeal.css'

const FavoriteMeal = ({ meal, onRemoveClick, onMealClick }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = (e) => {
    e.stopPropagation()
    setIsRemoving(true)

    setTimeout(() => {
      onRemoveClick(meal.idMeal)
    }, 300)
  }

  return (
    <li
      className={`favorite-meal ${isRemoving ? 'removing' : ''}`}
      onClick={() => onMealClick(meal)}
    >
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <span>{meal.strMeal}</span>
      <button
        className='clear'
        onClick={handleRemove}
        aria-label='Remove from favorites'
      >
        <i className='fas fa-times'></i>
      </button>
    </li>
  )
}

export default FavoriteMeal
