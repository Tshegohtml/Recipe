import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './recipe.css';
import muttonstew from "../mutton stew.jpg";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(3);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showFullRecipe, setShowFullRecipe] = useState(null); // New state to manage full recipe visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleSearch = () => {
    const results = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(results);
    setCurrentPage(1);
  };

  const handleEdit = (index) => {
    setEditingRecipe(filteredRecipes[index]);
  };

  const handleSaveEdit = () => {
    const updatedRecipes = filteredRecipes.map((recipe) =>
      recipe.id === editingRecipe.id ? editingRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
    setEditingRecipe(null);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredRecipes.length / recipesPerPage)));
    } else if (direction === 'prev') {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    }
  };

  const handleShowMore = (index) => {
    if (showFullRecipe === index) {
      setShowFullRecipe(null);
    } else {
      setShowFullRecipe(index);
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handleLogout = () => {
    navigate('/'); // Navigate to the Register page
  };

  return (
    <div className="recipe-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className='logo'></div>
      <h1>Recipes</h1>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes..."
      />
      <button onClick={handleSearch}>Search</button>

      {editingRecipe && (
        <div className="edit-form">
          <h2>Edit Recipe</h2>
          <input
            type="text"
            value={editingRecipe.name}
            onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
          />
          <textarea
            value={editingRecipe.ingredients.join(', ')}
            onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients: e.target.value.split(', ') })}
          />
          <textarea
            value={editingRecipe.instructions.join(', ')}
            onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions: e.target.value.split(', ') })}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      )}

      {currentRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-list">
          {currentRecipes.map((recipe, index) => (
            <div key={recipe.id} className="recipe">
              <h2 className="recipe-name">{recipe.name}</h2>
              <img className='IMG' src={recipe.img || muttonstew} alt={recipe.name} />
              <div className="recipe-section">
                <h3>Ingredients:</h3>
                <ul className="recipe-ingredients">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                {showFullRecipe === index && (
                  <div className="recipe-section">
                    <h3>Instructions:</h3>
                    <ol className="recipe-instructions">
                      {recipe.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}
                <button onClick={() => handleShowMore(index)}>
                  {showFullRecipe === index ? 'Show Less' : 'Show More'}
                </button>
              </div>
              <button onClick={() => handleEdit(index)}>Edit Recipe</button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button 
          onClick={() => handlePageChange('prev')} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => handlePageChange('next')} 
          disabled={indexOfLastRecipe >= filteredRecipes.length}
        >
          Next
        </button>
        {/* Removed "Show More" button */}
      </div>
    </div>
  );
};

export default Recipe;
