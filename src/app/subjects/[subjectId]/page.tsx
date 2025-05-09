
import { getSubjectById } from '@/lib/mockData'; // Renamed from getCourseById
import ModuleCard from '@/components/ModuleCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookText, CalendarDays, UserCircle, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import { Badge } from '@/components/ui/badge';

interface SubjectPageParams { // Renamed from CoursePageParams
  params: { subjectId: string }; // Renamed from courseId
}

export default function SubjectPage({ params }: SubjectPageParams) { // Renamed from CoursePage
  const subject = getSubjectById(params.subjectId); // Renamed from course, getCourseById, params.courseId

  if (!subject) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Subject not found</h1> {/* Renamed from Course */}
        <Link href="/subjects"> {/* Renamed from /courses */}
          <Button variant="link" className="mt-4">Go back to subjects</Button> {/* Renamed from courses */}
        </Link>
      </div>
    );
  }

  const firstImagePart = subject.imageUrl.split('"')[0]; // Renamed from course
  const aiHintMatch = subject.imageUrl.match(/data-ai-hint="([^"]+)"/); // Renamed from course
  const aiHint = aiHintMatch ? aiHintMatch[1] : "education learning";

  return (
    <div className="space-y-8">
      <Link href="/subjects" className="inline-flex items-center text-sm text-primary hover:underline mb-4"> {/* Renamed from /courses */}
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Subjects {/* Renamed from Courses */}
      </Link>

      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={firstImagePart}
              alt={subject.title} // Renamed from course
              layout="fill"
              objectFit="cover"
              data-ai-hint={aiHint}
            />
          </div>
          <div className="md:w-2/3 p-6 md:p-8">
            <CardHeader className="p-0 mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{subject.grade}</Badge> {/* Renamed from course */}
                <Badge variant="secondary">{subject.subject}</Badge> {/* Renamed from course */}
              </div>
              <CardTitle className="text-3xl font-bold text-primary">{subject.title}</CardTitle> {/* Renamed from course */}
              <CardDescription className="text-md text-muted-foreground mt-2">
                {subject.description} {/* Renamed from course */}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {subject.instructor && ( // Renamed from course
                <div className="flex items-center text-sm text-muted-foreground">
                  <UserCircle className="w-5 h-5 mr-2 text-primary" />
                  Instructor: {subject.instructor} {/* Renamed from course */}
                </div>
              )}
              {subject.deadline && ( // Renamed from course
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                  Deadline: {new Date(subject.deadline).toLocaleDateString()} {/* Renamed from course */}
                </div>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <BookText className="w-5 h-5 mr-2 text-primary" />
                {subject.modules.length} module{subject.modules.length !== 1 ? 's' : ''} {/* Renamed from course */}
              </div>
              {typeof subject.progress === 'number' && ( // Renamed from course
                <div className="pt-2">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Subject Progress</span> {/* Renamed from Course */}
                    <span className="font-semibold text-primary">{subject.progress}%</span> {/* Renamed from course */}
                  </div>
                  <ProgressBar value={subject.progress} className="h-3"/> {/* Renamed from course */}
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
      
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Modules in this Subject</h2> {/* Renamed from Course */}
        {subject.modules.length > 0 ? ( // Renamed from course
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.modules.map(module => ( // Renamed from course
              <ModuleCard key={module.id} module={module} subjectId={subject.id} /> // Renamed from courseId to subjectId
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No modules available for this subject yet.</p> {/* Renamed from course */}
        )}
      </section>
    </div>
  );
}
