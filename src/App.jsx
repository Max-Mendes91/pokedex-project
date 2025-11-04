import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          {/* Catch-all route */}
          <Route
            path="*"
            element={<p className="text-center mt-10">Page not found</p>}
          />
        </Routes>
      </div>
    </Router>
  );
}
