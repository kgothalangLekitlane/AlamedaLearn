import { getCourseById } from '@/lib/mockData';
import ModuleCard from '@/components/ModuleCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookText, CalendarDays, UserCircle, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import { Badge } from '@/components/ui/badge';

interface CoursePageParams {
  params: { courseId: string };
}

export default function CoursePage({ params }: CoursePageParams) {
  const course = getCourseById(params.courseId);

  if (!course) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link href="/courses">
          <Button variant="link" className="mt-4">Go back to courses</Button>
        </Link>
      </div>
    );
  }

  const firstImagePart = course.imageUrl.split('"')[0];
  const aiHintMatch = course.imageUrl.match(/data-ai-hint="([^"]+)"/);
  const aiHint = aiHintMatch ? aiHintMatch[1] : "education learning";

  return (
    <div className="space-y-8">
      <Link href="/courses" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Courses
      </Link>

      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={firstImagePart}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={aiHint}
            />
          </div>
          <div className="md:w-2/3 p-6 md:p-8">
            <CardHeader className="p-0 mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{course.grade}</Badge>
                <Badge variant="secondary">{course.subject}</Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">{course.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground mt-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {course.instructor && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <UserCircle className="w-5 h-5 mr-2 text-primary" />
                  Instructor: {course.instructor}
                </div>
              )}
              {course.deadline && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                  Deadline: {new Date(course.deadline).toLocaleDateString()}
                </div>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <BookText className="w-5 h-5 mr-2 text-primary" />
                {course.modules.length} module{course.modules.length !== 1 ? 's' : ''}
              </div>
              {typeof course.progress === 'number' && (
                <div className="pt-2">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Course Progress</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} className="h-3"/>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
      
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Modules in this Course</h2>
        {course.modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.modules.map(module => (
              <ModuleCard key={module.id} module={module} courseId={course.id} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No modules available for this course yet.</p>
        )}
      </section>
    </div>
  );
}
