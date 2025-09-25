import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Displays the pokemon in the area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catches pokemon and adds them to the pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Displays information about pokemon seen or caught",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description:
        "Displats information of all the pokemon in the pokedex so far",
      callback: commandPokedex,
    },
  };
}
