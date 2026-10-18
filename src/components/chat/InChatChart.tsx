import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartPayload } from './knowledgeEngine';
import { TrendingUp, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface InChatChartProps {
  payload: ChartPayload;
}

export const InChatChart: React.FC<InChatChartProps> = ({ payload }) => {
  const { title, subtitle, data, metrics, domainKeys, type } = payload;

  return (
    <div className="mt-3.5 bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-md">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL METRIC TELEMETRY</span>
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Summary KPI Badges */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 flex flex-col justify-between"
            >
              <span className="text-[10px] font-semibold text-slate-400 truncate">{m.label}</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-extrabold text-white tracking-tight">{m.value}</span>
              </div>
              {m.change && (
                <span
                  className={`text-[9px] font-bold mt-0.5 flex items-center gap-0.5 ${
                    m.positive !== false ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  {m.change}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Visual Recharts Container */}
      <div className="h-56 sm:h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
            <XAxis
              dataKey={type === 'horizontal-bar' ? 'topic' : 'domain'}
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#475569' }}
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '12px',
                fontSize: '11px',
                color: '#f8fafc',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
              itemStyle={{ color: '#e2e8f0', fontSize: '11px' }}
              labelStyle={{ fontWeight: 'bold', color: '#818cf8', marginBottom: '4px' }}
              formatter={(value: any, name: any) => [`${value}%`, name]}
            />
            {domainKeys && domainKeys.length > 1 && (
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '8px', fontSize: '10px' }}
              />
            )}
            {domainKeys ? (
              domainKeys.map((dk) => (
                <Bar
                  key={dk.key}
                  dataKey={dk.key}
                  name={dk.label}
                  fill={dk.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              ))
            ) : (
              <Bar dataKey="today" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3 h-3" /> Real-time verification from live database
        </span>
        <span className="font-mono text-slate-400">Synced to MoES Admin Core</span>
      </div>
    </div>
  );
};
