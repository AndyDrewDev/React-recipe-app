import { useState, useEffect, useCallback, useRef } from 'react'
import { getRandomMeal, getMealsBySearch } from '../services/mealService'
import { useAsyncOperation } from './useAsyncOperation'

export const useMeals = () => {
  const [meals, setMeals] = useState([])
  const { isLoading, error, execute, clearError } = useAsyncOperation()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  useEffect(() => {
    if (hasInitialized.current) return

    const fetchRandomMeal = async () => {
      hasInitialized.current = true
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

  const searchMeals = useCallback(
    async (query) => {
      await execute(
        () => getMealsBySearch(query),
        (searchResults) => setMeals(searchResults),
        () => setMeals([])
      )
    },
    [execute]
  )

  return {
    meals,
    isLoading,
    error,
    searchMeals,
    clearError,
  }
}
