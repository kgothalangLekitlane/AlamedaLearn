
import { getSurveyById } from '@/lib/mockData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import SurveyForm from '@/components/SurveyForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


interface SurveyPageParams {
  params: {
    surveyId: string;
  };
}

export default function SurveyPage({ params }: SurveyPageParams) {
  const survey = getSurveyById(params.surveyId);

  if (!survey) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Survey not found</h1>
        <Link href="/surveys">
          <Button variant="link" className="mt-4">Go back to surveys</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/surveys">Surveys</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{survey.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/surveys">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Surveys
        </Link>
      </Button>

      {!survey.isActive && (
         <Card className="border-destructive bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    Survey Closed
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive/90">
                    This survey is no longer accepting responses. Thank you for your interest.
                </p>
            </CardContent>
        </Card>
      )}
      
      <SurveyForm survey={survey} />

    </div>
  );
}

