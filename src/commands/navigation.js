import { registerCommands } from './registry.js';
import { projects } from '../data/projects.js';
import { links } from '../data/links.js';

export function registerNavigationCommands(terminal) {
  registerCommands(terminal, [
    ['open', open, 'Open a project or link', 'nav'],
    ['call', call, 'Call someone', 'nav'],
  ]);
}

function open({ args }) {
  const name = args.join(' ').toLowerCase();

  if (!name) {
    return [
      'Usage: open <name>',
      '',
      'Available:',
      ...projects.map(p => `  ${p.slug}`),
      '  github',
      '  substack',
      '  linkedin',
      '  twitter',
      '  gumroad',
      '  polymath',
      '  orcid',
    ].join('\n');
  }

  // Check projects
  const project = projects.find(
    p => p.slug === name || p.name.toLowerCase().includes(name)
  );
  if (project) {
    if (project.url && project.url !== '#') {
      window.open(project.url, '_blank');
      return `Opening ${project.name}...`;
    }
    return [
      `${project.name}`,
      `  ${project.description}`,
      '',
      '  Link: coming soon',
    ].join('\n');
  }

  // Check direct links
  const linkMap = {
    github: links.github,
    substack: links.substack,
    linkedin: links.linkedin,
    twitter: links.twitter,
    gumroad: links.gumroad,
    polymath: links.polymath,
    orcid: links.orcid,
    consulting: links.consulting,
  };

  if (linkMap[name] && linkMap[name] !== '#') {
    window.open(linkMap[name], '_blank');
    return `Opening ${name}...`;
  }
  if (linkMap[name] === '#') {
    return `${name}: link coming soon.`;
  }

  return `Not found: ${name}. Type 'open' to see available options.`;
}

function call({ args }) {
  const who = args.join(' ').toLowerCase();

  if (who === 'mom' || who === 'mum') {
    return [
      'Calling mom...',
      '',
      'She is happy you called.',
      'Connection quality: excellent.',
      'Love: unconditional.',
    ].join('\n');
  }

  if (who === 'dad') {
    return [
      'Calling dad...',
      '',
      'He said something practical.',
      'It was actually helpful.',
    ].join('\n');
  }

  if (!who) {
    return 'Call who? Try: call mom';
  }

  return [
    `Calling ${who}...`,
    '',
    'They appreciate you reaching out.',
    'Human connection: underrated.',
  ].join('\n');
}
