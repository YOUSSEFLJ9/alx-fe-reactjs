import { useParams, useNavigate, Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  const navigate = useNavigate();

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: "12px" }}>
        <Link to={`/recipes/${recipeId}/edit`}>
          <button>Edit</button>
        </Link>

        <DeleteRecipeButton id={recipeId} />

        <button onClick={() => navigate(-1)} style={{ marginLeft: "8px" }}>
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
