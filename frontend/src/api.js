const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3333';

async function request(path, { method = 'GET', body } = {}) {
  // Content-Type só é enviado quando há corpo: o Fastify rejeita
  // "application/json" com corpo vazio (ex.: DELETE).
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = 'Não foi possível concluir a operação.';
    try {
      message = (await res.json()).message || message;
    } catch {
      /* resposta sem JSON */
    }
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  list: (search = '') =>
    request(`/api/tasks?search=${encodeURIComponent(search)}&status=all`),
  create: (title, dueDate) =>
    request('/api/tasks', { method: 'POST', body: { title, dueDate: dueDate || null } }),
  update: (id, data) => request(`/api/tasks/${id}`, { method: 'PATCH', body: data }),
  remove: (id) => request(`/api/tasks/${id}`, { method: 'DELETE' }),
};
