import { useRecipeStore } from "./recipeStore";
import { useNavigate, Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const navigate = useNavigate();

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div style={{ marginTop: "20px" }}>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "15px" }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>

            <Link to={`/recipes/${recipe.id}`}>
              <button style={{ marginTop: "5px" }}>View Details</button>
            </Link>

            {isFavorite(recipe.id) ? (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => removeFavorite(recipe.id)}
              >
                Remove from Favorites
              </button>
            ) : (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => addFavorite(recipe.id)}
              >
                Add to Favorites
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
