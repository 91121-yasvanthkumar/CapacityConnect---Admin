import React, { useState } from 'react';
import {
  X,
  Megaphone,
  Send,
  Radio,
  FileText,
  Users,
  GraduationCap,
  UserCheck,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import {
  AnnouncementTarget,
  AnnouncementPriority,
  AnnouncementCategory,
} from '../../types';

export const CreateAnnouncementModal: React.FC = () => {
  const {
    isCreateAnnouncementOpen,
    setIsCreateAnnouncementOpen,
    createAnnouncement,
    pushAnnouncement,
    trainers,
    trainees,
  } = usePortal();

  // Form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [target, setTarget] = useState<AnnouncementTarget>('ALL');
  const [priority, setPriority] = useState<AnnouncementPriority>('HIGH');
  const [category, setCategory] = useState<AnnouncementCategory>('Curriculum Update');

  // Multi-step: 'compose' -> 'created'
  const [step, setStep] = useState<'compose' | 'created'>('compose');
  const [createdAnnouncementId, setCreatedAnnouncementId] = useState<string | null>(null);
  const [createdTitle, setCreatedTitle] = useState('');
  const [createdTarget, setCreatedTarget] = useState<AnnouncementTarget>('ALL');

  if (!isCreateAnnouncementOpen) return null;

  const resetAndClose = () => {
    setTitle('');
    setContent('');
    setTarget('ALL');
    setPriority('HIGH');
    setCategory('Curriculum Update');
    setStep('compose');
    setCreatedAnnouncementId(null);
    setCreatedTitle('');
    setIsCreateAnnouncementOpen(false);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Step 1: strictly create first without auto-push
    const newId = createAnnouncement(
      {
        title: title.trim(),
        content: content.trim(),
        target,
        priority,
        category,
      },
      false // false = save as draft / unpushed first
    );

    setCreatedAnnouncementId(newId);
    setCreatedTitle(title.trim());
    setCreatedTarget(target);
    setStep('created');
  };

  const handlePushNow = () => {
    if (createdAnnouncementId) {
      pushAnnouncement(createdAnnouncementId, createdTarget);
    }
    resetAndClose();
  };

  const handleKeepAsDraft = () => {
    resetAndClose();
  };

  const getTargetAudienceCount = (t: AnnouncementTarget = target) => {
    if (t === 'ALL') return `${trainers.length} Trainers + ${trainees.length} Trainees`;
    if (t === 'TRAINERS') return `${trainers.length} Certified Faculty Trainers`;
    return `${trainees.length} Enrolled Trainees`;
  };

  const getTargetAudienceLabel = (t: AnnouncementTarget = target) => {
    if (t === 'ALL') return 'Both Portals (Trainers & Trainees)';
    if (t === 'TRAINERS') return 'Trainers Portal (Domain Faculty)';
    return 'Trainees Portal (Operational Learners)';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in"
      id="create-announcement-modal"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {step === 'compose' ? 'Create Institutional Announcement' : 'Announcement Created'}
              </h2>
              <p className="text-xs text-slate-500">
                {step === 'compose'
                  ? 'Author an administrative bulletin for Trainer and Trainee workspaces.'
                  : 'Notice saved. Choose when to push it live to portals.'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: COMPOSE NOTICE */}
        {step === 'compose' ? (
          <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
            {/* Announcement Title */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Announcement Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mandatory Doppler Weather Radar Calibration Practical Exam"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition text-xs"
              />
            </div>

            {/* Target Audience Selector */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Target Audience &amp; Push Destination *
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTarget('ALL')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    target === 'ALL'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-indigo-900'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Users className="w-4 h-4 text-indigo-600" />
                    {target === 'ALL' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="font-bold text-xs">Both Portals</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Trainers &amp; Trainees</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTarget('TRAINERS')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    target === 'TRAINERS'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-indigo-900'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    {target === 'TRAINERS' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="font-bold text-xs">Trainers Page</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Domain Faculty Only</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTarget('TRAINEES')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    target === 'TRAINEES'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-indigo-900'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    {target === 'TRAINEES' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="font-bold text-xs">Trainees Page</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Enrolled Cohort Only</div>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1.5">
                <span>Audience Reach:</span>
                <strong className="text-slate-600">{getTargetAudienceCount()}</strong>
              </p>
            </div>

            {/* Row: Category & Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Curriculum Update">Curriculum Update</option>
                  <option value="Exam Schedule">Exam Schedule</option>
                  <option value="Operational Alert">Operational Alert</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Workshop & Webinar">Workshop &amp; Webinar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Urgency / Priority *
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="NORMAL">Normal Notice</option>
                  <option value="HIGH">High Priority</option>
                  <option value="URGENT">Urgent Alert</option>
                </select>
              </div>
            </div>

            {/* Content Body */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Notice Content / Detailed Directive *
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide complete instructions, schedules, compliance criteria, or guidelines..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition text-xs resize-none"
              />
            </div>

            {/* Informational Guidance */}
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center gap-2.5 text-indigo-900">
              <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
              <p className="text-[11px] leading-relaxed">
                Clicking <strong>Create Announcement</strong> registers your notice first. After creation, you can push it immediately or leave it in drafts to push whenever ready.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Create Announcement</span>
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: POST-CREATION DECISION (Push Now vs Later) */
          <div className="space-y-5 text-center py-2 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>1st Step Complete • Saved in Registry (Draft)</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight pt-1">
                Announcement Created Successfully!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your circular is registered. Would you like to broadcast and push it live to portals now, or keep it in drafts?
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="text-slate-400 font-medium">Headline:</span>
                <span className="font-bold text-slate-900 text-right line-clamp-1">{createdTitle}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-400 font-medium">Destination:</span>
                <span className="font-semibold text-indigo-700">{getTargetAudienceLabel(createdTarget)}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-400 font-medium">Audience Reach:</span>
                <span className="font-semibold text-slate-700">{getTargetAudienceCount(createdTarget)}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-400 font-medium">Category / Priority:</span>
                <span className="font-semibold text-slate-700">{category} • {priority}</span>
              </div>
            </div>

            {/* Action Buttons: Choose to Push Now vs Push Later */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePushNow}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Push Live to Portals Now</span>
              </button>

              <button
                type="button"
                onClick={handleKeepAsDraft}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Keep in Drafts (Push Later)</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              You can also click <strong>Push Now</strong> directly on the announcement card at any time from the bulletins board.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
