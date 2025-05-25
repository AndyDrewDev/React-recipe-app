# React Recipe App

A modern web application for searching and saving recipes, built with React using TheMealDB API.

## Features

### Recipe Search

- Search for recipes by ingredient name or dish name
- Get random recipe on app load
- View detailed information for each recipe

### Favorites Management

- Add recipes to favorites with one click
- Save favorites in local storage
- Quickly remove individual recipes or clear entire list
- Maintain addition order (newest first)

### Modern Interface

- Responsive design for mobile devices
- Modal windows for detailed recipe view
- Intuitive icons and animations
- Error handling with auto-close

## Technologies

- **React 19** - Main framework
- **Axios 1.8.3** - HTTP client for API requests
- **Font Awesome 4.7.0** - Icons
- **TheMealDB API** - External API for recipes
- **LocalStorage** - Saving favorite recipes
- **Custom Hooks** - Local storage logic

## Installation

1. **Clone repository:**

```bash
git clone https://github.com/AndyDrewDev/recipe-app.git
cd React-recipe-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start application:**

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## How to Use

### 1. Search Recipes

- Enter ingredient or dish name in search field
- Click search button or press Enter
- Browse search results as cards

### 2. View Details

- Click on any recipe card to open modal window
- View ingredients, instructions and other information
- Close modal by clicking X or outside window

### 3. Manage Favorites

- Click heart icon to add recipe to favorites
- View saved recipes in "Favorites" section
- Remove individual recipes or clear entire list

## Project Structure

```
src/
├── components/           # React components
│   ├── SearchBar.js      # Search bar
│   ├── MealsContainer.js # Recipes container
│   ├── MealCard.js       # Recipe card
│   ├── MealInfo.js       # Detailed info
│   ├── FavoritesContainer.js # Favorites container
│   ├── FavoriteMeal.js   # Favorite recipe card
│   └── ErrorMessage.js   # Error message
├── services/             # API services
│   └── mealService.js    # Service for TheMealDB API
├── hooks/                # Custom hooks
│   └── useLocalStorage.js # Local storage hook
├── styles/               # CSS styles
├── App.js                # Main component
└── index.js              # Entry point
```

## API Endpoints

The app uses [TheMealDB API](https://www.themealdb.com/api.php):

- `GET /random.php` - Random recipe
- `GET /search.php?s={query}` - Search by name
- `GET /lookup.php?i={id}` - Get by ID

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`

Builds the app for production in the `build` folder

## Implementation Features

- **Error Handling**: Comprehensive network and API error handling
- **Loading States**: Loading indicators for better UX
- **LocalStorage**: Save favorite recipes between sessions
- **Responsive Design**: Adaptive design for all devices
- **Auto-close**: Automatic error message dismissal
