import { Status, Task } from "@/app/state/api";
import { format } from "date-fns";
import { EllipsisVertical, MessageSquare, Plus } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { setCurrentStatus } from "../state/reduxStates";

const DraggableTask = ({ taskId, task }: { taskId: number; task: Task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { taskId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagSplit = task.tags ? task.tags.split(",") : [];
  const startDate = task.startDate ? format(new Date(task.startDate), "P") : "";
  const dueDate = task.startDate ? format(new Date(task.dueDate), "P") : "";
  const numberOfComment = task.comments ? task.comments.length : 0;
  const PriorityTag = ({ priority }: { priority: string }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" && "bg-red-200 text-red-700"} ${priority === "Low" && "bg-blue-200 text-blue-700"} ${priority === "High" && "bg-yellow-200 text-yellow-700"} ${priority === "Medium" && "bg-green-200 text-green-700"}`}
    >
      {" "}
      {priority}
    </div>
  );
  return (
    <div
      ref={drag as (element: HTMLDivElement | null) => void}
      className={`mb-4 flex flex-col rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"} `}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileUrl}`}
          alt={`/${task.attachments[0].fileName}`}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-sm"
        />
      )}
      <div className="flex justify-between p-4 md:p-6">
        {" "}
        <div className="flex items-start gap-4">
          {" "}
          <div className="flex flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
          </div>
          <div className="flex items-center justify-center gap-2">
            {taskTagSplit.map((tag) => (
              <div
                className="rounded-full bg-blue-100 px-2 py-1 text-sm dark:text-dark-secondary"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
          <EllipsisVertical className="size-8" />
        </button>
      </div>
      <div className="p-4 md:p-6">
        {" "}
        <div className="my-3 flex justify-between">
          <h4 className="text-sm font-bold dark:text-white">
            {" "}
            {task.taskName}
          </h4>
        </div>
        <div className="text-sm text-gray-500 dark:text-neutral-500">
          {startDate && <span>{startDate}</span>}
          {dueDate && <span>-{dueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {" "}
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark"></div>
        <div className="mt-3 flex items-center justify-between">
          {" "}
          <div className="flex -space-x-2 overflow-hidden">
            {task.assignee && (
              <Image
                key={`${task.assignee.userId}`}
                src={`/${task.assignee.profilePicture}`}
                alt={`${task.assignee.username}`}
                width={30}
                height={30}
                className="size-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                key={`${task.author.userId}`}
                src={`/${task.author.profilePicture}`}
                alt={`${task.author.username}`}
                width={30}
                height={30}
                className="size-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center justify-center text-gray-500 dark:text-neutral-500">
            <MessageSquare className="size-5" />
            <span className="ml-1 dark:text-neutral-400">
              {" "}
              {numberOfComment}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function DropZone({
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { taskId: number }) => {
      moveTask(item.taskId, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const tasksPerStatusCount = tasks.filter(
    (task) => task.status === status,
  ).length;
  type StatusType = "To Do" | "Work In Progress" | "Completed" | "Under Review";

  const statusColor: Record<StatusType, string> = {
    "To Do": "#2563EB",
    "Work In Progress": " #D97706",
    Completed: "#059669",
    "Under Review": "#000000",
  };

  const dispatch = useDispatch();
  const toggleCurrentStatus = (status: Status) =>
    dispatch(setCurrentStatus(status));

  return (
    <div
      ref={drop as (element: HTMLDivElement | null) => void}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className={`mb-3 flex ${isOver ? "" : ""}`}>
        <div
          className={`w-2 rounded-s-lg`}
          style={{ backgroundColor: statusColor[status as StatusType] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {" "}
            {status}
            <span className="ml-2 flex size-6 items-center justify-center rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary">
              {tasksPerStatusCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical className="size-6" />
            </button>
            <button
              className="flex size-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => {
                toggleCurrentStatus(status);
                setIsModelNewTaskOpen(true);
              }}
            >
              {" "}
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task, i) => {
          return <DraggableTask key={i} taskId={task.id} task={task} />;
        })}
    </div>
  );
}
