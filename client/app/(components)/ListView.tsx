import { Dispatch, SetStateAction } from "react";
import { Task } from "../state/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { AlertCircle, Loader2 } from "lucide-react";
import Header from "./Header";
import TaskCardListView from "./TaskCardListView";

export default function ListView({
  tasks,
  isLoading,
  error,
}: {
  tasks: Task[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  setIsModelNewTaskOpen: Dispatch<SetStateAction<boolean>>;
}) {
  if (isLoading) return <Loader2 className="size-8 animate-spin" />;
  if (error) return <AlertCircle className="size-8" />;
  return (
    <div className="h-[calc(100vh-14.5rem)] overflow-y-scroll px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks.map((task) => (
          <TaskCardListView key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
