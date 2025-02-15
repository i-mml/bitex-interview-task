import React, { useState } from "react";
import useDebounce from "../../hooks/debounce";
import TaskList from "../../components/TasksList";
import TasksFilterBox from "../../components/TasksFilterBox";
import { Task, TaskStatusFilterTags } from "../../types/Tasks";
import { axiosInstance } from "../../api/axiosInstance";
import useFetch from "../../hooks/useFetch";

const TaskManagementView = () => {
  const [searchKey, setSearchKey] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatusFilterTags>("All");

  const debouncedSearch: string = useDebounce(searchKey);

  const { data, loading, error } = useFetch({
    fetchFn: () => axiosInstance("/todos"),
  });

  const filteredTasks = data?.data?.filter((task: Task) => {
    const matchesFilter =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Pending" && !task.completed);
    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <h1 className="task-title">
        Tasks Management{" "}
        {!!data?.data?.length && `(Count: ${data?.data?.length})`}
      </h1>

      <TasksFilterBox
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchTerm={searchKey}
        setSearchTerm={setSearchKey}
      />
      <TaskList tasks={filteredTasks} />
    </>
  );
};

export default TaskManagementView;
