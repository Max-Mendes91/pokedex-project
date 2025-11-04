// src/services/pokeApi.js
const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 20) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  const data = await res.json();

  // Fetch individual Pokémon data for sprites
  const pokemonWithSprites = await Promise.all(
    data.results.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error("Failed to fetch Pokémon details");
      const details = await res.json();
      return {
        name: p.name,
        image: details.sprites.front_default, // default front sprite
      };
    })
  );

  return pokemonWithSprites;
};
