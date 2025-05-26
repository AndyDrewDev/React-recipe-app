import { useState, useEffect } from 'react'
import { getRandomMeal, getMealsBySearch } from '../services/mealService'
import { useAsyncOperation } from './useAsyncOperation'

export const useMeals = () => {
  const [meals, setMeals] = useState([])
  const { isLoading, error, execute, clearError } = useAsyncOperation()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  useEffect(() => {
    const fetchRandomMeal = async () => {
      await execute(
        () => getRandomMeal(),
        (randomMeal) => {
          if (randomMeal) {
            setMeals([{ ...randomMeal, isRandom: true }])
          }
        }
      )
    }

    fetchRandomMeal()
  }, [execute])

  const searchMeals = async (query) => {
    await execute(
      () => getMealsBySearch(query),
      (searchResults) => setMeals(searchResults),
      () => setMeals([]) 
    )
  }

  return {
    meals,
    isLoading,
    error,
    searchMeals,
    clearError,
  }
}
