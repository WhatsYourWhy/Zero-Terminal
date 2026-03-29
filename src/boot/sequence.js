import { LOGO, DIVIDER } from './ascii.js';

export async function runBootSequence(terminal) {
  const r = terminal.renderer;
  let skipped = false;

  // Skip listener
  const skipHandler = (e) => {
    if (e.key === 'Escape' || e.key === ' ') {
      skipped = true;
    }
  };
  document.addEventListener('keydown', skipHandler);

  const delay = (ms) => {
    if (skipped) return Promise.resolve();
    return r.wait(ms);
  };

  const type = async (text, cls = '', speed = 10) => {
    if (skipped) {
      r.printLine(text, cls);
      return;
    }
    await r.typeLine(text, cls, speed);
  };

  // Boot logo
  const logoLines = LOGO.split('\n');
  for (const line of logoLines) {
    r.printLine(line, 'ascii');
    await delay(60);
  }

  r.blank();
  await type(DIVIDER, 'dim', 5);
  r.blank();
  await type('ZERO TERMINAL v6.0', '', 20);
  await type('An operating system for figuring it out.', 'dim', 15);
  r.blank();
  await delay(300);

  // Module loading
  await type('Initializing system...', '', 15);
  r.blank();

  const modules = [
    ['personality', 'OK', 'boot-ok'],
    ['caffeine_dependency', 'OK', 'boot-ok'],
    ['imposter_syndrome', 'LOADED (unfortunately)', 'boot-warn'],
    ['ambition_engine', 'OK', 'boot-ok'],
    ['sleep_module', 'DEGRADED', 'boot-warn'],
    ['overthinking_daemon', 'RUNNING (always)', 'boot-warn'],
    ['build_drive', 'OK', 'boot-ok'],
    ['curiosity_core', 'OK', 'boot-ok'],
    ['filesystem', 'OK', 'boot-ok'],
  ];

  for (const [name, status, cls] of modules) {
    const pad = 30 - name.length;
    const line = `  [${status.padEnd(8)}] ${name}`;
    if (skipped) {
      r.printLine(line, cls === 'boot-warn' ? 'warn' : '');
    } else {
      await r.typeLine(line, cls === 'boot-warn' ? 'warn' : '', 6);
      await delay(80);
    }
  }

  r.blank();
  await type('All systems nominal.', '', 15);
  r.blank();
  await delay(400);

  // Login
  await type(DIVIDER, 'dim', 5);
  r.blank();

  // Login prompt — cosmetic
  await type('Login required.', '', 15);
  r.blank();

  // Show login prompt and accept input (bypass normal command handling)
  terminal.updatePrompt('login: ');
  terminal.inputLine.classList.remove('hidden');
  terminal.inputEl.disabled = false;
  terminal.inputEl.focus();

  const username = await waitForInput(terminal);
  terminal.inputLine.classList.add('hidden');

  // Password prompt
  terminal.updatePrompt('password: ');
  terminal.inputEl.type = 'password';
  terminal.inputLine.classList.remove('hidden');
  terminal.inputEl.disabled = false;
  terminal.inputEl.focus();

  const password = await waitForInput(terminal);
  terminal.inputLine.classList.add('hidden');
  terminal.inputEl.type = 'text';

  r.blank();
  await delay(300);
  await type('Access granted.', '', 15);
  r.blank();
  await type('Reminder:', 'dim', 15);
  await type('You are running a temporary instance of you.', 'dim', 12);
  await type('No backups found.', 'dim', 12);
  r.blank();
  await delay(400);
  await type(DIVIDER, 'dim', 5);
  r.blank();
  await type("Type 'help' to view available commands.", '', 15);
  r.blank();

  // Cleanup
  document.removeEventListener('keydown', skipHandler);

  // Restore normal prompt
  terminal.updatePrompt('zero:~$ ');
  terminal.cwd = '/zero';
}

function waitForInput(terminal) {
  return new Promise((resolve) => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        const val = terminal.inputEl.value;
        const prompt = terminal.promptEl.textContent;
        // Echo the input (masked for password)
        if (terminal.inputEl.type === 'password') {
          terminal.renderer.printLine(`${prompt}${'*'.repeat(val.length || 8)}`, 'input-echo');
        } else {
          terminal.renderer.printLine(`${prompt}${val || 'operator'}`, 'input-echo');
        }
        terminal.inputEl.value = '';
        terminal.inputEl.removeEventListener('keydown', handler);
        resolve(val || 'operator');
      }
    };
    terminal.inputEl.addEventListener('keydown', handler);
  });
}
