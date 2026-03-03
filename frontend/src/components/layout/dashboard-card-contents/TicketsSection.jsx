import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { statusColors, priorityColors } from "./constants";
import { ticketVolumeData, tickets } from "../../../pages/data/mockData";

export function TicketsSection() {
  const recentTickets = tickets.slice(0, 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
      {/* Ticket Volume */}
      <div
        className="rounded-lg sm:rounded-xl p-3 sm:p-5"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <div className="mb-3 sm:mb-4">
          <h3
            style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}
            className="sm:text-base"
          >
            Weekly Volume
          </h3>
          <p
            style={{ fontSize: "11px", color: "#94a3b8" }}
            className="sm:text-xs"
          >
            Last 7 days
          </p>
        </div>
        <ResponsiveContainer
          width="100%"
          height={160}
          debounce={200}
          minWidth={200}
        >
          <BarChart data={ticketVolumeData} barSize={10} barGap={2}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="open"
              name="Open"
              fill="#3b82f6"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="inProgress"
              name="In Progress"
              fill="#f59e0b"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="resolved"
              name="Resolved"
              fill="#22c55e"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-4 mt-2">
          {[
            ["#3b82f6", "Open"],
            ["#f59e0b", "In Progress"],
            ["#22c55e", "Resolved"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1">
              <div
                className="rounded-full"
                style={{ width: 7, height: 7, background: color }}
              />
              <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tickets */}
      <div
        className="lg:col-span-2 rounded-lg sm:rounded-xl overflow-hidden"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4"
          style={{ borderBottom: "1px solid #f1f5f9" }}
        >
          <div>
            <h3
              style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}
              className="sm:text-base"
            >
              Recent Tickets
            </h3>
            <p
              style={{ fontSize: "11px", color: "#94a3b8" }}
              className="sm:text-xs"
            >
              Latest requests
            </p>
          </div>
          <a
            href="/tickets"
            style={{
              fontSize: "11px",
              color: "#3b82f6",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="sm:text-sm whitespace-nowrap"
          >
            View all <ArrowRight size={12} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "320px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #f8fafc" }}>
                {["ID", "Title", "Priority", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: "10px",
                      color: "#94a3b8",
                      fontWeight: 600,
                      textAlign: "left",
                      padding: "6px 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      background: "#fafafa",
                    }}
                    className="sm:text-xs sm:px-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((t, i) => {
                const s = statusColors[t.status];
                const p = priorityColors[t.priority];
                return (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom:
                        i < recentTickets.length - 1
                          ? "1px solid #f8fafc"
                          : "none",
                    }}
                    className="hover:bg-slate-50 transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    <td
                      style={{
                        padding: "6px 8px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#3b82f6",
                      }}
                      className="sm:text-sm sm:px-4"
                    >
                      {t.id}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        fontSize: "11px",
                        color: "#1e293b",
                        maxWidth: "120px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      className="sm:text-sm sm:px-4 sm:max-w-xs"
                    >
                      {t.title}
                    </td>
                    <td style={{ padding: "6px 8px" }} className="sm:px-4">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs sm:text-xs"
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          background: p.bg,
                          color: p.color,
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                          display: "inline-block",
                        }}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td style={{ padding: "6px 8px" }} className="sm:px-4">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 rounded-full text-xs sm:text-xs"
                        style={{
                          fontSize: "9px",
                          fontWeight: 600,
                          background: s.bg,
                          color: s.color,
                          whiteSpace: "nowrap",
                          display: "inline-block",
                        }}
                      >
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
