"use client";
import { useSearchParams } from "next/navigation";
import { use, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import BoardView from "@/app/(components)/BoardView";
import ListView from "@/app/(components)/ListView";
import TimelineView from "@/app/(components)/TimelineView";
import TableView from "@/app/(components)/TableView";
import { useGetTasksQuery } from "@/app/state/api";

export default function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("view");
  const [activeTab, setActiveTab] = useState(viewMode || "");
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = useState(false);
  const { data, isLoading, error } = useGetTasksQuery({
    projectId: Number(id),
  });
  const tasks = data?.data || [];
  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {viewMode === "board" && (
        <BoardView
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          setIsModelNewTaskOpen={setIsModelNewTaskOpen}
        />
      )}
      {viewMode === "list" && (
        <ListView
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          setIsModelNewTaskOpen={setIsModelNewTaskOpen}
        />
      )}
      {viewMode === "timeline" && (
        <TimelineView
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          setIsModelNewTaskOpen={setIsModelNewTaskOpen}
        />
      )}
      {viewMode === "table" && (
        <TableView
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          setIsModelNewTaskOpen={setIsModelNewTaskOpen}
        />
      )}
    </div>
  );
}
