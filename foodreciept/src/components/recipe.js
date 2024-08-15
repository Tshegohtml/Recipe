import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './recipe.css'; 
import muttonstew from "../mutton stew.jpg";

const Recipe = ({ recipes }) => {
  const [category, setCategory] = useState(); // Get category from URL params
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(3);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showFullRecipe, setShowFullRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let results = recipes;

    if (category && category !== "all") {
      results = recipes.filter(recipe => recipe.category === category);
    }

    if (searchTerm) {
      results = results.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecipes(results);
    setCurrentPage(1);
  }, [category, searchTerm, recipes]);

  const handleSearch = () => {
    // Search is handled in useEffect now
  };

  const handleEdit = (index) => {
    setEditingRecipe(filteredRecipes[index]);
  };

  const handleSaveEdit = () => {
    const updatedRecipes = filteredRecipes.map((recipe) =>
      recipe.id === editingRecipe.id ? editingRecipe : recipe
    );
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
    navigate('/'); 
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the Profile page
  };

  return (
    <div className="recipe-container">
      <div className="header-buttons">
        <button onClick={handleProfile} className="profile-button">Profile</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className='logo'></div>
      <h1>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Recipes'}</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="category-buttons">
        <button onClick={() => setCategory("all")}>All</button> 
        <button onClick={() => setCategory("Curry")}>Curry</button>
        <button onClick={() => setCategory("Stew")}>Stew</button>
        <button onClick={() => setCategory("Salad")}>Salad</button>
        <button onClick={() => setCategory("Main")}>Main Meals</button>
        <button onClick={() => setCategory("Breakfast")}>Breakfast</button>
        <button onClick={() => setCategory("Dessert")}>Dessert</button>
      </div>

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
        <p>Page {currentPage} of {Math.ceil(filteredRecipes.length / recipesPerPage)}</p>
      </div>
    </div>
  );
};

export default Recipe;
