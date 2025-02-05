"use client";
import { Task, useUpdateTaskStatusMutation } from "@/app/state/api";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AlertCircle, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
export default function BoardView({
  tasks,
  isLoading,
  error,
  setIsModelNewTaskOpen,
}: {
  tasks: Task[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  setIsModelNewTaskOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
  const [updataTaskStatus] = useUpdateTaskStatusMutation();
  const moveTask = (taskId: number, status: string) => {
    console.log(taskId);
    updataTaskStatus({ taskId: taskId, status: status });
  };
  if (isLoading) return <Loader2 className="size-8 animate-spin" />;
  if (error) return <AlertCircle className="size-8" />;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status, i) => (
          <TaskColumn
            key={i}
            status={status}
            tasks={tasks}
            moveTask={moveTask}
            setIsModelNewTaskOpen={setIsModelNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
}
