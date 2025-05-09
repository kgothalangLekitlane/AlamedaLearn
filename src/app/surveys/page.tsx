
import { getAllSurveys } from '@/lib/mockData';
import SurveyCard from '@/components/SurveyCard';

export default function SurveysPage() {
  const surveysToDisplay = getAllSurveys(); // Or getActiveSurveys() if preferred

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Available Surveys</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your feedback is valuable to us. Please take a moment to complete any of the active surveys below.
        </p>
      </section>
      
      {surveysToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {surveysToDisplay.map(survey => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No surveys available at the moment.</p>
        </div>
      )}
    </div>
  );
}
