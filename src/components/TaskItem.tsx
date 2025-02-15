import React from "react";
import { Task } from "../types/Tasks";

const TaskItem = (task: Task) => {
  return (
    <li
      key={task.id}
      className={`task-item ${
        task.completed ? "completed-task" : "pending-task"
      }`}
    >
      <span>{task.title}</span>
      <span>{task.completed ? "✅" : "❌"}</span>
    </li>
  );
};

export default TaskItem;
