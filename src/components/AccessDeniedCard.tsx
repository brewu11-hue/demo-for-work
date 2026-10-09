import React, { useState } from 'react';
import { ShieldAlert, Lock, CheckCircle2, XCircle, ArrowRight, Terminal } from 'lucide-react';
import { SecurityEvaluationResult, UserProfile } from '../types';

interface AccessDeniedCardProps {
  sectionTitle: string;
  securityResult: SecurityEvaluationResult;
  currentUser: UserProfile;
  onSwitchToManager?: () => void;
  targetCollection: string;
}

export const AccessDeniedCard: React.FC<AccessDeniedCardProps> = ({
  sectionTitle,
  securityResult,
  currentUser,
  onSwitchToManager,
  targetCollection,
}) => {
  const [showJsonDump, setShowJsonDump] = useState(false);

  return (
    <div className="bg-white border border-rose-200 rounded-xl shadow-xs overflow-hidden">
      {/* Security Banner Header */}
      <div className="bg-rose-50 border-b border-rose-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-100 text-rose-700 rounded-lg shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-wider uppercase text-rose-800">
                HTTP 403 Forbidden · FirebaseError
              </span>
              <span className="text-xs text-rose-600 font-mono">[code=permission-denied]</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Access Restricted: {sectionTitle}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Firestore Security Rules blocked access to <code className="px-1.5 py-0.5 bg-rose-100/70 text-rose-800 rounded text-xs font-mono">/tenants/{currentUser.tenantId}/{targetCollection}</code> for user role <strong className="text-slate-800">"{currentUser.role}"</strong>.
            </p>
          </div>
        </div>

        {onSwitchToManager && (
          <button
            onClick={onSwitchToManager}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg shadow-sm transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>Switch to Manager Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Firestore Rule Code Match Box */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Violated Firestore Security Rule
            </span>
            <span className="text-xs font-mono text-slate-500">firestore.rules:Line 42</span>
          </div>
          <div className="bg-slate-950 text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800">
            <div className="text-slate-500 mb-1">// Strict Role-Based Access Control (RBAC) requirement</div>
            <div className="text-amber-400 font-semibold">
              match /tenants/&#123;tenantId&#125;/{targetCollection}/&#123;docId&#125; &#123;
            </div>
            <div className="pl-4 text-emerald-400">
              allow read, write: if <span className="text-sky-300">isTenantMember(tenantId)</span> &amp;&amp; <span className="text-rose-400 underline font-bold">isManager()</span>;
            </div>
            <div className="text-amber-400">&#125;</div>
          </div>
        </div>

        {/* Step-by-Step Rule AST Evaluation Trace */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Security Rule Evaluation Trace
          </h4>
          <div className="space-y-2.5">
            {securityResult.steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-lg border text-sm flex items-start gap-3 ${
                  step.passed
                    ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {step.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold">
                      {step.name}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        step.passed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {step.passed ? 'PASSED (true)' : 'REJECTED (false)'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-mono">
                    Evaluation: {step.ruleCode}
                  </div>
                  <div className="text-xs mt-1 text-slate-700">
                    {step.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explanatory Policy Callout */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3 text-xs text-slate-600">
          <Lock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">
              Why is this data protected under POPIA &amp; Corporate Governance?
            </p>
            <p>
              South African regulatory compliance (POPIA Section 19 safeguarding) and Ubuntu Apex Holdings governance strictly mandate that confidential client records, state agency contracts (Eskom, Transnet, SANDF, SARB), and Rand financial statements are restricted exclusively to employees with verified <strong className="text-slate-800">Manager / Admin</strong> clearance within their designated tenant partition.
            </p>
          </div>
        </div>

        {/* Raw Token & Request Payload Inspector */}
        <div className="pt-2">
          <button
            onClick={() => setShowJsonDump(!showJsonDump)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{showJsonDump ? 'Hide' : 'Inspect'} Simulated Request Context &amp; JWT Claims</span>
          </button>

          {showJsonDump && (
            <div className="mt-3 p-4 bg-slate-900 rounded-lg text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
              <pre>
                {JSON.stringify(
                  {
                    request: {
                      auth: {
                        uid: currentUser.id,
                        token: {
                          email: currentUser.email,
                          tenantId: currentUser.tenantId,
                          role: currentUser.role,
                          clearance: currentUser.clearanceLevel,
                        },
                      },
                      path: securityResult.path,
                      method: securityResult.operation,
                    },
                    verdict: 'DENIED_BY_RULE',
                    matchedRule: securityResult.matchedRule,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
