import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RechartSetup = ({ charts }) => {
  if (!charts || charts.length === 0) return null;

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => {
        return (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 bg-white"
          >
            <h4 className="font-semibold text-gray-800 mb-3">{chart.title}</h4>
            <div className="h-72">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                {/* if chart is a bar chart */}
                {chart.type === "bar" && (
                  <BarChart dataKey={chart.data}>
                    <XAxis dataKey={"name"} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={"value"} radius={[6, 6, 0, 0]}>
                      {chart.data.map((_, i) => {
                        return (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        );
                      })}
                    </Bar>
                  </BarChart>
                )}

                {/* if chart is line-chart */}
                {chart.type === "line" && (
                  <LineChart dataKey={chart.data}>
                    <XAxis dataKey={"name"} />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type={"monotone"}
                      dataKey={"value"}
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RechartSetup;
