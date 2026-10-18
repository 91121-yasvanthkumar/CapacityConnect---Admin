import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Search,
  Plus,
  Check,
  X,
  Shield,
  List,
  LayoutGrid,
  MoreHorizontal,
  Bookmark,
  UserCheck,
  AlertCircle,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { UserRole } from '../types';

export const UsersView: React.FC = () => {
  const {
    users,
    approveUser,
    rejectUser,
    approveAllPending,
    setIsInviteUserOpen,
    trainers,
    trainees,
    selectedUser,
    setSelectedUser,
    openChangeRole,
  } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('pending-first');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const pageSize = 10;

  const totalPersonnel = users.length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const trainersCount = trainers.length;
  const traineesCount = trainees.length;
  const pendingCount = users.filter((u) => u.status === 'Pending').length;
  const approvedCount = users.filter((u) => u.status === 'Approved').length;
  const rejectedCount = users.filter((u) => u.status === 'Rejected').length;

  const parseDate = (d?: string) => {
    if (!d) return 0;
    const parsed = Date.parse(d);
    return isNaN(parsed) ? 0 : parsed;
  };

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'pending-first') {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return parseDate(b.joined) - parseDate(a.joined);
      }
      if (sortBy === 'newest') return parseDate(b.joined) - parseDate(a.joined);
      if (sortBy === 'oldest') return parseDate(a.joined) - parseDate(b.joined);
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage institutional cadres, staff accounts, verification status, and clearance credentials.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          {pendingCount > 0 && (
            <button
              onClick={() => approveAllPending()}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
              title="Approve all unapproved members"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Approve All Pending ({pendingCount})</span>
            </button>
          )}
          <button
            onClick={() => setIsInviteUserOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Total Personnel */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              TOTAL PERSONNEL
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{totalPersonnel}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-normal">All institutional cadres</div>
        </div>

        {/* Awaiting Approval (Action Required) */}
        <div
          onClick={() => {
            setStatusFilter(statusFilter === 'Pending' ? 'ALL' : 'Pending');
            setCurrentPage(1);
          }}
          className={`border rounded-2xl p-4.5 shadow-xs cursor-pointer transition ${
            pendingCount > 0
              ? 'bg-amber-50/40 border-amber-300/90 hover:bg-amber-50/80'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-amber-800 uppercase">
              AWAITING CLEARANCE
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-black text-amber-900 tracking-tight">{pendingCount}</div>
            {pendingCount > 0 && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                Action
              </span>
            )}
          </div>
          <div className="text-[11px] text-amber-800/80 mt-1 font-medium">
            {pendingCount > 0 ? 'Click to review & approve' : 'All members approved'}
          </div>
        </div>

        {/* Administrators */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              ADMINISTRATORS
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{adminCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-normal">Security &amp; governance</div>
        </div>

        {/* Domain Trainers */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              DOMAIN TRAINERS
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{trainersCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-normal">Faculty instructors</div>
        </div>

        {/* Capacity Trainees */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              CAPACITY TRAINEES
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{traineesCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-normal">Operational learners</div>
        </div>
      </div>

      {/* Prominent Action Banner for Unapproved Members */}
      {pendingCount > 0 && (
        <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {pendingCount} Unapproved {pendingCount === 1 ? 'Member' : 'Members'} Awaiting Clearance
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                  Approval Needed
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Review credentials and verify institutional access. You can approve members individually below or clear them all at once.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={() => {
                setStatusFilter(statusFilter === 'Pending' ? 'ALL' : 'Pending');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'Pending'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{statusFilter === 'Pending' ? 'Showing Unapproved' : `Filter Unapproved (${pendingCount})`}</span>
            </button>
            <button
              onClick={() => approveAllPending()}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve All ({pendingCount})</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, department..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-xl p-0.5 bg-slate-50 shrink-0">
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({totalPersonnel})
            </button>
            <button
              onClick={() => {
                setStatusFilter('Pending');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'Pending'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-amber-800 hover:text-amber-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Unapproved ({pendingCount})</span>
            </button>
            <button
              onClick={() => {
                setStatusFilter('Approved');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                statusFilter === 'Approved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Approved ({approvedCount})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap justify-end">
          {/* All Roles */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Administrator</option>
            <option value="TRAINER">Trainer</option>
            <option value="TRAINEE">Trainee</option>
          </select>

          {/* Status Dropdown (on mobile or alternative) */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="sm:hidden text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Statuses ({totalPersonnel})</option>
            <option value="Pending">Unapproved / Pending ({pendingCount})</option>
            <option value="Approved">Approved ({approvedCount})</option>
            <option value="Rejected">Rejected ({rejectedCount})</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="pending-first">Needs Approval First</option>
            <option value="newest">Joined (Newest)</option>
            <option value="oldest">Joined (Oldest)</option>
            <option value="name">Name (A-Z)</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {(searchTerm || roleFilter !== 'ALL' || statusFilter !== 'ALL' || sortBy !== 'pending-first') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('ALL');
                setStatusFilter('ALL');
                setSortBy('pending-first');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Users Content: Table or Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {viewMode === 'grid' ? (
          <div className="p-5">
            {paginatedUsers.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No personnel matching the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedUsers.map((user) => {
                  const isPending = user.status === 'Pending';
                  const isApproved = user.status === 'Approved';
                  let roleBadgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (user.role === 'ADMIN') roleBadgeStyle = 'bg-purple-50 text-purple-700 border-purple-200';
                  if (user.role === 'TRAINER') roleBadgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
                  if (user.role === 'TRAINEE') roleBadgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';

                  return (
                    <div
                      key={user.id}
                      className={`border rounded-2xl p-4.5 transition flex flex-col justify-between ${
                        isPending
                          ? 'border-amber-300 bg-amber-50/20 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center shrink-0">
                              {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <h3
                                onClick={() => setSelectedUser(user)}
                                className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition cursor-pointer truncate"
                              >
                                {user.name}
                              </h3>
                              <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${roleBadgeStyle}`}>
                            {user.role}
                          </span>
                        </div>

                        <div className="space-y-1.5 py-2.5 border-y border-slate-100 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Department</span>
                            <span className="font-medium text-slate-700 truncate max-w-[170px]">{user.department}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Status</span>
                            {isApproved ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Approved
                              </span>
                            ) : isPending ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                Unapproved (Pending)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200">
                                Rejected
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Joined</span>
                            <span className="text-slate-600 font-medium">{user.joined}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2 flex items-center justify-between gap-2">
                        {isPending ? (
                          <div className="flex items-center gap-2 w-full">
                            <button
                              onClick={() => approveUser(user.id)}
                              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve User</span>
                            </button>
                            <button
                              onClick={() => rejectUser(user.id)}
                              className="px-3 py-2 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <button
                              onClick={() => openChangeRole(user)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50/50 rounded-lg transition cursor-pointer flex items-center gap-1"
                            >
                              <Shield className="w-3.5 h-3.5" />
                              Change Role
                            </button>
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                            >
                              View Dossier
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                  <th className="py-3.5 pl-4 pr-2 w-10">
                    <input
                      type="checkbox"
                      checked={
                        paginatedUsers.length > 0 &&
                        paginatedUsers.every((u) => selectedRowIds.includes(u.id))
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRowIds(paginatedUsers.map((u) => u.id));
                        } else {
                          setSelectedRowIds([]);
                        }
                      }}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-3">USER</th>
                  <th className="py-3.5 px-4">ROLE</th>
                  <th className="py-3.5 px-4">DEPARTMENT</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4">JOINED</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 text-sm">
                      No personnel matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => {
                    const isPending = user.status === 'Pending';
                    const isApproved = user.status === 'Approved';
                    const isSelected = selectedUser?.id === user.id;
                    const isChecked = selectedRowIds.includes(user.id);
                    const isMenuOpen = openMenuUserId === user.id;

                    let roleBadgeStyle = 'bg-slate-100 text-slate-700';
                    if (user.role === 'ADMIN') roleBadgeStyle = 'bg-purple-50 text-purple-700 border border-purple-200';
                    if (user.role === 'TRAINER') roleBadgeStyle = 'bg-blue-50 text-blue-700 border border-blue-200';
                    if (user.role === 'TRAINEE') roleBadgeStyle = 'bg-emerald-50 text-emerald-700 border border-emerald-200';

                    return (
                      <tr
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`cursor-pointer transition ${
                          isPending
                            ? 'bg-amber-50/30 hover:bg-amber-50/60'
                            : isSelected
                            ? 'bg-indigo-50/40 hover:bg-indigo-50/60'
                            : 'hover:bg-slate-50/70'
                        }`}
                      >
                        {/* CHECKBOX */}
                        <td
                          className="py-3.5 pl-4 pr-2 w-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRowIds((prev) => [...prev, user.id]);
                              } else {
                                setSelectedRowIds((prev) => prev.filter((id) => id !== user.id));
                              }
                            }}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                          />
                        </td>

                        {/* USER */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0">
                              {user.initials}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-sm truncate hover:text-indigo-600 transition">
                                {user.name}
                              </div>
                              <div className="text-xs text-slate-400 truncate">{user.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => openChangeRole(user)}
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition hover:ring-2 hover:ring-indigo-500/20 cursor-pointer inline-flex items-center gap-1 ${roleBadgeStyle}`}
                            title="Click to change institutional role"
                          >
                            <span>{user.role}</span>
                          </button>
                        </td>

                        {/* DEPARTMENT */}
                        <td className="py-3.5 px-4 font-medium text-slate-600 text-sm max-w-xs truncate">
                          {user.department}
                        </td>

                        {/* STATUS */}
                        <td className="py-3.5 px-4">
                          {isApproved && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Approved
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                              Unapproved (Pending)
                            </span>
                          )}
                          {user.status === 'Rejected' && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50/80 border border-rose-200/60 px-2.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              Rejected
                            </span>
                          )}
                        </td>

                        {/* JOINED */}
                        <td className="py-3.5 px-4 text-slate-400 font-medium text-xs">
                          {user.joined}
                        </td>

                        {/* ACTIONS */}
                        <td
                          className="py-3.5 px-4 text-right relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isPending ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => approveUser(user.id)}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                                title="Approve user credentials and grant access"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => rejectUser(user.id)}
                                className="px-3 py-1.5 border border-slate-200 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1"
                                title="Reject registration"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1 relative">
                              <button
                                onClick={() => setOpenMenuUserId(isMenuOpen ? null : user.id)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                                title="Actions"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>

                              {/* Dropdown menu */}
                              {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 animate-in fade-in slide-in-from-top-1 text-left">
                                  <button
                                    onClick={() => {
                                      setOpenMenuUserId(null);
                                      openChangeRole(user);
                                    }}
                                    className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                                    <span>Change Role</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setOpenMenuUserId(null);
                                      setSelectedUser(user);
                                    }}
                                    className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Users className="w-3.5 h-3.5 text-slate-500" />
                                    <span>View Dossier</span>
                                  </button>
                                  <div className="border-t border-slate-100 my-1" />
                                  <button
                                    onClick={() => {
                                      setOpenMenuUserId(null);
                                      rejectUser(user.id);
                                    }}
                                    className="w-full px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    <span>Deactivate</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * pageSize, filteredUsers.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{filteredUsers.length}</span> personnel
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              Previous
            </button>
            <span className="font-medium text-slate-700 px-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
