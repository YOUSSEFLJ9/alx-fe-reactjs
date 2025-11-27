import { useRecipeStore } from "../store/recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ marginTop: "20px" }}>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "15px" }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
