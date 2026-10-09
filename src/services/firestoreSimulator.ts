import {
  UserProfile,
  TenantId,
  SecurityEvaluationResult,
  RuleEvaluationStep,
  AuditLogEntry,
  ClientData,
  FinancialData,
  OperationalMetric,
  ProjectData,
  OperationalUpdate,
} from '../types';
import {
  MOCK_CLIENTS,
  MOCK_FINANCIALS,
  MOCK_OPERATIONAL_METRICS,
  MOCK_PROJECTS,
  MOCK_UPDATES,
} from '../data/mockData';

class FirestoreSimulator {
  private auditLogs: AuditLogEntry[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Seed initial audit log entries to look realistic
    this.seedInitialAuditLogs();
  }

  private seedInitialAuditLogs() {
    this.auditLogs = [
      {
        id: 'aud-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toLocaleTimeString(),
        userId: 'usr-fin-mgr',
        userName: 'Pieter van der Merwe',
        userRole: 'manager',
        userTenantId: 'tenant-fin',
        targetTenantId: 'tenant-fin',
        targetPath: '/tenants/tenant-fin/financials',
        operation: 'read',
        status: 'ALLOWED',
        ruleMatched: 'match /tenants/{tenantId}/financials/{docId}',
        reason: 'Authorized: Tenant matched (tenant-fin) & Role is manager. POPIA Level 5 validated.',
      },
      {
        id: 'aud-002',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString(),
        userId: 'usr-energy-emp',
        userName: 'Tariq Hendricks',
        userRole: 'standard',
        userTenantId: 'tenant-energy',
        targetTenantId: 'tenant-energy',
        targetPath: '/tenants/tenant-energy/clients',
        operation: 'read',
        status: 'DENIED',
        ruleMatched: 'match /tenants/{tenantId}/clients/{clientId}',
        reason: 'RBAC Policy Block: Standard employees are denied access to Eskom Client Information.',
      },
      {
        id: 'aud-003',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString(),
        userId: 'usr-logistics-mgr',
        userName: 'Nomvula Zulu',
        userRole: 'manager',
        userTenantId: 'tenant-logistics',
        targetTenantId: 'tenant-energy',
        targetPath: '/tenants/tenant-energy/overview',
        operation: 'read',
        status: 'DENIED',
        ruleMatched: 'match /tenants/{tenantId}/overview/{docId}',
        reason: 'Multi-Tenant Isolation Breach: Caller tenantId (tenant-logistics) does not match target (tenant-energy).',
      },
    ];
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public getAuditLogs(): AuditLogEntry[] {
    return [...this.auditLogs];
  }

  public clearAuditLogs() {
    this.auditLogs = [];
    this.notify();
  }

  /**
   * Core Security Rules evaluator that replicates Google Cloud Firestore rules engine
   */
  public evaluateRequest(
    user: UserProfile | null,
    path: string,
    operation: 'read' | 'write' | 'list' = 'read'
  ): SecurityEvaluationResult {
    const timestamp = new Date().toLocaleTimeString();
    const steps: RuleEvaluationStep[] = [];

    // 1. Authenticated Check
    const isAuth = user !== null;
    steps.push({
      name: 'isAuthenticated()',
      ruleCode: 'request.auth != null',
      passed: isAuth,
      reason: isAuth
        ? `Passed: Authenticated UID '${user.id}' with active token`
        : 'Failed: Unauthenticated request (request.auth is null)',
    });

    if (!isAuth) {
      const result: SecurityEvaluationResult = {
        allowed: false,
        status: 401,
        errorCode: 'permission-denied',
        errorMessage: 'FirebaseError: [code=permission-denied]: Unauthenticated request. Token required.',
        matchedRule: 'function isAuthenticated()',
        steps,
        path,
        operation,
        timestamp,
      };
      this.logAudit(null, 'tenant-aero', path, operation, 'DENIED', 'function isAuthenticated()', 'Unauthenticated request');
      return result;
    }

    // 2. Parse tenant and subcollection from path
    // Format: /tenants/{tenantId}/{collection}/{docId?}
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const segments = cleanPath.split('/').filter(Boolean);
    
    // Default fallback if path doesn't start with tenants
    let targetTenantId: TenantId = user.tenantId;
    let collection = 'overview';

    if (segments[0] === 'tenants' && segments[1]) {
      targetTenantId = segments[1] as TenantId;
      collection = segments[2] || 'overview';
    } else if (segments[0]) {
      collection = segments[0];
    }

    // Check Multi-Tenant Isolation
    const isSameTenant = user.tenantId === targetTenantId;
    steps.push({
      name: 'isTenantMember(tenantId)',
      ruleCode: 'request.auth.token.tenantId == tenantId',
      passed: isSameTenant,
      reason: isSameTenant
        ? `Passed: User tenant '${user.tenantId}' matches resource tenant '${targetTenantId}'`
        : `FAILED: Multi-Tenant Breach: User tenant '${user.tenantId}' attempted to access '${targetTenantId}' data`,
    });

    if (!isSameTenant) {
      const result: SecurityEvaluationResult = {
        allowed: false,
        status: 403,
        errorCode: 'permission-denied',
        errorMessage: `FirebaseError: [code=permission-denied]: Cross-tenant access denied. Caller tenantId '${user.tenantId}' != target tenantId '${targetTenantId}'.`,
        matchedRule: 'function isTenantMember(tenantId)',
        steps,
        path,
        operation,
        timestamp,
      };
      this.logAudit(
        user,
        targetTenantId,
        path,
        operation,
        'DENIED',
        'isTenantMember(tenantId)',
        `Cross-tenant access blocked. Tenant mismatch (${user.tenantId} vs ${targetTenantId})`
      );
      return result;
    }

    // 3. Check RBAC on sensitive collections
    const isSensitive = collection === 'clients' || collection === 'financials';
    if (isSensitive) {
      const isManagerRole = user.role === 'manager';
      steps.push({
        name: 'isManager()',
        ruleCode: "request.auth.token.role == 'manager'",
        passed: isManagerRole,
        reason: isManagerRole
          ? `Passed: Verified manager role '${user.role}' with high clearance`
          : `FAILED: RBAC restriction: Role '${user.role}' is NOT permitted to view ${collection}`,
      });

      if (!isManagerRole) {
        const ruleName = collection === 'clients' 
          ? 'match /tenants/{tenantId}/clients/{clientId} { allow read: if isTenantMember() && isManager(); }'
          : 'match /tenants/{tenantId}/financials/{docId} { allow read: if isTenantMember() && isManager(); }';

        const result: SecurityEvaluationResult = {
          allowed: false,
          status: 403,
          errorCode: 'permission-denied',
          errorMessage: `FirebaseError: [code=permission-denied]: Missing or insufficient permissions. Standard employees are prohibited from viewing ${collection.toUpperCase()} data.`,
          matchedRule: ruleName,
          steps,
          path,
          operation,
          timestamp,
        };
        this.logAudit(
          user,
          targetTenantId,
          path,
          operation,
          'DENIED',
          ruleName,
          `RBAC policy denied: Standard Employee '${user.name}' tried to access restricted ${collection}`
        );
        return result;
      }
    }

    // If passed all rules
    const matchedRuleString = isSensitive
      ? `match /tenants/{tenantId}/${collection}/{id} { allow read: if isTenantMember() && isManager(); }`
      : `match /tenants/{tenantId}/${collection}/{id} { allow read: if isTenantMember(); }`;

    const result: SecurityEvaluationResult = {
      allowed: true,
      status: 200,
      matchedRule: matchedRuleString,
      steps,
      path,
      operation,
      timestamp,
    };

    this.logAudit(
      user,
      targetTenantId,
      path,
      operation,
      'ALLOWED',
      matchedRuleString,
      `Authorized read on ${collection} for user '${user.name}' (${user.role})`
    );

    return result;
  }

  private logAudit(
    user: UserProfile | null,
    targetTenantId: TenantId,
    targetPath: string,
    operation: 'read' | 'write' | 'list',
    status: 'ALLOWED' | 'DENIED',
    ruleMatched: string,
    reason: string
  ) {
    const entry: AuditLogEntry = {
      id: `aud-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: new Date().toLocaleTimeString(),
      userId: user ? user.id : 'unauthenticated',
      userName: user ? user.name : 'Anonymous Guest',
      userRole: user ? user.role : 'standard',
      userTenantId: user ? user.tenantId : targetTenantId,
      targetTenantId,
      targetPath,
      operation,
      status,
      ruleMatched,
      reason,
    };

    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 50) {
      this.auditLogs.pop();
    }
    this.notify();
  }

  // API Methods
  public async getClients(
    user: UserProfile,
    targetTenant?: TenantId
  ): Promise<{ data: ClientData[] | null; security: SecurityEvaluationResult }> {
    const tenant = targetTenant || user.tenantId;
    const path = `/tenants/${tenant}/clients`;
    const security = this.evaluateRequest(user, path, 'list');

    if (!security.allowed) {
      return { data: null, security };
    }

    return {
      data: MOCK_CLIENTS[tenant] || [],
      security,
    };
  }

  public async getFinancials(
    user: UserProfile,
    targetTenant?: TenantId
  ): Promise<{ data: FinancialData | null; security: SecurityEvaluationResult }> {
    const tenant = targetTenant || user.tenantId;
    const path = `/tenants/${tenant}/financials`;
    const security = this.evaluateRequest(user, path, 'read');

    if (!security.allowed) {
      return { data: null, security };
    }

    return {
      data: MOCK_FINANCIALS[tenant] || null,
      security,
    };
  }

  public async getOverview(
    user: UserProfile,
    targetTenant?: TenantId
  ): Promise<{
    metrics: OperationalMetric[] | null;
    updates: OperationalUpdate[] | null;
    security: SecurityEvaluationResult;
  }> {
    const tenant = targetTenant || user.tenantId;
    const path = `/tenants/${tenant}/overview`;
    const security = this.evaluateRequest(user, path, 'read');

    if (!security.allowed) {
      return { metrics: null, updates: null, security };
    }

    return {
      metrics: MOCK_OPERATIONAL_METRICS[tenant] || [],
      updates: MOCK_UPDATES[tenant] || [],
      security,
    };
  }

  public async getProjects(
    user: UserProfile,
    targetTenant?: TenantId
  ): Promise<{ data: ProjectData[] | null; security: SecurityEvaluationResult }> {
    const tenant = targetTenant || user.tenantId;
    const path = `/tenants/${tenant}/projects`;
    const security = this.evaluateRequest(user, path, 'list');

    if (!security.allowed) {
      return { data: null, security };
    }

    return {
      data: MOCK_PROJECTS[tenant] || [],
      security,
    };
  }
}

export const firestoreSimulator = new FirestoreSimulator();
