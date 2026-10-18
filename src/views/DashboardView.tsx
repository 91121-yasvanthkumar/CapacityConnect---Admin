import React, { useState } from 'react';
import {
  Calendar,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Plus,
  FileCode,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const DashboardView: React.FC = () => {
  const {
    setActivePage,
    setIsInviteUserOpen,
    setIsCreateCourseOpen,
    setIsAddCompetencyOpen,
    setIsUploadResourceOpen,
    auditLogs,
    users,
  } = usePortal();

  const [dateRange, setDateRange] = useState<'30D' | '90D' | 'YTD'>('90D');
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; value: number } | null>(null);

  const pendingCount = users.filter((u) => u.status === 'Pending').length;

  // Chart data for enrollment trend
  const chartPoints = [
    { month: 'Jan', value: 12, x: 20, y: 155 },
    { month: 'Feb', value: 14, x: 85, y: 148 },
    { month: 'Mar', value: 17, x: 150, y: 135 },
    { month: 'Apr', value: 19, x: 215, y: 128 },
    { month: 'May', value: 22, x: 280, y: 110 },
    { month: 'Jun', value: 25, x: 345, y: 92 },
    { month: 'Jul', value: 27, x: 410, y: 88 },
    { month: 'Aug', value: 29, x: 475, y: 78 },
    { month: 'Sep', value: 22, x: 540, y: 118 },
  ];

  // SVG path generation
  const pathD = `M ${chartPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaD = `${pathD} L 540,180 L 20,180 Z`;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-indigo-600 uppercase mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>MOES / IMD PORTAL • INSTITUTIONAL ADMINISTRATION • National Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Governance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Institutional capacity-building overview, training operations, competency framework monitoring, and platform compliance.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Wednesday, Sep 09, 2026</span>
          </div>

          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex text-xs font-semibold text-slate-600">
            <button
              onClick={() => setDateRange('30D')}
              className={`px-2.5 py-1 rounded-md transition ${
                dateRange === '30D' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setDateRange('90D')}
              className={`px-2.5 py-1 rounded-md transition ${
                dateRange === '90D' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              90D
            </button>
            <button
              onClick={() => setDateRange('YTD')}
              className={`px-2.5 py-1 rounded-md transition ${
                dateRange === 'YTD' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              YTD
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: 6 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL PERSONNEL</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">31</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Department staff</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 4.8% vs last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">ACTIVE TRAINEES</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">18</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Enrolled learners</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>82% active</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">DOMAIN TRAINERS</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">11</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Certified instructors</div>
          <div className="text-xs font-semibold text-slate-500 mt-2">
            5 active domains
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">ACTIVE COURSES</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">22</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Curriculum modules</div>
          <div className="text-xs font-semibold text-slate-500 mt-2">
            100% published
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">PENDING APPROVALS</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{pendingCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Registrations & ops</div>
          <div className="text-xs font-semibold text-amber-600 mt-2">
            {pendingCount} review needed
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">COMPETENCY COVERAGE</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">78%</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Active frameworks</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 3.2% vs target 70%</span>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (Learner Enrollment Trend & Training Cohort Status) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Learner Enrollment Trend */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Learner Enrollment Trend</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              ↑ +166% YTD Growth
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Monthly active trainees enrolled in institutional capacity-building programs
          </p>

          <div className="relative h-48 w-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 560 190"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="40" x2="540" y2="40" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="20" y1="90" x2="540" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="20" y1="140" x2="540" y2="140" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Gradient Area */}
              <path d={areaD} fill="url(#trendGradient)" />

              {/* Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots and Labels */}
              {chartPoints.map((p) => (
                <g key={p.month} className="cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#ffffff"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    className="transition hover:r-6"
                    onMouseEnter={() => setHoveredPoint({ month: p.month, value: p.value })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <text
                    x={p.x}
                    y="175"
                    textAnchor="middle"
                    className="text-[11px] fill-slate-400 font-medium select-none"
                  >
                    {p.month}
                  </text>
                </g>
              ))}
            </svg>

            {hoveredPoint && (
              <div className="absolute top-2 right-4 bg-slate-900 text-white px-2.5 py-1 rounded-lg text-xs shadow-md">
                <span className="font-semibold">{hoveredPoint.month}: </span>
                <span>{hoveredPoint.value} active trainees</span>
              </div>
            )}
          </div>
        </div>

        {/* Training Cohort Status Donut */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Training Cohort Status</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Progress state across 18 registered learners
            </p>
          </div>

          <div className="relative flex items-center justify-center my-3">
            <svg className="w-36 h-36" viewBox="0 0 100 100">
              {/* Completed: 42% (green #10b981) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="11"
                strokeDasharray="100.28 238.76"
                strokeDashoffset="0"
              />
              {/* In Progress: 38% (blue #3b82f6) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="11"
                strokeDasharray="90.73 238.76"
                strokeDashoffset="-100.28"
              />
              {/* Not Started: 15% (slate #94a3b8) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#94a3b8"
                strokeWidth="11"
                strokeDasharray="35.81 238.76"
                strokeDashoffset="-191.01"
              />
              {/* At Risk: 5% (red #ef4444) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="11"
                strokeDasharray="11.94 238.76"
                strokeDashoffset="-226.82"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">18</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider">ACTIVE LEARNERS</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50/60 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 text-xs">Completed</span>
              <span className="font-bold text-slate-900 text-xs ml-auto">42% (13)</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50/60 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-slate-600 text-xs">In Progress</span>
              <span className="font-bold text-slate-900 text-xs ml-auto">38% (12)</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50/60 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-slate-600 text-xs">Not Started</span>
              <span className="font-bold text-slate-900 text-xs ml-auto">15% (5)</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50/60 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-slate-600 text-xs">At Risk</span>
              <span className="font-bold text-slate-900 text-xs ml-auto">5% (2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Competency Health Framework & Revision/Forgetting Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Competency Health Framework */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm text-slate-900">Competency Health Framework</h3>
            </div>
            <button
              onClick={() => setActivePage('competencies')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition cursor-pointer"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Workforce mastery scores across operational meteorological domains
          </p>

          <div className="space-y-3.5">
            {[
              { name: 'Synoptic Meteorology & Weather Forecasting', status: 'Attention', score: 51 },
              { name: 'Numerical Weather Prediction & Modeling', status: 'Attention', score: 45 },
              { name: 'Radar Meteorology & DWR Operations', status: 'Attention', score: 43 },
              { name: 'Satellite Meteorology & Remote Sensing', status: 'Attention', score: 40 },
              { name: 'Climate Data Analysis & Climate Change Proje...', status: 'Attention', score: 50 },
              { name: 'Ocean State Forecasting & Tsunami Warning', status: 'Developing', score: 60 },
            ].map((comp) => (
              <div key={comp.name} className="space-y-1.5 p-2 rounded-xl hover:bg-slate-50/60 transition">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 truncate max-w-[280px]">{comp.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-600 font-semibold">{comp.status}</span>
                    <span className="font-bold text-slate-900">{comp.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      comp.status === 'Developing' ? 'bg-indigo-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${comp.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revision & Forgetting Risk Intelligence */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Revision & Forgetting Risk Intelligence
                </h3>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                +18.5% Score Recovery
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Topics requiring administrative intervention based on forgetting risk and weakness
            </p>

            <div className="flex items-center justify-between text-xs py-2 px-3 bg-slate-50 border border-slate-100 rounded-xl mb-3">
              <span className="text-slate-500">
                Average Forgetting Risk: <b className="text-slate-800">9.6%</b>
              </span>
              <span className="text-slate-500">
                Session Retention Health: <b className="text-emerald-600">Optimal</b>
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  title: 'Doppler Velocity De-aliasing',
                  weakness: '79%',
                  risk: 'High (68%)',
                  impact: 'Core Prerequisite',
                  priority: 'High Priority',
                  priorityColor: 'bg-rose-50 text-rose-700 border-rose-200',
                },
                {
                  title: 'Convective Available Potential Energy (CAPE)',
                  weakness: '62%',
                  risk: 'Medium (45%)',
                  impact: 'High Impact',
                  priority: 'High Priority',
                  priorityColor: 'bg-rose-50 text-rose-700 border-rose-200',
                },
                {
                  title: 'Baroclinic Instability Modeling',
                  weakness: '57%',
                  risk: 'Medium (41%)',
                  impact: 'Intermediate',
                  priority: 'Medium Priority',
                  priorityColor: 'bg-amber-50 text-amber-700 border-amber-200',
                },
                {
                  title: 'Satellite Water Vapor Channel Interpretation',
                  weakness: '48%',
                  risk: 'Low (28%)',
                  impact: 'Supporting',
                  priority: 'Normal Priority',
                  priorityColor: 'bg-slate-100 text-slate-700 border-slate-200',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setActivePage('ai-insights')}
                  className="p-3 rounded-xl border border-slate-100/90 hover:border-indigo-200 hover:bg-slate-50/60 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-xs text-slate-800 group-hover:text-indigo-600 transition truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Weakness: <span className="font-semibold text-slate-600">{item.weakness}</span>{' '}
                      • Forgetting Risk: <span className="font-semibold text-slate-600">{item.risk}</span>{' '}
                      • Impact: <span className="text-slate-600">{item.impact}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${item.priorityColor}`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3">
            <button
              onClick={() => setActivePage('ai-insights')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition cursor-pointer"
            >
              <span>View Detailed Algorithmic Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Requires Your Attention & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Requires Your Attention */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900">Requires Your Attention</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Pending operational tasks requiring administrator governance approval
            </p>

            {/* Amber Alert Banner */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950">
                    {pendingCount} Pending Registration Requests
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Staff members require administrative approval before portal access is granted.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('users')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto shadow-xs cursor-pointer"
              >
                <span>Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sub-row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 border border-slate-100 rounded-xl bg-slate-50/40 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <div className="text-xs font-bold text-slate-800">Curriculum Verification</div>
                  <div className="text-xs text-slate-400">20 of 22 published</div>
                </div>
                <button
                  onClick={() => setActivePage('courses')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  Manage <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3.5 border border-slate-100 rounded-xl bg-slate-50/40 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <div className="text-xs font-bold text-slate-800">Audit Trail Inspection</div>
                  <div className="text-xs text-slate-400">Tenant-isolated security events</div>
                </div>
                <button
                  onClick={() => setActivePage('audit-logs')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  View Logs <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Quick Actions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition">
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Governance Quick Actions</h3>
            <p className="text-xs text-slate-400 mb-4">Execute administrative and catalog operations</p>

            <div className="space-y-2.5">
              <button
                onClick={() => setIsInviteUserOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50 text-left transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">
                    Invite User
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
              </button>

              <button
                onClick={() => setIsCreateCourseOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50 text-left transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-600">
                    Create Course
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
              </button>

              <button
                onClick={() => setIsAddCompetencyOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-slate-50 text-left transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-purple-600">
                    Add Competency Model
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
              </button>

              <button
                onClick={() => setIsUploadResourceOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-slate-50 text-left transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                    Upload Learning Resource
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Recent Platform Governance Activity */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Recent Platform Governance Activity</h3>
          </div>
          <button
            onClick={() => setActivePage('audit-logs')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition cursor-pointer"
          >
            <span>View Full Audit Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Live chronological feed of administrative and operational events
        </p>

        <div className="divide-y divide-slate-100">
          {auditLogs.slice(0, 8).map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0 border border-slate-200/60">
                  {log.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{log.actor}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {log.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-[11px] text-indigo-600 font-semibold">{log.event}</span> •{' '}
                    <span className="text-slate-600">{log.targetType}</span>
                    <span className="ml-2 text-slate-400">{log.email}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium text-slate-400">{log.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
