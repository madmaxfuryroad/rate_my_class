'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary" />

      {/* Animated gradient orb */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-accent-pink/20 to-accent-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight">
            Understand the{' '}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
              class
            </span>
            <br />
            Not just the title
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12"
        >
          Discover what really happens in the classroom. Real student insights on workload, learning style, and skills needed to thrive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#classes"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium hover:shadow-lg hover:shadow-accent-blue/50 transition-all duration-200 hover:scale-105"
          >
            Browse Classes
          </Link>
          <button className="px-8 py-4 rounded-lg bg-background-secondary text-text-primary font-medium hover:bg-background-tertiary transition-all duration-200 border border-border-accent">
            Learn More
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">40+</div>
            <div className="text-sm text-text-muted">Classes</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent-purple mb-2">100+</div>
            <div className="text-sm text-text-muted">Reviews</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent-pink mb-2">8</div>
            <div className="text-sm text-text-muted">Subjects</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs">Scroll to explore</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
