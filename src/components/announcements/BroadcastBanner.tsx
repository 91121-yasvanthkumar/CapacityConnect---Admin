import React, { useState } from 'react';
import {
  Megaphone,
  Radio,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { AnnouncementItem } from '../../types';

interface BroadcastBannerProps {
  audience: 'TRAINERS' | 'TRAINEES';
}

export const BroadcastBanner: React.FC<BroadcastBannerProps> = ({ audience }) => {
  const { trainersAnnouncements, traineesAnnouncements, setActivePage } = usePortal();

  const announcements =
    audience === 'TRAINERS' ? trainersAnnouncements : traineesAnnouncements;

  const [expandedId, setExpandedId] = useState<string | null>(
    announcements.length > 0 ? announcements[0].id : null
  );
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const activeNotices = announcements.filter((a) => !dismissedIds.includes(a.id));

  if (activeNotices.length === 0) return null;

  return (
    <div
      className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-indigo-800/60 animate-in fade-in"
      id={`${audience.toLowerCase()}-broadcast-banner`}
    >
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider uppercase text-indigo-300">
                ADMINISTRATIVE BROADCAST DESK
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Pushed Live ({activeNotices.length})
              </span>
            </div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Directives for {audience === 'TRAINERS' ? 'Domain Faculty Trainers' : 'Capacity Trainees Cohort'}
            </h2>
          </div>
        </div>

        <button
          onClick={() => setActivePage('announcements')}
          className="self-start sm:self-auto text-[11px] font-semibold text-indigo-300 hover:text-white flex items-center gap-1 transition"
        >
          <span>Manage in Announcements Desk</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Notices List */}
      <div className="space-y-2.5">
        {activeNotices.map((notice) => {
          const isExpanded = expandedId === notice.id;

          let priorityBg = 'bg-blue-500/20 text-blue-300 border-blue-400/30';
          if (notice.priority === 'HIGH') {
            priorityBg = 'bg-amber-500/20 text-amber-300 border-amber-400/30';
          }
          if (notice.priority === 'URGENT') {
            priorityBg = 'bg-rose-500/20 text-rose-300 border-rose-400/30';
          }

          return (
            <div
              key={notice.id}
              className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl p-3.5 transition"
            >
              <div
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : notice.id)}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md border tracking-wider uppercase ${priorityBg}`}
                    >
                      {notice.priority}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                      {notice.category}
                    </span>
                    {notice.pushedAt && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Pushed: {notice.pushedAt}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-white hover:text-indigo-200 transition">
                    {notice.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDismissedIds((prev) => [...prev, notice.id]);
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-white/10 transition"
                    title="Dismiss notice from this view"
                  >
                    Acknowledge
                  </button>
                  <button
                    className="p-1 text-slate-400 hover:text-white transition"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-300 leading-relaxed space-y-2 animate-in fade-in">
                  <p>{notice.content}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Issued by: <strong className="text-slate-200">{notice.author}</strong></span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Pushed live to your portal
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
