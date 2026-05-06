

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./RecipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();
  const { toggleFavorite } = useFavorites();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals?.[0]));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  // Ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} – ${recipe[`strMeasure${i}`]}`
      );
    }
  }

  // Instructions
  const instructions = recipe.strInstructions
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="detail-page">
      {/* Back */}
      <Link to="/recipes" className="back-link">
        ← Back to Discover
      </Link>

      {/* TOP GRID */}
      <div className="top-grid">
        {/* LEFT: HERO IMAGE */}
        <div className="hero-wrapper">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="hero-image"
          />
        </div>

        {/* RIGHT: SAVE RECIPE */}
        <div className="save-card">
          <h3>Save Recipe</h3>
          <p>
            Save this recipe to your favorites and access it anytime.
          </p>

          <button
            className="primary-btn"
            onClick={() => toggleFavorite(recipe)}
          >
            💗 Add to Favorites
          </button>

          <button className="secondary-btn">
            Share Recipe
          </button>

          <p className="rating-text">★ 4.8 average rating</p>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="recipe-title">{recipe.strMeal}</h1>
      <p className="recipe-subtitle">
        {recipe.strArea} • {recipe.strCategory}
      </p>

      {/* META */}
      <div className="meta-cards">
        <div className="meta-pill">Prep<br /><b>10 min</b></div>
        <div className="meta-pill">Cook<br /><b>25 min</b></div>
        <div className="meta-pill">Serves<br /><b>4</b></div>
        <div className="meta-pill highlight">
          Rating<br /><b>★ 4.8 / 5</b>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bottom-grid">
        <div className="content-box">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((i, idx) => (
              <li key={idx}>
                <input type="checkbox" /> {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="content-box">
          <h2>Instructions</h2>
          <ol>
            {instructions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
