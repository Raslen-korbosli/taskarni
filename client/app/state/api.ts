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
export interface UsersResponse {
  status: string;
  users: User[];
  usersLength: number;
}
type TeamWithUserName = Team & {
  productOwner: string;
  productManger: string;
};
export interface TeamsWithUsernameResponse {
  status: string;
  teamsWithUserName: TeamWithUserName[];
  teamsWithUserNameLength: number;
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
export interface TaskDistributionResults {
  status: string;
  allUserTasks: Task[];
  length: number;
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

export interface Team {
  id: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: string;
  projectTeams?: ProjectTeam[];
  users: User[];
}
export interface ProjectTeam {
  id: number;
  teamId: number;
  projectId?: number;
  startDate?: string;
  endDate?: string;
}

export interface SearchResult {
  status: string;
  tasks: Task[];
  projects: Project[];
  users: User[];
  searchLength: number;
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
  tagTypes: ["projects", "tasks", "users", "teams"],
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
    getTasksByUser: build.query<TaskDistributionResults, number>({
      query: () => "tasks/all",
      providesTags: (result, error, userId) =>
        result?.allUserTasks
          ? result?.allUserTasks.map(({ id }) => ({ type: "tasks", id }))
          : [{ type: "tasks", id: userId }],
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
      providesTags: ["tasks", "projects"],
    }),
    getUsers: build.query<UsersResponse, void>({
      query: () => "users",
      providesTags: ["users"],
    }),
    getTeam: build.query<TeamsWithUsernameResponse, void>({
      query: () => "users",
      providesTags: ["teams"],
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
  useGetUsersQuery,
  useGetTeamQuery,
  useGetTasksByUserQuery,
} = api;
