import { useRecipeStore } from "./recipeStore";
import { useMemo } from "react";

const FavoritesList = () => {
    const recipes = useRecipeStore((state) => state.recipes);
    const favoriteIds = useRecipeStore((state) => state.favorites);

    const favorites = useMemo(() => {
        return favoriteIds.map((id) => recipes.find((recipe) => recipe.id === id)).filter(Boolean);
    }, [favoriteIds, recipes]);

    if (!recipes.length) {
        return <p>Loading recipes...</p>;
    }

    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.map((recipe) => (
                <div key={recipe.id} style={{ marginBottom: "15px" }}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};
export default FavoritesList ;