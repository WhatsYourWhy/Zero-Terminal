// CRT effects are handled via CSS (.scanlines in index.html)
// This module adds dynamic effects if needed in the future
export function initCRT() {
  // Scanlines are already in the DOM via index.html
  // Add a subtle screen jitter on long intervals
  setInterval(() => {
    const terminal = document.getElementById('terminal');
    terminal.style.transform = `translate(${Math.random() * 0.5 - 0.25}px, ${Math.random() * 0.5 - 0.25}px)`;
    setTimeout(() => {
      terminal.style.transform = 'none';
    }, 50);
  }, 8000);
}
