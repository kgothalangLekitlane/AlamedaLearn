import StudyPlannerForm from './StudyPlannerForm';

export default function StudyPlannerPage() {
  return (
    <div className="container mx-auto py-8">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-3">AI Study Planner</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Craft your perfect study routine with our intelligent planner. Achieve your academic goals by optimizing your study time based on your course deadlines and availability.
        </p>
      </section>
      <StudyPlannerForm />
    </div>
  );
}
