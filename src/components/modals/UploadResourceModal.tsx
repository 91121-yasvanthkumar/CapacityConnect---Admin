import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { MediaType } from '../../types';

export const UploadResourceModal: React.FC = () => {
  const { isUploadResourceOpen, setIsUploadResourceOpen, addResource } = usePortal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<MediaType>('Manual');
  const [fileSize, setFileSize] = useState('24.8 MB');

  if (!isUploadResourceOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addResource({
      title: title.trim(),
      description: description.trim() || 'MoES institutional learning resource and technical material.',
      type,
      fileSize,
      status: 'Published',
    });

    setTitle('');
    setDescription('');
    setIsUploadResourceOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload Learning Resource</h3>
              <p className="text-xs text-slate-500">Add technical manuals, briefings, or datasets</p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadResourceOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Title</label>
            <input
              type="text"
              required
              placeholder="e.g. NWP Ensemble Prediction System Operational Manual"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief summary of syllabus contents and operational context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Media Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MediaType)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Manual">Manual</option>
                <option value="Video Briefing">Video Briefing</option>
                <option value="WMO Guide">WMO Guide</option>
                <option value="Dataset">Dataset</option>
                <option value="Document">Document</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">File Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="e.g. 15.4 MB"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100/70 transition">
            <UploadCloud className="w-8 h-8 text-indigo-600 mb-1" />
            <span className="text-xs font-semibold text-slate-800">Choose file or drag & drop</span>
            <span className="text-[10px] text-slate-400 mt-0.5">PDF, MP4, NetCDF, or ZIP up to 1GB</span>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadResourceOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-xs"
            >
              Upload to MoES Cloud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
