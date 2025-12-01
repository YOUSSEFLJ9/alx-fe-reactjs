import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],

  searchTerm: '',
  filteredRecipes: [],
  filterRecipes: () => set(state => ({
	  filteredRecipes: state.recipes.filter(recipe  =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
	  )})),

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  setRecipes: (recipes) => set({ recipes }),
  setSearchTerm: (term) => 
	set(() => {
	get().filterRecipes();
	  return { searchTerm: term}
  }
  ),
}));
