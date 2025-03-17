"use client";
import { Status, Task } from "@/app/state/api";
import { Dispatch, SetStateAction } from "react";
import DropZone from "./DropZone";

export default function TaskColumn({
  status,
  tasks,
  moveTask,
  setIsModelNewTaskOpen,
}: {
  status: Status;
  tasks: Task[];
  moveTask: (taskId: number, status: string) => void;

  setIsModelNewTaskOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="">
      <DropZone
        moveTask={moveTask}
        tasks={tasks}
        status={status}
        setIsModelNewTaskOpen={setIsModelNewTaskOpen}
      />
    </div>
  );
}
