import { ClientPageWrapper } from "@/components/ui/ClientPageWrapper";
import { HackathonProjects } from "@/components/HackathonProjects";

export default function Hackathons() {
  return (
    <ClientPageWrapper>
      <div className="pt-8">
        <HackathonProjects />
      </div>
    </ClientPageWrapper>
  );
}