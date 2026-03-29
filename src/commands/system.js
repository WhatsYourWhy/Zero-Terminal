import { registerCommands } from './registry.js';

export function registerSystemCommands(terminal) {
  registerCommands(terminal, [
    ['clear', clear, 'Clear the terminal', 'system'],
    ['version', version, 'Show version info', 'system'],
    ['logs', logs, 'View life logs', 'system'],
    ['exit', exit, 'Attempt to exit', 'system'],
    ['theme', theme, 'Toggle color theme', 'system'],
    ['ls', ls, 'List directory contents', 'system'],
    ['cd', cd, 'Change directory', 'system'],
    ['cat', cat, 'Read file contents', 'system'],
    ['pwd', pwd, 'Print working directory', 'system'],
    ['history', history, 'Show command history', 'system'],
    ['uptime', uptime, 'Show session uptime', 'system'],
  ]);
}

async function clear({ terminal }) {
  terminal.renderer.clear();
  return null;
}

function version() {
  return [
    'ZERO TERMINAL v6.0',
    'Built with caffeine and existential dread.',
    '',
    'Version History:',
    '  v1.0  - Childhood',
    '  v2.0  - Teenage years (unstable release)',
    '  v3.0  - Early adulthood (many bugs)',
    '  v4.0  - Getting serious',
    '  v5.0  - Building things that matter',
    '  v6.0  - Current version',
  ].join('\n');
}

function logs() {
  return [
    'System Logs:',
    '',
    '  [2009] Learned something the hard way.',
    '  [2013] That relationship taught you a lot.',
    '  [2016] Big risk. Worth it.',
    '  [2020] Survived. That counts.',
    '  [2023] Started building again.',
    '  [2024] Ideas compiling...',
    '  [2025] Systems online.',
    '  [2026] Still building.',
    '',
    'Log status: ongoing',
  ].join('\n');
}

function exit() {
  return [
    'There is no exit. Only forward.',
    '',
    '(But you can close the tab.)',
  ].join('\n');
}

function theme({ terminal, state }) {
  const newTheme = state.theme === 'green' ? 'amber' : 'green';
  terminal.setTheme(newTheme);
  return `Theme switched to ${newTheme}.`;
}

function ls({ terminal, args }) {
  if (terminal._fs) {
    const path = args[0] || terminal.cwd;
    return terminal._fs.ls(path, terminal.cwd);
  }
  return 'Filesystem not loaded.';
}

function cd({ terminal, args }) {
  if (terminal._fs) {
    const result = terminal._fs.cd(args[0] || '/zero', terminal.cwd);
    if (result.error) return result.error;
    terminal.cwd = result.path;
    terminal.updatePrompt(`zero:${result.path}$ `);
    return null;
  }
  return 'Filesystem not loaded.';
}

function cat({ terminal, args }) {
  if (!args[0]) return 'Usage: cat <filename>';
  if (terminal._fs) {
    return terminal._fs.cat(args[0], terminal.cwd);
  }
  return 'Filesystem not loaded.';
}

function pwd({ terminal }) {
  return terminal.cwd;
}

function history({ terminal, args }) {
  if (args[0] === 'clear') {
    terminal.inputHandler.history.length = 0;
    return 'History cleared.';
  }

  const hist = terminal.inputHandler.history;
  if (hist.length === 0) return 'No commands in history.';

  const reversed = [...hist].reverse();
  const lines = ['Command History:', ''];
  reversed.forEach((cmd, i) => {
    lines.push(`  ${String(i + 1).padStart(4)}  ${cmd}`);
  });
  return lines.join('\n');
}

function uptime({ state }) {
  const elapsed = Date.now() - state.startTime;
  const seconds = Math.floor(elapsed / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  let duration;
  if (h > 0) {
    duration = `${h}h ${m}m ${s}s`;
  } else if (m > 0) {
    duration = `${m}m ${s}s`;
  } else {
    duration = `${s}s`;
  }

  return [
    `Session uptime: ${duration}`,
    `Coffee consumed: ${state.coffeeCount} cup${state.coffeeCount !== 1 ? 's' : ''}`,
  ].join('\n');
}
