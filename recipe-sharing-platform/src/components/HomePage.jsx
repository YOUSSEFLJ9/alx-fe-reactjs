//get the data from ../data.json

import React, { useEffect, useState } from 'react';
import recipesData from '../data.json';

export default  function HomePage () {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        setRecipes(recipesData);
    }
    , []);


    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <h1 className="text-4xl font-bold text-red-600 underline mb-8">
                Recipe Sharing Platform
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
                            <p className="text-gray-700 mb-4">{recipe.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}