const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetch a paginated list of Pokémon with sprites and types
 */
export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data = await res.json();

  // Fetch individual Pokémon details for image and types
  const pokemonWithSprites = await Promise.all(
    data.results.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error(`Failed to fetch details for ${p.name}`);
      const details = await res.json();
      return {
        name: p.name,
        image: details.sprites.front_default,
        types: details.types, // needed for filtering
      };
    })
  );

  return {
    pokemon: pokemonWithSprites,
    nextOffset: offset + limit,
    hasMore: data.next !== null,
  };
};

/**
 * Fetch all valid Pokémon types (filter out shadow/unknown)
 */
export const fetchPokemonTypes = async () => {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) throw new Error("Failed to fetch types");
  const data = await res.json();

  const validTypes = data.results.filter(
    (t) => !["shadow", "unknown"].includes(t.name)
  );

  return validTypes.map((t) => t.name);
};
