import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  Layers,
  Search,
  Filter,
} from 'lucide-react';
import { ProjectData, SubsidiaryTenant, UserProfile } from '../types';

interface ProjectsTabProps {
  tenant: SubsidiaryTenant;
  currentUser: UserProfile;
  projects: ProjectData[];
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  tenant,
  currentUser,
  projects,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter((prj) => {
    const matchesStatus = filterStatus === 'all' || prj.status === filterStatus;
    const matchesSearch =
      prj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.lead.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Rule Notice */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">
              Projects &amp; Tasks Access Granted
            </span>
            <span className="text-slate-500 ml-1.5">
              Authorized by <code className="font-mono text-slate-700">match /tenants/{tenant.id}/projects/&#123;projectId&#125;</code> (Open to all verified tenant members).
            </span>
          </div>
        </div>
        <div className="font-mono text-[11px] text-slate-500 shrink-0">
          Tenant Partition: {tenant.id}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, leads, codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          {['all', 'In Progress', 'Testing', 'Operational'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status === 'all' ? 'All Initiatives' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((prj) => (
          <div
            key={prj.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] font-semibold text-slate-500">
                  {prj.code}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    prj.priority === 'Critical'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : prj.priority === 'High'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {prj.priority}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {prj.title}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Lead: <strong className="text-slate-700 font-medium">{prj.lead}</strong>
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Milestone Completion</span>
                  <span className="font-bold text-slate-900">{prj.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${prj.progress}%`,
                      backgroundColor: tenant.brandColor,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card Footer Metadata */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Due {prj.deadline}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {prj.teamSize} Assigned
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
