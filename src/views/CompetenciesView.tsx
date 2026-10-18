import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  Target,
  AlertTriangle,
  Search,
  Plus,
  Filter,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const CompetenciesView: React.FC = () => {
  const { competencies, setIsAddCompetencyOpen } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('ALL');
  const [healthFilter, setHealthFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompetency, setSelectedCompetency] = useState<any | null>(null);
  const pageSize = 10;

  const totalCompetencies = competencies.length;
  const avgMastery =
    competencies.length > 0
      ? (competencies.reduce((sum, c) => sum + c.averageMastery, 0) / competencies.length).toFixed(1)
      : '78.4';
  const atRiskCount = competencies.filter((c) => c.healthStatus === 'At Risk').length;

  const filtered = competencies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = domainFilter === 'ALL' || c.domain === domainFilter;
    const matchesHealth = healthFilter === 'ALL' || c.healthStatus === healthFilter;

    return matchesSearch && matchesDomain && matchesHealth;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Competency Models & Frameworks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Define and track workforce competency frameworks, target mastery thresholds, and domain coverage.
          </p>
        </div>
        <button
          onClick={() => setIsAddCompetencyOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Competency Model</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL COMPETENCIES</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalCompetencies}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Defined frameworks</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">AVG. MASTERY RATE</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{avgMastery}%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Across all trainees</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TARGET THRESHOLD</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">70%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Minimum compliance</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">AT-RISK COMPETENCIES</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-600 tracking-tight">{atRiskCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Below threshold</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search competencies, codes, domains..."
            className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={domainFilter}
              onChange={(e) => {
                setDomainFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
            >
              <option value="ALL">All Domains</option>
              <option value="Meteorology">Meteorology</option>
              <option value="Radar Meteorology">Radar Meteorology</option>
              <option value="Atmospheric Sciences">Atmospheric Sciences</option>
              <option value="Remote Sensing">Remote Sensing</option>
              <option value="Climate Science">Climate Science</option>
              <option value="Ocean Sciences">Ocean Sciences</option>
            </select>
          </div>

          <select
            value={healthFilter}
            onChange={(e) => {
              setHealthFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Health States</option>
            <option value="Proficient">Proficient (&ge;70%)</option>
            <option value="Developing">Developing (50-69%)</option>
            <option value="At Risk">At Risk (&lt;50%)</option>
          </select>

          {(searchTerm || domainFilter !== 'ALL' || healthFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setDomainFilter('ALL');
                setHealthFilter('ALL');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Competencies Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">COMPETENCY</th>
                <th className="py-3 px-4">DOMAIN</th>
                <th className="py-3 px-4">MAPPED LEARNERS</th>
                <th className="py-3 px-4 w-60">AVG. MASTERY</th>
                <th className="py-3 px-4">HEALTH</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No competency models match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((c) => {
                  let healthBadge = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                  let barColor = 'bg-emerald-500';

                  if (c.healthStatus === 'Developing') {
                    healthBadge = 'bg-indigo-50 text-indigo-700 border border-indigo-200';
                    barColor = 'bg-indigo-600';
                  } else if (c.healthStatus === 'At Risk') {
                    healthBadge = 'bg-rose-50 text-rose-700 border border-rose-200';
                    barColor = 'bg-rose-500';
                  }

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition">
                      {/* COMPETENCY */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1 max-w-sm">
                          <div className="font-bold text-slate-900 leading-snug">
                            {c.name}
                          </div>
                          <span className="inline-block font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {c.code}
                          </span>
                        </div>
                      </td>

                      {/* DOMAIN */}
                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        {c.domain}
                      </td>

                      {/* MAPPED LEARNERS */}
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {c.mappedLearners} active
                      </td>

                      {/* AVG MASTERY */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-800">{c.averageMastery}%</span>
                            <span className="text-xs text-slate-400">Target: 70%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${barColor}`}
                              style={{ width: `${Math.min(c.averageMastery, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* HEALTH */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${healthBadge}`}>
                          {c.healthStatus}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => setSelectedCompetency(c)}
                            className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * pageSize, filtered.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{filtered.length}</span> frameworks
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              Previous
            </button>
            <span className="font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Competency Modal */}
      {selectedCompetency && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">{selectedCompetency.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedCompetency.code}</span>
              </div>
              <button
                onClick={() => setSelectedCompetency(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Domain</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedCompetency.domain}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Mapped Learners</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedCompetency.mappedLearners} active</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Average Mastery</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedCompetency.averageMastery}%</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Health Status</div>
                <div className="text-sm font-bold text-indigo-600 mt-0.5">{selectedCompetency.healthStatus}</div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCompetency(null)}
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
