'use client';

import { motion } from 'framer-motion';
import { AggregatedMetrics } from '@/types';
import { getDifficultyColor, getWorkloadColor } from '@/lib/utils';

interface MetricsOverviewProps {
  metrics: AggregatedMetrics;
}

export default function MetricsOverview({ metrics }: MetricsOverviewProps) {
  return (
    <section className="py-16 px-4 md:px-8 bg-background-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
          Class Overview
        </h2>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard
            icon="📊"
            label="Difficulty"
            value={metrics.averageDifficulty.toFixed(1)}
            max="10"
            color={getDifficultyColor(metrics.averageDifficulty)}
            progress={(metrics.averageDifficulty / 10) * 100}
          />
          <MetricCard
            icon="⏱️"
            label="Hours Per Week"
            value={metrics.averageHoursPerWeek.toFixed(1)}
            max="hrs"
            color={getWorkloadColor(metrics.averageHoursPerWeek)}
            progress={(metrics.averageHoursPerWeek / 20) * 100}
          />
          <MetricCard
            icon="📝"
            label="Total Reviews"
            value={metrics.totalReviews.toString()}
            max=""
            color="text-accent-purple"
            progress={100}
          />
        </div>

        {/* Detailed breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Style */}
          <div className="p-6 rounded-xl bg-background-secondary border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <span>🎯</span>
              Learning Style
            </h3>
            <div className="space-y-4">
              <ProgressBar
                label="Memorization"
                value={metrics.learningStyle.memorization}
                color="from-accent-pink to-accent-purple"
              />
              <ProgressBar
                label="Practice"
                value={metrics.learningStyle.practice}
                color="from-accent-blue to-accent-cyan"
              />
              <ProgressBar
                label="Projects"
                value={metrics.learningStyle.projects}
                color="from-accent-purple to-accent-blue"
              />
            </div>
          </div>

          {/* Assessment Mix */}
          <div className="p-6 rounded-xl bg-background-secondary border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <span>📋</span>
              Assessment Mix
            </h3>
            <div className="space-y-4">
              <ProgressBar
                label="Tests"
                value={metrics.assessmentMix.tests}
                color="from-accent-pink to-accent-purple"
              />
              <ProgressBar
                label="Essays"
                value={metrics.assessmentMix.essays}
                color="from-accent-blue to-accent-cyan"
              />
              <ProgressBar
                label="Labs"
                value={metrics.assessmentMix.labs}
                color="from-accent-cyan to-accent-blue"
              />
              <ProgressBar
                label="Presentations"
                value={metrics.assessmentMix.presentations}
                color="from-accent-purple to-accent-pink"
              />
              <ProgressBar
                label="Homework"
                value={metrics.assessmentMix.homework}
                color="from-accent-blue to-accent-purple"
              />
              <ProgressBar
                label="Projects"
                value={metrics.assessmentMix.projects}
                color="from-accent-cyan to-accent-purple"
              />
            </div>
          </div>

          {/* Skill Requirements */}
          <div className="p-6 rounded-xl bg-background-secondary border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <span>🎓</span>
              Key Skills
            </h3>
            <div className="space-y-4">
              <SkillBar
                label="Time Management"
                value={metrics.skillRequirements.timeManagement}
              />
              <SkillBar
                label="Writing"
                value={metrics.skillRequirements.writing}
              />
              <SkillBar label="Math" value={metrics.skillRequirements.math} />
              <SkillBar
                label="Problem Solving"
                value={metrics.skillRequirements.problemSolving}
              />
              <SkillBar
                label="Memorization"
                value={metrics.skillRequirements.memorization}
              />
              <SkillBar
                label="Critical Thinking"
                value={metrics.skillRequirements.criticalThinking}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon,
  label,
  value,
  max,
  color,
  progress,
}: {
  icon: string;
  label: string;
  value: string;
  max: string;
  color: string;
  progress: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl bg-background-secondary border border-border hover:border-accent-blue transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <p className="text-sm text-text-muted">{label}</p>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className={`text-4xl font-bold ${color}`}>{value}</span>
        <span className="text-lg text-text-secondary">{max}</span>
      </div>
      {progress < 100 && (
        <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
          />
        </div>
      )}
    </motion.div>
  );
}

function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-sm text-accent-blue font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-sm text-accent-blue font-medium">
          {value.toFixed(1)}/10
        </span>
      </div>
      <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / 10) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue"
        />
      </div>
    </div>
  );
}
