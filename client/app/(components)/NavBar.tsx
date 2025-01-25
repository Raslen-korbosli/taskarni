"use client";
import { Menu, MoonIcon, Search, Settings, SunIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../providers/StoreProvider";
import { setIsDarkMode, setIsSideBarCollapsed } from "../state/reduxStates";
export default function NavBar() {
  const dispatch = useDispatch();
  const isSideBarCollapsed = useAppSelector((state) => {
    return state.global.isSideBarCollapsed;
  });
  const toggleNavBarCollapsed = () =>
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  const isDarkMode = useAppSelector((state) => {
    return state.global.isDarkMode;
  });
  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));
  return (
    <div className="py flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      <div className="flex items-center gap-8">
        {isSideBarCollapsed ? (
          <button onClick={toggleNavBarCollapsed}>
            <Menu
              className={`h-6 w-6 transition-all dark:text-white ${isDarkMode ? "dark:hover:text-gray-300" : "hover:text-gray-700"} `}
            />
          </button>
        ) : null}

        <div className="relative flex h-min w-[200px]">
          <Search
            className={`absolute left-1 top-1/2 mr-2 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white`}
          />
          <input
            type="search"
            placeholder="search..."
            className="w-full rounded border-none p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 transition-all">
        <button
          className={`rounded bg-gray-100 p-2 ${isDarkMode ? "dark:bg-gray-700 dark:hover:bg-gray-500" : "hover:bg-gray-200"}`}
          onClick={toggleDarkMode}
        >
          {" "}
          {isDarkMode ? (
            <MoonIcon className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <SunIcon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}{" "}
        </button>
        <Link
          href="/settings"
          className={`h-min w-min rounded bg-gray-100 p-2 ${isDarkMode ? "dark:bg-gray-700 dark:hover:bg-gray-500" : "hover:bg-gray-200"}`}
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="min-h h ml-2 mr-5 hidden min-h-8 min-w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
}
