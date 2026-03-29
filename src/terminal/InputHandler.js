export class InputHandler {
  constructor(inputEl, terminal) {
    this.input = inputEl;
    this.terminal = terminal;
    this.history = [];
    this.historyIndex = -1;
    this.tempInput = '';
    this.enabled = false;

    this.input.addEventListener('keydown', (e) => this.onKeyDown(e));

    // Keep input focused
    document.getElementById('terminal').addEventListener('click', () => {
      if (this.enabled) this.focus();
    });
  }

  enable() {
    this.enabled = true;
    this.input.disabled = false;
    this.focus();
  }

  disable() {
    this.enabled = false;
    this.input.disabled = true;
  }

  focus() {
    this.input.focus();
  }

  clear() {
    this.input.value = '';
  }

  onKeyDown(e) {
    if (!this.enabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        this.submit();
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.navigateHistory(-1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        this.navigateHistory(1);
        break;

      case 'Tab':
        e.preventDefault();
        this.tabComplete();
        break;

      case 'Escape':
        e.preventDefault();
        this.input.value = '';
        break;

      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          this.terminal.processCommand('clear');
        }
        break;
    }
  }

  submit() {
    const raw = this.input.value.trim();
    this.input.value = '';
    this.historyIndex = -1;
    this.tempInput = '';

    if (raw) {
      this.history.unshift(raw);
      if (this.history.length > 100) this.history.pop();
    }

    this.terminal.handleInput(raw);
  }

  navigateHistory(direction) {
    if (this.history.length === 0) return;

    if (this.historyIndex === -1 && direction === -1) {
      this.tempInput = this.input.value;
      this.historyIndex = 0;
    } else {
      this.historyIndex += direction === -1 ? 1 : -1;
    }

    if (this.historyIndex < -1) this.historyIndex = -1;
    if (this.historyIndex >= this.history.length) this.historyIndex = this.history.length - 1;

    if (this.historyIndex === -1) {
      this.input.value = this.tempInput;
    } else {
      this.input.value = this.history[this.historyIndex];
    }

    // Move cursor to end
    setTimeout(() => {
      this.input.selectionStart = this.input.selectionEnd = this.input.value.length;
    }, 0);
  }

  tabComplete() {
    const value = this.input.value;
    if (!value) return;

    const fsCommands = ['cd', 'ls', 'cat'];
    const parts = value.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    // Filesystem-aware completion
    if (parts.length >= 2 && fsCommands.includes(cmd)) {
      const fs = this.terminal._fs;
      if (!fs) return;

      const partial = parts.slice(1).join(' ');
      const lastSlash = partial.lastIndexOf('/');
      const dirPart = lastSlash >= 0 ? partial.substring(0, lastSlash + 1) : '';
      const filePart = lastSlash >= 0 ? partial.substring(lastSlash + 1) : partial;

      const entries = fs.getEntries(dirPart || '.', this.terminal.cwd);
      const matches = entries.filter(e =>
        e.name.toLowerCase().startsWith(filePart.toLowerCase())
      );

      if (matches.length === 1) {
        const suffix = matches[0].isDir ? '/' : '';
        this.input.value = `${cmd} ${dirPart}${matches[0].name}${suffix}`;
      } else if (matches.length > 1) {
        this.terminal.renderer.printLine(
          matches.map(e => e.name + (e.isDir ? '/' : '')).join('  '),
          'dim'
        );
      }
      return;
    }

    // Command completion
    const partial = value.toLowerCase();
    const commands = this.terminal.getCommandNames();
    const matches = commands.filter(c => c.startsWith(partial));

    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.terminal.renderer.printLine(
        matches.join('  '),
        'dim'
      );
    }
  }
}
