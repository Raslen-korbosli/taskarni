import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch, SetStateAction } from "react";
import { Task } from "../state/api";

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
  return <div>tableView</div>;
}
