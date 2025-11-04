import { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemonTypes } from "../services/pokeApi";
import { Link } from "react-router-dom";

export default function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const limit = 20;

  const loadPokemon = async () => {
    setLoading(true);
    try {
      const {
        pokemon: newPokemon,
        nextOffset,
        hasMore,
      } = await fetchPokemonList(offset, limit);
      setAllPokemon((prev) => [...prev, ...newPokemon]);
      setOffset(nextOffset);
      setHasMore(hasMore);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const data = await fetchPokemonTypes();
      setTypes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPokemon();
    loadTypes();
  }, []);

  useEffect(() => {
    const filtered = allPokemon.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        !selectedType ||
        (p.types && p.types.some((t) => t.type.name === selectedType));
      return matchesName && matchesType;
    });
    setPokemon(filtered);
  }, [search, selectedType, allPokemon]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Search & Type Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-5 py-3 rounded-full w-full sm:w-1/2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-5 py-3 rounded-full w-full sm:w-1/4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {pokemon.map((p) => (
          <Link
            key={p.name}
            to={`/pokemon/${p.name}`}
            className="relative bg-black rounded-xl p-4 flex flex-col items-center transform transition hover:scale-105 shadow-lg overflow-hidden group"
          >
            {/* Animated gold border */}
            <span className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-500 opacity-70 blur-md animate-pulse"></span>
            <span className="absolute inset-0 rounded-xl border-2 border-yellow-400 pointer-events-none"></span>

            <img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 mb-3 relative z-10"
            />
            <h2 className="text-white text-lg font-bold capitalize relative z-10">
              {p.name}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2 relative z-10">
              {p.types?.map((type) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 rounded-full text-sm font-semibold capitalize transition duration-300 bg-yellow-400 text-black hover:scale-105 hover:shadow-lg"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* No results */}
      {pokemon.length === 0 && !loading && (
        <p className="text-white text-center mt-6 text-lg">
          No Pokémon found with this search or type.
        </p>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadPokemon}
            className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
