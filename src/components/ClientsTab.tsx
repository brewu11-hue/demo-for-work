import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Building2,
  Mail,
  Calendar,
  DollarSign,
  FileText,
  Lock,
  Unlock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { ClientData, SubsidiaryTenant, UserProfile, SecurityEvaluationResult } from '../types';
import { firestoreSimulator } from '../services/firestoreSimulator';
import { AccessDeniedCard } from './AccessDeniedCard';

interface ClientsTabProps {
  tenant: SubsidiaryTenant;
  currentUser: UserProfile;
  onSwitchToManager: () => void;
}

export const ClientsTab: React.FC<ClientsTabProps> = ({
  tenant,
  currentUser,
  onSwitchToManager,
}) => {
  const [clients, setClients] = useState<ClientData[] | null>(null);
  const [securityResult, setSecurityResult] = useState<SecurityEvaluationResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('all');

  useEffect(() => {
    // Attempt Firestore fetch for clients
    firestoreSimulator.getClients(currentUser, tenant.id).then((res) => {
      setClients(res.data);
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
        sectionTitle="Confidential Client Directory &amp; Enterprise Contracts"
        securityResult={securityResult}
        currentUser={currentUser}
        onSwitchToManager={onSwitchToManager}
        targetCollection="clients"
      />
    );
  }

  // If access is ALLOWED (Manager / Admin)
  const filteredClients = (clients || []).filter((cli) => {
    const matchesTier = filterTier === 'all' || cli.tier === filterTier;
    const matchesSearch =
      cli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cli.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cli.primaryContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cli.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const totalContractVal = (clients || []).reduce((acc, c) => acc + c.contractValue, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Authorization Success Callout */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold">
              Manager Clearance Verified
            </span>
            <span className="text-emerald-800 ml-1.5">
              Rule <code className="font-mono text-emerald-900">match /tenants/{tenant.id}/clients/&#123;clientId&#125;</code> permitted query. Access granted to role <strong className="font-bold">"{currentUser.role}"</strong>.
            </span>
          </div>
        </div>
        <div className="font-mono text-[11px] text-emerald-700 font-semibold shrink-0">
          Clearance Level 5 · HTTP 200 OK
        </div>
      </div>

      {/* Top Client Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Total Contract Portfolio (ZAR)
          </div>
          <div className="text-2xl font-black text-slate-900">
            R{(totalContractVal / 1000000).toFixed(1)} Million
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Across {clients?.length || 0} active partner accounts
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            POPIA &amp; NDA Compliance
          </div>
          <div className="text-2xl font-black text-emerald-600">
            100% Active
          </div>
          <div className="text-xs text-slate-400 mt-1">
            All NDAs signed and bilateral validated
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Average Deal Size
          </div>
          <div className="text-2xl font-black text-slate-900">
            R{((totalContractVal / (clients?.length || 1)) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-slate-400 mt-1">
            High-margin enterprise agreements
          </div>
        </div>
      </div>

      {/* Search and Tier Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients, contacts, industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          {['all', 'Strategic', 'Enterprise', 'Tier-1 Partner'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterTier === tier
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tier === 'all' ? 'All Tiers' : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Card List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-bold text-slate-900">
                    {client.name}
                  </h4>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {client.code}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      client.tier === 'Strategic'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {client.tier}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{client.industry}</span>
                  <span>·</span>
                  <span>Renewal Date: <strong className="text-slate-700">{client.renewalDate}</strong></span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">{client.ndaStatus}</span>
                </div>
              </div>

              <div className="text-left md:text-right shrink-0">
                <div className="text-xs text-slate-500">Contract Valuation</div>
                <div className="text-xl font-black text-slate-900">
                  R{(client.contractValue / 1000000).toFixed(1)}M
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Status: {client.status}
                </div>
              </div>
            </div>

            {/* Details & Confidential Briefing Notes */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px] block mb-1">
                  Primary Stakeholder &amp; Contact
                </span>
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{client.primaryContact}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 mt-1 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{client.contactEmail}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                  Confidential Account Dossier (Manager Clearance Only)
                </span>
                <p className="text-slate-700 leading-relaxed italic">
                  "{client.sensitiveNotes}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
