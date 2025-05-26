import FavoritesLoading from './FavoritesLoading'
import FavoritesList from './FavoritesList'
import NoFavorites from './NoFavorites'

const FavoritesContent = ({
  isCollapsed,
  isLoading,
  favorites,
  mealsListRef,
  onRemoveFavorite,
  onMealClick,
}) => {
  const renderContent = () => {
    if (isLoading && favorites.length === 0) {
      return <FavoritesLoading />
    }

    if (favorites.length > 0) {
      return (
        <FavoritesList
          favorites={favorites}
          isCollapsed={isCollapsed}
          mealsListRef={mealsListRef}
          onRemoveFavorite={onRemoveFavorite}
          onMealClick={onMealClick}
        />
      )
    }

    return <NoFavorites />
  }

  return (
    <div className={`fav-content ${isCollapsed ? 'collapsed' : ''}`}>
      {renderContent()}
    </div>
  )
}

export default FavoritesContent
