# Recipe App

A simple and convenient application for searching and saving recipes, developed using React.

## Features

- Search for recipes by keywords
- View detailed recipe information
- Save favorite recipes
- Modern and intuitive interface

## Technologies

- React 19
- Axios for API requests
- Font-Awesome for icons

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
```

2. Install dependencies:

```
npm install
```

3. Run the application:

```
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## How to Use

1. **Search for Recipes**:

   - Enter keywords in the search bar at the top of the page
   - Click the search button or press Enter
   - Browse through the search results

2. **View Recipe Details**:

   - Click on any recipe card to view full details
   - See ingredients, instructions, cooking time, and nutritional information

3. **Save Favorites**:

   - Click the heart icon on any recipe to save it to your favorites
   - Access your saved recipes from the "Favorites" section
   - Remove recipes from favorites by clicking the heart icon again

4. **Filter Options**:
   - Use filter options to narrow down search results by dietary restrictions, cooking time, or cuisine type

## Project Structure

```
src/
├── components/       # React components
├── assets/           # Images and static files
├── hooks/            # Custom React hooks
├── services/         # API services
├── styles/           # CSS/SCSS styles
└── App.js            # Main application component
```

## Available Scripts

### `npm start`

Runs the application in development mode.

### `npm run build`

Creates an optimized production version of the application in the `build` folder.
