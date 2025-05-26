import { API_CONFIG } from '../constants/api'

export const handleApiError = (error, defaultMessage) => {
  const { ERROR_MESSAGES, HTTP_STATUS } = API_CONFIG

  if (error.response) {
    const status = error.response.status

    switch (status) {
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_MESSAGES.MEAL_NOT_FOUND
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        return ERROR_MESSAGES.TOO_MANY_REQUESTS
      default:
        if (status >= HTTP_STATUS.SERVER_ERROR) {
          return ERROR_MESSAGES.SERVER_UNAVAILABLE
        }
        return `Server error: ${status}`
    }
  }

  if (error.request) {
    return ERROR_MESSAGES.NO_CONNECTION
  }

  return defaultMessage
}
