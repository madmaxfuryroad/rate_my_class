import clsx, { ClassValue } from 'clsx';

/**
 * Utility function to merge classnames
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get difficulty color based on value
 */
export function getDifficultyColor(difficulty: number): string {
  if (difficulty <= 3) return 'text-accent-cyan';
  if (difficulty <= 6) return 'text-accent-blue';
  if (difficulty <= 8) return 'text-accent-purple';
  return 'text-accent-pink';
}

/**
 * Get workload color based on hours
 */
export function getWorkloadColor(hours: number): string {
  if (hours <= 3) return 'text-accent-cyan';
  if (hours <= 6) return 'text-accent-blue';
  if (hours <= 10) return 'text-accent-purple';
  return 'text-accent-pink';
}
