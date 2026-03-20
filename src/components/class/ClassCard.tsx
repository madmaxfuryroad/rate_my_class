'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Class } from '@/types';
import { cn } from '@/lib/utils';

interface ClassCardProps {
  classData: Class;
  index?: number;
}

export default function ClassCard({ classData, index = 0 }: ClassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/class/${classData.id}`}>
        <article
          className={cn(
            'group relative p-6 rounded-xl border transition-all duration-300',
            'bg-background-secondary/50 backdrop-blur-sm',
            'border-border hover:border-accent-blue',
            'hover:shadow-xl hover:shadow-accent-blue/10',
            'hover:-translate-y-1'
          )}
        >
          {/* Subject indicator */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{getSubjectIcon(classData.subject)}</span>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                getLevelStyles(classData.level)
              )}
            >
              {classData.level.toUpperCase()}
            </span>
          </div>

          {/* Class name */}
          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
            {classData.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4">
            {classData.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1">
              <span>🎓</span>
              <span>Grade {classData.metadata.gradeLevel}</span>
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-5 h-5 text-accent-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function getSubjectIcon(subject: string): string {
  const icons: Record<string, string> = {
    math: '📐',
    english: '📚',
    history: '🏛️',
    science: '🔬',
    language: '🌍',
    arts: '🎨',
    'pathways': '💻',
    'physical-education': '⚽',
  };
  return icons[subject] || '📖';
}

function getLevelStyles(level: string): string {
  const styles: Record<string, string> = {
    standard: 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30',
    honors: 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30',
    ap: 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30',
    ib: 'bg-accent-pink/20 text-accent-pink border border-accent-pink/30',
  };
  return styles[level] || styles.standard;
}
