'use client';

import { motion } from 'framer-motion';
import ReviewCard from './ReviewCard';
import { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
  classId?: string;
}

export default function ReviewList({ reviews, classId }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="p-12 rounded-xl bg-background-secondary/50 border border-border text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          No reviews yet
        </h3>
        <p className="text-text-secondary">
          Be the first to share your experience with this class!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ReviewCard review={review} classId={classId} />
        </motion.div>
      ))}
    </div>
  );
}
