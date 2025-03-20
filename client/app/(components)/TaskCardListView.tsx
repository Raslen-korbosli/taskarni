import Image from "next/image";
import { Task } from "../state/api";
import { format } from "date-fns";
import React from "react";

export default function TaskCardListView({
  task,
  searchTerm,
}: {
  task: Task;
  searchTerm?: string;
}) {
  const { taskName } = task;
  const taskNameLower = taskName.toLowerCase();

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
        <strong>Task name: </strong>
        {taskNameLower && searchTerm && taskNameLower.includes(searchTerm) ? (
          <>
            {taskNameLower.substring(0, taskNameLower.indexOf(searchTerm))}
            <span className="bg-yellow-200 dark:bg-yellow-700">
              {taskName.substring(
                taskNameLower.indexOf(searchTerm),
                taskNameLower.indexOf(searchTerm) + searchTerm.length,
              )}
            </span>
            {taskNameLower.substring(
              taskNameLower.indexOf(searchTerm) + searchTerm.length,
            )}
          </>
        ) : taskName ? (
          taskName
        ) : (
          ""
        )}
      </p>
      <p>
        <strong>Description: </strong>
        {task.description &&
        searchTerm &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ? (
          <>
            {task.description.substring(
              0,
              task.description.indexOf(searchTerm),
            )}
            <span className="bg-yellow-200 dark:bg-yellow-700">
              {task.description.substring(
                task.description.indexOf(searchTerm),
                task.description.indexOf(searchTerm) + searchTerm.length,
              )}
            </span>
            {task.description.substring(
              task.description.indexOf(searchTerm) + searchTerm.length,
            )}
          </>
        ) : task.description ? (
          task.description
        ) : (
          "No description provided"
        )}
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
