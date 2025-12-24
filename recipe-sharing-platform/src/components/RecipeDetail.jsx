// import React from "react";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import recipesData from "../data.json";
// function RecipeDetail() {
//     const { id } = useParams();
//     const [recipe, setRecipe] = useState(null);
//     useEffect(() => {
//         const foundRecipe = recipesData.find((r) => r.id === parseInt(id));
//         setRecipe(foundRecipe);
//     }, [id]);
//     if (!recipe) {
//         return <div className="p-8 text-center">Recipe not found!</div>;
//     }
//     return (
//         <div className="min-h-screen bg-blue-50 p-8">
//             <h1>{recipe.title}</h1>
//             <img src={recipe.image} alt={recipe.title} />
//             <h2>Ingredients</h2>
//             <ul>
//                 {recipe.ingredients.map((ingredient, index) => (
//                     <li key={index}>{ingredient}</li>
//                 ))}
//             </ul>
//             <h2>Instructions</h2>
//             <ol>
//                 {recipe.instructions.map((step, index) => (
//                     <li key={index}>{step}</li>
//                 ))}
//             </ol>
            
//         </div>
//     );
// }

// export default RecipeDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import recipesData from "../data.json"; 

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const foundRecipe = recipesData.find((r) => r.id === parseInt(id));
        setRecipe(foundRecipe);
    }, [id]);

    if (!recipe) {
        return <div className="p-8 text-center">Recipe not found!</div>;
    }
    const ingredientsList = [];
    if (recipe && recipe.details.ingredients)
    {
        for (const ingredient of recipe.details.ingredients)
        {
            ingredientsList.push(
                <li key={ingredient} className="flex items-start mb-2 text-gray-800">
                <span className="h-2 w-2 mt-2 mr-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span className="text-lg">{ingredient}</span>
                </li>);
        }
    }
    const instructionsList = [];
    if (recipe && recipe.details.instructions)
    {
        for (let i = 0; i < recipe.details.instructions.length; i++)
        {
            const instruction = recipe.details.instructions[i];
            instructionsList.push(
            <li key={instruction} className="flex mb-6 group">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full text-white mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">{i + 1}</div>
                <span className="text-lg">{instruction}</span>
                </li>);
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1> 
            <img src={recipe.image} alt={recipe.title} className="w-full rounded-lg mb-6" />
            
            <h2 className="text-2xl font-semibold mb-2">ingredients</h2>
            <ul className="list-disc pl-5 mb-6 shadow-sm p-4 bg-white rounded-lg shadow-gray-200">
                {ingredientsList}
            </ul>

            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal pl-5 shadow-sm p-4 bg-white rounded-lg shadow-gray-200">
                {instructionsList}  
            </ol>
        </div>
    );
}

export default RecipeDetail;