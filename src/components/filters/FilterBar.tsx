'use client';

import { ClassFilters, SubjectId, ClassLevel } from '@/types';

interface FilterBarProps {
  filters: ClassFilters;
  onFiltersChange: (filters: ClassFilters) => void;
  subjects: Array<{ id: SubjectId; name: string }>;
}

export default function FilterBar({
  filters,
  onFiltersChange,
  subjects,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      {/* Search */}
      <div className="flex-1 w-full md:w-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search classes..."
            value={filters.searchQuery || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchQuery: e.target.value })
            }
            className="w-full px-4 py-3 pl-10 rounded-lg bg-background-secondary border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Subject filter */}
      <select
        value={filters.subject || ''}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            subject: e.target.value as SubjectId | undefined,
          })
        }
        className="px-4 py-3 rounded-lg bg-background-secondary border border-border text-text-primary focus:outline-none focus:border-accent-blue transition-colors cursor-pointer"
      >
        <option value="">All Subjects</option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>

      {/* Level filter */}
      <select
        value={filters.level || ''}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            level: e.target.value as ClassLevel | undefined,
          })
        }
        className="px-4 py-3 rounded-lg bg-background-secondary border border-border text-text-primary focus:outline-none focus:border-accent-blue transition-colors cursor-pointer"
      >
        <option value="">All Levels</option>
        <option value="standard">Standard</option>
        <option value="honors">Honors</option>
        <option value="ap">AP</option>
        <option value="ib">IB</option>
      </select>

      {/* Clear filters */}
      {(filters.searchQuery || filters.subject || filters.level) && (
        <button
          onClick={() => onFiltersChange({})}
          className="px-4 py-3 rounded-lg bg-background-tertiary text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
