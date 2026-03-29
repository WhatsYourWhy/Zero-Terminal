import { Terminal } from './terminal/Terminal.js';
import { initCRT } from './effects/crt.js';
import { runBootSequence } from './boot/sequence.js';
import { FileSystem } from './filesystem/fs.js';

// Commands
import { registerCoreCommands } from './commands/core.js';
import { registerSystemCommands } from './commands/system.js';
import { registerLifeSimCommands } from './commands/lifeSim.js';
import { registerDangerousCommands } from './commands/dangerous.js';
import { registerEasterCommands } from './commands/easter.js';
import { registerNavigationCommands } from './commands/navigation.js';

async function init() {
  const terminal = new Terminal();

  // Attach filesystem
  terminal._fs = new FileSystem();

  // Register all commands
  registerCoreCommands(terminal);
  registerSystemCommands(terminal);
  registerLifeSimCommands(terminal);
  registerDangerousCommands(terminal);
  registerEasterCommands(terminal);
  registerNavigationCommands(terminal);

  // Init CRT effects
  initCRT();

  // Setup mobile command bar
  setupMobileBar(terminal);

  // Run boot sequence
  await runBootSequence(terminal);

  // Enable input
  terminal.showInput();
}

function setupMobileBar(terminal) {
  const bar = document.getElementById('mobile-bar');
  const commands = ['help', 'status', 'projects', 'about', 'build', 'why', 'theme'];

  for (const cmd of commands) {
    const pill = document.createElement('button');
    pill.className = 'pill';
    pill.textContent = cmd;
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      if (!terminal.inputHandler.enabled) return;
      terminal.inputEl.value = cmd;
      terminal.handleInput(cmd);
    });
    bar.appendChild(pill);
  }
}

init();
