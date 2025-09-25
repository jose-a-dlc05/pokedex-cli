import { createInterface, type Interface } from "readline";
import { getCommands } from "./registry.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

const pokedex = new Map<string, Pokemon>();

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  pokedex: Map<string, Pokemon>;
};

export function initState() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    rl,
    commands: getCommands(),
    pokeAPI: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
    pokedex: pokedex,
  };
}
