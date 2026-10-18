import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Search,
  Plus,
  Filter,
  Check,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { BroadcastBanner } from '../components/announcements/BroadcastBanner';

export const TrainersView: React.FC = () => {
  const { trainers, approveTrainer, setIsInviteUserOpen } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalTrainers = trainers.length;
  const totalCourses = trainers.reduce((sum, t) => sum + t.coursesCount, 0);
  const totalLearners = trainers.reduce((sum, t) => sum + t.learnersCount, 0);
  const verifiedFaculty = trainers.filter((t) => t.status === 'Approved').length;

  const filtered = trainers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'ALL' || t.department === deptFilter;

    return matchesSearch && matchesDept;
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
            Domain Trainers Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Certified institutional trainers, assigned courses, active learners, and faculty accreditation.
          </p>
        </div>
        <button
          onClick={() => setIsInviteUserOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Trainer</span>
        </button>
      </div>

      {/* Announcements Broadcast Banner pushed to Trainers */}
      <BroadcastBanner audience="TRAINERS" />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL TRAINERS</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalTrainers}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Platform faculty</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">ASSIGNED COURSES</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalCourses}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Active curricula</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">ACTIVE LEARNERS</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalLearners}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Cumulative reach</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">VERIFIED FACULTY</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{verifiedFaculty}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Accredited instructors</div>
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
            placeholder="Search trainers by name, department, designation..."
            className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="Observational Meteorology">Observational Meteorology</option>
              <option value="Numerical Weather Prediction & NWP">Numerical Weather Prediction & NWP</option>
              <option value="Radar Meteorology & DWR Operations">Radar Meteorology & DWR Operations</option>
              <option value="Satellite Meteorology & Remote Sensing">Satellite Meteorology & Remote Sensing</option>
              <option value="Climate Science & Forecasting">Climate Science & Forecasting</option>
            </select>
          </div>

          {(searchTerm || deptFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setDeptFilter('ALL');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Trainers Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">TRAINER</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">DESIGNATION</th>
                <th className="py-3 px-4">COURSES</th>
                <th className="py-3 px-4">LEARNERS</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No trainers match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition">
                    {/* TRAINER */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 font-bold text-indigo-700 text-xs flex items-center justify-center shrink-0">
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">{t.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{t.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="py-3.5 px-4 font-medium text-slate-600 max-w-xs truncate">
                      {t.department}
                    </td>

                    {/* DESIGNATION */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {t.designation}
                    </td>

                    {/* COURSES */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.coursesCount}</span>
                      </div>
                    </td>

                    {/* LEARNERS */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.learnersCount}</span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4">
                      {t.status === 'Approved' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right">
                      {t.status === 'Pending' ? (
                        <button
                          onClick={() => approveTrainer(t.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition shadow-xs"
                        >
                          Approve
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => alert(`Viewing faculty dossier for ${t.name}`)}
                            className="font-semibold text-indigo-600 hover:text-indigo-800"
                          >
                            Profile
                          </button>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={() => alert(`Listing curricula assigned to ${t.name}`)}
                            className="font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1"
                          >
                            <span>Curricula</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </button>
                        </div>
                      )}
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
            of <span className="font-semibold text-slate-800">{filtered.length}</span> trainers
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
