import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Users,
  Compass,
  Search,
  Plus,
  Filter,
  Layers,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const CoursesView: React.FC = () => {
  const { courses, setIsCreateCourseOpen } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Stats calculation
  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.status === 'Published').length;
  const totalLearners = courses.reduce((acc, c) => acc + c.learners, 0);
  const uniqueDomains = new Set(courses.map((c) => c.domain)).size;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.codeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = domainFilter === 'ALL' || course.domain === domainFilter;
    const matchesDifficulty = difficultyFilter === 'ALL' || course.difficulty === difficultyFilter;

    return matchesSearch && matchesDomain && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredCourses.length / pageSize) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Courses & Training Curricula
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage institutional training modules, domain coverage, difficulty levels, and enrollment status.
          </p>
        </div>
        <button
          onClick={() => setIsCreateCourseOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Course</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL COURSES</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalCourses}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Platform curricula</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">PUBLISHED</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{publishedCourses}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Active & accessible</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL LEARNERS</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalLearners}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Cumulative enrollments</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">DOMAINS COVERED</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{uniqueDomains}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Scientific disciplines</div>
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
            placeholder="Search by title, domain, or instructor..."
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
              <option value="Synoptic Meteorology & Operational Forecasting">Synoptic Meteorology</option>
              <option value="Observational Systems">Observational Systems</option>
              <option value="Operational Applications">Operational Applications</option>
              <option value="Observation & Instrumentation">Observation & Instrumentation</option>
              <option value="Climate Science">Climate Science</option>
              <option value="Remote Sensing">Remote Sensing</option>
              <option value="Atmospheric Sciences">Atmospheric Sciences</option>
            </select>
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Difficulties</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
            <option value="EXPERT">EXPERT</option>
          </select>

          {(searchTerm || domainFilter !== 'ALL' || difficultyFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setDomainFilter('ALL');
                setDifficultyFilter('ALL');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">COURSE</th>
                <th className="py-3 px-4">INSTRUCTOR</th>
                <th className="py-3 px-4">DIFFICULTY</th>
                <th className="py-3 px-4">LEARNERS</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedCourses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No curriculum modules match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedCourses.map((course) => {
                  let diffBadge = 'bg-amber-50 text-amber-700 border border-amber-200';
                  if (course.difficulty === 'ADVANCED') {
                    diffBadge = 'bg-purple-50 text-purple-700 border border-purple-200';
                  } else if (course.difficulty === 'EXPERT') {
                    diffBadge = 'bg-rose-50 text-rose-700 border border-rose-200';
                  }

                  return (
                    <tr key={course.id} className="hover:bg-slate-50/70 transition">
                      {/* COURSE */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 leading-snug">
                              {course.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              {course.codeId}
                            </span>
                            <span className="text-slate-500">• {course.domain}</span>
                          </div>
                        </div>
                      </td>

                      {/* INSTRUCTOR */}
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {course.instructor}
                      </td>

                      {/* DIFFICULTY */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diffBadge}`}>
                          {course.difficulty}
                        </span>
                      </td>

                      {/* LEARNERS */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.learners}</span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4">
                        {course.status === 'Published' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                            Draft
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => alert(`Opening syllabus editor for: ${course.title}`)}
                            className="font-semibold text-indigo-600 hover:text-indigo-800"
                          >
                            Edit
                          </button>
                          <span className="text-slate-300">•</span>
                          <button
                            onClick={() => alert(`Launching curriculum view for: ${course.title}`)}
                            className="font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1"
                          >
                            <span>Curriculum</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
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
              {Math.min(currentPage * pageSize, filteredCourses.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{filteredCourses.length}</span> courses
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
