import Hero from '@/components/home/Hero';
import ClassGrid from '@/components/home/ClassGrid';
import { readAllClasses } from '@/lib/fileSystem';

export default async function HomePage() {
  const data = await readAllClasses();

  return (
    <div className="min-h-screen">
      <Hero />
      <ClassGrid classes={data.classes} subjects={data.subjects} />
    </div>
  );
}
