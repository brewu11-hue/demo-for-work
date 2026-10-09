import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  ArrowUpRight,
  Shield,
  Layers,
} from 'lucide-react';
import { OperationalMetric, OperationalUpdate, SubsidiaryTenant, UserProfile } from '../types';

interface OverviewTabProps {
  tenant: SubsidiaryTenant;
  currentUser: UserProfile;
  metrics: OperationalMetric[];
  updates: OperationalUpdate[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  tenant,
  currentUser,
  metrics,
  updates,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Rule Notice */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">
              Operational Access Granted
            </span>
            <span className="text-slate-500 ml-1.5">
              Matched rule <code className="font-mono text-slate-700">match /tenants/{tenant.id}/overview/&#123;id&#125;</code> (Accessible to both Standard and Manager roles).
            </span>
          </div>
        </div>
        <div className="font-mono text-[11px] text-slate-500 shrink-0">
          Status: 200 OK · Evaluation: Passed
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Real-Time Operational Telemetry
          </h3>
          <span className="text-xs text-slate-400">
            Updated live · Subsidiary: {tenant.code}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-slate-500">
                  {metric.label}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                    metric.trend === 'up'
                      ? 'text-emerald-600'
                      : metric.trend === 'down'
                      ? 'text-rose-600'
                      : 'text-slate-500'
                  }`}
                >
                  {metric.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                  {metric.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{metric.change}</span>
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                {metric.value}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Subsidiary Mission & Recent Operational Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Tenant Identity & Mission */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              About {tenant.name}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {tenant.description}
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Headquarters</span>
                <span className="font-semibold text-slate-800">{tenant.headquarters}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Founded</span>
                <span className="font-semibold text-slate-800">{tenant.founded}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Total Workforce</span>
                <span className="font-semibold text-slate-800">{tenant.employeeCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Sector</span>
                <span className="font-semibold text-slate-800">{tenant.sector}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Shield className="w-4 h-4" />
              <span>Multi-Tenant Boundary</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              This dashboard is cryptographically locked to partition <code className="text-sky-300 font-mono">/tenants/{tenant.id}</code>. Queries attempting to reach other subsidiaries fail immediately at the Firestore rules layer.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800">
              request.auth.token.tenantId == "{tenant.id}"
            </div>
          </div>
        </div>

        {/* Right Column: Operational Activity Stream */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Recent Operational Milestones &amp; Audits
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Internal updates broadcast to all subsidiary staff
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {updates.length} events logged
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {updates.map((update) => (
                <div key={update.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {update.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {update.type}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {update.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {update.summary}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Logged by: <strong className="text-slate-600 font-medium">{update.author}</strong></span>
                    <span>·</span>
                    <span className="font-mono">ID: {update.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
