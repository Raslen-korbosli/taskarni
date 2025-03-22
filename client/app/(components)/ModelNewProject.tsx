"use client";
import { useState } from "react";
import { useCreateProjectMutation } from "../state/api";
import ModelNewProjectForm from "./ModelNewProjectForm";
import { format } from "date-fns";

export default function ModelNewProject({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !projectDescription || !startDate || !endDate) return;
    await createProject({
      description: projectDescription,
      endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      projectName: projectName,
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    });
    onClose();
    setProjectName("");
    setProjectDescription("");
    setStartDate("");
    setEndDate("");
  };
  const isFormValid = () => {
    return projectName && projectDescription;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  return (
    <div>
      <ModelNewProjectForm
        isOpen={isOpen}
        onClose={onClose}
        name="Create New Project"
      >
        <form
          className="mt-4 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className={inputStyles}
            placeholder="Title"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <textarea
            className={inputStyles}
            placeholder="Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
            <select
              className={selectStyles}
              value={status}
              onChange={(e) =>
                setStatus(Status[e.target.value as keyof typeof Status])
              }
            >
              <option value="">Select Status</option>
              <option value={Status.ToDo}>To Do</option>
              <option value={Status.WorkInProgress}>Work In Progress</option>
              <option value={Status.UnderReview}>Under Review</option>
              <option value={Status.Completed}>Completed</option>
            </select>
            <select
              className={selectStyles}
              value={priority}
              onChange={(e) =>
                setPriority(Priority[e.target.value as keyof typeof Priority])
              }
            >
              <option value="">Select Priority</option>
              <option value={Priority.Urgent}>Urgent</option>
              <option value={Priority.High}>High</option>
              <option value={Priority.Medium}>Medium</option>
              <option value={Priority.Low}>Low</option>
              <option value={Priority.Backlog}>Backlog</option>
            </select>
          </div> */}
          {/* <input
            type="text"
            className={inputStyles}
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          /> */}

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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          {/* <input
            type="text"
            className={inputStyles}
            placeholder="Author User ID"
            value={authorUserId}
            onChange={(e) => setAuthorUserId(e.target.value)}
          /> */}
          {/* <input
            type="text"
            className={inputStyles}
            placeholder="Assigned User ID"
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}
          /> */}
          {/* {id === null && (
            <input
              type="text"
              className={inputStyles}
              placeholder="ProjectId"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          )} */}
          <button
            type="submit"
            className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? "Creating..." : "Create Projects"}
          </button>
        </form>
      </ModelNewProjectForm>
    </div>
  );
}
