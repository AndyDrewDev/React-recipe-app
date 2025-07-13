import axios from 'axios'
import { API_CONFIG } from '../constants/api'
import { handleApiError } from '../utils/errorHandler'

const { BASE_URL, ENDPOINTS, ERROR_MESSAGES } = API_CONFIG

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `Making API request: ${config.method?.toUpperCase()} ${config.url}`
    )
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `API response received: ${response.status} ${response.config.url}`
    )
    return response
  },
  (error) => {
    console.error('Response error:', error)
    return Promise.reject(error)
  }
)

export const getRandomMeal = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.RANDOM)
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
    const response = await apiClient.get(`${ENDPOINTS.LOOKUP}?i=${id}`)
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
    const response = await apiClient.get(`${ENDPOINTS.SEARCH}?s=${term}`)
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

// Batch fetch multiple meals by IDs with error handling
export const getMealsByIds = async (ids) => {
  const meals = []
  const failedIds = []

  // Use Promise.allSettled to handle individual failures
  const results = await Promise.allSettled(ids.map((id) => getMealById(id)))

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      meals.push(result.value)
    } else {
      failedIds.push(ids[index])
      console.warn(
        `Failed to fetch meal with ID ${ids[index]}:`,
        result.reason?.message
      )
    }
  })

  return { meals, failedIds }
}
