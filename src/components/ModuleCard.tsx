import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import type { Module } from '@/lib/types';
import { Layers, ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  courseId: string;
}

export default function ModuleCard({ module, courseId }: ModuleCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <Layers className="h-8 w-8 text-primary mb-2" />
        </div>
        <CardTitle className="text-lg line-clamp-2">{module.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 h-[3.75rem]">
          {module.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {typeof module.progress === 'number' && (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{module.progress}%</span>
            </div>
            <ProgressBar value={module.progress} />
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full transition-transform duration-200 hover:scale-105">
          <Link href={`/courses/${courseId}/modules/${module.id}`}>
            Start Module
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
