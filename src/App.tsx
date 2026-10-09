import React, { useState } from 'react';
import {
  Info,
} from 'lucide-react';
import {
  SubsidiaryTenant,
  TenantId,
} from './types';
import {
  SUBSIDIARY_TENANTS,
  MOCK_USERS,
  MOCK_OPERATIONAL_METRICS,
  MOCK_UPDATES,
  MOCK_PROJECTS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { TenantHeader } from './components/TenantHeader';
import { OverviewTab } from './components/OverviewTab';
import { ProjectsTab } from './components/ProjectsTab';
import { ClientsTab } from './components/ClientsTab';
import { FinancialsTab } from './components/FinancialsTab';
import { SecurityLabTab } from './components/SecurityLabTab';
import { UserSwitcherModal } from './components/UserSwitcherModal';

export default function App() {
  // Start with Tariq Hendricks (Standard Employee at Kalahari Green Energy & Solar in Upington/Cape Town)
  // so the user immediately experiences the South African multi-tenant isolation & RBAC blocking
  const [currentUserId, setCurrentUserId] = useState<string>('usr-energy-emp');
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'clients' | 'financials' | 'security'>('overview');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [showTesterGuide, setShowTesterGuide] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // We track the active subsidiary app being viewed
  const [activeTenantId, setActiveTenantId] = useState<TenantId>('tenant-energy');

  const currentUser = MOCK_USERS.find((u) => u.id === currentUserId) || MOCK_USERS[0];
  const currentTenant = SUBSIDIARY_TENANTS[activeTenantId] || SUBSIDIARY_TENANTS[currentUser.tenantId] || SUBSIDIARY_TENANTS['tenant-energy'];
  const allTenantsList = Object.values(SUBSIDIARY_TENANTS);

  // When a user selects a subsidiary web app from the left bar:
  const handleSelectTenantFromSidebar = (tenant: SubsidiaryTenant) => {
    setActiveTenantId(tenant.id);
    // Automatically align with corresponding user in that subsidiary to simulate testing that web app
    const correspondingUser = MOCK_USERS.find(
      (u) => u.tenantId === tenant.id && u.role === currentUser.role
    ) || MOCK_USERS.find((u) => u.tenantId === tenant.id);

    if (correspondingUser) {
      setCurrentUserId(correspondingUser.id);
    }
  };

  // Switch to Manager role within the active subsidiary business
  const handleSwitchToManager = () => {
    const manager = MOCK_USERS.find(
      (u) => u.tenantId === currentTenant.id && u.role === 'manager'
    );
    if (manager) {
      setCurrentUserId(manager.id);
    }
  };

  // Switch to Standard role within the active subsidiary business
  const handleSwitchToStandard = () => {
    const employee = MOCK_USERS.find(
      (u) => u.tenantId === currentTenant.id && u.role === 'standard'
    );
    if (employee) {
      setCurrentUserId(employee.id);
    }
  };

  const handleSelectUser = (user: typeof currentUser) => {
    setCurrentUserId(user.id);
    setActiveTenantId(user.tenantId);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex">
      {/* 1. Left Sidebar: Hosts all 7 South African Subsidiary Web Apps and App Modules */}
      <Sidebar
        currentTenant={currentTenant}
        currentUser={currentUser}
        allTenants={allTenantsList}
        allUsers={MOCK_USERS}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onSelectTenant={handleSelectTenantFromSidebar}
        onSelectUser={handleSelectUser}
        onOpenUserModal={() => setIsUserModalOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper: Offset by the left sidebar on desktop (lg:pl-72) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          currentTenant={currentTenant}
          allUsers={MOCK_USERS}
          activeTab={activeTab}
          onSelectUser={handleSelectUser}
          onOpenUserModal={() => setIsUserModalOpen(true)}
          onOpenSecurityLab={() => setActiveTab('security')}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        />

        {/* South African Guided Testing Banner */}
        {showTesterGuide && (
          <div className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800 px-4 py-2.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">
                  <strong className="text-white">Ubuntu Apex Holdings (South Africa):</strong> Logged in as{' '}
                  <strong className="text-white">{currentUser.name}</strong> (
                  {currentUser.role === 'manager' ? (
                    <span className="text-amber-300 font-bold">Manager / Admin</span>
                  ) : (
                    <span className="text-sky-300 font-bold">Standard Employee</span>
                  )}
                  ) at <strong className="text-white">{currentTenant.name}</strong>. Select any of the 7 web apps in the left bar, or test{' '}
                  <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Client CRM (POPIA)</code> and{' '}
                  <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">Financial Analytics (ZAR)</code>.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {currentUser.role === 'standard' ? (
                  <button
                    onClick={handleSwitchToManager}
                    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-[11px] transition-colors cursor-pointer"
                  >
                    Switch to Manager
                  </button>
                ) : (
                  <button
                    onClick={handleSwitchToStandard}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded text-[11px] transition-colors cursor-pointer border border-slate-700"
                  >
                    Switch to Employee
                  </button>
                )}
                <button
                  onClick={() => setShowTesterGuide(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs ml-1"
                  title="Dismiss guide"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Subsidiary Banner */}
        <TenantHeader
          tenant={currentTenant}
          currentUser={currentUser}
        />

        {/* Main Workspace Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <OverviewTab
              tenant={currentTenant}
              currentUser={currentUser}
              metrics={MOCK_OPERATIONAL_METRICS[currentTenant.id] || []}
              updates={MOCK_UPDATES[currentTenant.id] || []}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              tenant={currentTenant}
              currentUser={currentUser}
              projects={MOCK_PROJECTS[currentTenant.id] || []}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsTab
              tenant={currentTenant}
              currentUser={currentUser}
              onSwitchToManager={handleSwitchToManager}
            />
          )}

          {activeTab === 'financials' && (
            <FinancialsTab
              tenant={currentTenant}
              currentUser={currentUser}
              onSwitchToManager={handleSwitchToManager}
            />
          )}

          {activeTab === 'security' && (
            <SecurityLabTab
              currentUser={currentUser}
              allTenants={allTenantsList}
              allUsers={MOCK_USERS}
              onSelectUser={handleSelectUser}
            />
          )}
        </main>

        {/* South African Enterprise Footer */}
        <footer className="bg-white border-t border-slate-200 mt-auto py-5 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-800">Ubuntu Apex Holdings</span>
              <span>·</span>
              <span>Sandton · Cape Town · Durban</span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">POPIA Section 19 &amp; B-BBEE Level 1</span>
              <span>·</span>
              <span className="font-mono text-sky-700">Firestore Multi-Tenant Isolation</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
              <span>Partition: <strong className="text-slate-600">/tenants/{currentTenant.id}</strong></span>
              <span>·</span>
              <span>Clearance: <strong className="text-slate-600">{currentUser.clearanceLevel.split(' ')[0]} {currentUser.clearanceLevel.split(' ')[1]}</strong></span>
            </div>
          </div>
        </footer>
      </div>

      {/* 14-Profile Switcher Modal */}
      <UserSwitcherModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        currentUser={currentUser}
        allUsers={MOCK_USERS}
        allTenants={allTenantsList}
        onSelectUser={handleSelectUser}
      />
    </div>
  );
}
