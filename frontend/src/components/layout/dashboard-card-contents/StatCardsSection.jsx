import {
  Ticket,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "./StatCard";

export function StatCardsSection({
  openTickets,
  onlineAgents,
  agents,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      <StatCard
        label="Open Tickets"
        value={String(openTickets)}
        change={-12}
        changeLabel="from yesterday"
        icon={Ticket}
        color="#3b82f6"
        bg="#eff6ff"
      />
      <StatCard
        label="Revenue MTD"
        value="$128,450"
        change={+8.3}
        changeLabel="vs last month"
        icon={TrendingUp}
        color="#22c55e"
        bg="#f0fdf4"
      />
      <StatCard
        label="Orders This Month"
        value="12"
        change={+23}
        changeLabel="vs last month"
        icon={ShoppingCart}
        color="#8b5cf6"
        bg="#f5f3ff"
      />
      <StatCard
        label="Active Agents"
        value={`${onlineAgents} / ${agents.length}`}
        change={0}
        changeLabel="all teams"
        icon={Users}
        color="#f59e0b"
        bg="#fffbeb"
      />
    </div>
  );
}
