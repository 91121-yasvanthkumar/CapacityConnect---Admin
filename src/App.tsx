import React from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './views/DashboardView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { UsersView } from './views/UsersView';
import { CoursesView } from './views/CoursesView';
import { CompetenciesView } from './views/CompetenciesView';
import { AssessmentsView } from './views/AssessmentsView';
import { TrainersView } from './views/TrainersView';
import { TraineesView } from './views/TraineesView';
import { ResourcesView } from './views/ResourcesView';
import { AnalyticsView } from './views/AnalyticsView';
import { AiInsightsView } from './views/AiInsightsView';
import { SettingsView } from './views/SettingsView';
import { AuditLogsView } from './views/AuditLogsView';

// Modals
import { InviteUserModal } from './components/modals/InviteUserModal';
import { CreateCourseModal } from './components/modals/CreateCourseModal';
import { AddCompetencyModal } from './components/modals/AddCompetencyModal';
import { CreateAssessmentModal } from './components/modals/CreateAssessmentModal';
import { UploadResourceModal } from './components/modals/UploadResourceModal';
import { CreateAnnouncementModal } from './components/modals/CreateAnnouncementModal';
import { CommandPalette } from './components/modals/CommandPalette';
import { ChangeRoleModal } from './components/modals/ChangeRoleModal';
import { UserDossierDrawer } from './components/UserDossierDrawer';
import { ChatBot } from './components/chat/ChatBot';
import { ToastNotification } from './components/ui/ToastNotification';
import { LoginPage } from './views/LoginPage';

const MainLayout: React.FC = () => {
  const { activePage } = usePortal();

  const renderActiveView = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'users':
        return <UsersView />;
      case 'courses':
        return <CoursesView />;
      case 'competencies':
        return <CompetenciesView />;
      case 'assessments':
        return <AssessmentsView />;
      case 'trainers':
        return <TrainersView />;
      case 'trainees':
        return <TraineesView />;
      case 'resources':
        return <ResourcesView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'ai-insights':
        return <AiInsightsView />;
      case 'settings':
        return <SettingsView />;
      case 'audit-logs':
        return <AuditLogsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 antialiased font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <InviteUserModal />
      <CreateCourseModal />
      <AddCompetencyModal />
      <CreateAssessmentModal />
      <UploadResourceModal />
      <CreateAnnouncementModal />
      <CommandPalette />
      <ChangeRoleModal />
      <UserDossierDrawer />
      <ChatBot />

      {/* Global Toast Notification System */}
      <ToastNotification />
    </div>
  );
};

const RootContent: React.FC = () => {
  const { isAuthenticated } = usePortal();

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <ToastNotification />
      </>
    );
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <PortalProvider>
      <RootContent />
    </PortalProvider>
  );
}
