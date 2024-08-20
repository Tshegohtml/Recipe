import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addrecipe.css';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('all');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      id: Date.now(), 
      name,
      category,
      ingredients: ingredients.split(',').map(ing => ing.trim()),
      instructions: instructions.split(',').map(inst => inst.trim()),
      img: image,
    };

    await handleAddRecipe(newRecipe);
  };

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await fetch('http://localhost:3001/recipes', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
    
      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const savedRecipe = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, savedRecipe]);
      setFilteredRecipes(prevRecipes => [...prevRecipes, savedRecipe]);

      // Navigate to the homepage after adding the recipe
      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="add-recipe-container">
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="Curry">Curry</option>
            <option value="Stew">Stew</option>
            <option value="Salad">Salad</option>
            <option value="Main">Main Meals</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated):</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions (comma-separated):</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
