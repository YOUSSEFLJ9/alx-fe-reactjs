import { useRecipeStore } from "./recipeStore";
import { useState } from "react";

const RecipeDetails = ({ recipeId, onClose }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === recipeId)
  );

  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  if (!recipe) return <div>Recipe not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id: recipeId, title, description });
    onClose();
  };

  return (
    <div>
      <h1>Edit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type='submit'>Update</button>
      </form>

      <button
        onClick={() => {
          deleteRecipe(recipeId);
          onClose();
        }}
        style={{ marginTop: "10px", color: "red" }}
      >
        Delete
      </button>

      <button onClick={onClose} style={{ marginLeft: "10px" }}>
        Back
      </button>
    </div>
  );
};

export default RecipeDetails;
