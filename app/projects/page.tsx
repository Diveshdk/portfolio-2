import { ClientPageWrapper } from "@/components/ui/ClientPageWrapper";
import { RecentProjects } from "@/components/RecentProjects";

export default function Projects() {
  return (
    <ClientPageWrapper>
      <div className="pt-8">
        <RecentProjects />
      </div>
    </ClientPageWrapper>
  );
} 