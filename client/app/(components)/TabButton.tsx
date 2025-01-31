import { usePathname, useRouter } from "next/navigation";

export default function TabButton({
  name,
  icon,
  setActiveTab,
  activeTab,
}: {
  name: string;
  icon: React.ReactElement;
  activeTab: string;
  setActiveTab: (value: string) => void;
}) {
  const isActive = activeTab === name;
  const router = useRouter();
  const pathName = usePathname();
  const handleClick = () => {
    const url = new URL(pathName, window.location.origin);
    url.searchParams.set("view", name.toLocaleLowerCase());
    router.push(url.pathname + url.search);
  };

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 transition-all after:pointer-events-none after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full hover:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-50 sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-neutral-50" : ""}`}
      onClick={() => {
        handleClick();
        setActiveTab(name);
      }}
    >
      {icon}
      {name}
    </button>
  );
}
