import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
