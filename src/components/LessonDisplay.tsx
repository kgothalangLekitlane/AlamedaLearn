import type { Lesson } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download, CheckSquare, BookOpen } from 'lucide-react';

interface LessonDisplayProps {
  lesson: Lesson;
}

export default function LessonDisplay({ lesson }: LessonDisplayProps) {
  
  const renderContent = () => {
    switch (lesson.contentType) {
      case 'video':
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner">
            <video
              key={lesson.content} // Add key to re-render if content URL changes
              src={lesson.content}
              controls
              width="100%"
              className="w-full h-full"
              aria-label={`Video player for ${lesson.title}`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'quiz':
        return (
          <div className="p-6 border rounded-lg bg-secondary/30 shadow-sm">
            <div className="flex items-center text-lg font-semibold mb-4">
              <CheckSquare className="h-6 w-6 mr-2 text-primary" />
              Quiz Time!
            </div>
            <p className="text-muted-foreground mb-4">An interactive quiz would be presented here.</p>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
              {`Quiz Data (Example): ${lesson.content}`}
            </pre>
            <Button className="mt-4">Start Quiz (Placeholder)</Button>
          </div>
        );
      case 'resource':
        return (
          <div className="p-6 border rounded-lg bg-secondary/30 shadow-sm">
            <div className="flex items-center text-lg font-semibold mb-4">
              <Download className="h-6 w-6 mr-2 text-primary" />
              Downloadable Resource
            </div>
            <p className="text-muted-foreground mb-4">
              Download the resource for this lesson: <strong className="text-foreground">{lesson.title}</strong>
            </p>
            <Button asChild>
              <a href={lesson.content} download target="_blank" rel="noopener noreferrer">
                Download (Placeholder: {lesson.content.split('/').pop()})
              </a>
            </Button>
          </div>
        );
      case 'text':
        return (
          <div className="p-6 border rounded-lg bg-secondary/30 shadow-sm">
            <div className="flex items-center text-lg font-semibold mb-4">
              <BookOpen className="h-6 w-6 mr-2 text-primary" />
              Reading Material
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert text-foreground">
              {/* Naive way to render newlines, consider a markdown parser for rich text */}
              {lesson.content.split('\\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        );
      default:
        return <p className="text-muted-foreground">Unsupported lesson type.</p>;
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{lesson.title}</CardTitle>
        <CardDescription className="capitalize">
          Type: {lesson.contentType} {lesson.durationMinutes && `| Estimated time: ${lesson.durationMinutes} min`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}

