import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "20px" }}>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "15px" }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>

            <button onClick={() => navigate(`/recipes/${recipe.id}`)} style={{ marginTop: "5px" }}>
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
