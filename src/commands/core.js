import { registerCommands } from './registry.js';
import { projects, repos } from '../data/projects.js';
import { links } from '../data/links.js';

export function registerCoreCommands(terminal) {
  registerCommands(terminal, [
    ['help', help, 'Show available commands', 'core'],
    ['about', about, 'Who is this', 'core'],
    ['projects', projectsCmd, 'View active projects', 'core'],
    ['status', status, 'Check system status', 'core'],
    ['research', research, 'View research interests', 'core'],
    ['store', store, 'View stores', 'core'],
    ['writing', writing, 'View writing', 'core'],
    ['consulting', consulting, 'View consulting info', 'core'],
    ['contact', contact, 'Get in touch', 'core'],
    ['now', now, 'What I\'m working on now', 'core'],
    ['repos', reposCmd, 'List GitHub repositories', 'core'],
  ]);
}

function help({ terminal }) {
  const cats = terminal.getCommandsByCategory();
  const order = ['core', 'life', 'system', 'dangerous', 'nav'];
  const labels = {
    core: 'Core',
    life: 'Life',
    system: 'System',
    dangerous: 'Dangerous',
    easter: 'Hidden',
    nav: 'Navigation',
  };

  const lines = ['ZERO TERMINAL — Command List', ''];

  for (const cat of order) {
    if (!cats[cat]) continue;
    lines.push(`  ${labels[cat] || cat}:`);
    for (const cmd of cats[cat]) {
      const pad = 16 - cmd.name.length;
      lines.push(`    ${cmd.name}${' '.repeat(Math.max(pad, 2))}${cmd.description}`);
    }
    lines.push('');
  }

  lines.push('Type any command to begin.');
  return lines.join('\n');
}

function about() {
  return [
    'Justin Shank',
    'Operator / Builder / Systems Thinker',
    '',
    'I build systems, tools, and ideas across:',
    '  - Supply chain & operations',
    '  - AI tools & agents',
    '  - Research & writing',
    '  - E-commerce & design',
    '  - Weird internet projects',
    '',
    'I like building things that are useful.',
    '',
    'Type \'projects\' to see what I\'m working on.',
  ].join('\n');
}

function projectsCmd() {
  const lines = ['Active Projects:', ''];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const status = p.status === 'active' ? '[ACTIVE]' : '[IDLE]';
    lines.push(`  ${i + 1}. ${p.name}  ${status}`);
    lines.push(`     ${p.description}`);
  }
  lines.push('');
  lines.push('Type: open <slug> for link or details.');
  return lines.join('\n');
}

function status() {
  const energy = Math.floor(Math.random() * 30) + 40;
  const physical = Math.floor(Math.random() * 30) + 35;
  return [
    'Operator Status:',
    '',
    `  Mental Energy......${energy}%`,
    `  Physical Energy....${physical}%`,
    '  Motivation.........Variable',
    '  Discipline.........Loading',
    '  Stress.............Moderate',
    '  Ideas..............Too Many',
    '  Money..............In Progress',
    '  Sleep..............Not Great',
    '',
    'Overall: FUNCTIONAL — PROCEED',
  ].join('\n');
}

function research() {
  return [
    'Current Research:',
    '',
    '  - Temporal Gradient',
    '  - Context Ranking / Psi Scoring',
    '  - AI Systems & Agents',
    '  - Operations Strategy',
    '  - Energy / Compute / Society',
    '',
    'Repository:',
    `    ${links.temporalGradientRepo}`,
    '',
    'Paper:',
    '  Collective Consciousness Hypothesis',
    `    Zenodo:      ${links.collectiveConsciousnessZenodo}`,
    `    PhilArchive: ${links.collectiveConsciousnessPhilArchive}`,
    '',
    'Type: open temporal-gradient for details.',
  ].join('\n');
}

function store() {
  return [
    'Stores:',
    '',
    '  1. WhatsYourWhy — slug: whatsyourwhy',
    '     POD / main Shopify store',
    '  2. The Man Store — slug: man-store',
    '     Dropship',
    '  3. Operator Toolkit — slug: operator-toolkit',
    '     Gumroad',
    '',
    'Type: open <slug> for link.',
  ].join('\n');
}

function writing() {
  return [
    'Writing:',
    '',
    `  Substack:    ${links.substack}`,
    `  Newsletter:  ${links.polymath}`,
    '  Topics: systems, building, strategy, life',
    '',
    'More essays coming. Probably.',
  ].join('\n');
}

function consulting() {
  return [
    'Shank Strategy Ops',
    '',
    '  - Execution strategy',
    '  - Operational systems',
    '  - Store portfolio strategy',
    '  - Automation & AI integration',
    '  - Process design',
    '  - Decision systems',
    '',
    `  Link: ${links.consulting}`,
    '',
    'Contact for projects or advisory.',
  ].join('\n');
}

function contact() {
  return [
    'Contact:',
    '',
    `  GitHub:    ${links.github}`,
    `  LinkedIn:  ${links.linkedin}`,
    `  Twitter:   ${links.twitter}`,
    `  ORCID:     ${links.orcid}`,
    '',
    'Preferred: LinkedIn.',
    'Response time: variable but genuine.',
  ].join('\n');
}

function now() {
  return [
    'What I\'m Working On Now:',
    '',
    '  - Building ZERO TERMINAL (you\'re looking at it)',
    '  - AI agent systems and tools',
    '  - Research: Temporal Gradient framework',
    '  - E-commerce operations',
    '  - Trying to sleep more (failing)',
    '',
    'Updated: 2026',
  ].join('\n');
}

function reposCmd() {
  const lines = [
    `GitHub Repositories (${repos.length}):`,
    `  ${links.github}`,
    '',
  ];

  for (const repo of repos) {
    const pad = 38 - repo.name.length;
    lines.push(`  ${repo.name}${' '.repeat(Math.max(pad, 2))}${repo.description}`);
  }

  lines.push('');
  lines.push('Type: open <repo-name> to view on GitHub.');
  return lines.join('\n');
}
