import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useUIState = () => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    'favorites-collapsed',
    false
  )

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed)
  }, [isCollapsed, setIsCollapsed])

  return {
    isCollapsed,
    toggleCollapse,
  }
}
