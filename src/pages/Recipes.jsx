import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import "./Recipes.css";

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  const category = searchParams.get("category") || "";
  const query = searchParams.get("q") || "";

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* Fetch categories */
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => setCategories(data.categories || []));
  }, []);

  /* Fetch recipes */
  useEffect(() => {
    const url = category
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setRecipes(data.meals || []));
  }, [category, query]);

  return (
    <div className="discover-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">RecipeVault</div>

        <div className="menu">
          <span className="active">Discover</span>
          <Link to="/favorites" className="menu-link">Favorites</Link>
          <span className="logout" onClick={handleLogout}>Logout</span>
        </div>

        <div className="categories">
          <h4>Categories</h4>
          {categories.map(cat => (
            <p
              key={cat.idCategory}
              onClick={() => setSearchParams({ category: cat.strCategory })}
            >
              {cat.strCategory}
            </p>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1>Discover Recipes</h1>
        <p className="subtitle">Find your next favorite dish</p>

        <div className="search-filter-row">
          <input
            className="search"
            placeholder="Search recipes..."
            value={query}
            onChange={e => setSearchParams({ q: e.target.value })}
          />
        </div>

        {/* ✅ RECIPES GRID */}
        <div className="grid">
          {recipes.map(recipe => {
            const isFav = favorites.some(f => f.idMeal === recipe.idMeal);

            return (
              <div className="card" key={recipe.idMeal}>
                <div className="image-wrapper">
                  {/* ✅ IMAGE FIX — THIS IS THE KEY */}
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />

                  <button
                    className={`fav-btn ${isFav ? "active" : ""}`}
                    onClick={() => toggleFavorite(recipe)}
                  >
                    {isFav ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* <div className="card-body">
                  <small>{category || "POPULAR"}</small>
                  <h4>{recipe.strMeal}</h4>
                  <div className="rating">⭐ 4.5</div>

                  <Link to={`/recipes/${recipe.idMeal}`}>
                    View Details
                  </Link>
                </div> */}
                <div className="card-body">
                  <div className="card-row">
                    {/* LEFT */}
                    <div className="card-left">
                      <small>{category ? category.toUpperCase() : "POPULAR"}</small>
                      <h4>{recipe.strMeal}</h4>
                    </div>

                    {/* RIGHT */}
                    <div className="card-right">
                      <div className="rating">⭐ 4.5</div>
                      <Link to={`/recipes/${recipe.idMeal}`}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Recipes;