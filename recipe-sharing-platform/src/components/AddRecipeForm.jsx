import React from "react";
import { useState } from "react";
import recipesData from '../data.json';

export default function AddRecipeForm ()
{
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const newRecipe = {
            id: recipesData.length + 1,
            title,
            summary,
            image,
            ingredients: ingredients.filter(ing => ing.trim() !== ""),
            instructions: instructions.filter(inst => inst.trim() !== "")
        };
        console.log("New Recipe Submitted: ", newRecipe);
    }
    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <h1 className="text-4xl font-bold text-red-600 underline mb-8">
                Add New Recipe
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Summary</label>
                    <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full p-2 border border-gray-300 rounded"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ingredients</label>
                    {ingredients.map((ing, index) => (
                        <input key={index} type="text" value={ing} onChange={(e) => {
                            const newIngredients = [...ingredients];
                            newIngredients[index] = e.target.value;
                            setIngredients(newIngredients);
                        }} className="w-full p-2 border border-gray-300 rounded mb-2"/>
                    ))}
                    <button type="button" onClick={() => setIngredients([...ingredients, ""])} className="text-blue-500">Add Ingredient</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Instructions</label>
                    {instructions.map((inst, index) => (
                        <input key={index} type="text" value={inst} onChange={(e) => {
                            const newInstructions = [...instructions];
                            newInstructions[index] = e.target.value;
                            setInstructions(newInstructions);
                        }} className="w-full p-2 border border-gray-300 rounded mb-2"/>
                    ))}
                    <button type="button" onClick={() => setInstructions([...instructions, ""])} className="text-blue-500">Add Instruction</button>
                </div>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Submit Recipe</button>
            </form>
        </div>
    );
    
}