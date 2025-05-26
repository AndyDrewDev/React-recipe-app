export const API_CONFIG = {
  BASE_URL: 'https://www.themealdb.com/api/json/v1/1',
  ENDPOINTS: {
    RANDOM: '/random.php',
    LOOKUP: '/lookup.php',
    SEARCH: '/search.php',
  },
  ERROR_MESSAGES: {
    NO_RANDOM_MEAL: 'Failed to get random recipe.',
    MEAL_NOT_FOUND: 'Recipe not found.',
    NO_SEARCH_RESULTS: 'No recipes found for',
    FAILED_TO_LOAD: 'Failed to load recipe with ID:',
    FAILED_TO_SEARCH: 'Failed to search recipes for',
    SERVER_UNAVAILABLE:
      'Server is temporarily unavailable. Please try again later.',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
    NO_CONNECTION: 'No internet connection. Please check your connection.',
  },
  HTTP_STATUS: {
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
  },
}
