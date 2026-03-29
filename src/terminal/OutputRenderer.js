export class OutputRenderer {
  constructor(outputEl) {
    this.output = outputEl;
    this.speed = 12; // ms per character for typewriter
    this.userScrolled = false;

    this.output.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = this.output;
      this.userScrolled = scrollTop + clientHeight < scrollHeight - 20;
    });
  }

  scrollToBottom() {
    if (!this.userScrolled) {
      this.output.scrollTop = this.output.scrollHeight;
    }
  }

  // Render a line instantly (auto-linkifies URLs)
  printLine(text, className = '') {
    const div = document.createElement('div');
    div.className = `line ${className}`.trim();

    if (/https?:\/\/\S+/.test(text)) {
      div.innerHTML = this.linkify(text);
    } else {
      div.textContent = text;
    }

    this.output.appendChild(div);
    this.scrollToBottom();
    return div;
  }

  // HTML-escape text and wrap URLs in clickable <a> tags
  linkify(text) {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped.replace(
      /https?:\/\/[^\s<>&]+/g,
      url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`
    );
  }

  // Render HTML content instantly
  printHTML(html, className = '') {
    const div = document.createElement('div');
    div.className = `line ${className}`.trim();
    div.innerHTML = html;
    this.output.appendChild(div);
    this.scrollToBottom();
    return div;
  }

  // Render a line with typewriter effect
  async typeLine(text, className = '', speed = this.speed) {
    if (speed === 0) {
      return this.printLine(text, className);
    }

    const div = document.createElement('div');
    div.className = `line ${className}`.trim();
    this.output.appendChild(div);

    for (let i = 0; i < text.length; i++) {
      div.textContent += text[i];
      this.scrollToBottom();
      if (i % 3 === 0) { // batch 3 chars per frame for performance
        await this.wait(speed);
      }
    }

    this.scrollToBottom();
    return div;
  }

  // Render multiple lines with typewriter
  async typeBlock(lines, className = '', speed = this.speed) {
    for (const line of lines) {
      await this.typeLine(line, className, speed);
    }
  }

  // Print a block of lines instantly
  printBlock(lines, className = '') {
    for (const line of lines) {
      this.printLine(line, className);
    }
  }

  // Print an empty line
  blank() {
    this.printLine('');
  }

  // Clear all output
  clear() {
    this.output.innerHTML = '';
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
