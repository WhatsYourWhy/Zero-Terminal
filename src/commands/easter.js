import { registerCommands } from './registry.js';

export function registerEasterCommands(terminal) {
  registerCommands(terminal, [
    ['meaning', meaning, 'Search for meaning', 'easter'],
    ['42', fortyTwo, 'The answer', 'easter'],
    ['sudo', sudo, 'Attempt root access', 'easter'],
    ['why', why, 'Display existential prompt', 'easter'],
    ['matrix', matrix, 'Enter the Matrix', 'easter'],
  ]);
}

function meaning() {
  return [
    'Searching for meaning...',
    '',
    'Meaning is not installed by default.',
    'You must build it yourself.',
    '',
    'Ingredients found:',
    '  - Responsibility',
    '  - Curiosity',
    '  - Building',
    '  - Helping',
    '  - Struggle',
    '',
    'Assembly required.',
  ].join('\n');
}

function fortyTwo() {
  return [
    'Correct.',
    'But also not helpful.',
    '',
    'The answer was never the hard part.',
    'The question was.',
  ].join('\n');
}

function sudo({ args }) {
  const rest = args.join(' ');
  if (rest === 'fix life' || rest === 'fix_life') {
    return [
      'Permission denied.',
      'You must do it manually.',
      '',
      'There is no shortcut.',
      'There is only the work.',
    ].join('\n');
  }
  if (rest === 'rm -rf /') {
    return [
      'Nice try.',
      'You can\'t delete yourself.',
      'You can only rebuild.',
    ].join('\n');
  }
  return [
    'Nice try.',
    'You don\'t have root access to this life.',
    '',
    'Try: small_step',
  ].join('\n');
}

function why() {
  return [
    '> WHAT\'S YOUR WHY?',
    '',
    '  1. Build cool stuff',
    '  2. Take care of people',
    '  3. Be useful',
    '  4. Curiosity',
    '  5. Freedom',
    '  6. Because it\'s interesting',
    '  7. Because you can',
  ].join('\n');
}

async function matrix({ renderer }) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:#000';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const interval = setInterval(draw, 33);
  await renderer.wait(5000);
  clearInterval(interval);
  canvas.remove();

  renderer.blank();
  renderer.printLine("You've seen enough.", 'dim');
  return null;
}
