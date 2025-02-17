import React, { useState } from "react";
import useDebounce from "../../hooks/debounce";
import TaskList from "../../components/TasksList";
import TasksFilterBox from "../../components/TasksFilterBox";
import { SortType, Task, TaskStatusFilterTags } from "../../types/Tasks";
import { axiosInstance } from "../../api/axiosInstance";
import useFetch from "../../hooks/useFetch";

const TaskManagementView = () => {
  const [searchKey, setSearchKey] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatusFilterTags>("All");
  const [sortBy, setSortBy] = useState<SortType>("default");

  const paramsToPassFilter = React.useMemo(() => {
    return {
      filterStatus,
      setFilterStatus,
      sortBy,
      setSortBy,
      searchTerm: searchKey,
      setSearchTerm: setSearchKey,
    };
  }, [filterStatus, searchKey, sortBy]);

  const debouncedSearch: string = useDebounce(searchKey);

  const { data, loading, error } = useFetch({
    fetchFn: () => axiosInstance("/todos"),
  });

  const filteredTasks = React.useMemo(
    () =>
      data?.data?.filter((task: Task) => {
        const matchesFilter =
          filterStatus === "All" ||
          (filterStatus === "Completed" && task.completed) ||
          (filterStatus === "Pending" && !task.completed);
        const matchesSearch = task.title
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    [data?.data, debouncedSearch, filterStatus]
  );

  const sortedTasks = React.useMemo(() => {
    if (!filteredTasks) return [];
    if (sortBy === "default") return filteredTasks;

    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTasks, sortBy]);

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

      <TasksFilterBox {...paramsToPassFilter} />

      {sortedTasks?.length > 0 ? (
        <TaskList tasks={sortedTasks} />
      ) : (
        <div>There is no task with your filters.</div>
      )}
    </>
  );
};

export default TaskManagementView;
