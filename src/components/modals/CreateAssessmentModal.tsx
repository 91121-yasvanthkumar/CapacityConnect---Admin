import React, { useState } from 'react';
import { X, FileCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { EvaluationType, AssessmentStatus } from '../../types';

export const CreateAssessmentModal: React.FC = () => {
  const { isCreateAssessmentOpen, setIsCreateAssessmentOpen, addAssessment } = usePortal();

  const [title, setTitle] = useState('');
  const [evaluationType, setEvaluationType] = useState<EvaluationType>('MCQ');
  const [passingScore, setPassingScore] = useState(70);
  const [durationMins, setDurationMins] = useState(30);
  const [status, setStatus] = useState<AssessmentStatus>('Published');

  if (!isCreateAssessmentOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addAssessment({
      title: title.trim(),
      evaluationType,
      passingScore,
      durationMins,
      status,
    });

    setTitle('');
    setIsCreateAssessmentOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Create Assessment</h3>
              <p className="text-xs text-slate-500">Configure quiz or diagnostic test</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateAssessmentOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Assessment Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Synoptic Chart & Satellite Pattern Diagnostic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Evaluation Type</label>
              <select
                value={evaluationType}
                onChange={(e) => setEvaluationType(e.target.value as EvaluationType)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="MCQ">MCQ</option>
                <option value="Practical">Practical</option>
                <option value="Oral Diagnostic">Oral Diagnostic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Score (%)</label>
              <input
                type="number"
                min={30}
                max={100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                min={5}
                max={180}
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AssessmentStatus)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateAssessmentOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-xs"
            >
              Create Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
