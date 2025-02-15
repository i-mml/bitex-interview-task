import React, { Dispatch, SetStateAction } from "react";
import { SortType, TaskStatusFilterTags } from "../types/Tasks";

type TasksFilterBoxProps = {
  filterStatus: TaskStatusFilterTags;
  setFilterStatus: (filter: TaskStatusFilterTags) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortType;
  setSortBy: Dispatch<SetStateAction<SortType>>;
};

const TasksFilterBox: React.FC<TasksFilterBoxProps> = ({
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
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

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortType)}
        className="select-input"
      >
        <option value="default">Default</option>
        <option value="status">Status</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default TasksFilterBox;
