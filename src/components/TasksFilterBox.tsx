import React from "react";
import { TaskStatusFilterTags } from "../types/Tasks";

type TasksFilterBoxProps = {
  filterStatus: TaskStatusFilterTags;
  setFilterStatus: (filter: TaskStatusFilterTags) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const TasksFilterBox: React.FC<TasksFilterBoxProps> = ({
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="filter-controls">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value as TaskStatusFilterTags)
        }
        className="select-input"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
};

export default TasksFilterBox;
