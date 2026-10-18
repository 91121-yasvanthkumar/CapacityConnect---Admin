import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  X,
  Building2,
  Calendar,
  Clock,
  BookOpen,
  Award,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const UserDossierDrawer: React.FC = () => {
  const {
    selectedUser,
    setSelectedUser,
    approveUser,
    rejectUser,
    trainers,
    trainees,
    openChangeRole,
  } = usePortal();

  const [showFullProfileModal, setShowFullProfileModal] = useState(false);

  if (!selectedUser) return null;

  // Find linked trainer or trainee for additional metrics
  const linkedTrainer = trainers.find(
    (t) => t.email === selectedUser.email || t.name === selectedUser.name
  );
  const linkedTrainee = trainees.find(
    (tr) => tr.email === selectedUser.email || tr.name === selectedUser.name
  );

  const coursesCount = linkedTrainer?.coursesCount || (linkedTrainee ? linkedTrainee.enrolledCurricula : 0);
  const competencyScore = linkedTrainee?.competencyScore || 74;

  const isPending = selectedUser.status === 'Pending';
  const isApproved = selectedUser.status === 'Approved';
  const isRejected = selectedUser.status === 'Rejected';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" id="user-dossier-drawer-root">
        {/* Darkened backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedUser(null)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px]"
          id="user-dossier-backdrop"
        />

        {/* Slide-over Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full"
            id="user-dossier-panel"
          >
            {/* Top Header Bar */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2 text-indigo-700">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-800">
                  INSTITUTIONAL DOSSIER
                </span>
              </div>
              <button
                id="close-dossier-button"
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Dossier Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* User Identity Summary */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center text-indigo-700 font-extrabold text-xl shrink-0 shadow-xs">
                  {selectedUser.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {selectedUser.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {selectedUser.email}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wide">
                      {selectedUser.role}
                    </span>
                    {isPending && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Pending
                      </span>
                    )}
                    {isApproved && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Approved
                      </span>
                    )}
                    {isRejected && (
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Pending Governance Approval Banner (Shown in image.png) */}
              {isPending && (
                <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Pending Governance Approval</span>
                  </div>
                  <p className="text-[11px] text-amber-900/90 leading-relaxed">
                    This user has registered as an IMD Domain {selectedUser.role === 'TRAINER' ? 'Trainer' : 'Trainee'}. Administrative approval is required before curriculum module access is activated.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      id="dossier-approve-button"
                      onClick={() => approveUser(selectedUser.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve Member
                    </button>
                    <button
                      id="dossier-reject-button"
                      onClick={() => rejectUser(selectedUser.id)}
                      className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject Application
                    </button>
                  </div>
                </div>
              )}

              {/* Approved Institutional Clearance Banner */}
              {isApproved && (
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Active Institutional Clearance</span>
                    </div>
                    <button
                      onClick={() => rejectUser(selectedUser.id)}
                      className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition"
                    >
                      Revoke
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                    Institutional governance verified. Member possesses active accreditation for meteorological capacity pipelines.
                  </p>
                </div>
              )}

              {/* Rejected Status Notice */}
              {isRejected && (
                <div className="bg-rose-50/70 border border-rose-200/90 rounded-xl p-4 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-900">Application Rejected</span>
                    <button
                      onClick={() => approveUser(selectedUser.id)}
                      className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-700 transition"
                    >
                      Re-approve
                    </button>
                  </div>
                  <p className="text-[11px] text-rose-800/80">
                    Access to MoES / IMD capacity portals is currently revoked or declined by governance.
                  </p>
                </div>
              )}

              {/* Metadata Details */}
              <div className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 divide-y divide-slate-100/90 text-xs">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Institution / Dept:</span>
                  </div>
                  <span className="font-bold text-slate-900">{selectedUser.department}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Joined:</span>
                  </div>
                  <span className="font-bold text-slate-900">{selectedUser.joined}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last Active:</span>
                  </div>
                  <span className="font-bold text-slate-900">Today, 07:12 AM</span>
                </div>
              </div>

              {/* Training & Competency Overview Section */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  TRAINING &amp; COMPETENCY OVERVIEW
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Card 1: Curriculum Courses */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      CURRICULUM COURSES
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span className="text-2xl font-black text-slate-900">{coursesCount}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2 font-medium">
                      0 completed • 0 in progress
                    </div>
                  </div>

                  {/* Card 2: Competency Score */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      COMPETENCY SCORE
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span className="text-2xl font-black text-emerald-700">{competencyScore}%</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2 font-medium">
                      Target baseline: 70%
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  RECENT ACTIVITY
                </h3>
                <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 space-y-4">
                  {/* Activity Item 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">
                        Completed competency assessment
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Radar Meteorology &amp; DWR Operations
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Today, 07:12 AM</div>
                    </div>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Portal sign in</div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Secure SSO Session Established
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Today, 06:58 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Bottom Actions Bar */}
            <div className="border-t border-slate-200/80 p-4 bg-white flex items-center justify-between shrink-0 relative">
              {/* Change Role Modal Trigger */}
              <div>
                <button
                  id="change-role-button"
                  onClick={() => openChangeRole(selectedUser)}
                  className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg transition flex items-center gap-1.5 shadow-xs"
                >
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Change Role</span>
                </button>
              </div>

              {/* View Full Profile Link */}
              <button
                id="view-full-profile-button"
                onClick={() => setShowFullProfileModal(true)}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-1.5 transition py-2"
              >
                <span>View full profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Full Profile Modal */}
        {showFullProfileModal && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-sm">
                    {selectedUser.initials}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{selectedUser.name}</h3>
                    <p className="text-xs text-slate-500">{selectedUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFullProfileModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Institutional Unit</span>
                    <p className="font-bold text-slate-800 mt-1">{selectedUser.department}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Security Clearance</span>
                    <p className="font-bold text-emerald-700 mt-1">Level 3 - Operational Training</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Accredited Since</span>
                    <p className="font-bold text-slate-800 mt-1">{selectedUser.joined}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Compliance Audit</span>
                    <p className="font-bold text-slate-800 mt-1">WMO-1083 Fully Compliant</p>
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 leading-relaxed text-[11px]">
                  <strong>MoES Capacity Registry Note:</strong> Verified identity credentials against government personnel records. Eligible for national meteorological curriculum development and real-time radar simulation workshops.
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowFullProfileModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
