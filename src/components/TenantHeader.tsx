import React from 'react';
import {
  MapPin,
  Users,
  Calendar,
  Lock,
  Unlock,
  Award,
} from 'lucide-react';
import { SubsidiaryTenant, UserProfile } from '../types';

interface TenantHeaderProps {
  tenant: SubsidiaryTenant;
  currentUser: UserProfile;
}

export const TenantHeader: React.FC<TenantHeaderProps> = ({
  tenant,
  currentUser,
}) => {
  const isManager = currentUser.role === 'manager';

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Subsidiary Identity */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: tenant.brandColor }}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {tenant.sector}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-500">{tenant.code}</span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                <Award className="w-3 h-3" />
                B-BBEE Level 1
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {tenant.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {tenant.tagline}
            </p>
          </div>

          {/* User Clearance Indicator for this Subsidiary */}
          <div
            className={`flex items-start gap-3 p-3 rounded-xl border text-xs max-w-sm shrink-0 ${
              isManager
                ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                : 'bg-sky-50/80 border-sky-200 text-sky-950'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isManager ? (
                <Unlock className="w-4 h-4 text-amber-600" />
              ) : (
                <Lock className="w-4 h-4 text-sky-700" />
              )}
            </div>
            <div>
              <div className="font-bold flex items-center gap-1.5">
                <span>{isManager ? 'Manager / Admin Clearance' : 'Standard Employee Clearance'}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                {isManager
                  ? 'All 4 modules accessible, including confidential POPIA Client CRM and Rand P&L analytics.'
                  : 'Operations & Tasks unlocked. Client CRM and Financial Analytics strictly blocked by Firestore rules.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{tenant.headquarters}</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Founded {tenant.founded}</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{tenant.employeeCount.toLocaleString()} South African Staff</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-slate-400">Partition:</span>
            <span className="font-semibold text-slate-700">/tenants/{tenant.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
