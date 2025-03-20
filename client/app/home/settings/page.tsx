"use client";
import Header from "@/app/(components)/Header";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { useState } from "react";
export default function SettingsPage() {
  const projectId = useAppSelector((state) => state.global.projectId);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async () => {
    if (!tags || !taskName || !description || !startDate || !dueDate) return;

    setTaskName("");
    setDescription("");
    setStartDate("");
    setDueDate("");
    setTags("");
  };
  // const isFormValid = () => {
  //   return taskName && description && tags && dueDate && startDate;
  // };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  // return;
  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <Header name="Settings" />
      <div className="w-full max-w-2xl rounded p-4">
        <form
          className="relative mt-4 space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Username :
            </label>
            <input
              type="text"
              className={inputStyles}
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Email :
            </label>
            <input
              type="text"
              className={inputStyles}
              placeholder="Email"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Team :
            </label>
            <input
              type="text"
              className={inputStyles}
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              Role :
            </label>
            <input
              type="text"
              className={inputStyles}
              placeholder="Role"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`focus-offset-2 absolute -bottom-16 right-0 mt-4 flex justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600`}
            // disabled={!isFormValid() || isLoading}
          >
            {/* {isLoading ? "Creating..." : "Create Task"} */}
            update
          </button>
        </form>
      </div>
    </div>
  );
}
