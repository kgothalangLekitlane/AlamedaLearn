import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import type { Course } from '@/lib/types';
import { ArrowRight, BookText, CalendarDays, UserCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const firstImagePart = course.imageUrl.split('"')[0];
  const aiHintMatch = course.imageUrl.match(/data-ai-hint="([^"]+)"/);
  const aiHint = aiHintMatch ? aiHintMatch[1] : "education learning";

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={firstImagePart}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl mb-2 line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-1 line-clamp-1">
          {course.grade} - {course.subject}
        </CardDescription>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3 h-[3.75rem]">
          {course.description}
        </CardDescription>
        {course.instructor && (
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <UserCircle className="w-4 h-4 mr-1.5" />
            {course.instructor}
          </div>
        )}
        {course.deadline && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <CalendarDays className="w-4 h-4 mr-1.5" />
            Deadline: {new Date(course.deadline).toLocaleDateString()}
          </div>
        )}
        {typeof course.progress === 'number' && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full transition-transform duration-200 hover:scale-105">
          <Link href={`/courses/${course.id}`}>
            View Course
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
