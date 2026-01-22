'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewFormData } from '@/lib/validation';

interface ReviewFormProps {
  classId: string;
}

export default function ReviewForm({ classId }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      classId,
      authorName: '',
      metrics: {
        difficulty: 5,
        hoursPerWeek: 5,
        learningStyle: {
          memorization: 33,
          practice: 34,
          projects: 33,
        },
        assessmentMix: {
          tests: 40,
          essays: 10,
          labs: 10,
          presentations: 10,
          homework: 20,
          projects: 10,
        },
        skillRequirements: {
          timeManagement: 5,
          writing: 5,
          math: 5,
          problemSolving: 5,
          memorization: 5,
          criticalThinking: 5,
        },
      },
      responses: {
        whoWouldThrive: '',
        whatSurprised: '',
        skillsThatMattered: '',
        additionalThoughts: '',
      },
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // Store review ID in localStorage so user can delete their own reviews
        const myReviews = JSON.parse(localStorage.getItem('myReviews') || '[]');
        myReviews.push(result.review.id);
        localStorage.setItem('myReviews', JSON.stringify(myReviews));

        setSubmitSuccess(true);
        reset();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.error || 'Failed to submit review');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-accent-blue/30 text-center">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-xl font-bold text-accent-blue mb-2">Thank you!</p>
        <p className="text-text-secondary">
          Your review has been submitted successfully.
        </p>
      </div>
    );
  }

  const learningStyleSum =
    watch('metrics.learningStyle.memorization') +
    watch('metrics.learningStyle.practice') +
    watch('metrics.learningStyle.projects');

  const assessmentMixSum =
    watch('metrics.assessmentMix.tests') +
    watch('metrics.assessmentMix.essays') +
    watch('metrics.assessmentMix.labs') +
    watch('metrics.assessmentMix.presentations') +
    watch('metrics.assessmentMix.homework') +
    watch('metrics.assessmentMix.projects');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 rounded-xl bg-background-secondary border border-border"
    >
      {submitError && (
        <div className="p-4 rounded-lg bg-accent-pink/20 border border-accent-pink/30 text-accent-pink text-sm">
          {submitError}
        </div>
      )}

      {/* Author Name */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Your Name (optional)
        </label>
        <input
          type="text"
          {...register('authorName')}
          disabled={isAnonymous}
          placeholder="Enter your name or leave blank"
          className="w-full p-3 rounded-lg bg-background-tertiary text-text-primary border border-border focus:border-accent-blue outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => {
              setIsAnonymous(e.target.checked);
              if (e.target.checked) {
                setValue('authorName', '');
              }
            }}
            className="w-4 h-4 rounded border-border bg-background-tertiary accent-accent-blue cursor-pointer"
          />
          <label htmlFor="anonymous" className="text-sm text-text-secondary cursor-pointer">
            Post anonymously
          </label>
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Difficulty (1-10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          {...register('metrics.difficulty', { valueAsNumber: true })}
          className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer accent-accent-blue"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>Easy (1)</span>
          <span className="text-accent-blue font-medium text-lg">
            {watch('metrics.difficulty')}
          </span>
          <span>Very Hard (10)</span>
        </div>
      </div>

      {/* Hours per week */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Hours Per Week
        </label>
        <input
          type="range"
          min="0"
          max="30"
          {...register('metrics.hoursPerWeek', { valueAsNumber: true })}
          className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer accent-accent-purple"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>0 hrs</span>
          <span className="text-accent-purple font-medium text-lg">
            {watch('metrics.hoursPerWeek')} hrs
          </span>
          <span>30 hrs</span>
        </div>
      </div>

      {/* Learning Style */}
      <div className="p-4 rounded-lg bg-background-tertiary/50">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Learning Style (must sum to 100%)
        </h3>
        <div className="space-y-3">
          <SliderField
            label="Memorization"
            register={register('metrics.learningStyle.memorization', {
              valueAsNumber: true,
            })}
            value={watch('metrics.learningStyle.memorization')}
          />
          <SliderField
            label="Practice"
            register={register('metrics.learningStyle.practice', {
              valueAsNumber: true,
            })}
            value={watch('metrics.learningStyle.practice')}
          />
          <SliderField
            label="Projects"
            register={register('metrics.learningStyle.projects', {
              valueAsNumber: true,
            })}
            value={watch('metrics.learningStyle.projects')}
          />
        </div>
        <p
          className={`text-xs mt-2 ${
            learningStyleSum === 100 ? 'text-accent-cyan' : 'text-accent-pink'
          }`}
        >
          Total: {learningStyleSum}% {learningStyleSum === 100 ? '✓' : '(must be 100%)'}
        </p>
      </div>

      {/* Assessment Mix */}
      <div className="p-4 rounded-lg bg-background-tertiary/50">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Assessment Mix (must sum to 100%)
        </h3>
        <div className="space-y-3">
          <SliderField
            label="Tests"
            register={register('metrics.assessmentMix.tests', {
              valueAsNumber: true,
            })}
            value={watch('metrics.assessmentMix.tests')}
          />
          <SliderField
            label="Essays"
            register={register('metrics.assessmentMix.essays', {
              valueAsNumber: true,
            })}
            value={watch('metrics.assessmentMix.essays')}
          />
          <SliderField
            label="Labs"
            register={register('metrics.assessmentMix.labs', {
              valueAsNumber: true,
            })}
            value={watch('metrics.assessmentMix.labs')}
          />
          <SliderField
            label="Presentations"
            register={register('metrics.assessmentMix.presentations', {
              valueAsNumber: true,
            })}
            value={watch('metrics.assessmentMix.presentations')}
          />
          <SliderField
            label="Homework"
            register={register('metrics.assessmentMix.homework', {
              valueAsNumber: true,
            })}
            value={watch('metrics.assessmentMix.homework')}
          />
          <SliderField
            label="Projects"
            register={register('metrics.assessmentMix.projects', {
              valueAsNumber: true,
            })}
            value={watch('metrics.assessmentMix.projects')}
          />
        </div>
        <p
          className={`text-xs mt-2 ${
            assessmentMixSum === 100 ? 'text-accent-cyan' : 'text-accent-pink'
          }`}
        >
          Total: {assessmentMixSum}% {assessmentMixSum === 100 ? '✓' : '(must be 100%)'}
        </p>
      </div>

      {/* Skill Requirements */}
      <div className="p-4 rounded-lg bg-background-tertiary/50">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Skill Requirements (1-10)
        </h3>
        <div className="space-y-3">
          <SliderField
            label="Time Management"
            register={register('metrics.skillRequirements.timeManagement', {
              valueAsNumber: true,
            })}
            value={watch('metrics.skillRequirements.timeManagement')}
            min={1}
            max={10}
          />
          <SliderField
            label="Writing"
            register={register('metrics.skillRequirements.writing', {
              valueAsNumber: true,
            })}
            value={watch('metrics.skillRequirements.writing')}
            min={1}
            max={10}
          />
          <SliderField
            label="Math"
            register={register('metrics.skillRequirements.math', {
              valueAsNumber: true,
            })}
            value={watch('metrics.skillRequirements.math')}
            min={1}
            max={10}
          />
          <SliderField
            label="Problem Solving"
            register={register('metrics.skillRequirements.problemSolving', {
              valueAsNumber: true,
            })}
            value={watch('metrics.skillRequirements.problemSolving')}
            min={1}
            max={10}
          />
          <SliderField
            label="Memorization"
            register={register('metrics.skillRequirements.memorization', {
              valueAsNumber: true,
            })}
            value={watch('metrics.skillRequirements.memorization')}
            min={1}
            max={10}
          />
          <SliderField
            label="Critical Thinking"
            register={register('metrics.skillRequirements.criticalThinking', {
              valueAsNumber: true,
            })}
            value={watch('metrics.skillRequirements.criticalThinking')}
            min={1}
            max={10}
          />
        </div>
      </div>

      {/* Text responses */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-accent-blue mb-2">
            👥 Who would thrive in this class?
          </label>
          <textarea
            {...register('responses.whoWouldThrive')}
            className="w-full p-3 rounded-lg bg-background-tertiary text-text-primary border border-border focus:border-accent-blue outline-none resize-none"
            rows={3}
            placeholder="Describe the type of student who would enjoy and succeed..."
          />
          {errors.responses?.whoWouldThrive && (
            <p className="text-xs text-accent-pink mt-1">
              {errors.responses.whoWouldThrive.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-blue mb-2">
            💡 What surprised you?
          </label>
          <textarea
            {...register('responses.whatSurprised')}
            className="w-full p-3 rounded-lg bg-background-tertiary text-text-primary border border-border focus:border-accent-blue outline-none resize-none"
            rows={3}
            placeholder="Share something unexpected about the class..."
          />
          {errors.responses?.whatSurprised && (
            <p className="text-xs text-accent-pink mt-1">
              {errors.responses.whatSurprised.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-blue mb-2">
            🎯 What skills mattered most?
          </label>
          <textarea
            {...register('responses.skillsThatMattered')}
            className="w-full p-3 rounded-lg bg-background-tertiary text-text-primary border border-border focus:border-accent-blue outline-none resize-none"
            rows={3}
            placeholder="Which skills were essential for success..."
          />
          {errors.responses?.skillsThatMattered && (
            <p className="text-xs text-accent-pink mt-1">
              {errors.responses.skillsThatMattered.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            💭 Additional thoughts (optional)
          </label>
          <textarea
            {...register('responses.additionalThoughts')}
            className="w-full p-3 rounded-lg bg-background-tertiary text-text-primary border border-border focus:border-accent-blue outline-none resize-none"
            rows={2}
            placeholder="Any other insights to share..."
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting || learningStyleSum !== 100 || assessmentMixSum !== 100}
        className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium hover:shadow-lg hover:shadow-accent-blue/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

function SliderField({
  label,
  register,
  value,
  min = 0,
  max = 100,
}: {
  label: string;
  register: any;
  value: number;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="text-xs text-accent-blue font-medium">{value}{max === 100 ? '%' : ''}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        {...register}
        className="w-full h-1.5 bg-background-secondary rounded-lg appearance-none cursor-pointer accent-accent-blue"
      />
    </div>
  );
}
