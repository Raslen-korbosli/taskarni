import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch, SetStateAction } from "react";
import { Task } from "../state/api";
import { useAppSelector } from "../providers/StoreProvider";
import { AlertCircle, Loader2 } from "lucide-react";

export default function TableView({
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
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (isLoading) return <Loader2 className="size-8 animate-spin" />;
  if (error) return <AlertCircle className="size-8" />;
  return <div>tableView</div>;
}
