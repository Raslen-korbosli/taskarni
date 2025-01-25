"use client";
import { useEffect } from "react";
import NavBar from "./(components)/NavBar";
import SideBar from "./(components)/SideBar";
import StoreProvider, { useAppSelector } from "./providers/StoreProvider";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const isSideBarCollapsed = useAppSelector((state) => {
    return state.global.isSideBarCollapsed;
  });

  const isDarkMode = useAppSelector((state) => {
    return state.global.isDarkMode;
  });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-black">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSideBarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        }`}
      >
        {!isSideBarCollapsed && <SideBar />}
      </div>
      <main
        className={`flex flex-1 flex-col bg-gray-50 transition-all duration-300 ease-in-out dark:bg-dark-bg`}
      >
        <NavBar />
        {children}
      </main>
    </div>
  );
}
export default function DashboardWrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </StoreProvider>
  );
}
