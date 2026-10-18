import React, { createContext, useContext, useState, useRef } from 'react';
import {
  PageId,
  UserItem,
  UserRole,
  CourseItem,
  CompetencyItem,
  AssessmentItem,
  TrainerItem,
  TraineeItem,
  ResourceItem,
  AuditLogItem,
  AnnouncementItem,
  AnnouncementTarget,
  AnnouncementPriority,
  AnnouncementCategory,
  ToastNotificationData,
  CurrentUser,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_COMPETENCIES,
  INITIAL_ASSESSMENTS,
  INITIAL_TRAINERS,
  INITIAL_TRAINEES,
  INITIAL_RESOURCES,
  INITIAL_AUDIT_LOGS,
  INITIAL_ANNOUNCEMENTS,
} from '../data/mockData';

interface PortalContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;

  // Data
  users: UserItem[];
  courses: CourseItem[];
  competencies: CompetencyItem[];
  assessments: AssessmentItem[];
  trainers: TrainerItem[];
  trainees: TraineeItem[];
  resources: ResourceItem[];
  auditLogs: AuditLogItem[];
  announcements: AnnouncementItem[];
  trainersAnnouncements: AnnouncementItem[];
  traineesAnnouncements: AnnouncementItem[];

  // Mutators
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  approveAllPending: () => void;
  approveTrainer: (id: string) => void;
  approveTrainee: (id: string) => void;
  addUser: (user: Omit<UserItem, 'id' | 'joined' | 'initials'>) => void;
  addCourse: (course: Omit<CourseItem, 'id' | 'codeId' | 'learners'>) => void;
  addCompetency: (comp: Omit<CompetencyItem, 'id'>) => void;
  addAssessment: (assessment: Omit<AssessmentItem, 'id'>) => void;
  addResource: (resource: Omit<ResourceItem, 'id' | 'uploadedDate'>) => void;

  // Announcements Actions
  createAnnouncement: (
    data: {
      title: string;
      content: string;
      target: AnnouncementTarget;
      priority: AnnouncementPriority;
      category: AnnouncementCategory;
    },
    pushImmediately?: boolean
  ) => string;
  pushAnnouncement: (id: string, customTarget?: AnnouncementTarget) => void;
  unpushAnnouncement: (id: string) => void;
  togglePushAnnouncement: (id: string) => void;
  deleteAnnouncement: (id: string) => void;

  // Modal Open states
  isInviteUserOpen: boolean;
  setIsInviteUserOpen: (open: boolean) => void;
  isCreateCourseOpen: boolean;
  setIsCreateCourseOpen: (open: boolean) => void;
  isAddCompetencyOpen: boolean;
  setIsAddCompetencyOpen: (open: boolean) => void;
  isCreateAssessmentOpen: boolean;
  setIsCreateAssessmentOpen: (open: boolean) => void;
  isUploadResourceOpen: boolean;
  setIsUploadResourceOpen: (open: boolean) => void;
  isCreateAnnouncementOpen: boolean;
  setIsCreateAnnouncementOpen: (open: boolean) => void;
  isChatBotOpen: boolean;
  setIsChatBotOpen: (open: boolean) => void;
  isChangeRoleOpen: boolean;
  setIsChangeRoleOpen: (open: boolean) => void;
  roleChangeUser: UserItem | null;
  setRoleChangeUser: (user: UserItem | null) => void;
  openChangeRole: (user: UserItem) => void;

  // Notifications
  notificationAlert: string | null;
  setNotificationAlert: (msg: string | null) => void;
  toastNotification: ToastNotificationData | null;
  setToastNotification: (toast: ToastNotificationData | null) => void;
  showToast: (
    msg: string,
    options?: {
      title?: string;
      type?: 'success' | 'info' | 'warning' | 'error';
      badge?: string;
      duration?: number;
    }
  ) => void;

  // Selected User for Dossier Drawer
  selectedUser: UserItem | null;
  setSelectedUser: (user: UserItem | null) => void;
  updateUserRole: (id: string, role: UserRole) => void;

  // Authentication State
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  login: (email?: string, password?: string, role?: UserRole) => boolean;
  logout: () => void;
}

const DEFAULT_CURRENT_USER: CurrentUser = {
  id: 'usr-admin-01',
  name: 'Dr. Mrutyunjay Mohapatra',
  email: 'admin@enterprise.com',
  role: 'ADMIN',
  department: 'Administration & Governance',
  initials: 'D',
};

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(DEFAULT_CURRENT_USER);
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [commandOpen, setCommandOpen] = useState(false);

  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [competencies, setCompetencies] = useState<CompetencyItem[]>(INITIAL_COMPETENCIES);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(INITIAL_ASSESSMENTS);
  const [trainers, setTrainers] = useState<TrainerItem[]>(INITIAL_TRAINERS);
  const [trainees, setTrainees] = useState<TraineeItem[]>(INITIAL_TRAINEES);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);

  // Selected User for Institutional Dossier
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // Modals
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isAddCompetencyOpen, setIsAddCompetencyOpen] = useState(false);
  const [isCreateAssessmentOpen, setIsCreateAssessmentOpen] = useState(false);
  const [isUploadResourceOpen, setIsUploadResourceOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isChangeRoleOpen, setIsChangeRoleOpen] = useState(false);
  const [roleChangeUser, setRoleChangeUser] = useState<UserItem | null>(null);

  const openChangeRole = (user: UserItem) => {
    setRoleChangeUser(user);
    setIsChangeRoleOpen(true);
  };

  const trainersAnnouncements = announcements.filter(
    (a) => a.isPushed && (a.target === 'ALL' || a.target === 'TRAINERS' || a.pushTargets?.trainers)
  );
  const traineesAnnouncements = announcements.filter(
    (a) => a.isPushed && (a.target === 'ALL' || a.target === 'TRAINEES' || a.pushTargets?.trainees)
  );

  const [notificationAlert, setNotificationAlert] = useState<string | null>(null);
  const [toastNotification, setToastNotification] = useState<ToastNotificationData | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  const showToast = (
    msg: string,
    options?: {
      title?: string;
      type?: 'success' | 'info' | 'warning' | 'error';
      badge?: string;
      duration?: number;
    }
  ) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setNotificationAlert(msg);
    setToastNotification({
      id: `toast-${Date.now()}`,
      message: msg,
      title: options?.title || 'System Notification',
      type: options?.type || 'success',
      badge: options?.badge,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToastNotification(null);
      setNotificationAlert(null);
    }, options?.duration || 4500);
  };

  const login = (email: string = 'admin@enterprise.com', _password?: string, role: UserRole = 'ADMIN'): boolean => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const matchedUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    const userToLogin: CurrentUser = matchedUser
      ? {
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
          department: matchedUser.department,
          initials: matchedUser.initials,
        }
      : {
          id: `usr-${Date.now()}`,
          name: trimmedEmail === 'admin@enterprise.com' ? 'Dr. Mrutyunjay Mohapatra' : trimmedEmail.split('@')[0],
          email: trimmedEmail || 'admin@enterprise.com',
          role: role,
          department: role === 'ADMIN' ? 'Administration & Governance' : role === 'TRAINER' ? 'Atmospheric Sciences' : 'Radar & NWP Cohort',
          initials: (trimmedEmail[0] || 'A').toUpperCase(),
        };

    setCurrentUser(userToLogin);
    setIsAuthenticated(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: `Today at ${timeStr}`,
        user: userToLogin.name,
        role: userToLogin.role,
        event: 'LOGIN_SUCCESS',
        details: `Official Sign-in authenticated via Govt. Enterprise RBAC (${userToLogin.email})`,
        ip: '10.24.18.91 (NIC Gateway)',
      },
      ...prev,
    ]);

    showToast(`Welcome back, ${userToLogin.name}!`, {
      title: 'Sign In Successful',
      type: 'success',
      badge: userToLogin.role,
      duration: 4000,
    });

    return true;
  };

  const logout = () => {
    const prevUser = currentUser;
    setIsAuthenticated(false);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: `Today at ${timeStr}`,
        user: prevUser.name,
        role: prevUser.role,
        event: 'LOGOUT',
        details: `Official session terminated by user`,
        ip: '10.24.18.91 (NIC Gateway)',
      },
      ...prev,
    ]);

    showToast('You have been signed out.', {
      title: 'Session Ended',
      type: 'info',
      duration: 3500,
    });
  };

  const approveUser = (id: string) => {
    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Approved' } : u))
    );
    setSelectedUser((prev) => (prev && prev.id === id ? { ...prev, status: 'Approved' } : prev));

    // Sync trainer or trainee status if present
    setTrainers((prev) =>
      prev.map((t) => (t.email === targetUser.email || t.name === targetUser.name ? { ...t, status: 'Approved' } : t))
    );
    setTrainees((prev) =>
      prev.map((tr) =>
        tr.email === targetUser.email || tr.name === targetUser.name
          ? { ...tr, trainingStatus: 'In Progress', riskIndicator: 'Healthy', competencyScore: 70 }
          : tr
      )
    );

    // Log event
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: 'Dr. Mrutyunjay Mohapatra',
        email: 'admin@enterprise.com',
        initials: 'DM',
        role: 'ADMIN',
        event: 'USER_VERIFY_SUCCESS',
        targetType: 'User',
        timestamp: timeStr,
        date: 'Today',
      },
      ...prev,
    ]);

    showToast(`Approved access for ${targetUser.name}`);
  };

  const rejectUser = (id: string) => {
    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Rejected' } : u))
    );
    setSelectedUser((prev) => (prev && prev.id === id ? { ...prev, status: 'Rejected' } : prev));
    showToast(`Rejected registration for ${targetUser.name}`);
  };

  const approveAllPending = () => {
    const pendingUsers = users.filter((u) => u.status === 'Pending');
    if (pendingUsers.length === 0) {
      showToast('No unapproved members pending clearance.');
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.status === 'Pending' ? { ...u, status: 'Approved' } : u))
    );
    setSelectedUser((prev) => (prev && prev.status === 'Pending' ? { ...prev, status: 'Approved' } : prev));

    setTrainers((prev) =>
      prev.map((t) => (t.status === 'Pending' ? { ...t, status: 'Approved' } : t))
    );
    setTrainees((prev) =>
      prev.map((tr) =>
        tr.trainingStatus === 'Pending'
          ? { ...tr, trainingStatus: 'In Progress', riskIndicator: 'Healthy', competencyScore: 70 }
          : tr
      )
    );

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: 'Dr. Mrutyunjay Mohapatra',
        email: 'admin@enterprise.com',
        initials: 'DM',
        role: 'ADMIN',
        event: 'BULK_USER_VERIFY_SUCCESS',
        targetType: `${pendingUsers.length} Unapproved Members Cleared`,
        timestamp: timeStr,
        date: 'Today',
      },
      ...prev,
    ]);

    showToast(`Approved institutional clearance for all ${pendingUsers.length} pending members`);
  };

  const updateUserRole = (id: string, newRole: UserRole) => {
    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) return;
    const oldRole = targetUser.role;

    if (oldRole === newRole) {
      showToast(`User ${targetUser.name} already holds the ${newRole} role.`, {
        title: 'Role Unchanged',
        type: 'info',
        badge: newRole,
      });
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    setSelectedUser((prev) => (prev && prev.id === id ? { ...prev, role: newRole } : prev));
    setRoleChangeUser((prev) => (prev && prev.id === id ? { ...prev, role: newRole } : prev));

    // Synchronize trainers and trainees collections
    if (newRole === 'TRAINER') {
      setTrainees((prev) => prev.filter((tr) => tr.email !== targetUser.email && tr.name !== targetUser.name));
      setTrainers((prev) => {
        const exists = prev.some((t) => t.email === targetUser.email || t.name === targetUser.name);
        if (exists) return prev;
        return [
          {
            id: `tr-${Date.now()}`,
            name: targetUser.name,
            email: targetUser.email,
            initials: targetUser.initials,
            department: targetUser.department,
            designation: 'Specialist Instructor',
            coursesCount: 0,
            learnersCount: 0,
            status: targetUser.status === 'Approved' ? 'Approved' : 'Pending',
          },
          ...prev,
        ];
      });
    } else if (newRole === 'TRAINEE') {
      setTrainers((prev) => prev.filter((t) => t.email !== targetUser.email && t.name !== targetUser.name));
      setTrainees((prev) => {
        const exists = prev.some((tr) => tr.email === targetUser.email || tr.name === targetUser.name);
        if (exists) return prev;
        return [
          {
            id: `trn-${Date.now()}`,
            name: targetUser.name,
            email: targetUser.email,
            initials: targetUser.initials,
            department: targetUser.department,
            enrolledCurricula: 2,
            competencyScore: 72,
            trainingStatus: targetUser.status === 'Approved' ? 'In Progress' : 'Pending',
            riskIndicator: 'Healthy',
          },
          ...prev,
        ];
      });
    } else if (newRole === 'ADMIN') {
      setTrainers((prev) => prev.filter((t) => t.email !== targetUser.email && t.name !== targetUser.name));
      setTrainees((prev) => prev.filter((tr) => tr.email !== targetUser.email && tr.name !== targetUser.name));
    }

    // Audit log
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: 'Dr. Mrutyunjay Mohapatra',
        email: 'admin@enterprise.com',
        initials: 'DM',
        role: 'ADMIN',
        event: 'USER_ROLE_CHANGED',
        targetType: `${targetUser.name}: ${oldRole} → ${newRole}`,
        timestamp: timeStr,
        date: 'Today',
      },
      ...prev,
    ]);

    showToast(`Role for ${targetUser.name} changed from ${oldRole} to ${newRole}`, {
      title: 'User Role Updated',
      type: 'success',
      badge: `${oldRole} → ${newRole}`,
      duration: 5000,
    });
  };

  const approveTrainer = (id: string) => {
    const trainer = trainers.find((t) => t.id === id);
    if (!trainer) return;

    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Approved' } : t))
    );
    setUsers((prev) =>
      prev.map((u) => (u.email === trainer.email || u.name === trainer.name ? { ...u, status: 'Approved' } : u))
    );
    showToast(`Verified faculty accreditation for ${trainer.name}`);
  };

  const approveTrainee = (id: string) => {
    const trainee = trainees.find((t) => t.id === id);
    if (!trainee) return;

    setTrainees((prev) =>
      prev.map((tr) =>
        tr.id === id
          ? { ...tr, trainingStatus: 'In Progress', riskIndicator: 'Healthy', competencyScore: 70, enrolledCurricula: 6 }
          : tr
      )
    );
    setUsers((prev) =>
      prev.map((u) => (u.email === trainee.email || u.name === trainee.name ? { ...u, status: 'Approved' } : u))
    );
    showToast(`Approved training enrollment for ${trainee.name}`);
  };

  const addUser = (userData: Omit<UserItem, 'id' | 'joined' | 'initials'>) => {
    const initials = userData.name
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const newUser: UserItem = {
      ...userData,
      id: `u-${Date.now()}`,
      joined: 'Sep 15, 2026',
      initials,
    };

    setUsers((prev) => [newUser, ...prev]);

    if (userData.role === 'TRAINER') {
      setTrainers((prev) => [
        {
          id: `tr-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          initials,
          department: userData.department,
          designation: 'Senior Scientist / Trainer',
          coursesCount: 1,
          learnersCount: 32,
          status: userData.status === 'Approved' ? 'Approved' : 'Pending',
        },
        ...prev,
      ]);
    } else if (userData.role === 'TRAINEE') {
      setTrainees((prev) => [
        {
          id: `te-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          initials,
          department: userData.department,
          enrolledCurricula: 6,
          competencyScore: 70,
          trainingStatus: 'In Progress',
          riskIndicator: 'Healthy',
        },
        ...prev,
      ]);
    }

    showToast(`Invited ${userData.name} as ${userData.role}`);
  };

  const addCourse = (courseData: Omit<CourseItem, 'id' | 'codeId' | 'learners'>) => {
    const codeId = Math.random().toString(16).substring(2, 10);
    const newCourse: CourseItem = {
      ...courseData,
      id: `c-${Date.now()}`,
      codeId,
      learners: 32,
    };
    setCourses((prev) => [newCourse, ...prev]);
    showToast(`Created curriculum module: "${courseData.title}"`);
  };

  const addCompetency = (compData: Omit<CompetencyItem, 'id'>) => {
    const newComp: CompetencyItem = {
      ...compData,
      id: `comp-${Date.now()}`,
    };
    setCompetencies((prev) => [newComp, ...prev]);
    showToast(`Added competency framework: "${compData.name}"`);
  };

  const addAssessment = (assessmentData: Omit<AssessmentItem, 'id'>) => {
    const newAssessment: AssessmentItem = {
      ...assessmentData,
      id: `a-${Date.now()}`,
    };
    setAssessments((prev) => [newAssessment, ...prev]);
    showToast(`Created assessment: "${assessmentData.title}"`);
  };

  const addResource = (resourceData: Omit<ResourceItem, 'id' | 'uploadedDate'>) => {
    const newResource: ResourceItem = {
      ...resourceData,
      id: `res-${Date.now()}`,
      uploadedDate: 'Sep 15, 2026',
    };
    setResources((prev) => [newResource, ...prev]);
    showToast(`Uploaded resource: "${resourceData.title}"`);
  };

  const createAnnouncement = (
    data: {
      title: string;
      content: string;
      target: AnnouncementTarget;
      priority: AnnouncementPriority;
      category: AnnouncementCategory;
    },
    pushImmediately = false
  ) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const pushTargets = {
      trainers: pushImmediately && (data.target === 'ALL' || data.target === 'TRAINERS'),
      trainees: pushImmediately && (data.target === 'ALL' || data.target === 'TRAINEES'),
    };

    const deliveryStats = {
      trainersCount: pushTargets.trainers ? trainers.length : 0,
      traineesCount: pushTargets.trainees ? trainees.length : 0,
      readCount: 0,
    };

    const newAnnouncement: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: data.title,
      content: data.content,
      target: data.target,
      priority: data.priority,
      category: data.category,
      createdAt: dateStr,
      author: 'DG IMD Institutional Governance Admin',
      isPushed: pushImmediately,
      pushedAt: pushImmediately ? `${dateStr} • ${timeStr}` : undefined,
      pushTargets,
      deliveryStats,
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: 'Dr. M. Mohapatra',
        email: 'dg.governance@imd.gov.in',
        initials: 'MM',
        role: 'DG_IMD_ADMIN',
        event: pushImmediately
          ? `Broadcast Announcement Created & Pushed (${data.target})`
          : `Announcement Created as Draft (${data.target})`,
        targetType: data.target === 'ALL' ? 'Trainers & Trainees' : data.target,
        timestamp: timeStr,
        date: dateStr,
      },
      ...prev,
    ]);

    if (pushImmediately) {
      const targetLabel =
        data.target === 'ALL' ? 'Trainers & Trainees' : data.target === 'TRAINERS' ? 'Trainers' : 'Trainees';
      showToast(`Announcement created & pushed live to ${targetLabel}!`);
    } else {
      showToast(`Announcement created as draft (Not pushed)`);
    }

    return newAnnouncement.id;
  };

  const pushAnnouncement = (id: string, customTarget?: AnnouncementTarget) => {
    const ann = announcements.find((a) => a.id === id);
    if (!ann) return;

    const effectiveTarget = customTarget || ann.target;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const pushTargets = {
      trainers: effectiveTarget === 'ALL' || effectiveTarget === 'TRAINERS',
      trainees: effectiveTarget === 'ALL' || effectiveTarget === 'TRAINEES',
    };

    const deliveryStats = {
      trainersCount: pushTargets.trainers ? trainers.length : 0,
      traineesCount: pushTargets.trainees ? trainees.length : 0,
      readCount: 1,
    };

    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              target: effectiveTarget,
              isPushed: true,
              pushedAt: `${dateStr} • ${timeStr}`,
              pushTargets,
              deliveryStats,
            }
          : a
      )
    );

    const targetLabel =
      effectiveTarget === 'ALL' ? 'Trainers & Trainees' : effectiveTarget === 'TRAINERS' ? 'Trainers' : 'Trainees';

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        actor: 'Dr. M. Mohapatra',
        email: 'dg.governance@imd.gov.in',
        initials: 'MM',
        role: 'DG_IMD_ADMIN',
        event: `Announcement Broadcast Pushed to ${targetLabel}`,
        targetType: targetLabel,
        timestamp: timeStr,
        date: dateStr,
      },
      ...prev,
    ]);

    showToast(`Pushed "${ann.title}" to ${targetLabel} portal!`);
  };

  const unpushAnnouncement = (id: string) => {
    const ann = announcements.find((a) => a.id === id);
    if (!ann) return;

    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              isPushed: false,
              pushTargets: { trainers: false, trainees: false },
            }
          : a
      )
    );

    showToast(`Recalled announcement "${ann.title}" from portals`);
  };

  const togglePushAnnouncement = (id: string) => {
    const ann = announcements.find((a) => a.id === id);
    if (!ann) return;
    if (ann.isPushed) {
      unpushAnnouncement(id);
    } else {
      pushAnnouncement(id);
    }
  };

  const deleteAnnouncement = (id: string) => {
    const ann = announcements.find((a) => a.id === id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    if (ann) {
      showToast(`Deleted announcement: "${ann.title}"`);
    }
  };

  return (
    <PortalContext.Provider
      value={{
        activePage,
        setActivePage,
        sidebarCollapsed,
        setSidebarCollapsed,
        globalSearch,
        setGlobalSearch,
        commandOpen,
        setCommandOpen,
        users,
        courses,
        competencies,
        assessments,
        trainers,
        trainees,
        resources,
        auditLogs,
        announcements,
        trainersAnnouncements,
        traineesAnnouncements,
        approveUser,
        rejectUser,
        approveAllPending,
        approveTrainer,
        approveTrainee,
        addUser,
        addCourse,
        addCompetency,
        addAssessment,
        addResource,
        createAnnouncement,
        pushAnnouncement,
        unpushAnnouncement,
        togglePushAnnouncement,
        deleteAnnouncement,
        selectedUser,
        setSelectedUser,
        updateUserRole,
        isInviteUserOpen,
        setIsInviteUserOpen,
        isCreateCourseOpen,
        setIsCreateCourseOpen,
        isAddCompetencyOpen,
        setIsAddCompetencyOpen,
        isCreateAssessmentOpen,
        setIsCreateAssessmentOpen,
        isUploadResourceOpen,
        setIsUploadResourceOpen,
        isCreateAnnouncementOpen,
        setIsCreateAnnouncementOpen,
        isChatBotOpen,
        setIsChatBotOpen,
        isChangeRoleOpen,
        setIsChangeRoleOpen,
        roleChangeUser,
        setRoleChangeUser,
        openChangeRole,
        notificationAlert,
        setNotificationAlert,
        toastNotification,
        setToastNotification,
        showToast,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
