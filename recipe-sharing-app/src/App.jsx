import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Recipe Sharing App</h1>

      {selectedId ? (
        <RecipeDetails
          recipeId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      ) : (
        <>
          <AddRecipeForm />
          <RecipeList onSelect={setSelectedId} />
        </>
      )}
    </div>
  );
}

export default App;
