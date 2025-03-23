import ReusablePriority from "@/app/(components)/ReusablePriorityPage";
import { Priority } from "@/app/state/api";

export default function page() {
  return <ReusablePriority priority={Priority.Backlog} />;
}
