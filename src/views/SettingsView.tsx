import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Check } from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const SettingsView: React.FC = () => {
  const { setNotificationAlert } = usePortal();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoVerifyFaculty, setAutoVerifyFaculty] = useState(false);
  const [retentionThreshold, setRetentionThreshold] = useState(70);

  const handleSave = () => {
    setNotificationAlert('System configuration saved successfully.');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System & Institutional Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure portal policies, security parameters, and automated capacity-building rules.
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs divide-y divide-slate-100">
        {/* Section 1 */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Governance & Verification Rules</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoVerifyFaculty}
                onChange={(e) => setAutoVerifyFaculty(e.target.checked)}
                className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Automatic Faculty Accreditation for Verified Gov Emails
                </div>
                <div className="text-[11px] text-slate-500">
                  Automatically verify faculty status for users signing up with @imd.gov.in or @moes.gov.in addresses.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Administrative Review Email Notifications
                </div>
                <div className="text-[11px] text-slate-500">
                  Send immediate alert to administrator when new staff registration is submitted.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Section 2 */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Competency Mastery Thresholds</h3>
          </div>
          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institutional Baseline Compliance Target (%)
            </label>
            <input
              type="number"
              min={50}
              max={95}
              value={retentionThreshold}
              onChange={(e) => setRetentionThreshold(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Trainees scoring below this benchmark will trigger proactive AI revision modules.
            </p>
          </div>
        </div>

        {/* Save button */}
        <div className="p-5 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
};
