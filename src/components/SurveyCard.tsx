
import Link from 'next/link';
import type { Survey } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, ArrowRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SurveyCardProps {
  survey: Survey;
}

export default function SurveyCard({ survey }: SurveyCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            {!survey.isActive && (
                <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Closed
                </Badge>
            )}
        </div>
        <CardTitle className="text-xl mb-1 line-clamp-2">{survey.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 h-[3.75rem]">
          {survey.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {survey.questions.length} question{survey.questions.length !== 1 ? 's' : ''}
        </p>
         <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date(survey.updatedAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full transition-transform duration-200 hover:scale-105" disabled={!survey.isActive}>
          <Link href={`/surveys/${survey.id}`}>
            {survey.isActive ? 'Take Survey' : 'View Survey (Closed)'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
