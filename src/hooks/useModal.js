import { useState, useCallback } from 'react'

export const useModal = () => {
  const [selectedMeal, setSelectedMeal] = useState(null)

  const openMeal = useCallback((meal) => {
    setSelectedMeal(meal)
  }, [])

  const closeMeal = useCallback(() => {
    setSelectedMeal(null)
  }, [])

  return {
    selectedMeal,
    openMeal,
    closeMeal,
    isOpen: selectedMeal !== null,
  }
}
