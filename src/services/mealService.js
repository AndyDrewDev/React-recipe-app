import axios from 'axios'

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`)
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching random meal:', error)
    return null
  }
}

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`)
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching meal by id:', error)
    return null
  }
}

export const getMealsBySearch = async (term) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${term}`)
    return response.data.meals || []
  } catch (error) {
    console.error('Error searching meals:', error)
    return []
  }
}
