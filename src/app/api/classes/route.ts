import { NextResponse } from 'next/server';
import { readAllClasses } from '@/lib/fileSystem';

/**
 * GET /api/classes
 * Returns all classes and subjects
 */
export async function GET() {
  try {
    const data = await readAllClasses();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}
