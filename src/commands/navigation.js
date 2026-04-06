import { registerCommands } from './registry.js';
import { projects, repos } from '../data/projects.js';
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
    const nameWidth = Math.max(...projects.map((p) => p.name.length), 4);
    const projectLines = projects.map((p) => {
      const gap = ' '.repeat(Math.max(2, nameWidth - p.name.length + 2));
      return `  ${p.name}${gap}${p.slug}`;
    });
    return [
      'Usage: open <name-or-slug>',
      '',
      'Projects:',
      ...projectLines,
      '',
      'Also: github  substack  linkedin  twitter  gumroad  polymath  orcid  consulting',
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

  // Check GitHub repos
  const repo = repos.find(
    r => r.name.toLowerCase() === name || r.name.toLowerCase().replace(/-/g, ' ') === name
  );
  if (repo) {
    window.open(repo.url, '_blank');
    return `Opening ${repo.name} on GitHub...`;
  }

  return `Not found: ${name}. Type 'open' or 'repos' to see available options.`;
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
