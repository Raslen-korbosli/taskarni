"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../(components)/Header";
import { useAppSelector } from "../providers/StoreProvider";
import {
  Priority,
  Project,
  useGetProjectsQuery,
  useGetTasksDistributionQuery,
} from "../state/api";
import { dataGridClassNames, dataGridSxStyles } from "../utils";

export default function Home() {
  const projectId = useAppSelector((state) => state.global.projectId);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasksDistributions,
    isLoading: isLoadingTasks,
    error: tasksError,
  } = useGetTasksDistributionQuery();
  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: projectError,
  } = useGetProjectsQuery();
  if (isLoadingTasks || isLoadingProjects) return <p> Loading ...</p>;
  if (tasksError || projectError) return <p> Error getting data </p>;
  const countPriority =
    tasksDistributions?.allTasksDistributions.reduce(
      (acc: Record<string, number>, task) => {
        const { priority } = task;

        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
        return acc;
      },
      {},
    ) || {};
  const taskDistribution = Object.keys(countPriority).map((key) => ({
    name: key,
    count: countPriority[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };
  const taskColumns: GridColDef[] = [
    { field: "taskName", headerName: "task name", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
  ];
  const countStatus =
    projects?.data.reduce((acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {}) || {};
  const projectStatus = Object.keys(countStatus).map((key) => ({
    name: key,
    status: countStatus[key],
  }));
  console.log(projectStatus);

  return (
    <div className="max-h-[calc(100vh-64px)] overflow-y-auto p-8 pt-10">
      <Header name="Project Management dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            {" "}
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={taskDistribution}>
              {" "}
              <CartesianGrid
                strokeDasharray={"3 3"}
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{ width: "min-content", height: "min-content" }}
              />{" "}
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            {" "}
            Task Priority Status
          </h3>{" "}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="status"
                data={projectStatus}
                outerRadius={80}
                fill="#82ca9d"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Status"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasksDistributions?.allTasksDistributions}
              columns={taskColumns}
              checkboxSelection
              loading={isLoadingTasks}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
