import { useState, useCallback } from 'react'

export const useAsyncOperation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (asyncFunction, onSuccess, onError) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await asyncFunction()
      if (onSuccess) {
        onSuccess(result)
      }
      return result
    } catch (err) {
      setError(err.message)
      if (onError) {
        onError(err)
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    execute,
    clearError,
    reset,
  }
}
