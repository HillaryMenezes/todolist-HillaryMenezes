import { CheckIcon, PencilIcon, TrashIcon } from './Icons.jsx';
import { formatDate, isOverdue } from '../dates.js';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const done = !!task.completed;
  const overdue = isOverdue(task);

  return (
    <li className={`task ${done ? 'is-done' : ''} ${overdue ? 'is-overdue' : ''}`}>
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={done ? 'Marcar como pendente' : 'Marcar como concluída'}
        className="check"
        onClick={() => onToggle(task)}
      >
        {done && <CheckIcon />}
      </button>

      <div className="task-body">
        <span className="task-title">{task.title}</span>
        {(task.due_date || overdue) && (
          <span className="task-meta">
            {task.due_date && <span className="task-date">{formatDate(task.due_date)}</span>}
            {overdue && <span className="badge">Em atraso</span>}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button type="button" className="icon-btn" aria-label={`Editar "${task.title}"`} onClick={() => onEdit(task)}>
          <PencilIcon />
        </button>
        <button type="button" className="icon-btn danger" aria-label={`Excluir "${task.title}"`} onClick={() => onDelete(task)}>
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
