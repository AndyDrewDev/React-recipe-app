import React from 'react'
import FavoriteMeal from './FavoriteMeal'

const FavoritesList = ({
  favorites,
  isCollapsed,
  mealsListRef,
  onRemoveFavorite,
  onMealClick,
}) => {
  return (
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
  )
}

export default FavoritesList
