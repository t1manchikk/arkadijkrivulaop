// Простий лог для виведення повідомлень у #log
const logEl = () => document.getElementById('log');

export function addLog(text) {
  const container = logEl();
  if (!container) return;
  const p = document.createElement('div');
  const ts = new Date().toLocaleTimeString();
  p.textContent = `[${ts}] ${text}`;
  // Нові повідомлення зверху
  container.prepend(p);
}

export function clearLog() {
  const container = logEl();
  if (!container) return;
  container.textContent = '';
}
