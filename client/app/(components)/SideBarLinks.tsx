import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarLinks({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  const pathName = usePathname();
  const isActive = href === pathName;
  return (
    <Link href={href} className="w-full transition-colors">
      <div
        className={`${isActive ? "bg-gray-100 dark:bg-gray-600" : ""} relative flex cursor-pointer items-center gap-3 rounded-sm px-8 py-3 transition-all hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700`}
      >
        {" "}
        {isActive ? (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200"></div>
        ) : null}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
}
