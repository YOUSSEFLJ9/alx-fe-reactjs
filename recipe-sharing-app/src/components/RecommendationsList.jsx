import { useRecipeStore } from "./recipeStore";
import { useEffect } from "react";

const RecommendationsList = () => {
    const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
    const recommendations = useRecipeStore((state) => state.recommendations);
    const favorites = useRecipeStore((state) => state.favorites);
    const recipes = useRecipeStore((state) => state.recipes);

    useEffect(() => {
        generateRecommendations();
    }, [favorites, recipes]);

    return (
        <div>
            <h2>Recommended for You</h2>
            {recommendations.length === 0 ? (
                <p>No recommendations available. Add favorites to get recommendations!</p>
            ) : (
                recommendations.map((recipe) => (
                    <div key={recipe.id} style={{ marginBottom: "15px" }}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};
export default RecommendationsList;