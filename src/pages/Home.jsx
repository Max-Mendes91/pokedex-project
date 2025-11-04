import { useEffect, useState } from "react";
import { fetchPokemonList } from "../services/pokeApi";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPokemon();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <Link
          key={p.name}
          to={`/pokemon/${p.name}`}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:scale-105 transition flex flex-col items-center"
        >
          <img src={p.image} alt={p.name} className="w-20 h-20 mb-2" />
          <h2 className="capitalize text-center">{p.name}</h2>
        </Link>
      ))}
    </div>
  );
}
