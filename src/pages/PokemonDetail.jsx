import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  if (loading)
    return <p className="text-white text-center mt-10 text-lg">Loading...</p>;
  if (!pokemon)
    return (
      <p className="text-white text-center mt-10 text-lg">Pokémon not found.</p>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <Link
        to="/"
        className="self-start mb-4 text-yellow-400 font-semibold hover:underline"
      >
        ← Back
      </Link>

      <div className="relative bg-black rounded-xl p-6 w-full max-w-sm flex flex-col items-center shadow-lg transform transition hover:scale-105 group">
        {/* Animated gold gradient border */}
        <span className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-500 opacity-70 blur-md animate-pulse"></span>
        <span className="absolute inset-0 rounded-xl border-2 border-yellow-400 pointer-events-none"></span>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 mb-4 relative z-10"
        />
        <h1 className="text-2xl font-bold capitalize mb-2 text-white relative z-10">
          {pokemon.name}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-4 relative z-10">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 rounded-full text-sm font-semibold capitalize transition duration-300 bg-yellow-400 text-black hover:scale-105 hover:shadow-lg"
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="w-full relative z-10">
          <h2 className="text-lg font-semibold mb-2 text-white">Stats</h2>
          <ul>
            {pokemon.stats.map((stat) => (
              <li
                key={stat.stat.name}
                className="flex justify-between border-b border-gray-700 py-1 text-white"
              >
                <span className="capitalize">{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
