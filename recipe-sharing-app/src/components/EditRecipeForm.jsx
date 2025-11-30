import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) return <div>Recipe not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id: recipeId, title, description });
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Recipe</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: "8px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
