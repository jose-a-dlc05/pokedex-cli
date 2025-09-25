import { State } from "./state.js";

export async function commandHelp(state: State) {
  const commandList = Object.entries(state.commands)
    .map(([key, cmd]) => `${cmd.name}: ${cmd.description}`)
    .join("\n");

  const output = `Welcome to the Pokedex!\nUsage:\n\n${commandList}`;

  console.log(output);
}
