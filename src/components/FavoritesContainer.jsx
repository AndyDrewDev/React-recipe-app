import React, { useRef, useCallback } from 'react'
import { useUIState } from '../hooks/useUIState'
import FavoritesHeader from './FavoritesHeader.jsx'
import FavoritesContent from './FavoritesContent.jsx'
import '../styles/FavoritesContainer.css'

const FavoritesContainer = React.memo(
  ({ favorites, onRemoveFavorite, onMealClick, onClearAll, isLoading }) => {
    const { isCollapsed, toggleCollapse } = useUIState()
    const mealsListRef = useRef(null)

    const handleToggleCollapse = useCallback(() => {
      if (!isCollapsed && mealsListRef.current) {
        mealsListRef.current.scrollLeft = 0
      }
      toggleCollapse()
    }, [isCollapsed, toggleCollapse])

    return (
      <div className='fav-container'>
        <FavoritesHeader
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          favoritesCount={favorites.length}
          isLoading={isLoading}
          onClearAll={onClearAll}
        />
        <FavoritesContent
          isCollapsed={isCollapsed}
          isLoading={isLoading}
          favorites={favorites}
          mealsListRef={mealsListRef}
          onRemoveFavorite={onRemoveFavorite}
          onMealClick={onMealClick}
        />
      </div>
    )
  }
)

export default FavoritesContainer
