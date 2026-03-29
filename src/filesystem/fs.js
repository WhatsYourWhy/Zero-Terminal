const fileTree = {
  zero: {
    projects: {
      unfinished: {
        'business_idea_17': 'A marketplace for... something. Details TBD.',
        'app_that_would_be_cool': 'The idea is solid. Execution is... pending.',
        'write_more': 'Just sit down and write. How hard can it be?',
        'get_in_shape_v4': 'This time for real. (said v1, v2, and v3)',
        'organize_everything': 'Step 1: Make a plan. Step 2: Lose the plan.',
      },
      almost_done: {
        'zero_terminal': 'This site. Almost done. Always almost done.',
      },
      abandoned_but_good_ideas: {
        'that_one_saas': 'The idea was good. The timing was not.',
        'podcast_idea': 'Would have been great. Still might be.',
        'the_book': 'Outlined. Chapter 1 drafted. Then... silence.',
      },
    },
    life: {
      'work': 'Currently: building things that matter.',
      'family': 'Priority: always.',
      'money': 'Status: complicated but improving.',
      'health': 'Running on coffee and determination.',
      'friends': 'Quality over quantity.',
    },
    brain: {
      overthinking: {
        'that_email': 'You reread it 5 times. It was fine.',
        'the_meeting': 'They weren\'t judging you. Probably.',
        'life_choices': 'All paths have trade-offs. You\'re doing okay.',
      },
      ideas: {
        'idea_001': 'An AI that tells you when to stop overthinking.',
        'idea_002': 'A CLI for your entire life. Oh wait...',
        'idea_003': 'Something with supply chains and graphs.',
        'idea_004': 'That thing you thought of at 3am. Write it down next time.',
      },
      random_knowledge: {
        'fact_1': 'Honey never expires.',
        'fact_2': 'Octopuses have three hearts.',
        'fact_3': 'The Dunning-Kruger effect is more nuanced than people think.',
      },
      '3am_questions': {
        'q1': 'Am I on the right path?',
        'q2': 'What would I do if money wasn\'t a factor?',
        'q3': 'Is consciousness emergent or fundamental?',
        'q4': 'Should I just build it?',
      },
    },
    logs: {
      '2009': 'Learned something the hard way.',
      '2013': 'That relationship taught you a lot.',
      '2016': 'Big risk. Worth it.',
      '2020': 'Survived. That counts.',
      '2023': 'Started building again.',
      '2024': 'Ideas compiling...',
      '2025': 'Systems online.',
      '2026': 'Still building.',
    },
    drafts: {
      'essay_on_systems': 'Draft. Needs editing. Needs courage.',
      'letter_to_self': 'Be patient. Keep going.',
      'project_proposal': 'This could work. Send it.',
    },
    future: {
      'goals': 'Build things. Help people. Stay curious. Don\'t waste your life.',
      'plans': 'Plans change. Principles don\'t.',
      'hopes': 'That the work was worth it.',
    },
    past: {
      'lessons': 'Everything taught you something.',
      'regrets': 'Fewer than expected. Mostly inaction.',
      'wins': 'More than you remember. Write them down.',
    },
  },
};

export class FileSystem {
  constructor() {
    this.tree = fileTree;
  }

  resolve(path, cwd) {
    // Normalize path
    let target = path;
    if (!target.startsWith('/')) {
      target = cwd + '/' + target;
    }

    // Clean path
    const parts = target.split('/').filter(Boolean);
    const resolved = [];
    for (const part of parts) {
      if (part === '..') {
        resolved.pop();
      } else if (part !== '.') {
        resolved.push(part);
      }
    }

    // Traverse
    let node = this.tree;
    for (const part of resolved) {
      if (node && typeof node === 'object' && part in node) {
        node = node[part];
      } else {
        return { error: `No such file or directory: ${path}` };
      }
    }

    return { node, path: '/' + resolved.join('/') };
  }

  ls(path, cwd) {
    const result = this.resolve(path || cwd, cwd);
    if (result.error) return result.error;

    if (typeof result.node === 'string') {
      return result.node;
    }

    const entries = Object.keys(result.node);
    const dirs = entries.filter(e => typeof result.node[e] === 'object');
    const files = entries.filter(e => typeof result.node[e] === 'string');

    const lines = [];
    for (const d of dirs) {
      lines.push(`  ${d}/`);
    }
    for (const f of files) {
      lines.push(`  ${f}`);
    }

    return lines.join('\n') || '(empty)';
  }

  cd(path, cwd) {
    const result = this.resolve(path, cwd);
    if (result.error) return result;

    if (typeof result.node === 'string') {
      return { error: `Not a directory: ${path}` };
    }

    return { path: result.path };
  }

  cat(path, cwd) {
    const result = this.resolve(path, cwd);
    if (result.error) return result.error;

    if (typeof result.node === 'string') {
      return result.node;
    }

    return `${path}: is a directory. Use 'ls' instead.`;
  }
}
