import { OutputRenderer } from './OutputRenderer.js';
import { InputHandler } from './InputHandler.js';

export class Terminal {
  constructor() {
    this.output = document.getElementById('output');
    this.inputEl = document.getElementById('cmd-input');
    this.inputLine = document.getElementById('input-line');
    this.promptEl = document.getElementById('prompt');

    this.renderer = new OutputRenderer(this.output);
    this.inputHandler = new InputHandler(this.inputEl, this);

    this.commands = new Map();
    this.cwd = '/zero';
    this.state = {
      coffeeCount: 0,
      theme: 'green',
      startTime: Date.now(),
    };

    // Initially hide input line until boot completes
    this.inputLine.classList.add('hidden');
  }

  register(name, fn, description = '', category = 'other') {
    this.commands.set(name.toLowerCase(), { fn, description, category });
  }

  getCommandNames() {
    return [...this.commands.keys()];
  }

  getCommandsByCategory() {
    const cats = {};
    for (const [name, cmd] of this.commands) {
      if (!cats[cmd.category]) cats[cmd.category] = [];
      cats[cmd.category].push({ name, description: cmd.description });
    }
    return cats;
  }

  showInput() {
    this.inputLine.classList.remove('hidden');
    this.inputHandler.enable();
  }

  hideInput() {
    this.inputLine.classList.add('hidden');
    this.inputHandler.disable();
  }

  updatePrompt(text) {
    this.promptEl.textContent = text;
  }

  async handleInput(raw) {
    // Echo the command
    const prompt = this.promptEl.textContent;
    this.renderer.printLine(`${prompt}${raw}`, 'input-echo');

    if (!raw) return;

    await this.processCommand(raw);
    this.renderer.scrollToBottom();
  }

  async processCommand(raw) {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const entry = this.commands.get(cmd);
    if (!entry) {
      this.renderer.printLine(
        `Command not found: ${cmd}. Type 'help' for available commands.`,
        'error'
      );
      this.renderer.blank();
      return;
    }

    const context = {
      terminal: this,
      renderer: this.renderer,
      args,
      raw,
      cwd: this.cwd,
      state: this.state,
    };

    try {
      this.hideInput();
      const result = await entry.fn(context);

      if (result) {
        if (Array.isArray(result)) {
          for (const item of result) {
            if (typeof item === 'object' && item.text) {
              this.renderer.printLine(item.text, item.class || '');
            } else {
              this.renderer.printLine(String(item));
            }
          }
        } else if (typeof result === 'string') {
          const lines = result.split('\n');
          for (const line of lines) {
            this.renderer.printLine(line);
          }
        }
      }

      this.renderer.blank();
    } catch (err) {
      this.renderer.printLine(`SYSTEM ERROR: ${err.message}`, 'error');
      this.renderer.blank();
    } finally {
      this.showInput();
    }
  }

  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme === 'green' ? '' : theme);
  }
}
