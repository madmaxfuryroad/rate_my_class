'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/types';
import { formatDate, getDifficultyColor, getWorkloadColor } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ReviewCardProps {
  review: Review;
  classId?: string;
}

export default function ReviewCard({ review, classId }: ReviewCardProps) {
  const [isMyReview, setIsMyReview] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if this review belongs to the current user
    const myReviews = JSON.parse(localStorage.getItem('myReviews') || '[]');
    setIsMyReview(myReviews.includes(review.id));
  }, [review.id]);

  const handleDelete = async () => {
    if (!classId || !confirm('Are you sure you want to delete this review?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/reviews?classId=${classId}&reviewId=${review.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from localStorage
        const myReviews = JSON.parse(localStorage.getItem('myReviews') || '[]');
        const updatedReviews = myReviews.filter((id: string) => id !== review.id);
        localStorage.setItem('myReviews', JSON.stringify(updatedReviews));

        // Reload page to show updated reviews
        window.location.reload();
      } else {
        alert('Failed to delete review. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="p-6 rounded-xl bg-background-secondary/50 border border-border hover:border-accent-blue/50 transition-all duration-300 relative">
      {/* Delete button for own reviews */}
      {isMyReview && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-2 rounded-lg bg-background-tertiary hover:bg-accent-pink/20 text-text-muted hover:text-accent-pink transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete your review"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}

      {/* Author name */}
      <div className="mb-3">
        <p className="text-sm font-medium text-accent-purple flex items-center gap-2">
          <span>✍️</span>
          {review.authorName || 'Anonymous'}
          {isMyReview && (
            <span className="text-xs text-accent-cyan">(You)</span>
          )}
        </p>
      </div>

      {/* Header with timestamp */}
      <div className="flex items-center justify-between mb-4">
        <time className="text-xs text-text-muted">
          {formatDate(review.timestamp)}
        </time>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium bg-background-tertiary ${getDifficultyColor(review.metrics.difficulty)}`}
          >
            Difficulty: {review.metrics.difficulty}/10
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium bg-background-tertiary ${getWorkloadColor(review.metrics.hoursPerWeek)}`}
          >
            {review.metrics.hoursPerWeek} hrs/week
          </span>
        </div>
      </div>

      {/* Review responses */}
      <div className="space-y-4">
        <ReviewResponse
          icon="👥"
          prompt="Who would thrive in this class?"
          response={review.responses.whoWouldThrive}
        />
        <ReviewResponse
          icon="💡"
          prompt="What surprised you?"
          response={review.responses.whatSurprised}
        />
        <ReviewResponse
          icon="🎯"
          prompt="What skills mattered most?"
          response={review.responses.skillsThatMattered}
        />
        {review.responses.additionalThoughts && (
          <ReviewResponse
            icon="💭"
            prompt="Additional thoughts"
            response={review.responses.additionalThoughts}
          />
        )}
      </div>

      {/* Metrics preview */}
      <div className="mt-6 pt-6 border-t border-border-accent">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-text-muted mb-1">Learning Style</p>
            <div className="flex gap-1 justify-center">
              <span className="text-xs text-accent-pink">
                M:{review.metrics.learningStyle.memorization}%
              </span>
              <span className="text-xs text-accent-blue">
                P:{review.metrics.learningStyle.practice}%
              </span>
              <span className="text-xs text-accent-purple">
                Pr:{review.metrics.learningStyle.projects}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Top Assessment</p>
            <p className="text-sm font-medium text-accent-blue">
              {getTopAssessment(review.metrics.assessmentMix)}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Top Skill</p>
            <p className="text-sm font-medium text-accent-purple">
              {getTopSkill(review.metrics.skillRequirements)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ReviewResponse({
  icon,
  prompt,
  response,
}: {
  icon: string;
  prompt: string;
  response: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-accent-blue mb-2 flex items-center gap-2">
        <span>{icon}</span>
        {prompt}
      </p>
      <p className="text-sm text-text-secondary leading-relaxed">{response}</p>
    </div>
  );
}

function getTopAssessment(assessmentMix: any): string {
  const entries = Object.entries(assessmentMix);
  const top = entries.reduce((a, b) => ((a[1] as number) > (b[1] as number) ? a : b));
  return top[0].charAt(0).toUpperCase() + top[0].slice(1);
}

function getTopSkill(skillRequirements: any): string {
  const entries = Object.entries(skillRequirements);
  const top = entries.reduce((a, b) => ((a[1] as number) > (b[1] as number) ? a : b));
  const skill = top[0]
    .replace(/([A-Z])/g, ' $1')
    .trim();
  return skill.charAt(0).toUpperCase() + skill.slice(1);
}
