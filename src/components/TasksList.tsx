import React from "react";
import { Task } from "../types/Tasks";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem {...task} key={task.id} />
      ))}
    </ul>
  );
};

export default TaskList;
