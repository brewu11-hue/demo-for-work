import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Layers,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';
import {
  UserProfile,
  SubsidiaryTenant,
  TenantId,
  SecurityEvaluationResult,
  AuditLogEntry,
} from '../types';
import { firestoreSimulator } from '../services/firestoreSimulator';
import { FIRESTORE_RULES_SOURCE } from '../data/mockData';

interface SecurityLabTabProps {
  currentUser: UserProfile;
  allTenants: SubsidiaryTenant[];
  allUsers: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
}

export const SecurityLabTab: React.FC<SecurityLabTabProps> = ({
  currentUser,
  allTenants,
  allUsers,
  onSelectUser,
}) => {
  const [activeTabSection, setActiveTabSection] = useState<'tests' | 'custom' | 'rules' | 'audit'>('tests');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [copiedRules, setCopiedRules] = useState(false);
  const [activeTestResult, setActiveTestResult] = useState<SecurityEvaluationResult | null>(null);
  const [runningTestId, setRunningTestId] = useState<string | null>(null);

  // Custom Query State
  const [customTenant, setCustomTenant] = useState<TenantId>(currentUser.tenantId);
  const [customCollection, setCustomCollection] = useState<'overview' | 'projects' | 'clients' | 'financials'>('clients');
  const [customResult, setCustomResult] = useState<SecurityEvaluationResult | null>(null);

  // Audit filter state
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'ALLOWED' | 'DENIED'>('ALL');
  const [auditSearch, setAuditSearch] = useState('');

  useEffect(() => {
    setAuditLogs(firestoreSimulator.getAuditLogs());
    const unsubscribe = firestoreSimulator.subscribe(() => {
      setAuditLogs(firestoreSimulator.getAuditLogs());
    });
    return unsubscribe;
  }, []);

  const handleCopyRules = () => {
    navigator.clipboard.writeText(FIRESTORE_RULES_SOURCE);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2000);
  };

  const handleRunPenetrationTest = (
    testId: string,
    targetUser: UserProfile | null,
    targetTenant: TenantId,
    collection: string
  ) => {
    setRunningTestId(testId);
    const path = `/tenants/${targetTenant}/${collection}`;
    const result = firestoreSimulator.evaluateRequest(targetUser, path, 'read');
    setActiveTestResult(result);
    setRunningTestId(null);
  };

  const handleRunCustomQuery = () => {
    const path = `/tenants/${customTenant}/${customCollection}`;
    const result = firestoreSimulator.evaluateRequest(currentUser, path, 'read');
    setCustomResult(result);
  };

  const otherTenant = allTenants.find((t) => t.id !== currentUser.tenantId) || allTenants[0];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesFilter = auditFilter === 'ALL' || log.status === auditFilter;
    const matchesSearch =
      log.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.targetPath.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.reason.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.ruleMatched.toLowerCase().includes(auditSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Section Navigation */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              Security Operations Center
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">Firestore Rules Testing Lab</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Multi-Tenant Isolation &amp; RBAC Verification Sandbox
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Evaluate and test live security boundaries with active credentials for <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role}).
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setActiveTabSection('tests')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTabSection === 'tests'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penetration Tests
          </button>
          <button
            onClick={() => setActiveTabSection('custom')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTabSection === 'custom'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Query Simulator
          </button>
          <button
            onClick={() => setActiveTabSection('rules')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTabSection === 'rules'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            firestore.rules Source
          </button>
          <button
            onClick={() => setActiveTabSection('audit')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTabSection === 'audit'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Live Audit Trail</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono">
              {auditLogs.length}
            </span>
          </button>
        </div>
      </div>

      {/* 1. PENETRATION TESTS SECTION */}
      {activeTabSection === 'tests' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Test 1: Standard Employee -> Client Tab */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    RBAC Test 1
                  </span>
                  <span className="text-xs font-mono text-slate-400">Expected: DENIED (403)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Employee Reads Client Data
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Attempt by a Standard Employee to query the sensitive <code>/clients</code> collection within their own company.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 mb-4 border border-slate-200/60">
                  Target: /tenants/{currentUser.tenantId}/clients
                </div>
              </div>
              <button
                onClick={() => {
                  const emp = allUsers.find(
                    (u) => u.tenantId === currentUser.tenantId && u.role === 'standard'
                  ) || currentUser;
                  handleRunPenetrationTest('test-emp-client', emp, currentUser.tenantId, 'clients');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-sky-400" />
                <span>Simulate Request</span>
              </button>
            </div>

            {/* Test 2: Standard Employee -> Financials Tab */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    RBAC Test 2
                  </span>
                  <span className="text-xs font-mono text-slate-400">Expected: DENIED (403)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Employee Reads Financial Analytics
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Attempt by a Standard Employee to access confidential <code>/financials</code> P&amp;L records.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 mb-4 border border-slate-200/60">
                  Target: /tenants/{currentUser.tenantId}/financials
                </div>
              </div>
              <button
                onClick={() => {
                  const emp = allUsers.find(
                    (u) => u.tenantId === currentUser.tenantId && u.role === 'standard'
                  ) || currentUser;
                  handleRunPenetrationTest('test-emp-fin', emp, currentUser.tenantId, 'financials');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-sky-400" />
                <span>Simulate Request</span>
              </button>
            </div>

            {/* Test 3: Cross-Tenant Isolation Breach Attempt */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    Isolation Test
                  </span>
                  <span className="text-xs font-mono text-slate-400">Expected: DENIED (403)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Cross-Tenant Data Breach
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Current user (<strong className="text-slate-700">{currentUser.tenantId}</strong>) attempts to read data from a separate subsidiary (<strong className="text-slate-700">{otherTenant.id}</strong>).
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 mb-4 border border-slate-200/60">
                  Target: /tenants/{otherTenant.id}/overview
                </div>
              </div>
              <button
                onClick={() => {
                  handleRunPenetrationTest('test-cross-tenant', currentUser, otherTenant.id, 'overview');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-900 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-amber-300" />
                <span>Attempt Cross-Tenant Breach</span>
              </button>
            </div>

            {/* Test 4: Manager -> Financials Tab (Valid Access) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Authorized Test 1
                  </span>
                  <span className="text-xs font-mono text-slate-400">Expected: ALLOWED (200)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Manager Reads Own Financials
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Verified Manager accesses company P&amp;L. Both tenant boundary and role claim are validated.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 mb-4 border border-slate-200/60">
                  Target: /tenants/{currentUser.tenantId}/financials
                </div>
              </div>
              <button
                onClick={() => {
                  const mgr = allUsers.find(
                    (u) => u.tenantId === currentUser.tenantId && u.role === 'manager'
                  ) || currentUser;
                  handleRunPenetrationTest('test-mgr-fin', mgr, currentUser.tenantId, 'financials');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-white" />
                <span>Test Manager Access</span>
              </button>
            </div>

            {/* Test 5: Standard Employee -> Operational Data (Valid Access) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Authorized Test 2
                  </span>
                  <span className="text-xs font-mono text-slate-400">Expected: ALLOWED (200)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Employee Reads Operations
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Standard employee queries non-sensitive operational telemetry within their assigned tenant.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 mb-4 border border-slate-200/60">
                  Target: /tenants/{currentUser.tenantId}/overview
                </div>
              </div>
              <button
                onClick={() => {
                  const emp = allUsers.find(
                    (u) => u.tenantId === currentUser.tenantId && u.role === 'standard'
                  ) || currentUser;
                  handleRunPenetrationTest('test-emp-ops', emp, currentUser.tenantId, 'overview');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-white" />
                <span>Test Operational Access</span>
              </button>
            </div>

            {/* Test 6: Unauthenticated Guest Attempt */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Auth Test
                  </span>
                  <span className="text-xs font-mono text-slate-400">Expected: DENIED (401)</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Unauthenticated Public Caller
                </h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Anonymous request with null auth token attempting to access holding company data.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 mb-4 border border-slate-200/60">
                  Target: /tenants/{currentUser.tenantId}/projects
                </div>
              </div>
              <button
                onClick={() => {
                  handleRunPenetrationTest('test-unauth', null, currentUser.tenantId, 'projects');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-rose-400" />
                <span>Test Unauthenticated</span>
              </button>
            </div>
          </div>

          {/* Test Result Inspector Banner */}
          {activeTestResult && (
            <div
              className={`border rounded-xl p-6 shadow-sm transition-all ${
                activeTestResult.allowed
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeTestResult.allowed
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {activeTestResult.allowed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">
                        {activeTestResult.allowed
                          ? 'VERDICT: ALLOWED (HTTP 200 OK)'
                          : `VERDICT: BLOCKED (HTTP ${activeTestResult.status} ${activeTestResult.errorCode || 'FORBIDDEN'})`}
                      </span>
                    </div>
                    <p className="text-xs font-mono mt-0.5">
                      Resource Path: {activeTestResult.path} · Method: {activeTestResult.operation}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-500">
                  Evaluated at {activeTestResult.timestamp}
                </span>
              </div>

              {/* Evaluation Step Trail */}
              <div className="space-y-2 mb-4">
                {activeTestResult.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/90 rounded-lg border border-slate-200 text-xs flex items-start gap-2.5"
                  >
                    <div className="mt-0.5 shrink-0">
                      {st.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono text-slate-900">{st.name}</span>
                        <span
                          className={`font-mono text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                            st.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {st.passed ? 'RETURN true' : 'RETURN false'}
                        </span>
                      </div>
                      <div className="text-slate-600 mt-0.5">{st.reason}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs font-mono bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto">
                <div>// Rule evaluated:</div>
                <div className="text-amber-300">{activeTestResult.matchedRule}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CUSTOM QUERY SIMULATOR SECTION */}
      {activeTabSection === 'custom' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Interactive Firestore Rule Tester
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Select any target subsidiary tenant and collection to see how the Firestore Security Rules evaluate your current credentials ({currentUser.name}, {currentUser.role}).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pick Target Tenant */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Subsidiary Tenant
              </label>
              <select
                value={customTenant}
                onChange={(e) => setCustomTenant(e.target.value as TenantId)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                {allTenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.id}) {t.id === currentUser.tenantId ? '← (Your Tenant)' : '← (External Tenant)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Pick Collection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Collection
              </label>
              <select
                value={customCollection}
                onChange={(e) => setCustomCollection(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                <option value="overview">/overview (General Operational Access)</option>
                <option value="projects">/projects (General Projects &amp; Tasks)</option>
                <option value="clients">/clients (RESTRICTED: Manager Only Client CRM)</option>
                <option value="financials">/financials (RESTRICTED: Manager Only P&amp;L)</option>
              </select>
            </div>
          </div>

          {/* Active Auth Token Preview */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
            <span className="text-slate-400 font-semibold block mb-1">
              Simulated Auth Context:
            </span>
            request.auth = &#123; uid: "{currentUser.id}", token: &#123; tenantId: "{currentUser.tenantId}", role: "{currentUser.role}" &#125; &#125;
          </div>

          <button
            onClick={handleRunCustomQuery}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 text-sky-400" />
            <span>Execute Firestore Rules Evaluation</span>
          </button>

          {/* Custom Result Box */}
          {customResult && (
            <div
              className={`p-5 rounded-xl border ${
                customResult.allowed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-2">
                {customResult.allowed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
                <span>
                  Result: {customResult.allowed ? '200 ALLOWED' : '403 PERMISSION_DENIED'}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                {customResult.steps.map((st, i) => (
                  <div key={i} className="flex items-center justify-between font-mono bg-white/70 p-2 rounded border border-slate-200/60">
                    <span>{st.name}</span>
                    <span className={st.passed ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {st.passed ? 'TRUE' : 'FALSE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. FIRESTORE RULES SOURCE SECTION */}
      {activeTabSection === 'rules' && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-slate-200">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono font-bold text-white">
                firestore.rules (Production Specification)
              </span>
            </div>
            <button
              onClick={handleCopyRules}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              {copiedRules ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRules ? 'Copied' : 'Copy Rules'}</span>
            </button>
          </div>
          <pre className="p-6 text-xs font-mono overflow-x-auto leading-relaxed text-slate-300">
            {FIRESTORE_RULES_SOURCE}
          </pre>
        </div>
      )}

      {/* 4. LIVE AUDIT TRAIL LOGS */}
      {activeTabSection === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          {/* Audit Controls Header */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter audit logs..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
                {(['ALL', 'ALLOWED', 'DENIED'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setAuditFilter(filter)}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      auditFilter === filter
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => firestoreSimulator.clearAuditLogs()}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Audit History</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Verdict</th>
                  <th className="px-4 py-3">Caller Identity</th>
                  <th className="px-4 py-3">Tenant Boundary</th>
                  <th className="px-4 py-3">Target Path</th>
                  <th className="px-4 py-3">Reason / Evaluation Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400 font-sans">
                      No matching audit records found.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded ${
                            log.status === 'ALLOWED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {log.status === 'ALLOWED' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold font-sans text-slate-800">{log.userName}</span>
                        <span className="text-slate-400 ml-1.5">({log.userRole})</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-slate-700">{log.userTenantId}</span>
                        {log.userTenantId !== log.targetTenantId && (
                          <span className="text-rose-600 font-bold ml-1">
                            ≠ {log.targetTenantId}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                        {log.targetPath}
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-600 max-w-xs truncate">
                        {log.reason}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
