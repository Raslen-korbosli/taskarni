// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { Task } from "../state/api";
// import { SerializedError } from "@reduxjs/toolkit";
// import { Dispatch, SetStateAction, useMemo, useState } from "react";
// import { AlertCircle, Loader2 } from "lucide-react";
// import { useAppSelector } from "../providers/StoreProvider";
// import {
//   Gantt,
//   Task as TaskTimeLine,
//   EventOption,
//   StylingOption,
//   ViewMode,
//   DisplayOption,
// } from "gantt-task-react";
// import "gantt-task-react/dist/index.css";
// import { format } from "date-fns";
// import Header from "./Header";
// type taskTypeItems = "task" | "milestone" | "project";
// export default function TimelineView({
//   tasks,
//   isLoading,
//   error,
//   setIsModelNewTaskOpen,
// }: {
//   tasks: Task[];
//   isLoading: boolean;
//   error: FetchBaseQueryError | SerializedError | undefined;
//   setIsModelNewTaskOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
//   const [DisplayOption, setDisplayOption] = useState<DisplayOption>({
//     locale: "en-US",
//     viewMode: ViewMode.Month,
//   });
//   const ganttTasks = useMemo(
//     () =>
//       tasks.map((task) => {
//         return {
//           start: new Date(task.startDate as string),
//           end: new Date(task.dueDate as string),
//           name: task.taskName,
//           id: String(task.id),
//           type: "task" as taskTypeItems,
//           progress: 45,

//           isDisabled: false,
//           styles: {
//             progressColor: "#ffbb54",
//             progressSelectedColor: "#ff9e0d",
//           },
//         };
//       }) || [],
//     [tasks],
//   );
//   const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
//     setDisplayOption((prev) => ({
//       ...prev,
//       viewMode: event.target.value as ViewMode,
//     }));
//   if (isLoading) return <Loader2 className="size-8 animate-spin" />;
//   if (error) return <AlertCircle className="size-8" />;

//   return (
//     <div className="px-4 xl:px-6">
//       <div className="flex flex-wrap items-center justify-center gap-2 py-5">
//         <Header name="Project task timeline" />
//         <div className="relative inline-block w-64">
//           <select
//             name=""
//             className="border-gray400 block w-full appearance-none rounded border bg-white px-4 py-2 pr-8 leading-tight hover:border-gray-500 focus:shadow focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
//             id=""
//             value={DisplayOption.viewMode}
//             onChange={handleViewModeChange}
//           >
//             <option value={ViewMode.Day}>Day</option>
//             <option value={ViewMode.Month}>Month</option>
//             <option value={ViewMode.Year}>Year</option>
//           </select>
//         </div>
//       </div>
//       <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
//         <div className="timeline">
//           <Gantt
//             tasks={ganttTasks}
//             {...DisplayOption}
//             listCellWidth="100px"
//             columnWidth={100}
//             barBackgroundColor={isDarkMode ? "#101214" : " #aeb8c2"}
//             barBackgroundSelectedColor={isDarkMode ? "#101214" : " #aeb8c2"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
