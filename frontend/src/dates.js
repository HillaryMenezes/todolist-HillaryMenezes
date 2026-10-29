const pad = (n) => String(n).padStart(2, '0');

// Data local de hoje no formato YYYY-MM-DD (mesmo formato que o MySQL devolve).
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isOverdue(task) {
  return !task.completed && !!task.due_date && task.due_date.slice(0, 10) < todayISO();
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}
