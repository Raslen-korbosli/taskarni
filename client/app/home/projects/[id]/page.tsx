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
  const [activeTab, setActiveTab] = useState("board");
  const { data, isLoading, error } = useGetTasksQuery({
    projectId: Number(id),
  });
  const tasks = data?.data || [];
  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {viewMode === "board" && (
        <BoardView tasks={tasks} isLoading={isLoading} error={error} />
      )}
      {viewMode === "list" && (
        <ListView tasks={tasks} isLoading={isLoading} error={error} />
      )}
      {viewMode === "timeline" && (
        <TimelineView tasks={tasks} isLoading={isLoading} error={error} />
      )}
      {viewMode === "table" && (
        <TableView tasks={tasks} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}
