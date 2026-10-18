import React, { useState } from 'react';
import { X, Brain } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const AddCompetencyModal: React.FC = () => {
  const { isAddCompetencyOpen, setIsAddCompetencyOpen, addCompetency } = usePortal();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [domain, setDomain] = useState('Meteorology');

  if (!isAddCompetencyOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    addCompetency({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      domain,
      mappedLearners: 0,
      averageMastery: 50,
      masteryRate: 50,
      healthStatus: 'Developing',
    });

    setName('');
    setCode('');
    setIsAddCompetencyOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Competency Framework</h3>
              <p className="text-xs text-slate-500">WMO 1083 atmospheric & marine skill definition</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddCompetencyOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Competency Code</label>
            <input
              type="text"
              required
              placeholder="e.g. COMP-HYDRO-MET"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Competency Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Hydrometeorological Flood Inundation Modeling"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Scientific Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Meteorology">Meteorology</option>
              <option value="Atmospheric Sciences">Atmospheric Sciences</option>
              <option value="Observational Systems">Observational Systems</option>
              <option value="Remote Sensing">Remote Sensing</option>
              <option value="Climate Science">Climate Science</option>
              <option value="Ocean Sciences">Ocean Sciences</option>
              <option value="Geophysics">Geophysics</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddCompetencyOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-xs"
            >
              Add Framework
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
