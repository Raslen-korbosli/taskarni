"use client";
import { Task } from "@/app/state/api";
import { Dispatch, SetStateAction } from "react";
import DropZone from "./DropZone";

export default function TaskColumn({
  status,
  tasks,
  moveTask,
  setIsModelNewTaskOpen,
}: {
  status: string;
  tasks: Task[];
  moveTask: (taskId: number, status: string) => void;
  setIsModelNewTaskOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <DropZone
        moveTask={moveTask}
        tasks={tasks}
        status={status}
        setIsModelNewTaskOpen={setIsModelNewTaskOpen}
      />
    </div>
  );
}
