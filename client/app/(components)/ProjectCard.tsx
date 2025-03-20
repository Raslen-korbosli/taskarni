import { format } from "date-fns";
import { Project } from "../state/api";

export default function ProjectCard({
  project,
  searchTerm,
}: {
  project: Project;
  searchTerm: string;
}) {
  const { projectName, description: desc, endDate, startDate } = project;
  const projectNameLower = projectName.toLowerCase();
  const description = desc?.toLocaleLowerCase();
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      <p>
        <strong>Project name: </strong>
        {projectNameLower &&
        searchTerm &&
        projectNameLower.includes(searchTerm) ? (
          <>
            {projectNameLower.substring(
              0,
              projectNameLower.indexOf(searchTerm),
            )}
            <span className="bg-yellow-200 dark:bg-yellow-700">
              {projectName.substring(
                projectNameLower.indexOf(searchTerm),
                projectNameLower.indexOf(searchTerm) + searchTerm.length,
              )}
            </span>
            {projectNameLower.substring(
              projectNameLower.indexOf(searchTerm) + searchTerm.length,
            )}
          </>
        ) : projectName ? (
          projectName
        ) : (
          ""
        )}
      </p>
      <p>
        <strong>Description: </strong>
        {description &&
        searchTerm &&
        description.toLowerCase().includes(searchTerm.toLowerCase()) ? (
          <>
            {description.substring(0, description.indexOf(searchTerm))}
            <span className="bg-yellow-200 dark:bg-yellow-700">
              {description.substring(
                description.indexOf(searchTerm),
                description.indexOf(searchTerm) + searchTerm.length,
              )}
            </span>
            {description.substring(
              description.indexOf(searchTerm) + searchTerm.length,
            )}
          </>
        ) : description ? (
          description
        ) : (
          "No description provided"
        )}
      </p>

      <p>
        <strong>Start date: </strong>
        {startDate && format(new Date(startDate), "P")}{" "}
      </p>
      <p>
        <strong>Due date: </strong>
        {endDate && format(new Date(endDate), "P")}{" "}
      </p>
    </div>
  );
}
