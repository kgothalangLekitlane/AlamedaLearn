
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import type { Subject } from '@/lib/types'; // Renamed Course to Subject
import { ArrowRight, BookText, CalendarDays, UserCircle } from 'lucide-react';

interface SubjectCardProps { // Renamed from CourseCardProps
  subject: Subject; // Renamed from course: Course
}

export default function SubjectCard({ subject }: SubjectCardProps) { // Renamed from CourseCard, course
  const firstImagePart = subject.imageUrl.split('"')[0]; // Renamed from course
  const aiHintMatch = subject.imageUrl.match(/data-ai-hint="([^"]+)"/); // Renamed from course
  const aiHint = aiHintMatch ? aiHintMatch[1] : "education learning";

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={firstImagePart}
            alt={subject.title} // Renamed from course
            layout="fill"
            objectFit="cover"
            data-ai-hint={aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl mb-2 line-clamp-2">{subject.title}</CardTitle> {/* Renamed from course */}
        <CardDescription className="text-sm text-muted-foreground mb-1 line-clamp-1">
          {subject.grade} - {subject.subject} {/* Renamed from course (subject.subject is academic discipline) */}
        </CardDescription>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3 h-[3.75rem]">
          {subject.description} {/* Renamed from course */}
        </CardDescription>
        {subject.instructor && ( // Renamed from course
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <UserCircle className="w-4 h-4 mr-1.5" />
            {subject.instructor} {/* Renamed from course */}
          </div>
        )}
        {subject.deadline && ( // Renamed from course
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <CalendarDays className="w-4 h-4 mr-1.5" />
            Deadline: {new Date(subject.deadline).toLocaleDateString()} {/* Renamed from course */}
          </div>
        )}
        {typeof subject.progress === 'number' && ( // Renamed from course
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{subject.progress}%</span> {/* Renamed from course */}
            </div>
            <ProgressBar value={subject.progress} /> {/* Renamed from course */}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full transition-transform duration-200 hover:scale-105">
          <Link href={`/subjects/${subject.id}`}> {/* Renamed from /courses, course.id */}
            View Subject {/* Renamed from View Course */}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
