import React from 'react';
import {
  ShieldCheck,
  Menu,
  Building2,
  ArrowRightLeft,
  ChevronRight,
  Terminal,
  Lock,
  Unlock,
} from 'lucide-react';
import { UserProfile, SubsidiaryTenant } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  currentTenant: SubsidiaryTenant;
  allUsers: UserProfile[];
  activeTab: string;
  onSelectUser: (user: UserProfile) => void;
  onOpenUserModal: () => void;
  onOpenSecurityLab: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentTenant,
  allUsers,
  activeTab,
  onSelectUser,
  onOpenUserModal,
  onOpenSecurityLab,
  onOpenMobileMenu,
}) => {
  const isManager = currentUser.role === 'manager';
  const counterpartRole = currentUser.role === 'standard' ? 'manager' : 'standard';
  const counterpartUser = allUsers.find(
    (u) => u.tenantId === currentUser.tenantId && u.role === counterpartRole
  );

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Operations & Telemetry';
      case 'projects':
        return 'Projects & Operational Tasks';
      case 'clients':
        return 'Confidential Client Directory (POPIA)';
      case 'financials':
        return 'Financial Analytics (ZAR / Rand)';
      case 'security':
        return 'Security Rules Lab & Audit';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="hidden sm:inline">Ubuntu Apex Holdings</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <span
                className="font-bold flex items-center gap-1"
                style={{ color: currentTenant.brandColor }}
              >
                {currentTenant.name}
              </span>
              <span className="text-slate-400 font-mono text-[11px] hidden md:inline">
                ({currentTenant.code})
              </span>
            </div>
            <h1 className="text-base font-black text-slate-900 tracking-tight truncate">
              {getTabTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Security Badge, Role Switcher & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* POPIA & Firestore Security Status */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono text-[11px]">POPIA &amp; Rules v2 Active</span>
          </div>

          {/* Quick Toggle Role */}
          {counterpartUser && (
            <button
              onClick={() => onSelectUser(counterpartUser)}
              title={`Switch to ${counterpartUser.roleLabel}`}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-sky-600" />
              <span>
                To {counterpartUser.role === 'manager' ? 'Manager/Admin' : 'Standard Employee'}
              </span>
            </button>
          )}

          {/* User Profile Pill button */}
          <button
            onClick={onOpenUserModal}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
            />
            <div className="text-left hidden xl:block">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="text-xs font-bold text-slate-900">
                  {currentUser.name}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    isManager
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {isManager ? 'Manager' : 'Employee'}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {currentUser.tenantId}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
