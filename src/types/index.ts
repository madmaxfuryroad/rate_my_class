// Subject and Course Types
export type SubjectId =
  | 'math'
  | 'english'
  | 'history'
  | 'science'
  | 'language'
  | 'arts'
  | 'pathways'
  | 'physical-education';

export interface Subject {
  id: SubjectId;
  name: string;
  color: string;
  icon: string;
}

export type ClassLevel = 'standard' | 'honors' | 'ap' | 'ib';

export interface Class {
  id: string;
  name: string;
  subject: SubjectId;
  school: string;
  level: ClassLevel;
  code: string;
  description: string;
  metadata: {
    gradeLevel: number;
    prerequisites: string[];
    credits: number;
  };
}

// Review Metrics
export interface LearningStyle {
  memorization: number; // 0-100
  practice: number;     // 0-100
  projects: number;     // 0-100
}

export interface AssessmentMix {
  tests: number;        // 0-100
  essays: number;       // 0-100
  labs: number;         // 0-100
  presentations: number; // 0-100
  homework: number;     // 0-100
  projects: number;     // 0-100
}

export interface SkillRequirements {
  timeManagement: number;   // 1-10
  writing: number;          // 1-10
  math: number;             // 1-10
  problemSolving: number;   // 1-10
  memorization: number;     // 1-10
  criticalThinking: number; // 1-10
}

export interface ReviewMetrics {
  difficulty: number;        // 1-10
  hoursPerWeek: number;      // 0-30
  learningStyle: LearningStyle;
  assessmentMix: AssessmentMix;
  skillRequirements: SkillRequirements;
}

export interface ReviewResponses {
  whoWouldThrive: string;
  whatSurprised: string;
  skillsThatMattered: string;
  additionalThoughts?: string;
}

export interface Review {
  id: string;
  timestamp: string;
  authorName?: string; // Optional: "Anonymous" if not provided
  metrics: ReviewMetrics;
  responses: ReviewResponses;
}

export interface AggregatedMetrics {
  averageDifficulty: number;
  averageHoursPerWeek: number;
  totalReviews: number;
  learningStyle: LearningStyle;
  assessmentMix: AssessmentMix;
  skillRequirements: SkillRequirements;
}

export interface ClassReviews {
  classId: string;
  reviews: Review[];
  aggregatedMetrics: AggregatedMetrics | null;
}

// Filters
export interface ClassFilters {
  school?: string;
  subject?: SubjectId;
  level?: ClassLevel;
  searchQuery?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
