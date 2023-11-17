import { RecipeListPage } from './pages/RecipeListPage';
import { RecipePage } from './pages/RecipePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export const App = () => {
  return (
    // here we define the routes that we use:
    // the home page (all the recipes)
    // the recipe page (selected recipe)
    <Router>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />
      </Routes>
    </Router>
  );
};
