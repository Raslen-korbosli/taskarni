"use client";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { Task, useGetTasksQuery } from "@/app/state/api";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function BoardView({
  tasks,
  isLoading,
  error,
}: {
  tasks: Task[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}) {
  const taskStatus = ["To do", "Work in progress", "Under review", "Completed"];
  console.log(error);
  return (
    <div>
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        tasks.map((task, i) => {
          return <div key={i}>{task.taskName}</div>;
        })
      )}
    </div>
  );
}
