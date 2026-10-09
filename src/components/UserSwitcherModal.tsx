import React, { useState } from 'react';
import {
  X,
  Check,
  Shield,
  ShieldAlert,
  Lock,
  Unlock,
  Building2,
  Key,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { UserProfile, SubsidiaryTenant } from '../types';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  allUsers: UserProfile[];
  allTenants: SubsidiaryTenant[];
  onSelectUser: (user: UserProfile) => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  allTenants,
  onSelectUser,
}) => {
  const [filterTenant, setFilterTenant] = useState<string>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold tracking-wider uppercase text-sky-400">
              <Key className="w-4 h-4" />
              <span>Multi-Tenant RBAC Test Harness</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Switch Test User Profile
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any of the 14 pre-configured employee profiles across the 7 subsidiaries to test data isolation and role boundaries.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active JWT Claims Callout */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Active Identity:</span>
            <span className="font-bold text-slate-900">{currentUser.name}</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-slate-600">{currentUser.email}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 font-bold">
              tenantId: "{currentUser.tenantId}"
            </span>
            <span
              className={`px-2 py-0.5 rounded font-bold border ${
                currentUser.role === 'manager'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              role: "{currentUser.role}"
            </span>
          </div>
        </div>

        {/* Subsidiary Filter Controls */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Filter by Subsidiary Business ({allTenants.length} Subsidiaries)
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterTenant('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterTenant === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Subsidiaries (14 Users)
            </button>
            {allTenants.map((tenant) => (
              <button
                key={tenant.id}
                onClick={() => setFilterTenant(tenant.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  filterTenant === tenant.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tenant.brandColor }}
                />
                <span>{tenant.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Grid grouped by Subsidiary */}
        <div className="p-6 max-h-[55vh] overflow-y-auto space-y-6">
          {allTenants
            .filter((t) => filterTenant === 'all' || t.id === filterTenant)
            .map((tenant) => {
              const tenantUsers = allUsers.filter((u) => u.tenantId === tenant.id);
              return (
                <div key={tenant.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {/* Company Header */}
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: tenant.brandColor }}
                      />
                      <span className="text-sm font-bold text-slate-900">
                        {tenant.name}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        ({tenant.id})
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {tenant.sector}
                    </span>
                  </div>

                  {/* 2 Roles: Standard Employee vs Manager/Admin */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    {tenantUsers.map((user) => {
                      const isSelected = currentUser.id === user.id;
                      const isManager = user.role === 'manager';

                      return (
                        <div
                          key={user.id}
                          onClick={() => {
                            onSelectUser(user);
                            onClose();
                          }}
                          className={`p-4 transition-all cursor-pointer relative group flex flex-col justify-between ${
                            isSelected
                              ? 'bg-sky-50/70 ring-2 ring-sky-500 ring-inset'
                              : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                      {user.name}
                                    </h4>
                                    {isSelected && (
                                      <span className="flex items-center gap-0.5 text-[11px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded">
                                        <Check className="w-3 h-3" />
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    {user.title}
                                  </p>
                                </div>
                              </div>

                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
                                  isManager
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                                }`}
                              >
                                {isManager ? 'Manager / Admin' : 'Standard Employee'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 font-mono mb-3">
                              {user.email}
                            </p>

                            {/* Access Permissions Summary */}
                            <div className="space-y-1.5 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 mb-3">
                              <div className="flex items-center justify-between text-slate-700">
                                <span className="flex items-center gap-1.5">
                                  <Unlock className="w-3 h-3 text-emerald-600" />
                                  Operations &amp; Tasks
                                </span>
                                <span className="text-emerald-700 font-semibold">Allowed</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-slate-700">
                                  {isManager ? (
                                    <Unlock className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Lock className="w-3 h-3 text-rose-600" />
                                  )}
                                  Client Information
                                </span>
                                <span
                                  className={`font-semibold ${
                                    isManager ? 'text-emerald-700' : 'text-rose-600'
                                  }`}
                                >
                                  {isManager ? 'Allowed (Manager)' : 'BLOCKED (403)'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-slate-700">
                                  {isManager ? (
                                    <Unlock className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Lock className="w-3 h-3 text-rose-600" />
                                  )}
                                  Financial Analytics
                                </span>
                                <span
                                  className={`font-semibold ${
                                    isManager ? 'text-emerald-700' : 'text-rose-600'
                                  }`}
                                >
                                  {isManager ? 'Allowed (Manager)' : 'BLOCKED (403)'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-1 flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-mono text-[10px]">
                              {user.clearanceLevel}
                            </span>
                            <span className="font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform">
                              {isSelected ? 'Currently Loaded' : 'Click to Authenticate →'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Modal Footer with Quick Help */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              Switching profiles changes the simulated JWT token claims (<code className="font-mono">tenantId</code>, <code className="font-mono">role</code>), triggering immediate real-time Firestore rule re-evaluations.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
