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
        const firstImagePart = lesson.content.split('"')[0];
        const aiHintMatch = lesson.content.match(/data-ai-hint="([^"]+)"/);
        const aiHint = aiHintMatch ? aiHintMatch[1] : "video lecture";
        return (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group shadow-inner">
            <Image 
              src={firstImagePart} 
              alt={`Video placeholder for ${lesson.title}`} 
              layout="fill" 
              objectFit="cover" 
              data-ai-hint={aiHint}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
            </div>
            <p className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
              Video content would play here.
            </p>
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
              <p>{lesson.content}</p>
              {/* Add more detailed text rendering if lesson.content is HTML/Markdown */}
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
