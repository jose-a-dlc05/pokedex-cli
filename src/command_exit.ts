import { State } from "./state.js";

export async function commandExit(state: State) {
  const readline = state.rl;
  console.log("Closing the Pokedex... Goodbye!");
  readline.close();
  process.exit(0);
}
