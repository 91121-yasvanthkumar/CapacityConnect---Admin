import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Award,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [range, setRange] = useState<'30D' | '90D' | 'YTD'>('90D');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const domainReadiness = [
    { domain: 'Synoptic Meteorology', current: 78, target: 70 },
    { domain: 'Numerical Weather Prediction', current: 68, target: 70 },
    { domain: 'Radar Meteorology & DWR', current: 74, target: 70 },
    { domain: 'Satellite Meteorology', current: 82, target: 70 },
    { domain: 'Climate Science & Forecasting', current: 71, target: 70 },
    { domain: 'Ocean State Forecasting', current: 64, target: 70 },
  ];

  const departmentReadiness = [
    {
      name: 'Observational Meteorology',
      learners: 11,
      attainment: 78,
      completedCurricula: 28,
      status: 'Meets Target',
    },
    {
      name: 'Numerical Weather Prediction & NWP',
      learners: 8,
      attainment: 68,
      completedCurricula: 19,
      status: 'Action Required',
    },
    {
      name: 'Radar Meteorology & DWR Operations',
      learners: 6,
      attainment: 74,
      completedCurricula: 16,
      status: 'Meets Target',
    },
    {
      name: 'Satellite Meteorology & Remote Sensing',
      learners: 4,
      attainment: 82,
      completedCurricula: 12,
      status: 'Exceeds Target',
    },
    {
      name: 'Climate Science & Forecasting',
      learners: 2,
      attainment: 71,
      completedCurricula: 7,
      status: 'Meets Target',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Analytics Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive workforce training analytics, competency coverage, engagement trends, and institutional benchmarking.
          </p>
        </div>

        <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex text-xs font-semibold text-slate-600 self-start md:self-auto">
          <button
            onClick={() => setRange('30D')}
            className={`px-3 py-1.5 rounded-md transition ${
              range === '30D' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setRange('90D')}
            className={`px-3 py-1.5 rounded-md transition ${
              range === '90D' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Last 90 Days
          </button>
          <button
            onClick={() => setRange('YTD')}
            className={`px-3 py-1.5 rounded-md transition ${
              range === 'YTD' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Year to Date
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">OVERALL READINESS</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">78.4%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Target threshold: 70%</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 3.2% vs last quarter</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TRAINING COMPLETION</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">82.6%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">18 active cohorts</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 5.1% completion rate</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL STUDY HOURS</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">1,420 hrs</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Logged across LMS</div>
          <div className="text-xs font-semibold text-slate-500 mt-2">
            78.8 hrs/learner avg
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">RETENTION HEALTH</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">91.4%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Spaced repetition metric</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ Optimal stability</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Curriculum Completion vs Target */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">
                Curriculum Completion vs Target Threshold
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> Current
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2.5 h-0.5 bg-rose-500"></span> Target (70%)
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Attainment comparison across key meteorological operational disciplines
          </p>

          <div className="space-y-4">
            {domainReadiness.map((item) => (
              <div key={item.domain} className="space-y-1.5 p-2 rounded-xl hover:bg-slate-50/60 transition">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.domain}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">Target: {item.target}%</span>
                    <span
                      className={`font-bold ${
                        item.current >= item.target ? 'text-indigo-600' : 'text-amber-600'
                      }`}
                    >
                      {item.current}%
                    </span>
                  </div>
                </div>
                <div className="relative w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.current >= item.target ? 'bg-indigo-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.current}%` }}
                  ></div>
                  {/* Threshold marker line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
                    style={{ left: `${item.target}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learner Engagement by Department */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-slate-900">Learner Distribution</h3>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Workforce distribution across functional centers
            </p>

            <div className="space-y-4">
              {[
                { dept: 'Observational Meteorology', pct: 35, count: '11 staff', color: 'bg-indigo-600' },
                { dept: 'Numerical Weather Prediction', pct: 26, count: '8 staff', color: 'bg-blue-500' },
                { dept: 'Radar Meteorology', pct: 19, count: '6 staff', color: 'bg-emerald-500' },
                { dept: 'Satellite Meteorology', pct: 13, count: '4 staff', color: 'bg-amber-500' },
                { dept: 'Climate Science', pct: 7, count: '2 staff', color: 'bg-purple-500' },
              ].map((d) => (
                <div key={d.dept} className="space-y-1.5 p-1.5 rounded-xl hover:bg-slate-50/60 transition">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 truncate max-w-[170px]">{d.dept}</span>
                    <span className="font-bold text-slate-900">{d.count} ({d.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-slate-400 flex items-center justify-between">
            <span>National Centers Reporting</span>
            <span className="font-semibold text-slate-700">100% Verified</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Department Readiness Index Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Institutional Department Readiness Index
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed breakdown of staff competency attainment and compliance standing
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">ACTIVE LEARNERS</th>
                <th className="py-3 px-4 w-48">COMPETENCY ATTAINMENT</th>
                <th className="py-3 px-4">CURRICULA COMPLETED</th>
                <th className="py-3 px-4">STATUS / COMPLIANCE</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {departmentReadiness.map((d) => (
                <tr key={d.name} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {d.name}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {d.learners} trainees
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>{d.attainment}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            d.attainment >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${d.attainment}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {d.completedCurricula} modules
                  </td>
                  <td className="py-3.5 px-4">
                    {d.status === 'Exceeds Target' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Exceeds Target
                      </span>
                    )}
                    {d.status === 'Meets Target' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Meets Target
                      </span>
                    )}
                    {d.status === 'Action Required' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Action Required
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedDept(d.name)}
                      className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Department Modal / Drawer */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">{selectedDept}</h3>
              <button
                onClick={() => setSelectedDept(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2">
              <p>Operational analytics and curriculum completion diagnostics for this department are in active synchronization with the institutional training registry.</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span>Compliance Standing</span>
                <span className="font-bold text-emerald-600">Optimal (Pass)</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDept(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
