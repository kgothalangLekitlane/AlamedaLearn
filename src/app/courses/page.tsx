import { mockCourses } from '@/lib/mockData';
import CourseCard from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// This component would ideally be client-side for interactive filtering
// For server-side, we'll just display all courses.
// A real implementation would use state for search term and filter courses.

export default function CoursesPage() {
  // const [searchTerm, setSearchTerm] = useState('');
  // const filteredCourses = mockCourses.filter(course => 
  //   course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   course.grade.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // For now, display all courses as this is a server component primarily.
  const coursesToDisplay = mockCourses;

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Explore Our Courses</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Dive into a wide range of subjects from the South African high school curriculum, designed to help you excel.
        </p>
      </section>

      {/* Search bar - would require client component for full functionality */}
      {/* <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search courses by title, subject, or grade..." 
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      
      {coursesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coursesToDisplay.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No courses match your search criteria.</p>
        </div>
      )}
    </div>
  );
}
