import { registerCommands } from './registry.js';

export function registerEasterCommands(terminal) {
  registerCommands(terminal, [
    ['meaning', meaning, 'Search for meaning', 'easter'],
    ['42', fortyTwo, 'The answer', 'easter'],
    ['sudo', sudo, 'Attempt root access', 'easter'],
    ['why', why, 'Display existential prompt', 'easter'],
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
