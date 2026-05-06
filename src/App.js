import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          {/* ✅ Login FIRST */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;


