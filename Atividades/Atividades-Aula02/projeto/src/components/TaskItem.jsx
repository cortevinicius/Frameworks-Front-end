function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />

        <span>{task.title}</span>
      </div>

      <button
        className="delete-button"
        onClick={() => onDeleteTask(task.id)}
      >
        Excluir
      </button>
    </div>
  );
}

export default TaskItem;