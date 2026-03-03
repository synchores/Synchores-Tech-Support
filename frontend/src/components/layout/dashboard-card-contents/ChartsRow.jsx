import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { revenueData, categoryDistribution } from "../../../pages/data/mockData";

export function ChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
      {/* Revenue Area Chart */}
      <div
        className="lg:col-span-2 rounded-lg sm:rounded-xl p-3 sm:p-5"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-5">
          <div>
            <h3
              style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}
              className="sm:text-base"
            >
              Revenue & Expenses
            </h3>
            <p
              style={{ fontSize: "11px", color: "#94a3b8" }}
              className="sm:text-xs"
            >
              Last 7 months
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <div
                className="rounded-full"
                style={{ width: 6, height: 6, background: "#3b82f6" }}
              />
              <span
                style={{ fontSize: "10px", color: "#64748b" }}
                className="sm:text-xs"
              >
                Revenue
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="rounded-full"
                style={{ width: 6, height: 6, background: "#f87171" }}
              />
              <span
                style={{ fontSize: "10px", color: "#64748b" }}
                className="sm:text-xs"
              >
                Expenses
              </span>
            </div>
          </div>
        </div>
        <ResponsiveContainer
          width="100%"
          height={180}
          debounce={200}
          minWidth={200}
        >
          <AreaChart
            data={revenueData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              dot={{ fill: "#3b82f6", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#f87171"
              strokeWidth={2}
              fill="url(#colorExpenses)"
              dot={{ fill: "#f87171", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Ticket Category Pie */}
      <div
        className="rounded-lg sm:rounded-xl p-3 sm:p-5"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <div className="mb-3 sm:mb-4">
          <h3
            style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}
            className="sm:text-base"
          >
            Tickets by Category
          </h3>
          <p
            style={{ fontSize: "11px", color: "#94a3b8" }}
            className="sm:text-xs"
          >
            This month
          </p>
        </div>
        <ResponsiveContainer
          width="100%"
          height={130}
          debounce={200}
          minWidth={150}
        >
          <PieChart>
            <Pie
              data={categoryDistribution}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={68}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, ""]}
              contentStyle={{
                fontSize: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1.5 mt-2">
          {categoryDistribution.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: cat.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "11px", color: "#64748b" }}>
                  {cat.name}
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {cat.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
