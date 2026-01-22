import { notFound } from 'next/navigation';
import ClassHeader from '@/components/class/ClassHeader';
import MetricsOverview from '@/components/class/MetricsOverview';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { readAllClasses, readClassReviews } from '@/lib/fileSystem';
import { Class, Subject } from '@/types';

interface ClassPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const data = await readAllClasses();
  return data.classes.map((cls: Class) => ({
    id: cls.id,
  }));
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { id } = await params;
  const data = await readAllClasses();
  const classData: Class | undefined = data.classes.find(
    (cls: Class) => cls.id === id
  );

  if (!classData) {
    notFound();
  }

  const reviewsData = await readClassReviews(id);
  const subject: Subject | undefined = data.subjects.find(
    (s: Subject) => s.id === classData.subject
  );

  return (
    <div className="min-h-screen pb-20">
      <ClassHeader classData={classData} subject={subject} />

      {reviewsData?.aggregatedMetrics && (
        <MetricsOverview metrics={reviewsData.aggregatedMetrics} />
      )}

      <div className="container mx-auto px-4 md:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: Reviews */}
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-2">
              <span className="text-accent-blue">📝</span>
              Student Reviews
              <span className="text-sm font-normal text-text-muted ml-2">
                ({reviewsData?.reviews?.length || 0})
              </span>
            </h2>
            <ReviewList reviews={reviewsData?.reviews || []} classId={id} />
          </div>

          {/* Right column: Submit review */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-2">
              <span className="text-accent-purple">✨</span>
              Share Your Experience
            </h2>
            <ReviewForm classId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
