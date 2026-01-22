import { NextResponse } from 'next/server';
import { readClassReviews } from '@/lib/fileSystem';

/**
 * GET /api/reviews/[classId]
 * Get all reviews for a specific class
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;
    const reviews = await readClassReviews(classId);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
