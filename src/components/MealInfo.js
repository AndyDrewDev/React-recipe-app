import { useState, useEffect } from 'react'
import '../styles/MealInfo.css'

const MealInfo = ({ meal, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (meal) {
      setIsVisible(true)
    }
  }, [meal])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!meal) return null

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (!ingredient) {
      break
    }

    ingredients.push(`${ingredient} - ${measure}`)
  }

  return (
    <div
      className={`popup-container ${isVisible ? 'visible' : 'hidden'}`}
      onClick={handleClose}
    >
      <div className='popup' onClick={(e) => e.stopPropagation()}>
        <button id='close-popup' className='close-popup' onClick={handleClose}>
          <i className='fas fa-times'></i>
        </button>
        <div className='meal-info'>
          <h1>{meal.strMeal}</h1>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MealInfo
