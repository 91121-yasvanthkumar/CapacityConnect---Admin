import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Brain,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

interface InsightTopic {
  id: string;
  topic: string;
  domain: string;
  weaknessScore: string;
  forgettingRisk: string;
  action: string;
  priority: 'High' | 'Medium' | 'Normal';
}

const INITIAL_INSIGHT_TOPICS: InsightTopic[] = [
  {
    id: 'it-1',
    topic: 'Doppler Velocity De-aliasing',
    domain: 'Radar Meteorology',
    weaknessScore: '79%',
    forgettingRisk: 'High (68%)',
    action: 'Targeted Spaced Revision Session & Simulator Practice',
    priority: 'High',
  },
  {
    id: 'it-2',
    topic: 'Convective Available Potential Energy (CAPE)',
    domain: 'Synoptic Meteorology',
    weaknessScore: '62%',
    forgettingRisk: 'Medium (45%)',
    action: 'Sounding Diagnostics & Tephigram Workshop',
    priority: 'High',
  },
  {
    id: 'it-3',
    topic: 'Baroclinic Instability Modeling',
    domain: 'NWP Modeling',
    weaknessScore: '57%',
    forgettingRisk: 'Medium (41%)',
    action: 'NWP Primitive Equation Diagnostic Review',
    priority: 'Medium',
  },
  {
    id: 'it-4',
    topic: 'Satellite Water Vapor Channel Interpretation',
    domain: 'Remote Sensing',
    weaknessScore: '48%',
    forgettingRisk: 'Low (28%)',
    action: 'Multi-spectral RGB & Vapor Imagery Refresher',
    priority: 'Normal',
  },
];

