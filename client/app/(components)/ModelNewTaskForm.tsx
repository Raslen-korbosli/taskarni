import ReactDOM from "react-dom";
import Header from "./Header";
import { X } from "lucide-react";
export default function ModelNewTaskForm({
  isOpen,
  onClose,
  name,
  children,
}: {
  isOpen: boolean;
  name: string;
  children?: React.ReactNode;
  onClose: () => void;
}) {
  if (!isOpen) return;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          isSmallText
          name={name}
          buttonComponent={
            <button
              className="flex size-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-500"
              onClick={onClose}
            >
              {" "}
              <X size={18} />{" "}
            </button>
          }
        />
        {children}
      </div>
    </div>,
    document.body,
  );
}
