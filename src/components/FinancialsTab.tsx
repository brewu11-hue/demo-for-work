import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  CreditCard,
  PieChart,
  FileSpreadsheet,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { FinancialData, SubsidiaryTenant, UserProfile, SecurityEvaluationResult } from '../types';
import { firestoreSimulator } from '../services/firestoreSimulator';
import { AccessDeniedCard } from './AccessDeniedCard';

interface FinancialsTabProps {
  tenant: SubsidiaryTenant;
  currentUser: UserProfile;
  onSwitchToManager: () => void;
}

export const FinancialsTab: React.FC<FinancialsTabProps> = ({
  tenant,
  currentUser,
  onSwitchToManager,
}) => {
  const [financials, setFinancials] = useState<FinancialData | null>(null);
  const [securityResult, setSecurityResult] = useState<SecurityEvaluationResult | null>(null);

  useEffect(() => {
    firestoreSimulator.getFinancials(currentUser, tenant.id).then((res) => {
      setFinancials(res.data);
      setSecurityResult(res.security);
    });
  }, [currentUser, tenant.id]);

  if (!securityResult) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Evaluating Firestore security rules...
      </div>
    );
  }

  // If access is DENIED (Standard Employee)
  if (!securityResult.allowed) {
    return (
      <AccessDeniedCard
        sectionTitle="Confidential Financial Analytics &amp; P&amp;L Statements"
        securityResult={securityResult}
        currentUser={currentUser}
        onSwitchToManager={onSwitchToManager}
        targetCollection="financials"
      />
    );
  }

  if (!financials) return null;

  const maxQuarterRevenue = Math.max(...financials.quarterlyMetrics.map((q) => q.revenue));

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Authorization Success Callout */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold">
              Executive P&amp;L Clearance Confirmed
            </span>
            <span className="text-emerald-800 ml-1.5">
              Rule <code className="font-mono text-emerald-900">match /tenants/{tenant.id}/financials/&#123;docId&#125;</code> permitted query. Manager/Admin role authenticated.
            </span>
          </div>
        </div>
        <div className="font-mono text-[11px] text-emerald-700 font-semibold shrink-0">
          Clearance Level 5 · HTTP 200 OK
        </div>
      </div>

      {/* Top Level Financial KPIs */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Subsidiary Financial Performance &amp; Runway (ZAR / Rand)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Annualized Revenue</span>
              <span className="text-emerald-600 font-semibold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                +{financials.revenueGrowth}%
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              R{(financials.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Trailing 12-month consolidated
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Gross Profit Margin</span>
              <span className="text-slate-400 font-mono">IFRS / SA</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {financials.grossMargin}%
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Industry peer benchmark: 32%
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>EBITDA (Operating Profit)</span>
              <span className="text-emerald-600 font-semibold">
                {financials.ebitdaMargin}% margin
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              R{(financials.ebitda / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Healthy positive operational cashflow
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Liquid Cash Reserves</span>
              <span className="text-sky-600 font-semibold">
                {financials.runwayMonths} mo runway
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              R{(financials.cashReserves / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Burn rate: R{(financials.monthlyBurn / 1000000).toFixed(1)}M / month
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quarterly Breakdown & Cost Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quarterly Performance Chart Bars */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Quarterly Revenue vs. Operating Expenses (Rand)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Financial performance progression through current fiscal year
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-600" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-300" />
                Expenses
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {financials.quarterlyMetrics.map((qm) => {
              const revPercent = (qm.revenue / maxQuarterRevenue) * 100;
              const expPercent = (qm.expenses / maxQuarterRevenue) * 100;

              return (
                <div key={qm.quarter} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{qm.quarter}</span>
                    <span className="text-slate-500 font-mono">
                      Rev: R{(qm.revenue / 1000000).toFixed(1)}M · Exp: R{(qm.expenses / 1000000).toFixed(1)}M · EBITDA: R{(qm.ebitda / 1000000).toFixed(1)}M
                    </span>
                  </div>

                  {/* Dual Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                      <div
                        className="bg-sky-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${revPercent}%` }}
                      />
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                      <div
                        className="bg-slate-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${expPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cost Category Allocation */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Cost &amp; Expense Allocation
          </h4>
          <p className="text-xs text-slate-500 mb-5">
            Major operating expenditure distribution
          </p>

          <div className="space-y-4">
            {financials.costBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium truncate pr-2">
                    {item.category}
                  </span>
                  <span className="font-bold text-slate-900 shrink-0 font-mono">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  R{(item.amount / 1000000).toFixed(1)}M budgeted
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Invoices Ledger */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Recent Enterprise Invoices &amp; Accounts Receivable (ZAR)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct billing records (Strictly protected by Manager RBAC)
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Collection: /tenants/{tenant.id}/financials/invoices
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Invoice ID</th>
                <th className="px-5 py-3">Client Entity</th>
                <th className="px-5 py-3">Billed Amount</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3 text-right">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {financials.recentInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-medium text-slate-900">
                    {inv.id}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800">
                    {inv.client}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                    R{(inv.amount / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {inv.dueDate}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : inv.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {inv.status}
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
