"use client";

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  Lock,
  LucideIcon,
  Search,
  Settings,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../providers/StoreProvider";
import { setIsSideBarCollapsed } from "../state/reduxStates";
import SideBarLinks from "./SideBarLinks";
import { useState } from "react";
import { useGetProjectsQuery } from "@/app/state/api";
// import { useState } from "react";

export default function SideBar() {
  const dispatch = useDispatch();
  const isSideBarCollapsed = useAppSelector((state) => {
    return state.global.isSideBarCollapsed;
  });
  const toggleNavBarCollapsed = () =>
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  const isDarkMode = useAppSelector((state) => {
    return state.global.isDarkMode;
  });
  interface menuOptionInterface {
    href: string;
    label: string;
    icon: LucideIcon;
  }
  const menuOptions: menuOptionInterface[] = [
    {
      href: "/home",
      label: "Home",
      icon: Home,
    },

    {
      href: "/home/search",
      label: "Search",
      icon: Search,
    },
    {
      href: "/home/settings",
      label: "Settings",
      icon: Settings,
    },
    {
      href: "/home/teams",
      label: "Teams",
      icon: Users,
    },
    {
      href: "/home/users",
      label: "Users",
      icon: User,
    },
  ];
  const menuPriority: menuOptionInterface[] = [
    {
      href: "/home/priority/urgent",
      label: "Urgent",
      icon: AlertCircle,
    },
    {
      href: "/home//priority/high",
      label: "High",
      icon: Shield,
    },
    {
      href: "/home/priority/medium",
      label: "Medium",
      icon: AlertTriangle,
    },
    {
      href: "/home/priority/low",
      label: "Low",
      icon: AlertOctagon,
    },
    {
      href: "/home/priority/backlog",
      label: "Backlog",
      icon: Layers3,
    },
  ];
  const { data } = useGetProjectsQuery();
  const projects = data?.data;

  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const sideBarClassNames = ` fixed flex flex-col h-full justify-between shadow-xl  duration-300 z-40 overflow-y-auto dark:bg-black bg-white w-64`;
  return (
    <div className={sideBarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        <div className="z-50 flex min-h-14 w-64 items-center justify-between bg-white px-6 dark:bg-black">
          <div className="flex items-center justify-center gap-1 text-xl font-bold text-gray-800 dark:text-white">
            <Image src="/logo.png" alt="Taskarni Logo" width={30} height={30} />
            Taskarni
          </div>
          <button>
            <X
              onClick={toggleNavBarCollapsed}
              className={`h-6 w-6 transition-all dark:text-white ${isDarkMode ? "dark:hover:text-gray-300" : "hover:text-gray-700"} `}
            />
          </button>
        </div>
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/RTeam.png" alt="team Logo" width={40} height={40} />
          <div>
            {" "}
            <h3 className="txt-md font-bold tracking-wide dark:text-gray-200">
              {" "}
              Raslen Team
            </h3>
            <div className="i flex items-center gap-1 text-xs text-gray-500">
              <Lock className="mt-[0.1rem] h-3 w-3 dark:text-gray-400" />{" "}
              <p>Private</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {menuOptions.map((menu, i) => (
            <SideBarLinks
              href={menu.href}
              icon={menu.icon}
              label={menu.label}
              key={i}
            />
          ))}
          {/* {projects} */}
          <button
            onClick={() => setShowProjects((prv) => !prv)}
            className="flex w-full items-center justify-between px-8 py-3 font-normal text-gray-600"
          >
            <span className="text-gray-700 dark:text-gray-100">Projects</span>
            {showProjects ? (
              <ChevronDown className="h-6 w-6 text-gray-700 dark:text-gray-100" />
            ) : (
              <ChevronUp className="h-6 w-6 text-gray-700 dark:text-gray-100" />
            )}
          </button>
          {showProjects &&
            projects &&
            projects.map((project) => (
              <SideBarLinks
                href={`/home/projects/${project.id}`}
                icon={Briefcase}
                label={project.projectName}
                key={project.id}
              />
            ))}
          {/* {priority} */}
          <button
            onClick={() => setShowPriority((prv) => !prv)}
            className="flex w-full items-center justify-between px-8 py-3 font-normal text-gray-600"
          >
            <span className="text-gray-700 dark:text-gray-100">Priority</span>
            {showPriority ? (
              <ChevronDown className="h-6 w-6 text-gray-700 dark:text-gray-100" />
            ) : (
              <ChevronUp className="h-6 w-6 text-gray-700 dark:text-gray-100" />
            )}
          </button>
          {showPriority &&
            menuPriority.map((menu, i) => (
              <SideBarLinks
                href={menu.href}
                icon={menu.icon}
                label={menu.label}
                key={i}
              />
            ))}
        </nav>
      </div>
    </div>
  );
}
