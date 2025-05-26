import axios from 'axios'
import { API_CONFIG } from '../constants/api'
import { handleApiError } from '../utils/errorHandler'

const { BASE_URL, ENDPOINTS, ERROR_MESSAGES } = API_CONFIG

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.RANDOM}`)
    if (!response.data.meals || !response.data.meals[0]) {
      throw new Error(ERROR_MESSAGES.NO_RANDOM_MEAL)
    }
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching random meal:', error)
    throw new Error(handleApiError(error, ERROR_MESSAGES.NO_RANDOM_MEAL))
  }
}

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.LOOKUP}?i=${id}`)
    if (!response.data.meals || !response.data.meals[0]) {
      throw new Error(`${ERROR_MESSAGES.MEAL_NOT_FOUND} ID ${id} not found.`)
    }
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching meal by id:', error)
    throw new Error(
      handleApiError(error, `${ERROR_MESSAGES.FAILED_TO_LOAD} ${id}.`)
    )
  }
}

export const getMealsBySearch = async (term) => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.SEARCH}?s=${term}`)
    const meals = response.data.meals || []

    if (meals.length === 0) {
      throw new Error(
        `${ERROR_MESSAGES.NO_SEARCH_RESULTS} "${term}". Try a different ingredient or dish name.`
      )
    }

    return meals
  } catch (error) {
    console.error('Error searching meals:', error)

    if (error.message.includes(ERROR_MESSAGES.NO_SEARCH_RESULTS)) {
      throw error
    }

    throw new Error(
      handleApiError(error, `${ERROR_MESSAGES.FAILED_TO_SEARCH} "${term}".`)
    )
  }
}
