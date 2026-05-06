import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./Recipes.css"; // reuse same card styles

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="discover-layout">
      {/* MAIN CONTENT ONLY */}
      <main className="content">
        <h1>Favorite Recipes</h1>
        <p className="subtitle">Your saved recipes</p>

        {favorites.length === 0 ? (
          <p>No favorite recipes yet.</p>
        ) : (
          <div className="grid">
            {favorites.map((recipe) => (
              <div className="card" key={recipe.idMeal}>
                {/* IMAGE + FAVORITE ICON */}
                <div className="image-wrapper">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />

                  <button
                    className="fav-btn active"
                    onClick={() => toggleFavorite(recipe)}
                  >
                    ❤️
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-row">
                    {/* LEFT */}
                    <div className="card-left">
                      <small>FAVORITE</small>
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;// import { useFavorites } from "../context/FavoritesContext";
// import { Link } from "react-router-dom";

// export default function Favorites() {
//   const { favorites } = useFavorites();

//   return (
//     <div>
//       <h2>My Favorites</h2>

//       {favorites.length === 0 && <p>No favorites yet</p>}

//       {favorites.map((r) => (
//         <Link key={r.idMeal} to={`/recipes/${r.idMeal}`}>
//           <p>{r.strMeal}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }