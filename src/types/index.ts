export type PageId =
  | 'dashboard'
  | 'announcements'
  | 'users'
  | 'courses'
  | 'competencies'
  | 'assessments'
  | 'trainers'
  | 'trainees'
  | 'resources'
  | 'analytics'
  | 'ai-insights'
  | 'settings'
  | 'audit-logs';

export type UserRole = 'ADMIN' | 'TRAINER' | 'TRAINEE';
export type UserStatus = 'Pending' | 'Approved' | 'Rejected';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  joined: string;
  initials: string;
}

export type CourseDifficulty = 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type CourseStatus = 'Draft' | 'Published';

export interface CourseItem {
  id: string;
  codeId: string;
  title: string;
  domain: string;
  instructor: string;
  difficulty: CourseDifficulty;
  learners: number;
  status: CourseStatus;
}

export type HealthStatus = 'Needs Attention' | 'Developing' | 'Healthy';

export interface CompetencyItem {
  id: string;
  code: string;
  name: string;
  domain: string;
  mappedLearners: number;
  averageMastery: number; // e.g. 51
  masteryRate: number; // e.g. 56
  healthStatus: HealthStatus;
}

export type EvaluationType = 'MCQ' | 'Practical' | 'Oral Diagnostic';
export type AssessmentStatus = 'Draft' | 'Published';

export interface AssessmentItem {
  id: string;
  title: string;
  evaluationType: EvaluationType;
  passingScore: number; // e.g. 70
  durationMins: number; // e.g. 30
  status: AssessmentStatus;
}

export interface TrainerItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  department: string;
  designation: string;
  coursesCount: number;
  learnersCount: number;
  status: 'Pending' | 'Approved';
}

export type TraineeStatus = 'Pending' | 'In Progress' | 'Completed';
export type RiskIndicator = 'Pending Approval' | 'Healthy' | 'Forgetting Risk';

export interface TraineeItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  department: string;
  enrolledCurricula: number;
  competencyScore: number | null; // null if pending
  trainingStatus: TraineeStatus;
  riskIndicator: RiskIndicator;
}

export type MediaType = 'Manual' | 'Video Briefing' | 'WMO Guide' | 'Dataset' | 'Document';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  fileSize: string;
  status: 'Published' | 'Draft';
  url?: string;
  uploadedDate: string;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  email: string;
  initials: string;
  role: string;
  event: string;
  targetType: string;
  timestamp: string;
  date: string;
}

export interface SkillGapItem {
  id: string;
  title: string;
  domain: string;
  learnersCount: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  cohortCompetency: number;
  forgettingRisk: string;
  forgettingRiskPct: number;
  curriculumImportance: string;
  prerequisiteImpact: string;
  explanation: string;
  recommendedAction: string;
  actionDuration: string;
}

export type AnnouncementTarget = 'ALL' | 'TRAINERS' | 'TRAINEES';
export type AnnouncementPriority = 'NORMAL' | 'HIGH' | 'URGENT';
export type AnnouncementCategory =
  | 'Curriculum Update'
  | 'Exam Schedule'
  | 'Operational Alert'
  | 'Administrative'
  | 'Workshop & Webinar';

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  target: AnnouncementTarget; // 'ALL' | 'TRAINERS' | 'TRAINEES'
  priority: AnnouncementPriority;
  category: AnnouncementCategory;
  createdAt: string;
  author: string;
  isPushed: boolean; // Indicates whether pushed to portals or in draft
  pushedAt?: string;
  pushTargets?: {
    trainers: boolean;
    trainees: boolean;
  };
  deliveryStats?: {
    trainersCount: number;
    traineesCount: number;
    readCount: number;
  };
}

export interface ToastNotificationData {
  id: string;
  message: string;
  title?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  badge?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  initials: string;
}
