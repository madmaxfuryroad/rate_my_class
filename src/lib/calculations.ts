import {
  Review,
  AggregatedMetrics,
  LearningStyle,
  AssessmentMix,
  SkillRequirements,
} from '@/types';

/**
 * Calculate aggregated metrics from an array of reviews
 */
export function calculateAggregatedMetrics(
  reviews: Review[]
): AggregatedMetrics | null {
  if (reviews.length === 0) return null;

  const totalReviews = reviews.length;

  // Calculate averages for simple metrics
  const averageDifficulty =
    reviews.reduce((sum, r) => sum + r.metrics.difficulty, 0) / totalReviews;
  const averageHoursPerWeek =
    reviews.reduce((sum, r) => sum + r.metrics.hoursPerWeek, 0) / totalReviews;

  // Calculate learning style percentages
  const learningStyle: LearningStyle = {
    memorization: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.learningStyle.memorization, 0) /
        totalReviews
    ),
    practice: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.learningStyle.practice, 0) /
        totalReviews
    ),
    projects: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.learningStyle.projects, 0) /
        totalReviews
    ),
  };

  // Calculate assessment mix percentages
  const assessmentMix: AssessmentMix = {
    tests: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.assessmentMix.tests, 0) /
        totalReviews
    ),
    essays: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.assessmentMix.essays, 0) /
        totalReviews
    ),
    labs: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.assessmentMix.labs, 0) /
        totalReviews
    ),
    presentations: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.assessmentMix.presentations, 0) /
        totalReviews
    ),
    homework: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.assessmentMix.homework, 0) /
        totalReviews
    ),
    projects: Math.round(
      reviews.reduce((sum, r) => sum + r.metrics.assessmentMix.projects, 0) /
        totalReviews
    ),
  };

  // Calculate skill requirements averages
  const skillRequirements: SkillRequirements = {
    timeManagement: parseFloat(
      (
        reviews.reduce(
          (sum, r) => sum + r.metrics.skillRequirements.timeManagement,
          0
        ) / totalReviews
      ).toFixed(1)
    ),
    writing: parseFloat(
      (
        reviews.reduce((sum, r) => sum + r.metrics.skillRequirements.writing, 0) /
        totalReviews
      ).toFixed(1)
    ),
    math: parseFloat(
      (
        reviews.reduce((sum, r) => sum + r.metrics.skillRequirements.math, 0) /
        totalReviews
      ).toFixed(1)
    ),
    problemSolving: parseFloat(
      (
        reviews.reduce(
          (sum, r) => sum + r.metrics.skillRequirements.problemSolving,
          0
        ) / totalReviews
      ).toFixed(1)
    ),
    memorization: parseFloat(
      (
        reviews.reduce(
          (sum, r) => sum + r.metrics.skillRequirements.memorization,
          0
        ) / totalReviews
      ).toFixed(1)
    ),
    criticalThinking: parseFloat(
      (
        reviews.reduce(
          (sum, r) => sum + r.metrics.skillRequirements.criticalThinking,
          0
        ) / totalReviews
      ).toFixed(1)
    ),
  };

  return {
    averageDifficulty: parseFloat(averageDifficulty.toFixed(1)),
    averageHoursPerWeek: parseFloat(averageHoursPerWeek.toFixed(1)),
    totalReviews,
    learningStyle,
    assessmentMix,
    skillRequirements,
  };
}
