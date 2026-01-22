'use client';

import { useState, useMemo } from 'react';
import ClassCard from '@/components/class/ClassCard';
import FilterBar from '@/components/filters/FilterBar';
import { Class, ClassFilters, Subject } from '@/types';

interface ClassGridProps {
  classes: Class[];
  subjects: Subject[];
}

export default function ClassGrid({ classes, subjects }: ClassGridProps) {
  const [filters, setFilters] = useState<ClassFilters>({});

  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      // Filter by subject
      if (filters.subject && cls.subject !== filters.subject) return false;

      // Filter by level
      if (filters.level && cls.level !== filters.level) return false;

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          cls.name.toLowerCase().includes(query) ||
          cls.code.toLowerCase().includes(query) ||
          cls.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [classes, filters]);

  return (
    <section id="classes" className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Browse <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">Classes</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore {classes.length} classes across {subjects.length} subjects. Filter by subject, level, or search for specific courses.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            subjects={subjects}
          />
        </div>

        {/* Class grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls, index) => (
              <ClassCard key={cls.id} classData={cls} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              No classes found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => setFilters({})}
              className="px-6 py-3 rounded-lg bg-accent-blue text-white font-medium hover:bg-accent-blue/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
