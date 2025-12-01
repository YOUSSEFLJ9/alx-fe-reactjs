import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipeForm from "./components/EditRecipeForm";
import {SearchBar} from "./components/SearchBar";
import {FavoritesList} from "./components/FavoritesList";
import {RecommendationsList} from "./components/RecommendationsList";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Recipe Sharing App</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
				<SearchBar />
                <FavoritesList />
                <RecommendationsList />
                <AddRecipeForm />
                <RecipeList />

              </>
            }
          />

          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