export const AiInsightsView: React.FC = () => {
  const { setNotificationAlert } = usePortal();
  const [activeTopics, setActiveTopics] = useState<InsightTopic[]>(INITIAL_INSIGHT_TOPICS);
  const [isTriggeringAll, setIsTriggeringAll] = useState(false);

  const handleTriggerSingle = (id: string, title: string) => {
    setActiveTopics((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              priority: 'Normal' as const,
              forgettingRisk: 'Low (15%)',
            }
          : t
      )
    );
    setNotificationAlert(`Spaced revision module scheduled for: "${title}". Learners notified.`);
  };

  const handleTriggerAll = () => {
    setIsTriggeringAll(true);
    setTimeout(() => {
      setActiveTopics((prev) =>
        prev.map((t) => ({
          ...t,
          priority: 'Normal' as const,
          forgettingRisk: 'Low (15%)',
        }))
      );
      setIsTriggeringAll(false);
      setNotificationAlert('Successfully dispatched personalized spaced repetition sessions to all 24 impacted learners.');
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Skill-Gap & Revision Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Predictive forgetting curve models, topic weakness rankings, and algorithmic spaced repetition intervals.
          </p>
        </div>
        <button
          onClick={handleTriggerAll}
          disabled={isTriggeringAll}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          <span>{isTriggeringAll ? 'Scheduling...' : 'Trigger Spaced Repetition Review'}</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">AT-RISK TOPICS</span>
            <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600">4</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires review</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">AVG. FORGETTING RISK</span>
            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">9.6%</div>
          <div className="text-[11px] text-slate-500 mt-1">Retention vulnerability</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">IMPACTED LEARNERS</span>
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">24</div>
          <div className="text-[11px] text-slate-500 mt-1">Across active cohorts</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase">ESTIMATED RECOVERY</span>
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">+18.5%</div>
          <div className="text-[11px] text-slate-500 mt-1">Post-intervention boost</div>
        </div>
      </div>

      {/* Middle Row: Forgetting Curve Chart & Algorithmic Explainability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Forgetting Curve Visualizer */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Forgetting Curve & Decay Prediction
                </h3>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                Ebbinghaus Model
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Retention decay simulation over 30 days without reinforcement vs. spaced repetition
            </p>

            <div className="relative h-48 w-full bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              <svg className="w-full h-full" viewBox="0 0 400 150">
                {/* Axis lines */}
                <line x1="30" y1="120" x2="380" y2="120" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="30" y1="20" x2="30" y2="120" stroke="#cbd5e1" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="25" y="25" textAnchor="end" className="text-[9px] fill-slate-400">100%</text>
                <text x="25" y="70" textAnchor="end" className="text-[9px] fill-slate-400">50%</text>
                <text x="25" y="118" textAnchor="end" className="text-[9px] fill-slate-400">0%</text>

                {/* Standard decay curve (red/amber dashed line) */}
                <path
                  d="M 30,25 Q 120,95 380,110"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Spaced revision curve (stair-step retention maintaining >85%) */}
                <path
                  d="M 30,25 Q 70,55 90,65 L 90,30 Q 150,55 180,60 L 180,30 Q 260,50 300,52 L 300,32 Q 340,42 380,45"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                />

                {/* Day labels */}
                <text x="30" y="135" textAnchor="middle" className="text-[9px] fill-slate-400">Day 0</text>
                <text x="90" y="135" textAnchor="middle" className="text-[9px] fill-slate-400">Day 3</text>
                <text x="180" y="135" textAnchor="middle" className="text-[9px] fill-slate-400">Day 7</text>
                <text x="300" y="135" textAnchor="middle" className="text-[9px] fill-slate-400">Day 14</text>
                <text x="380" y="135" textAnchor="middle" className="text-[9px] fill-slate-400">Day 30</text>
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-3 mt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-rose-500 border-t border-dashed"></span>
              <span className="text-slate-500 text-[11px]">Unreinforced Decay (Standard)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-indigo-600"></span>
              <span className="text-indigo-700 font-semibold text-[11px]">With Spaced Revision</span>
            </div>
          </div>
        </div>

        {/* Right: Algorithmic Explainability & Factors */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Algorithmic Explainability & Factors
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Factors driving predictive risk scoring and automated intervention schedules
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>1. Exponential Forgetting Risk (R = e^(-t/S))</span>
                <span className="text-[10px] text-indigo-600 font-mono">Weight: 40%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Measures time elapsed (t) since last assessed interaction against estimated memory stability (S).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>2. Topic Diagnostic Weakness (W = 1 - Accuracy)</span>
                <span className="text-[10px] text-indigo-600 font-mono">Weight: 35%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Calculated from failed attempts on practical exercises and diagnostic evaluations.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>3. Structural Prerequisite Weight</span>
                <span className="text-[10px] text-indigo-600 font-mono">Weight: 25%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Core prerequisites (e.g. Doppler de-aliasing) apply a 1.5x amplification factor due to downstream operational impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Critical Focus Areas */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Critical Focus Areas & Recommended Interventions
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted modules identified by predictive modeling for refresher assignments
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 text-[11px] font-bold text-slate-500 tracking-wider">
                <th className="py-3 px-4">TOPIC / SKILL AREA</th>
                <th className="py-3 px-4">DOMAIN</th>
                <th className="py-3 px-4">WEAKNESS SCORE</th>
                <th className="py-3 px-4">FORGETTING RISK</th>
                <th className="py-3 px-4">RECOMMENDED ACTION</th>
                <th className="py-3 px-4">PRIORITY</th>
                <th className="py-3 px-4 text-right">TRIGGER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {activeTopics.map((topic) => {
                let priorityBadge = 'bg-rose-50 text-rose-700 border border-rose-200';
                if (topic.priority === 'Medium') {
                  priorityBadge = 'bg-amber-50 text-amber-700 border border-amber-200';
                } else if (topic.priority === 'Normal') {
                  priorityBadge = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                }

                return (
                  <tr key={topic.id} className="hover:bg-slate-50/70 transition">
                    {/* TOPIC */}
                    <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                      {topic.topic}
                    </td>

                    {/* DOMAIN */}
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {topic.domain}
                    </td>

                    {/* WEAKNESS SCORE */}
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {topic.weaknessScore}
                    </td>

                    {/* FORGETTING RISK */}
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {topic.forgettingRisk}
                    </td>

                    {/* RECOMMENDED ACTION */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs leading-normal text-[11px]">
                      {topic.action}
                    </td>

                    {/* PRIORITY */}
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityBadge}`}>
                        {topic.priority}
                      </span>
                    </td>

                    {/* TRIGGER */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleTriggerSingle(topic.id, topic.topic)}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold transition flex items-center gap-1 ml-auto"
                      >
                        <Zap className="w-3 h-3 text-indigo-600" />
                        <span>Trigger</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
