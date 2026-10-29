import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from './api.js';
import { useDebounce } from './hooks/useDebounce.js';
import TaskItem from './components/TaskItem.jsx';
import TaskModal from './components/TaskModal.jsx';
import { BatIcon } from './components/Icons.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // { mode, task? }

  const debouncedSearch = useDebounce(search.trim(), 400);
  const requestId = useRef(0);

  // Recarrega a lista; ignora respostas antigas se outra busca já foi disparada.
  const load = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const data = await api.list(debouncedSearch);
      if (id !== requestId.current) return;
      setTasks(data.tasks);
      setTotal(data.total);
      setCompleted(data.completed);
      setError('');
    } catch {
      if (id === requestId.current) {
        setError('Não foi possível carregar as tarefas. Verifique se o servidor está rodando.');
      }
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    load();
  }, [load]);

  async function run(action) {
    try {
      await action();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const toggle = (task) => run(() => api.update(task.id, { completed: !task.completed }));

  const remove = (task) => {
    if (window.confirm(`Excluir "${task.title}"?`)) run(() => api.remove(task.id));
  };

  async function submitModal({ title, dueDate }) {
    if (modal.mode === 'edit') await api.update(modal.task.id, { title, dueDate });
    else await api.create(title, dueDate);
    setModal(null);
    await load();
  }

  const closeModal = useCallback(() => setModal(null), []);
  const pending = total - completed;
  const isSearching = debouncedSearch !== '';

  return (
    <main className="stage">
      <section className="frame board">
        <div className="crest" aria-hidden="true"><BatIcon size={90} /></div>

        <h1 className="gothic title"><span className="star">✦</span> To Do List <span className="star">✦</span></h1>
        <div className="divider" aria-hidden="true"><i /></div>

        <div className="toolbar">
          <input
            type="search"
            className="search"
            placeholder="Search tasks..."
            aria-label="Buscar tarefas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="btn" onClick={() => setModal({ mode: 'create' })}>Add</button>
        </div>

        <h2 className="gothic subtitle">Task List</h2>

        {error && <p className="banner" role="alert">{error}</p>}

        {loading ? (
          <p className="empty">Loading…</p>
        ) : tasks.length === 0 ? (
          <p className="empty">
            {isSearching ? 'No tasks match your search.' : 'You have no pending tasks.'}
          </p>
        ) : (
          <ul className="list">
            {tasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onToggle={toggle}
                onEdit={(task) => setModal({ mode: 'edit', task })}
                onDelete={remove}
              />
            ))}
          </ul>
        )}

        <div className="footer-ornament" aria-hidden="true"><BatIcon size={44} /></div>
        <p className="counters">
          <span className="star">✦</span> Completed: {completed} <b>|</b> Uncompleted: {pending} <span className="star">✦</span>
        </p>
      </section>

      <button type="button" className="fab" aria-label="Criar tarefa" onClick={() => setModal({ mode: 'create' })}>+</button>

      {modal && <TaskModal mode={modal.mode} task={modal.task} onClose={closeModal} onSubmit={submitModal} />}
    </main>
  );
}
