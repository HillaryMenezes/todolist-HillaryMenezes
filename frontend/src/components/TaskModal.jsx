import { useEffect, useRef, useState } from 'react';

// mode: 'create' | 'edit'. Em "edit", `task` traz os valores iniciais.
export default function TaskModal({ mode, task, onClose, onSubmit }) {
  const isEdit = mode === 'edit';
  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState(task?.due_date?.slice(0, 10) ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('O nome da tarefa é obrigatório.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSubmit({ title: title.trim(), dueDate: dueDate || null });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal frame" role="dialog" aria-modal="true" aria-labelledby="modal-title" onSubmit={handleSubmit}>
        <h2 id="modal-title" className="gothic modal-title">
          {isEdit ? 'Edit Task' : 'Create Task'}
        </h2>

        <label className="field">
          <span>Tarefa</span>
          <input
            ref={inputRef}
            type="text"
            maxLength={255}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
        </label>

        <label className="field">
          <span>Data limite (opcional)</span>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
