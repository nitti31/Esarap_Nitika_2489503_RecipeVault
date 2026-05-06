import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const query = searchParams.get("q") || "";

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "";

    if (category) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setLoading(false);
      });
  }, [category, query]);

  return (
    <div className="layout">
      <aside>
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) =>
            setSearchParams({ category, q: e.target.value })
          }
        />

        {categories.map((c) => (
          <button
            key={c.idCategory}
            onClick={() => setSearchParams({ category: c.strCategory })}
          >
            {c.strCategory}
          </button>
        ))}
      </aside>

      <main>
        {loading && <p>Loading...</p>}
        {!recipes.length && <p>No recipes found</p>}

        <div className="grid">
          {recipes.map((r) => (
            <Link key={r.idMeal} to={`/recipes/${r.idMeal}`}>
              {r.strMealThumb}
              <p>{r.strMeal}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}