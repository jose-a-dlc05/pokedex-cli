import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex: ");
  state.pokedex.forEach((pokemon) => {
    console.log(`- ${pokemon.name}`);
  });
}
