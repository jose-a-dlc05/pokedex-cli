import type { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokemon = await state.pokeAPI.catchPokemon(args[0]);
  if (!pokemon) {
    console.log("Pokemon not found");
    state.rl.prompt();
    return;
  }
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  if (pokemon.stats) {
    console.log("Stats:");
    for (const stat of pokemon.stats) {
      console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    }
  }
  if (pokemon.types) {
    console.log("Types:");
    for (const type of pokemon.types) {
      console.log(`  - ${type.type.name}`);
    }
  }
  state.rl.prompt();
}
