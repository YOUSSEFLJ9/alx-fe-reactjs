import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const ok = window.confirm("Delete this recipe?");
    if (!ok) return;
    deleteRecipe(id);
    navigate("/");
  };

  return (
    <button onClick={handleDelete} style={{ marginLeft: "8px", color: "red" }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
