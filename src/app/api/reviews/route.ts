import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import {
  readClassReviews,
  writeClassReviews,
  ensureReviewsDirectory,
} from '@/lib/fileSystem';
import { calculateAggregatedMetrics } from '@/lib/calculations';
import { reviewSchema } from '@/lib/validation';
import { Review } from '@/types';

/**
 * POST /api/reviews
 * Submit a new review for a class
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = reviewSchema.parse(body);

    // Ensure reviews directory exists
    await ensureReviewsDirectory();

    // Read existing reviews
    const existingData = await readClassReviews(validatedData.classId);

    // Create new review
    const newReview: Review = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      authorName: validatedData.authorName && validatedData.authorName.trim() !== ''
        ? validatedData.authorName.trim()
        : undefined,
      metrics: validatedData.metrics,
      responses: validatedData.responses,
    };

    // Add to reviews array
    const updatedReviews = [...(existingData?.reviews || []), newReview];

    // Recalculate aggregated metrics
    const aggregatedMetrics = calculateAggregatedMetrics(updatedReviews);

    // Write back to file
    await writeClassReviews(validatedData.classId, {
      classId: validatedData.classId,
      reviews: updatedReviews,
      aggregatedMetrics,
    });

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/reviews?classId=xxx&reviewId=xxx
 * Delete a review from a class
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const reviewId = searchParams.get('reviewId');

    if (!classId || !reviewId) {
      return NextResponse.json(
        { error: 'classId and reviewId are required' },
        { status: 400 }
      );
    }

    // Read existing reviews
    const existingData = await readClassReviews(classId);

    if (!existingData || !existingData.reviews) {
      return NextResponse.json(
        { error: 'No reviews found for this class' },
        { status: 404 }
      );
    }

    // Filter out the review to delete
    const updatedReviews = existingData.reviews.filter(
      (review) => review.id !== reviewId
    );

    // Check if review was found
    if (updatedReviews.length === existingData.reviews.length) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Recalculate aggregated metrics
    const aggregatedMetrics = calculateAggregatedMetrics(updatedReviews);

    // Write back to file
    await writeClassReviews(classId, {
      classId,
      reviews: updatedReviews,
      aggregatedMetrics,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
