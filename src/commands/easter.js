import { registerCommands } from './registry.js';

export function registerEasterCommands(terminal) {
  registerCommands(terminal, [
    ['meaning', meaning, 'Search for meaning', 'easter'],
    ['42', fortyTwo, 'The answer', 'easter'],
    ['sudo', sudo, 'Attempt root access', 'easter'],
    ['why', why, 'Display existential prompt', 'easter'],
    ['matrix', matrix, 'Enter the Matrix', 'easter'],
    ['turnover', turnover, 'The road is innocent', 'easter'],
    ['blame', blame, 'Assign responsibility', 'easter'],
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

async function turnover({ renderer }) {
  renderer.printLine('Two bursts of light arrived late.');
  renderer.printLine('Blaming the road...');
  await renderer.wait(1100);
  renderer.blank();
  renderer.printLine('  GRB 160625B ... turnover at 19.3 MeV');
  await renderer.wait(500);
  renderer.printLine('  GRB 190530A ... turnover at  3.1 MeV');
  await renderer.wait(1100);
  renderer.blank();
  renderer.printLine('A factor of six apart. The road cannot do that.');
  renderer.printLine('The road is innocent.');
  await renderer.wait(1400);

  // full-screen overlay; the iframe ignores pointers so any click returns
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#05060e;cursor:pointer';
  const frame = document.createElement('iframe');
  frame.src = '/turnover.html';
  frame.style.cssText = 'width:100%;height:100%;border:0;pointer-events:none';
  const hint = document.createElement('div');
  hint.textContent = '[ click anywhere to return ]';
  hint.style.cssText =
    'position:absolute;left:14px;bottom:12px;color:#4a5170;' +
    'font:11px Georgia,serif;letter-spacing:0.12em;text-transform:uppercase';
  overlay.appendChild(frame);
  overlay.appendChild(hint);
  document.body.appendChild(overlay);

  await new Promise((resolve) => {
    const close = () => {
      overlay.remove();
      window.removeEventListener('keydown', onKey);
      resolve();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    overlay.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
  });

  renderer.blank();
  renderer.printLine('The turnover tracks the source.', 'dim');
  return null;
}

function blame(ctx) {
  const target = ctx.args.join(' ').toLowerCase();
  if (target === 'road' || target === 'the road') {
    return turnover(ctx);
  }
  if (!target) {
    return [
      'Nothing to blame.',
      '',
      'Try: blame road',
    ].join('\n');
  }
  return [
    `Blame logged against: ${target}`,
    '',
    'Evidence not found.',
    'Blame returned to sender.',
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
