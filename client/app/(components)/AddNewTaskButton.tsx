import { SetStateAction } from "react";

export default function AddNewTaskButton({
  setIsModelNewTaskOpen,
}: {
  setIsModelNewTaskOpen: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <div className="px-4 pb-5 pt-1">
      <button
        className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-500"
        onClick={() => setIsModelNewTaskOpen(true)}
      >
        Add new task
      </button>
    </div>
  );
}
