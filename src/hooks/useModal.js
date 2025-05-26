import { useState } from 'react'

export const useModal = () => {
  const [selectedMeal, setSelectedMeal] = useState(null)

  const openMeal = (meal) => {
    setSelectedMeal(meal)
  }

  const closeMeal = () => {
    setSelectedMeal(null)
  }

  return {
    selectedMeal,
    openMeal,
    closeMeal,
    isOpen: selectedMeal !== null,
  }
}
