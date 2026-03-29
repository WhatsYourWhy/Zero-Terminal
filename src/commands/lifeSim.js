import { registerCommands } from './registry.js';
import { coffeeMessages, buildMessages, sleepExcuses, thoughts } from '../data/quotes.js';

export function registerLifeSimCommands(terminal) {
  registerCommands(terminal, [
    ['build', build, 'Start building something', 'life'],
    ['deploy', deploy, 'Ship the thing', 'life'],
    ['think', think, 'Enter overthinking mode', 'life'],
    ['money', money, 'Check financial reality', 'life'],
    ['sleep', sleep, 'Attempt sleep mode', 'life'],
    ['coffee', coffee, 'Install caffeine patch', 'life'],
    ['walk', walk, 'Go outside', 'life'],
    ['focus', focus, 'Activate focus mode', 'life'],
    ['small_step', smallStep, 'Do one small thing', 'life'],
  ]);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function build({ renderer }) {
  await renderer.typeLine('Starting build process...', '', 15);
  await renderer.wait(300);
  await renderer.typeLine('[░░░░░░░░░░░░░░░░░░░░░░░░░░░]', 'dim', 8);
  await renderer.wait(200);

  for (const msg of buildMessages) {
    await renderer.typeLine(msg, '', 12);
    await renderer.wait(150);
  }

  await renderer.wait(400);
  await renderer.typeLine('Build failed successfully.', 'warn');
  return null;
}

async function deploy({ renderer }) {
  await renderer.typeLine('Preparing to deploy project...', '', 15);
  await renderer.wait(300);
  await renderer.typeLine('Warning: Project is not perfect.', 'warn', 15);
  await renderer.typeLine('Warning: You are not ready.', 'warn', 15);
  await renderer.typeLine('Warning: You will never feel ready.', 'warn', 15);
  await renderer.wait(500);
  await renderer.typeLine('Deploying anyway...', '', 15);
  await renderer.wait(800);
  await renderer.typeLine('Project shipped.', '', 15);
  await renderer.wait(300);
  renderer.blank();
  await renderer.typeLine('Outcome:', '', 15);
  await renderer.typeLine('  - Nobody noticed', '', 12);
  await renderer.typeLine('  - One person liked it', '', 12);
  await renderer.typeLine('  - That was enough', '', 12);
  return null;
}

async function think({ renderer }) {
  await renderer.typeLine('Entering overthinking mode...', '', 15);
  await renderer.wait(400);

  const items = [
    'Analyzing past...',
    'Analyzing future...',
    'Analyzing things you said in 2007...',
    'Analyzing that one awkward conversation...',
    'Analyzing entire life trajectory...',
  ];

  for (const item of items) {
    await renderer.typeLine(item, '', 12);
    await renderer.wait(300);
  }

  await renderer.wait(500);
  renderer.blank();
  await renderer.typeLine(`Random thought: "${pick(thoughts)}"`, 'dim');
  renderer.blank();
  await renderer.typeLine('Conclusion: unclear.', '');
  return null;
}

function money() {
  return [
    'Financial Dashboard:',
    '',
    '  Income...............inconsistent',
    '  Ideas................profitable (theoretically)',
    '  Subscriptions........too many',
    '  Coffee...............expensive',
    '  Amazon Purchases.....why',
    '  Retirement Plan......lol',
    '',
    'Suggestion: keep building.',
  ].join('\n');
}

async function sleep({ renderer }) {
  await renderer.typeLine('Attempting sleep mode...', '', 15);
  await renderer.wait(400);
  await renderer.typeLine('Closing eyes...', '', 15);
  await renderer.wait(500);

  for (const excuse of sleepExcuses.slice(0, 4)) {
    await renderer.typeLine(excuse, '', 12);
    await renderer.wait(400);
  }

  await renderer.wait(600);
  renderer.blank();
  await renderer.typeLine('Sleep failed.', 'error');
  return null;
}

function coffee({ state }) {
  const count = Math.min(state.coffeeCount, coffeeMessages.length - 1);
  const msg = coffeeMessages[count];
  state.coffeeCount++;
  return [
    'Installing caffeine patch...',
    '',
    `  [${'█'.repeat(16)}] 100%`,
    '',
    msg,
  ].join('\n');
}

function walk() {
  return [
    'Going outside...',
    '',
    '  Graphics improved.',
    '  Mood slightly improved.',
    '  Problems still exist but feel more solvable.',
  ].join('\n');
}

function focus() {
  return [
    'Focus Mode Activated:',
    '',
    '  1 task',
    '  No phone',
    '  No tabs',
    '  No nonsense',
    '  25 minutes',
    '',
    'Go.',
  ].join('\n');
}

function smallStep() {
  const tasks = [
    'Send the email',
    'Do 10 minutes of work',
    'Clean one thing',
    'Write one paragraph',
    'Push one commit',
    'Drink some water',
    'Stand up and stretch',
    'Close 5 browser tabs',
  ];
  const selected = [];
  const copy = [...tasks];
  for (let i = 0; i < 5 && copy.length; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(idx, 1)[0]);
  }

  return [
    'Recommended next step:',
    '',
    ...selected.map(t => `  [ ] ${t}`),
    '',
    'Small steps change trajectories.',
  ].join('\n');
}
