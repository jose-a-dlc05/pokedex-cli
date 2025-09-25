import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const locations = await state.pokeAPI.fetchLocation(args[0]);
  const pokemonInArea = locations.pokemon_encounters.map(
    (pokemon) => pokemon.pokemon.name
  );
  for (const name of pokemonInArea) {
    console.log(name);
  }
}
