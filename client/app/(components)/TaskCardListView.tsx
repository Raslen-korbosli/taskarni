import Image from "next/image";
import { Task } from "../state/api";
import { format } from "date-fns";

export default function TaskCardListView({ task }: { task: Task }) {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          {" "}
          <strong>Attachments: </strong>
          <div className="flex flex-wrap">
            <Image
              src={`/${task.attachments[0].fileUrl}`}
              alt={`/${task.attachments[0].fileUrl}`}
              width={400}
              height={200}
              className="rounded-md"
            />
          </div>
        </div>
      )}
      <p>
        <strong>ID: </strong>
        {task.id}
      </p>
      <p>
        <strong> Title: </strong>
        {task.taskName || ""}{" "}
      </p>
      <p>
        <strong>Description: </strong>
        {task.description || "No description provided"}{" "}
      </p>
      <p>
        <strong>Status: </strong>
        {task.status || ""}{" "}
      </p>
      <p>
        <strong>Start date: </strong>
        {task.startDate && format(new Date(task.startDate), "P")}{" "}
      </p>
      <p>
        <strong>Due date: </strong>
        {task.dueDate && format(new Date(task.dueDate), "P")}{" "}
      </p>
      <p>
        <strong>Author: </strong>
        {task.author ? task.author.username : " Unknown"}{" "}
      </p>
      <p>
        <strong>Assignee: </strong>
        {task.assignee ? task.assignee.username : " Unassigned"}{" "}
      </p>
    </div>
  );
}
