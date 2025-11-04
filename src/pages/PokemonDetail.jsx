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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!pokemon) return <p className="text-center mt-10">Pokémon not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <Link to="/" className="self-start mb-4 text-blue-600 hover:underline">
        ← Back
      </Link>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-sm flex flex-col items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 mb-4"
        />
        <h1 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 rounded bg-blue-200 text-blue-800 capitalize text-sm"
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Stats</h2>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="flex justify-between">
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
