import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  projectName: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}
export interface ProjectsResponse {
  status: string;
  data: Project[];
  length: number;
}
export interface TasksResponse {
  status: string;
  data: Task[];
  length: number;
}

export enum Status {
  ToDo = "ToDo",
  WorkInProgress = "WorkInProgress",
  UnderReview = "UnderReview",
  Completed = "Completed",
}
export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}
export interface User {
  userId: number;
  cognitoId: string;
  username: string;
  profilePicture?: string;
  teamId?: number;
  authoredTasks?: Task[];
  assignedTasks?: Task[];
  taskAssignment?: TaskAssignment[];
  attachments?: Attachment[];
  comments?: Comment[];
}
export interface TaskAssignment {
  id: number;
  userId: number;
  taskId: number;
}
export interface Comment {
  id: number;
  text: string;
  taskId: number;
  userId: number;
}
export interface Attachment {
  id: number;
  userId: number;
  taskId: number;
  fileName?: string;
  fileUrl?: string;
}
export interface SearchResult {
  status: string;
  tasks: Task[];
  projects: Project[];
  users: User[];
}
export interface Task {
  id: number;
  taskName: string;
  description?: string;
  startDate?: string;
  dueDate: string;
  priority?: Priority;
  points?: string;
  tags: string;
  status?: Status;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;
  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: "api",
  tagTypes: ["projects", "tasks"],
  endpoints: (build) => ({
    getProjects: build.query<ProjectsResponse, void>({
      query: () => "projects",
      providesTags: ["projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "post",
        body: project,
      }),
      invalidatesTags: ["projects"],
    }),
    getTasks: build.query<TasksResponse, { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        Array.isArray(result)
          ? result.map(({ taskId }) => ({ type: "tasks" as const, taskId }))
          : [{ type: "tasks" as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (newTask) => {
        return { url: "tasks", method: "post", body: newTask };
      },
      invalidatesTags: ["tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "tasks" as const, taskId: taskId },
      ],
    }),
    search: build.query<SearchResult, string>({
      query: (searchTerm) => `search?query=${searchTerm}`,
      // providesTags: (result) =>
      //   Array.isArray(result)
      //     ? result.map(({ taskId }) => ({ type: "tasks" as const, taskId }))
      //     : [{ type: "tasks" as const }],
    }),
  }),
});
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
} = api;
