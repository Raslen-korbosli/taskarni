"use client";

import Header from "@/app/(components)/Header";
import ProjectCard from "@/app/(components)/ProjectCard";
import TaskCardListView from "@/app/(components)/TaskCardListView";
import { useSearchQuery } from "@/app/state/api";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  // const handleSearch = debounce(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchTerm(event.target.value);
  //   },
  //   500,
  // );

  // useEffect(() => {
  //   return handleSearch.cancel;
  // }, [handleSearch.cancel]);
  console.log(searchResults);
  return (
    <div className="h-[calc(100vh-64px)] p-8">
      <Header name="Search " />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="mb-6 w-1/2 rounded border p-3 text-dark-secondary shadow"
          onChange={(event) => setSearchTerm(event.target.value || "")}
        />
      </div>
      <div className="h-[calc(100vh-222px)] overflow-y-auto p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div className="">
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCardListView
                key={task.id}
                task={task}
                searchTerm={searchTerm.toLowerCase()}
              />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                searchTerm={searchTerm}
              />
            ))}

            {searchResults.users && searchResults.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {/* {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
