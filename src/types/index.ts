export type TenantId = 
  | 'tenant-aero'
  | 'tenant-bio'
  | 'tenant-fin'
  | 'tenant-energy'
  | 'tenant-logistics'
  | 'tenant-retail'
  | 'tenant-cyber';

export type UserRole = 'standard' | 'manager';

export interface SubsidiaryTenant {
  id: TenantId;
  name: string;
  code: string;
  sector: string;
  tagline: string;
  description: string;
  headquarters: string;
  founded: number;
  employeeCount: number;
  currency: string;
  brandColor: string; // Tailwind color class or hex
  theme: {
    primaryBg: string;
    badgeBg: string;
    badgeText: string;
    accentBorder: string;
    gradient: string;
  };
  iconName: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  roleLabel: string;
  tenantId: TenantId;
  department: string;
  title: string;
  clearanceLevel: string;
}

export interface AuthToken {
  uid: string;
  email: string;
  tenantId: TenantId;
  role: UserRole;
  name: string;
  iat: number;
  exp: number;
}

export interface RuleEvaluationStep {
  name: string;
  ruleCode: string;
  passed: boolean;
  reason: string;
}

export interface SecurityEvaluationResult {
  allowed: boolean;
  status: 200 | 403 | 401;
  errorCode?: string;
  errorMessage?: string;
  matchedRule: string;
  steps: RuleEvaluationStep[];
  path: string;
  operation: 'read' | 'write' | 'list';
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userTenantId: TenantId;
  targetTenantId: TenantId;
  targetPath: string;
  operation: 'read' | 'write' | 'list';
  status: 'ALLOWED' | 'DENIED';
  ruleMatched: string;
  reason: string;
}

export interface ClientData {
  id: string;
  name: string;
  code: string;
  industry: string;
  contractValue: number;
  tier: 'Strategic' | 'Enterprise' | 'Tier-1 Partner';
  status: 'Active' | 'Under Review' | 'Renewing';
  primaryContact: string;
  contactEmail: string;
  ndaStatus: 'Active NDA (Signed)' | 'Bilateral Compliance' | 'Strict Military NDA';
  renewalDate: string;
  sensitiveNotes: string;
}

export interface FinancialData {
  totalRevenue: number;
  revenueGrowth: number;
  grossMargin: number;
  ebitda: number;
  ebitdaMargin: number;
  runwayMonths: number;
  cashReserves: number;
  monthlyBurn: number;
  quarterlyMetrics: {
    quarter: string;
    revenue: number;
    expenses: number;
    ebitda: number;
  }[];
  costBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  recentInvoices: {
    id: string;
    client: string;
    amount: number;
    dueDate: string;
    status: 'Paid' | 'Pending' | 'Overdue';
  }[];
}

export interface OperationalMetric {
  id: string;
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  subtext: string;
}

export interface ProjectData {
  id: string;
  title: string;
  code: string;
  lead: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Normal';
  status: 'In Progress' | 'Operational' | 'Testing' | 'On Hold';
  progress: number;
  deadline: string;
  budgetUtilized: number;
  teamSize: number;
}

export interface OperationalUpdate {
  id: string;
  title: string;
  timestamp: string;
  author: string;
  type: 'deployment' | 'audit' | 'milestone' | 'incident';
  summary: string;
}
