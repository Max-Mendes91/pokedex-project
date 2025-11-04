import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <Header />

        {/* Page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <p className="text-white text-center mt-10 text-lg">
                Page not found
              </p>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
