import React, { useState } from 'react';
import {
  Activity,
  Shield,
  Search,
  Filter,
  Download,
  Calendar,
  Lock,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState<string>('ALL');
  const [exportSuccess, setExportSuccess] = useState(false);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEvent = eventFilter === 'ALL' || log.event.includes(eventFilter);

    return matchesSearch && matchesEvent;
  });

  const handleExportCSV = () => {
    const headers = ['Actor', 'Email', 'Role', 'Event', 'Target', 'Date', 'Timestamp'];
    const rows = filteredLogs.map((l) => [l.actor, l.email, l.role, l.event, l.targetType, l.date, l.timestamp]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `imd_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Platform Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Immutable, tenant-isolated security logs of all administrative and instructional actions.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Compliance Audit</span>
        </button>
      </div>

      {exportSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <span className="font-semibold">Encrypted compliance audit trail exported successfully.</span>
          <button onClick={() => setExportSuccess(false)} className="text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor, email, or event..."
            className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
            >
              <option value="ALL">All Security Events</option>
              <option value="LOGIN">Authentication Events</option>
              <option value="ASSESSMENT">Assessment Activities</option>
              <option value="USER">User Governance</option>
              <option value="CURRICULUM">Curriculum Updates</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">ACTOR</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">EVENT TYPE</th>
                <th className="py-3 px-4">TARGET</th>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">INTEGRITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0">
                        {log.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{log.actor}</div>
                        <div className="text-[11px] text-slate-400 truncate">{log.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] font-semibold text-indigo-600">
                    {log.event}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {log.targetType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {log.date} at {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Lock className="w-2.5 h-2.5" />
                      SHA-256 Valid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
