import React, { useMemo } from 'react'
import MealCard from './MealCard'

const MealsContainer = React.memo(
  ({ meals, favoriteIds, onFavoriteToggle, onMealClick }) => {
    // Мемоізуємо Set для O(1) перевірки замість O(n) includes()
    const favoriteIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds])

    return (
      <div style={{ padding: '1rem' }} id='meals'>
        {meals.length === 0 ? (
          <div className='empty-state'>
            <i className='fa fa-search empty-icon'></i>
            <p className='empty-text'>No recipes to display</p>
            <p className='empty-subtext'>Try a different search term</p>
          </div>
        ) : (
          meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              isRandom={meal.isRandom}
              isFavorite={favoriteIdsSet.has(meal.idMeal)}
              onFavoriteClick={onFavoriteToggle}
              onMealClick={onMealClick}
            />
          ))
        )}
      </div>
    )
  }
)

export default MealsContainer
