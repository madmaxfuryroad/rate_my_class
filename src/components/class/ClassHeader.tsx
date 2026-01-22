'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Class, Subject } from '@/types';

interface ClassHeaderProps {
  classData: Class;
  subject?: Subject;
}

export default function ClassHeader({ classData, subject }: ClassHeaderProps) {
  return (
    <header className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary">
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: subject?.color || '#5b8def' }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Breadcrumb */}
          <nav className="text-sm text-text-muted mb-6 flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-accent-blue transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/#classes"
              className="hover:text-accent-blue transition-colors"
            >
              Classes
            </Link>
            <span>/</span>
            <span className="text-accent-blue">{classData.name}</span>
          </nav>

          {/* Subject badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{subject?.icon || '📖'}</span>
            <span
              className="px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: `${subject?.color || '#5b8def'}20`,
                color: subject?.color || '#5b8def',
                borderColor: `${subject?.color || '#5b8def'}40`,
              }}
            >
              {subject?.name || 'General'}
            </span>
          </div>

          {/* Class name */}
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            {classData.name}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="px-4 py-2 rounded-lg bg-background-secondary border border-border-accent text-text-secondary">
              {classData.code}
            </div>
            <div
              className="px-4 py-2 rounded-lg border font-medium"
              style={{
                backgroundColor: `${subject?.color || '#5b8def'}15`,
                color: subject?.color || '#5b8def',
                borderColor: `${subject?.color || '#5b8def'}30`,
              }}
            >
              {classData.level.toUpperCase()}
            </div>
            <div className="text-text-muted flex items-center gap-2">
              <span>🎓</span>
              <span>Grade {classData.metadata.gradeLevel}</span>
            </div>
            <div className="text-text-muted flex items-center gap-2">
              <span>📚</span>
              <span>{classData.metadata.credits} Credit{classData.metadata.credits !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
            {classData.description}
          </p>

          {/* Prerequisites */}
          {classData.metadata.prerequisites.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-text-muted mb-2">Prerequisites:</p>
              <div className="flex flex-wrap gap-2">
                {classData.metadata.prerequisites.map((prereq) => (
                  <span
                    key={prereq}
                    className="px-3 py-1 rounded-full bg-background-secondary text-text-secondary text-sm border border-border"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
}
