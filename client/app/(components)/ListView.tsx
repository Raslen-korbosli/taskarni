export default function ListView({
  tasks,
  isLoading,
  error,
}: {
  tasks: Task[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}) {
  return <div>list view</div>;
}
