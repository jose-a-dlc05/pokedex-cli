import { State } from "./state.js";

export async function startREPL(state: State) {
  const { rl, commands } = state;
  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0 || words[0] === "") {
      rl.prompt();
      return;
    }
    const cmdName = words[0];
    const args = words.slice(1);

    const cmd = state.commands[cmdName];
    if (!cmd) {
      console.log(
        `Unknown command: "${cmdName}". Type "help" for a list of commands.`
      );
      rl.prompt();
      return;
    }

    try {
      await cmd.callback(state, ...args);
    } catch (err) {
      console.error((err as Error).message);
      rl.prompt();
      return;
    }
  });
}

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}
