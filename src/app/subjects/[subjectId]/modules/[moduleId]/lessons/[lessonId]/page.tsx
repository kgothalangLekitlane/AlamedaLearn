
import { getLessonById, getModuleById, getSubjectById } from '@/lib/mockData'; // Renamed getCourseById to getSubjectById
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
    subjectId: string; // Renamed from courseId
    moduleId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageParams) {
  const subject = getSubjectById(params.subjectId); // Renamed course to subject, getCourseById to getSubjectById
  const module = getModuleById(params.subjectId, params.moduleId); // Renamed params.courseId to params.subjectId
  const lesson = getLessonById(params.subjectId, params.moduleId, params.lessonId); // Renamed params.courseId to params.subjectId

  if (!subject || !module || !lesson) { // Renamed course to subject
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link href={`/subjects/${params.subjectId}/modules/${params.moduleId}`}> {/* Renamed /courses to /subjects */}
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
              <Link href="/subjects">Subjects</Link> {/* Renamed from Courses */}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/subjects/${subject.id}`}>{subject.title}</Link> {/* Renamed /courses to /subjects, course to subject */}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/subjects/${subject.id}/modules/${module.id}`}>{module.title}</Link> {/* Renamed /courses to /subjects, course to subject */}
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
            <Link href={`/subjects/${params.subjectId}/modules/${params.moduleId}/lessons/${prevLesson.id}`}> {/* Renamed /courses to /subjects */}
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous: {prevLesson.title}
            </Link>
          </Button>
        ) : <div />} {/* Placeholder for spacing */}
        
        {nextLesson ? (
          <Button asChild>
            <Link href={`/subjects/${params.subjectId}/modules/${params.moduleId}/lessons/${nextLesson.id}`}> {/* Renamed /courses to /subjects */}
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
         <Link href={`/subjects/${params.subjectId}/modules/${params.moduleId}`}> {/* Renamed /courses to /subjects */}
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Lessons in Module
         </Link>
      </Button>
    </div>
  );
}
