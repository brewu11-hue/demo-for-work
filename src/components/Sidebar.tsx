import React from 'react';
import {
  Building2,
  ShieldCheck,
  Activity,
  Layers,
  Lock,
  Unlock,
  Terminal,
  Zap,
  Landmark,
  Ship,
  Dna,
  Plane,
  ShoppingBag,
  ShieldAlert,
  ArrowRightLeft,
  ChevronRight,
  UserCheck,
  Check,
  X,
} from 'lucide-react';
import { SubsidiaryTenant, UserProfile, TenantId } from '../types';

interface SidebarProps {
  currentTenant: SubsidiaryTenant;
  currentUser: UserProfile;
  allTenants: SubsidiaryTenant[];
  allUsers: UserProfile[];
  activeTab: 'overview' | 'projects' | 'clients' | 'financials' | 'security';
  onSelectTab: (tab: 'overview' | 'projects' | 'clients' | 'financials' | 'security') => void;
  onSelectTenant: (tenant: SubsidiaryTenant) => void;
  onSelectUser: (user: UserProfile) => void;
  onOpenUserModal: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const getTenantIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap':
      return <Zap className="w-4 h-4" />;
    case 'Landmark':
      return <Landmark className="w-4 h-4" />;
    case 'Ship':
      return <Ship className="w-4 h-4" />;
    case 'Dna':
      return <Dna className="w-4 h-4" />;
    case 'Plane':
      return <Plane className="w-4 h-4" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-4 h-4" />;
    case 'ShieldAlert':
      return <ShieldAlert className="w-4 h-4" />;
    default:
      return <Building2 className="w-4 h-4" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTenant,
  currentUser,
  allTenants,
  allUsers,
  activeTab,
  onSelectTab,
  onSelectTenant,
  onSelectUser,
  onOpenUserModal,
  isOpenMobile,
  onCloseMobile,
}) => {
  const isManager = currentUser.role === 'manager';

  // Find counterpart user for 1-click role toggle
  const counterpartRole = currentUser.role === 'standard' ? 'manager' : 'standard';
  const counterpartUser = allUsers.find(
    (u) => u.tenantId === currentUser.tenantId && u.role === counterpartRole
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-200 border-r border-slate-800/90 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Holding Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-amber-500 via-emerald-600 to-sky-600 flex items-center justify-center font-black text-white text-sm shadow-sm ring-1 ring-white/20">
              UA
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs tracking-wider text-white">
                <span>UBUNTU APEX</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <span>Holdings · South Africa</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">B-BBEE L1</span>
              </div>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 text-slate-400 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Section 1: The 7 Subsidiary Web Apps */}
          <div>
            <div className="px-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Subsidiary Web Apps ({allTenants.length})
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Tenants</span>
            </div>

            <div className="space-y-1">
              {allTenants.map((tenant) => {
                const isActive = tenant.id === currentTenant.id;
                const isUserTenant = tenant.id === currentUser.tenantId;

                return (
                  <button
                    key={tenant.id}
                    onClick={() => {
                      onSelectTenant(tenant);
                      if (window.innerWidth < 1024) onCloseMobile();
                    }}
                    className={`w-full group text-left px-2.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-slate-800/90 text-white shadow-xs ring-1 ring-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white"
                        style={{ backgroundColor: tenant.brandColor }}
                      >
                        {getTenantIcon(tenant.iconName)}
                      </div>
                      <div className="truncate">
                        <div className="truncate font-semibold text-xs leading-tight">
                          {tenant.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {tenant.code} · {tenant.headquarters.split(',')[0]}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {isUserTenant && (
                        <span
                          className="w-2 h-2 rounded-full bg-emerald-400"
                          title="Your assigned tenant"
                        />
                      )}
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Active App Portal Navigation */}
          <div>
            <div className="px-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                App Modules · {currentTenant.code}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentTenant.brandColor }}
              />
            </div>

            <div className="space-y-1">
              {/* 1. Operations Overview */}
              <button
                onClick={() => {
                  onSelectTab('overview');
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>Operations &amp; Telemetry</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Open</span>
              </button>

              {/* 2. Projects & Tasks */}
              <button
                onClick={() => {
                  onSelectTab('projects');
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Projects &amp; Tasks</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Open</span>
              </button>

              {/* 3. Client Information (RESTRICTED) */}
              <button
                onClick={() => {
                  onSelectTab('clients');
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'clients'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isManager ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-rose-400" />
                  )}
                  <span>Client CRM (POPIA)</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isManager
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {isManager ? 'Manager' : 'Blocked'}
                </span>
              </button>

              {/* 4. Financial Analytics (RESTRICTED) */}
              <button
                onClick={() => {
                  onSelectTab('financials');
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'financials'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isManager ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-rose-400" />
                  )}
                  <span>Financial Analytics (ZAR)</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isManager
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {isManager ? 'Manager' : 'Blocked'}
                </span>
              </button>

              {/* 5. Security Rules Lab */}
              <button
                onClick={() => {
                  onSelectTab('security');
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Security Lab &amp; Audit</span>
                </div>
                <span className="text-[10px] text-amber-300 font-mono">Simulator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom User Profile & Switcher Box */}
        <div className="p-3 border-t border-slate-800/90 bg-slate-900/60 shrink-0 space-y-2">
          {/* Active User Summary */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-600 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-white truncate">
                  {currentUser.name}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    isManager
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isManager ? 'Mgr' : 'Emp'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate leading-tight">
                {currentUser.title}
              </p>
              <div className="text-[10px] text-sky-400 font-mono truncate mt-0.5">
                {currentUser.tenantId}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {counterpartUser && (
              <button
                onClick={() => onSelectUser(counterpartUser)}
                title={`Toggle to ${counterpartUser.roleLabel}`}
                className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <ArrowRightLeft className="w-3 h-3 text-sky-400" />
                <span>
                  To {counterpartUser.role === 'manager' ? 'Manager' : 'Employee'}
                </span>
              </button>
            )}

            <button
              onClick={onOpenUserModal}
              className={`inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors cursor-pointer ${
                !counterpartUser ? 'col-span-2' : ''
              }`}
            >
              <UserCheck className="w-3 h-3 text-amber-400" />
              <span>All 14 Users</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
