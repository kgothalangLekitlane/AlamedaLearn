import { getModuleById, getCourseById } from '@/lib/mockData';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import { ArrowLeft, BookOpen, Video, FileText, CheckSquare, Clock } from 'lucide-react';
import type { Lesson } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ModulePageParams {
  params: { courseId: string; moduleId: string };
}

const getLessonIcon = (contentType: Lesson['contentType']) => {
  switch (contentType) {
    case 'video': return <Video className="h-5 w-5 text-primary" />;
    case 'quiz': return <CheckSquare className="h-5 w-5 text-primary" />;
    case 'resource': return <FileText className="h-5 w-5 text-primary" />;
    case 'text': return <BookOpen className="h-5 w-5 text-primary" />;
    default: return <BookOpen className="h-5 w-5 text-primary" />;
  }
};

export default function ModulePage({ params }: ModulePageParams) {
  const course = getCourseById(params.courseId);
  const module = getModuleById(params.courseId, params.moduleId);

  if (!course || !module) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <Link href={`/courses/${params.courseId}`}>
          <Button variant="link" className="mt-4">Go back to course</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href={`/courses/${params.courseId}`} className="inline-flex items-center text-sm text-primary hover:underline mb-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {course.title}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-primary">{module.title}</h1>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
        {typeof module.progress === 'number' && (
          <div className="w-full sm:w-1/3">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span className="font-medium">Module Progress</span>
              <span className="font-semibold text-primary">{module.progress}%</span>
            </div>
            <ProgressBar value={module.progress} className="h-3" />
          </div>
        )}
      </div>
      
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Lessons</h2>
        {module.lessons.length > 0 ? (
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <Card key={lesson.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getLessonIcon(lesson.contentType)}
                    <div>
                      <h3 className="font-medium text-md">{index + 1}. {lesson.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="capitalize">{lesson.contentType}</Badge>
                        {lesson.durationMinutes && (
                          <>
                            <span>&bull;</span>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {lesson.durationMinutes} min
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    <Link href={`/courses/${params.courseId}/modules/${params.moduleId}/lessons/${lesson.id}`}>
                      Start Lesson
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No lessons available for this module yet.</p>
        )}
      </section>
    </div>
  );
}
