
import MealCard from './MealCard'

const MealsContainer = ({
  meals,
  favoriteIds,
  onFavoriteToggle,
  onMealClick,
}) => {
  return (
    <div style={{ padding: '1rem' }} id='meals'>
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          isRandom={meal.isRandom}
          isFavorite={favoriteIds.includes(meal.idMeal)}
          onFavoriteClick={onFavoriteToggle}
          onMealClick={onMealClick}
        />
      ))}
    </div>
  )
}

export default MealsContainer
