export default function TableView({
  tasks,
  isLoading,
  error,
}: {
  tasks: Task[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}) {
  return <div>tableView</div>;
}
