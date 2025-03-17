import { PlusSquareIcon } from "lucide-react";
import { SetStateAction } from "react";

export default function AddNewProjectButton({
  setIsModelNewProjectOpen,
}: {
  setIsModelNewProjectOpen: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <div className="">
      <button
        className="flex items-center gap-2 rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-500"
        onClick={() => setIsModelNewProjectOpen(true)}
      >
        {" "}
        <PlusSquareIcon className="size-5" />
        Add new Project
      </button>
    </div>
  );
}
