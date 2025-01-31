"use client";
import Header from "@/app/(components)/Header";
import TabButton from "@/app/(components)/TabButton";
import { Clock, Filter, Grid3X3, List, Share2, Table } from "lucide-react";
import { Dispatch, JSX, SetStateAction } from "react";

export default function ProjectHeader({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  // const [isModelNewProjectOpen, setIsModelNewProjectOpen] = useState(false);
  interface headerNavListInterface {
    name: string;
    icon: JSX.Element;
  }
  const headerNavList: headerNavListInterface[] = [
    { name: "Board", icon: <Grid3X3 className="size-5" /> },
    { name: "List", icon: <List className="size-5" /> },
    { name: "Timeline", icon: <Clock className="size-5" /> },
    { name: "Table", icon: <Table className="size-5" /> },
  ];
  const renderedNavList = headerNavList.map((item, index) => (
    <div key={index}>
      <TabButton
        name={item.name.toLocaleLowerCase()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        icon={item.icon}
      />
    </div>
  ));
  return (
    <div className="px-4 xl:px-6">
      {/* {model new project} */}
      <div className="py-6">
        <Header name="Product design development" />
      </div>
      {/* {tabs} */}
      <div className="flex flex-col-reverse justify-between gap-2 border-y border-gray-200 py-2 dark:border-stroke-dark lg:flex-row lg:items-center">
        <div className="flex gap-2">{renderedNavList}</div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-neutral-50">
            <Filter className="size-5" />
          </button>
          <button className="text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-neutral-50">
            <Share2 className="size-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search task"
              name=""
              id=""
              className="rounded-md border py-1 pl-10 pr-3 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary"
            />
            <Grid3X3 className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
