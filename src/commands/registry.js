export function registerAll(terminal) {
  // Import and register all command modules
  // Each module exports a register(terminal) function
}

// Helper to register a batch of commands
export function registerCommands(terminal, commands) {
  for (const [name, fn, description, category] of commands) {
    terminal.register(name, fn, description, category);
  }
}
