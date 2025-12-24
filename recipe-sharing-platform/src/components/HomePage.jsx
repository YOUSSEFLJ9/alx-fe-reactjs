//get the data from ../data.json

import React, { useEffect, useState } from 'react';
import recipesData from '../data.json';
import { Link } from 'react-router-dom';
import AddRecipeForm from './AddRecipeForm';

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
                    <Link to={`/recipe/${recipe.id}`} className='block'>
                    <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 sm:mx-4 ">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2 text-black">{recipe.title}</h2>
                            <p className="text-gray-700 mb-4">{recipe.summary}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
            <div className="mt-12">
                <Link to="/AddRecipeForm" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300">
                    Add New Recipe
                </Link>
            </div>
        </div>
    );

}