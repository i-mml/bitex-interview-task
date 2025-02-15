export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type TaskStatusFilterTags = "All" | "Completed" | "Pending";
