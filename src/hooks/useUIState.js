import { useLocalStorage } from './useLocalStorage'

export const useUIState = () => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    'favorites-collapsed',
    false
  )

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return {
    isCollapsed,
    toggleCollapse,
  }
}
