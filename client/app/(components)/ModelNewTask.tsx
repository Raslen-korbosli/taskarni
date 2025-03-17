"use client";
import { useState } from "react";
import { useAppSelector } from "../providers/StoreProvider";
import { Priority, Status, useCreateTaskMutation } from "../state/api";
import ModelNewTaskForm from "./ModelNewTaskForm";
import { format } from "date-fns";
import { selectStyles } from "../utils";

export default function ModelNewTask({
  isOpen,
  onClose,
  status,
}: {
  isOpen: boolean;
  onClose: () => void;
  status: Status;
}) {
  const projectId = useAppSelector((state) => state.global.projectId);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.Low);

  const handleSubmit = async () => {
    if (
      !priority ||
      !tags ||
      !taskName ||
      !description ||
      !startDate ||
      !dueDate
    )
      return;
    await createTask({
      taskName,
      description,
      status,
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      dueDate: format(dueDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      tags,
      priority,
      projectId,
    });

    onClose();
    setTaskName("");
    setDescription("");
    setStartDate("");
    setDueDate("");
    setTags("");
    setPriority(Priority.Low);
  };
  const isFormValid = () => {
    return taskName && description && tags && dueDate && startDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  return (
    <div>
      <ModelNewTaskForm
        isOpen={isOpen}
        onClose={onClose}
        name="Create New Task"
      >
        <form
          className="mt-4 space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <input
            type="text"
            className={inputStyles}
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            className={inputStyles}
            placeholder={status}
            disabled
          />
          <input
            type="text"
            className={inputStyles}
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <textarea
            className={inputStyles}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="">
            <label htmlFor="priority" className="mb-2 block dark:text-white">
              Priority :{" "}
            </label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className={selectStyles}
            >
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
            <div>
              <label htmlFor="priority" className="mb-2 block dark:text-white">
                Start date :{" "}
              </label>
              <input
                type="date"
                className={inputStyles}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="priority" className="mb-2 block dark:text-white">
                End date :{" "}
              </label>
              <input
                type="date"
                className={inputStyles}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </ModelNewTaskForm>
    </div>
  );
}
