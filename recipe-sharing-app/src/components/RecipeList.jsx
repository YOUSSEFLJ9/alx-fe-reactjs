import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const navigate = useNavigate();

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

          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList; 
