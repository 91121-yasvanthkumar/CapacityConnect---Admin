import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { CourseDifficulty, CourseStatus } from '../../types';

export const CreateCourseModal: React.FC = () => {
  const { isCreateCourseOpen, setIsCreateCourseOpen, addCourse } = usePortal();

  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Synoptic Meteorology & Operational Forecasting');
  const [instructor, setInstructor] = useState('Dr. V. S. Prasad');
  const [difficulty, setDifficulty] = useState<CourseDifficulty>('INTERMEDIATE');
  const [status, setStatus] = useState<CourseStatus>('Published');

  if (!isCreateCourseOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCourse({
      title: title.trim(),
      domain,
      instructor,
      difficulty,
      status,
    });

    setTitle('');
    setIsCreateCourseOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Create Training Curriculum</h3>
              <p className="text-xs text-slate-500">Add operational module to national MoES repository</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateCourseOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Advanced Radar Nowcasting & Severe Convection"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Domain Category</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Synoptic Meteorology & Operational Forecasting">Synoptic Meteorology & Operational Forecasting</option>
              <option value="Observational Systems">Observational Systems</option>
              <option value="Operational Applications">Operational Applications</option>
              <option value="Observation & Instrumentation">Observation & Instrumentation</option>
              <option value="Climate Science">Climate Science</option>
              <option value="Remote Sensing">Remote Sensing</option>
              <option value="Atmospheric Sciences">Atmospheric Sciences</option>
              <option value="Radar Meteorology">Radar Meteorology</option>
              <option value="Weather Analysis">Weather Analysis</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Instructor</label>
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Dr. V. S. Prasad">Dr. V. S. Prasad</option>
                <option value="Dr. M. Ravichandran">Dr. M. Ravichandran</option>
                <option value="Dr. Sanjay Roy">Dr. Sanjay Roy</option>
                <option value="Dr. Ramesh Jenamani">Dr. Ramesh Jenamani</option>
                <option value="Dr. A. K. Mitra">Dr. A. K. Mitra</option>
                <option value="Dr. O. P. Sreejith">Dr. O. P. Sreejith</option>
                <option value="Dr. Sunitha Devi">Dr. Sunitha Devi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as CourseDifficulty)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
                <option value="EXPERT">EXPERT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Publication Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Published"
                  checked={status === 'Published'}
                  onChange={() => setStatus('Published')}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Published & Active</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Draft"
                  checked={status === 'Draft'}
                  onChange={() => setStatus('Draft')}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Draft (Under Review)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateCourseOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-xs"
            >
              Save & Create Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
