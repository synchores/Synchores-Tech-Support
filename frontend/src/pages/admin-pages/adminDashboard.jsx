import { tickets, agents } from "../data/mockData";
import { AlertBanner } from "../../components/layout/dashboard-card-contents/AlertBanner";
import { StatCardsSection } from "../../components/layout/dashboard-card-contents/StatCardsSection";
import { ChartsRow } from "../../components/layout/dashboard-card-contents/ChartsRow";
import { TicketsSection } from "../../components/layout/dashboard-card-contents/TicketsSection";
import { AgentStatusSection } from "../../components/layout/dashboard-card-contents/AgentStatusSection";

export function Dashboard() {
  const openTickets = tickets.filter(
    (t) => t.status === "open" || t.status === "in-progress",
  ).length;
  const criticalTickets = tickets.filter(
    (t) => t.priority === "critical",
  ).length;
  const onlineAgents = agents.filter(
    (a) => a.status === "online" || a.status === "busy",
  ).length;

  return (
    <div className="p-3 md:p-6 flex flex-col gap-3 md:gap-6">
      <AlertBanner criticalTickets={criticalTickets} />
      <StatCardsSection
        openTickets={openTickets}
        onlineAgents={onlineAgents}
        agents={agents}
      />
      <ChartsRow />
      <TicketsSection />
      <AgentStatusSection />
    </div>
  );
}

export default Dashboard;
