import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Search,
  Plus,
  Filter,
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { BroadcastBanner } from '../components/announcements/BroadcastBanner';

export const TraineesView: React.FC = () => {
  const { trainees, setIsInviteUserOpen } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalTrainees = trainees.length;
  const inProgressCount = trainees.filter((t) => t.trainingStatus === 'In Progress').length;
  const avgScore =
    trainees.length > 0
      ? Math.round(trainees.reduce((sum, t) => sum + t.competencyScore, 0) / trainees.length)
      : 70;
  const atRiskCount = trainees.filter((t) => t.riskIndicator === 'At Risk').length;

  const filtered = trainees.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || t.trainingStatus === statusFilter;
    const matchesRisk = riskFilter === 'ALL' || t.riskIndicator === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
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
            Capacity Trainees Cohort
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Active enrolled learners, training progress, competency scores, and at-risk early detection.
          </p>
        </div>
        <button
          onClick={() => setIsInviteUserOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll Trainee</span>
        </button>
      </div>

      {/* Announcements Broadcast Banner pushed to Trainees */}
      <BroadcastBanner audience="TRAINEES" />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL TRAINEES</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalTrainees}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Platform cohort</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">IN PROGRESS</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{inProgressCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Active learners</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">AVG. COMPETENCY</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{avgScore}%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Mastery benchmark</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">AT RISK</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{atRiskCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Requires intervention</div>
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
            placeholder="Search trainees by name, email, department..."
            className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
            >
              <option value="ALL">All Training Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>

          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Risk Indicators</option>
            <option value="Healthy">Healthy</option>
            <option value="At Risk">At Risk</option>
          </select>

          {(searchTerm || statusFilter !== 'ALL' || riskFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('ALL');
                setRiskFilter('ALL');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Trainees Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">TRAINEE</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">ENROLLED CURRICULA</th>
                <th className="py-3 px-4 w-52">COMPETENCY SCORE</th>
                <th className="py-3 px-4">TRAINING STATUS</th>
                <th className="py-3 px-4">RISK INDICATOR</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No trainees match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((tr) => (
                  <tr key={tr.id} className="hover:bg-slate-50/70 transition">
                    {/* TRAINEE */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 font-bold text-emerald-700 text-xs flex items-center justify-center shrink-0">
                          {tr.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">{tr.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{tr.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="py-3.5 px-4 font-medium text-slate-600 max-w-xs truncate">
                      {tr.department}
                    </td>

                    {/* ENROLLED CURRICULA */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{tr.enrolledCurricula}</span>
                      </div>
                    </td>

                    {/* COMPETENCY SCORE */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-800">{tr.competencyScore}%</span>
                          <span className="text-[10px] text-slate-400">Bench: 70%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              tr.competencyScore >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${tr.competencyScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        {tr.trainingStatus}
                      </span>
                    </td>

                    {/* RISK INDICATOR */}
                    <td className="py-3.5 px-4">
                      {tr.riskIndicator === 'Healthy' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Healthy
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          At Risk
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-xs">
                        <button
                          onClick={() => alert(`Showing individual learning pathway for ${tr.name}`)}
                          className="font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          Learning Path
                        </button>
                        <span className="text-slate-300">•</span>
                        <button
                          onClick={() => alert(`Generating competency audit report for ${tr.name}`)}
                          className="font-medium text-slate-500 hover:text-slate-800"
                        >
                          Report
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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
            of <span className="font-semibold text-slate-800">{filtered.length}</span> trainees
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              Previous
            </button>
            <span className="font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
