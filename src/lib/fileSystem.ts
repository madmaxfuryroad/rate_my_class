import fs from 'fs/promises';
import path from 'path';
import { ClassReviews } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const REVIEWS_DIR = path.join(DATA_DIR, 'reviews');

/**
 * Read all classes from classes.json
 */
export async function readAllClasses() {
  try {
    const filePath = path.join(DATA_DIR, 'classes.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading classes:', error);
    throw new Error('Failed to read classes data');
  }
}

/**
 * Read reviews for a specific class
 */
export async function readClassReviews(classId: string): Promise<ClassReviews> {
  try {
    const filePath = path.join(REVIEWS_DIR, `${classId}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist, return empty structure
    return {
      classId,
      reviews: [],
      aggregatedMetrics: null,
    };
  }
}

/**
 * Write reviews for a specific class
 */
export async function writeClassReviews(
  classId: string,
  data: ClassReviews
): Promise<void> {
  try {
    const filePath = path.join(REVIEWS_DIR, `${classId}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing reviews:', error);
    throw new Error('Failed to write reviews data');
  }
}

/**
 * Ensure reviews directory exists
 */
export async function ensureReviewsDirectory(): Promise<void> {
  try {
    await fs.access(REVIEWS_DIR);
  } catch {
    await fs.mkdir(REVIEWS_DIR, { recursive: true });
  }
}
