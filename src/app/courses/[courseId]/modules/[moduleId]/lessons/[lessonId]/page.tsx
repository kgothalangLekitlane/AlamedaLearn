import { getLessonById, getModuleById, getCourseById } from '@/lib/mockData';
import LessonDisplay from '@/components/LessonDisplay';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


interface LessonPageParams {
  params: {
    courseId: string;
    moduleId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageParams) {
  const course = getCourseById(params.courseId);
  const module = getModuleById(params.courseId, params.moduleId);
  const lesson = getLessonById(params.courseId, params.moduleId, params.lessonId);

  if (!course || !module || !lesson) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link href={`/courses/${params.courseId}/modules/${params.moduleId}`}>
          <Button variant="link" className="mt-4">Go back to module</Button>
        </Link>
      </div>
    );
  }

  const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/courses">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/${course.id}`}>{course.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/${course.id}/modules/${module.id}`}>{module.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <LessonDisplay lesson={lesson} />

      <div className="flex justify-between items-center mt-8">
        {prevLesson ? (
          <Button asChild variant="outline">
            <Link href={`/courses/${params.courseId}/modules/${params.moduleId}/lessons/${prevLesson.id}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous: {prevLesson.title}
            </Link>
          </Button>
        ) : <div />} {/* Placeholder for spacing */}
        
        {nextLesson ? (
          <Button asChild>
            <Link href={`/courses/${params.courseId}/modules/${params.moduleId}/lessons/${nextLesson.id}`}>
              Next: {nextLesson.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            End of Module
          </Button>
        )}
      </div>
       <Button asChild variant="link" className="mt-6">
         <Link href={`/courses/${params.courseId}/modules/${params.moduleId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Lessons in Module
         </Link>
      </Button>
    </div>
  );
}
