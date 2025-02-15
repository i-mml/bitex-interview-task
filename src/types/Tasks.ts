export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type TaskStatusFilterTags = "All" | "Completed" | "Pending";
export type SortType = "default" | "status" | "title";
