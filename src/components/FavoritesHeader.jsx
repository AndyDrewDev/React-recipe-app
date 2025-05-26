import React from 'react'

const FavoritesHeader = ({
  isCollapsed,
  onToggleCollapse,
  favoritesCount,
  isLoading,
  onClearAll,
}) => {
  return (
    <div className='fav-header'>
      <button
        className='title-collapse-btn'
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? 'Expand favorites' : 'Collapse favorites'}
      >
        <h3>
          {isLoading ? (
            <span className='title-loading'>
              <span className='title-spinner'></span>
            </span>
          ) : favoritesCount > 0 ? (
            <span className='count-badge'>{favoritesCount}</span>
          ) : null}
          Favorite meals
        </h3>
        <i
          className={`fas fa-chevron-up ${isCollapsed ? 'collapsed' : ''}`}
        ></i>
      </button>
      {favoritesCount > 0 && (
        <button
          className='clear-all-btn'
          onClick={onClearAll}
          aria-label='Clear all favorites'
        >
          <i className='fas fa-trash'></i>
        </button>
      )}
    </div>
  )
}

export default FavoritesHeader
