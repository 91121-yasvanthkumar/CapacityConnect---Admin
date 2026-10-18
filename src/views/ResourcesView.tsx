import React, { useState } from 'react';
import {
  Library,
  CheckCircle2,
  HardDrive,
  FileCode,
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  FileText,
  Video,
  Database,
  Book,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { MediaType } from '../types';

export const ResourcesView: React.FC = () => {
  const { resources, setIsUploadResourceOpen } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const pageSize = 10;

  const handleDownload = (resource: any) => {
    const element = document.createElement('a');
    const file = new Blob([`Resource: ${resource.title}\nCategory: ${resource.type}\nUploaded: ${resource.uploadedDate}\nDescription: ${resource.description}`], {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadSuccess(`Downloaded "${resource.title}"`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const totalResources = resources.length;
  const publishedCount = resources.filter((r) => r.status === 'Published').length;
  const uniqueTypes = new Set(resources.map((r) => r.type)).size;

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || r.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getTypeIcon = (type: MediaType) => {
    switch (type) {
      case 'Manual':
        return FileText;
      case 'Video Briefing':
        return Video;
      case 'WMO Guide':
        return Book;
      case 'Dataset':
        return Database;
      default:
        return FileCode;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learning Resources & Media Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Operational manuals, satellite briefings, WMO guides, and institutional learning materials.
          </p>
        </div>
        <button
          onClick={() => setIsUploadResourceOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Resource</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {downloadSuccess}
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL RESOURCES</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Library className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalResources}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Repository assets</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">PUBLISHED</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{publishedCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Available to learners</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL STORAGE</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">161.9 MB</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Cloud storage used</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">MEDIA TYPES</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{uniqueTypes}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Formats supported</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search resources by title, description..."
            className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium cursor-pointer"
            >
              <option value="ALL">All Media Types</option>
              <option value="Manual">Manual</option>
              <option value="Video Briefing">Video Briefing</option>
              <option value="WMO Guide">WMO Guide</option>
              <option value="Dataset">Dataset</option>
              <option value="Document">Document</option>
            </select>
          </div>

          {(searchTerm || typeFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('ALL');
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-4">RESOURCE</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">FILE SIZE</th>
                <th className="py-3 px-4">UPLOADED</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No resources match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => {
                  const Icon = getTypeIcon(r.type);

                  let typeBadge = 'bg-blue-50 text-blue-700 border border-blue-200';
                  if (r.type === 'Video Briefing') {
                    typeBadge = 'bg-purple-50 text-purple-700 border border-purple-200';
                  } else if (r.type === 'WMO Guide') {
                    typeBadge = 'bg-amber-50 text-amber-700 border border-amber-200';
                  } else if (r.type === 'Dataset') {
                    typeBadge = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                  }

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition">
                      {/* RESOURCE */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5 max-w-md">
                            <div className="font-bold text-slate-900 leading-snug">
                              {r.title}
                            </div>
                            <div className="text-[11px] text-slate-500 leading-normal">
                              {r.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeBadge}`}>
                          {r.type}
                        </span>
                      </td>

                      {/* FILE SIZE */}
                      <td className="py-3.5 px-4 font-bold text-slate-700">
                        {r.fileSize}
                      </td>

                      {/* UPLOADED */}
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {r.uploadedDate}
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          {r.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => handleDownload(r)}
                            className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * pageSize, filtered.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{filtered.length}</span> resources
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              Previous
            </button>
            <span className="font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
