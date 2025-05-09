
import { mockSubjects, mockDeadlines } from '@/lib/mockData'; // Renamed mockCourses to mockSubjects
import SubjectCard from '@/components/SubjectCard'; // Renamed CourseCard to SubjectCard
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ListChecks, CalendarClock, BarChart3, BookCopy } from 'lucide-react'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const ongoingSubjects = mockSubjects.filter(subject => (subject.progress ?? 0) < 100 && (subject.progress ?? 0) > 0).slice(0, 3); // Renamed ongoingCourses, mockSubjects, subject
  const upcomingDeadlines = mockDeadlines
    .filter(deadline => new Date(deadline.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  const overallProgress = mockSubjects.length > 0 
    ? mockSubjects.reduce((acc, subject) => acc + (subject.progress ?? 0), 0) / mockSubjects.length // Renamed mockSubjects, subject
    : 0;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">Welcome to AlamedaLearn!</h1>
        <p className="text-muted-foreground text-lg">Your personalized learning journey starts here.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects Enrolled</CardTitle> {/* Renamed from Total Courses Enrolled */}
            <BookCopy className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSubjects.length}</div> {/* Renamed from mockCourses */}
            <p className="text-xs text-muted-foreground">
              Explore a wide range of academic subjects. {/* Updated text */}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all your subjects. {/* Renamed from courses */}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">
              Stay on top of your schedule.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {ongoingSubjects.length > 0 && ( // Renamed from ongoingCourses
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Continue Learning</h2>
            <Button variant="outline" asChild>
              <Link href="/subjects">View All Subjects</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ongoingSubjects.map(subject => ( // Renamed from ongoingCourses, course
              <SubjectCard key={subject.id} subject={subject} /> // Renamed from CourseCard, course prop
            ))}
          </div>
        </section>
      )}

      {upcomingDeadlines.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Upcoming Deadlines</h2>
          <Card className="shadow-md">
            <CardContent className="p-6">
              <ul className="space-y-3">
                {upcomingDeadlines.map(deadline => (
                  <li key={deadline.subjectName + deadline.date} className="flex items-center justify-between p-3 bg-muted/50 rounded-md"> {/* Renamed from courseName */}
                    <div>
                      <p className="font-medium">{deadline.subjectName}</p> {/* Renamed from courseName */}
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(deadline.date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <ListChecks className="h-5 w-5 text-primary" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      <section className="text-center py-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Ready to plan your studies?</h2>
        <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
          Use our AI Study Planner to create a personalized schedule tailored to your needs and deadlines.
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-200 hover:scale-105">
          <Link href="/study-planner">
            Go to AI Study Planner
          </Link>
        </Button>
      </section>
    </div>
  );
}
