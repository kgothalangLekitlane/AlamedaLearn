
import { mockSubjects } from '@/lib/mockData'; // Renamed from mockCourses
import SubjectCard from '@/components/SubjectCard'; // Renamed from CourseCard
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// This component would ideally be client-side for interactive filtering
// For server-side, we'll just display all subjects.
// A real implementation would use state for search term and filter subjects.

export default function SubjectsPage() { // Renamed from CoursesPage
  // const [searchTerm, setSearchTerm] = useState('');
  // const filteredSubjects = mockSubjects.filter(subject => 
  //   subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) || // subject.subject refers to academic discipline
  //   subject.grade.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // For now, display all subjects as this is a server component primarily.
  const subjectsToDisplay = mockSubjects; // Renamed from coursesToDisplay, mockCourses

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Explore Our Subjects</h1> {/* Renamed from Courses */}
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Dive into a wide range of academic disciplines from the South African high school curriculum, designed to help you excel. {/* Updated text */}
        </p>
      </section>

      {/* Search bar - would require client component for full functionality */}
      {/* <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search subjects by title, academic discipline, or grade..." // Updated placeholder
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      
      {subjectsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjectsToDisplay.map(subject => ( // Renamed from coursesToDisplay, course
            <SubjectCard key={subject.id} subject={subject} /> // Renamed from CourseCard, course prop
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No subjects match your search criteria.</p> {/* Updated text */}
        </div>
      )}
    </div>
  );
}
