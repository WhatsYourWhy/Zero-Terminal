import { registerCommands } from './registry.js';

export function registerDangerousCommands(terminal) {
  registerCommands(terminal, [
    ['compare', compare, 'Compare yourself to others (bad idea)', 'dangerous'],
    ['doomscroll', doomscroll, 'Open infinite feed', 'dangerous'],
    ['redo_past', redoPast, 'Try to change the past', 'dangerous'],
  ]);
}

async function compare({ renderer }) {
  await renderer.typeLine('Comparing yourself to others...', '', 15);
  await renderer.wait(600);
  renderer.blank();
  await renderer.typeLine('This was a bad idea.', 'error', 15);
  renderer.blank();
  await renderer.typeLine('Result:', '', 15);
  await renderer.typeLine('Unfair comparison detected.', 'warn', 12);
  renderer.blank();
  await renderer.typeLine('They have different:', '', 12);
  const items = ['timeline', 'resources', 'luck', 'goals', 'struggles'];
  for (const item of items) {
    await renderer.typeLine(`  - ${item}`, '', 10);
    await renderer.wait(100);
  }
  renderer.blank();
  await renderer.typeLine('Comparison cancelled.', '', 15);
  await renderer.typeLine('System confidence restored.', '', 15);
  return null;
}

async function doomscroll({ renderer }) {
  await renderer.typeLine('Opening infinite information feed...', '', 15);
  await renderer.wait(400);

  const items = [
    'Loading opinions...',
    'Loading outrage...',
    'Loading things that don\'t affect you...',
    'Loading ads disguised as content...',
    'Loading more opinions...',
  ];

  for (const item of items) {
    await renderer.typeLine(item, 'dim', 10);
    await renderer.wait(200);
  }

  await renderer.wait(800);
  renderer.blank();
  await renderer.typeLine('Time elapsed: 2 hours', 'error', 15);
  await renderer.typeLine('Mood: worse', 'error', 15);
  await renderer.typeLine('Knowledge gained: 3 useless facts', 'warn', 15);
  renderer.blank();
  await renderer.typeLine('Recommendation: close app. Go outside.', '', 15);
  return null;
}

function redoPast() {
  return [
    'Error: Access denied.',
    'Time travel module not found.',
    '',
    'Available alternatives:',
    '  > learn',
    '  > build',
    '  > small_step',
    '',
    'Forward direction only.',
  ].join('\n');
}
