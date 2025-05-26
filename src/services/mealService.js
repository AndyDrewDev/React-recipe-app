import axios from 'axios'

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

const handleApiError = (error, defaultMessage) => {
  if (error.response) {
    // Server responded with error code
    const status = error.response.status
    if (status === 404) {
      return 'Recipe not found.'
    } else if (status >= 500) {
      return 'Server is temporarily unavailable. Please try again later.'
    } else if (status === 429) {
      return 'Too many requests. Please try again later.'
    }
    return `Server error: ${status}`
  } else if (error.request) {
    // Request was sent but no response received
    return 'No internet connection. Please check your connection.'
  } else {
    // Something else went wrong
    return defaultMessage
  }
}

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`)
    if (!response.data.meals || !response.data.meals[0]) {
      throw new Error('Failed to get random recipe.')
    }
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching random meal:', error)
    throw new Error(handleApiError(error, 'Failed to load random recipe.'))
  }
}

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`)
    if (!response.data.meals || !response.data.meals[0]) {
      throw new Error(`Recipe with ID ${id} not found.`)
    }
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching meal by id:', error)
    throw new Error(
      handleApiError(error, `Failed to load recipe with ID: ${id}.`)
    )
  }
}

export const getMealsBySearch = async (term) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${term}`)
    const meals = response.data.meals || []

    // If no recipes found, throw an error
    if (meals.length === 0) {
      throw new Error(
        `No recipes found for "${term}". Try a different ingredient or dish name.`
      )
    }

    return meals
  } catch (error) {
    console.error('Error searching meals:', error)

    // If this is our own error about no results, just pass it through
    if (error.message.includes('No recipes found')) {
      throw error
    }

    // Otherwise handle as network error
    throw new Error(
      handleApiError(error, `Failed to search recipes for "${term}".`)
    )
  }
}
