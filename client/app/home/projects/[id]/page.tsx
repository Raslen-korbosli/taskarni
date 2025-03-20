"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import BoardView from "@/app/(components)/BoardView";
import ListView from "@/app/(components)/ListView";
import TimelineView from "@/app/(components)/TimelineView";
import { useGetTasksQuery } from "@/app/state/api";
import { useDispatch } from "react-redux";
import { setProjectId } from "@/app/state/reduxStates";

export default function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const viewMode = searchParams.get("view");
  const [activeTab, setActiveTab] = useState(viewMode || "");
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = useState(false);
  useEffect(() => {
    dispatch(setProjectId(Number(id)));
  }, [id, dispatch]);
  const { data, isLoading, error } = useGetTasksQuery({
    projectId: Number(id),
  });
  const tasks = data?.data || [];
  return (
    <div>
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsModelNewTaskOpen={setIsModelNewTaskOpen}
      />
      {viewMode === "board" && (
        <BoardView
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          setIsModelNewTaskOpen={setIsModelNewTaskOpen}
          isModelNewTaskOpen={isModelNewTaskOpen}
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
        <TimelineView tasks={tasks} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}
