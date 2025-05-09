import type { Course, Deadline } from '@/lib/types';

export const mockCourses: Course[] = [
  {
    id: 'math-grade10',
    title: 'Mathematics Grade 10',
    subject: 'Mathematics',
    grade: 'Grade 10',
    description: 'Comprehensive coverage of Grade 10 Mathematics syllabus including Algebra, Geometry, and Trigonometry.',
    imageUrl: 'https://picsum.photos/seed/math10/600/400',
    instructor: 'Mr. Themba Khumalo',
    deadline: '2024-11-15',
    progress: 30,
    modules: [
      {
        id: 'math-g10-m1',
        title: 'Algebraic Expressions',
        description: 'Understanding and manipulating algebraic expressions.',
        progress: 60,
        lessons: [
          { id: 'math-g10-m1-l1', title: 'Introduction to Algebra', contentType: 'video', content: 'https://picsum.photos/seed/algvid/600/400', durationMinutes: 25 },
          { id: 'math-g10-m1-l2', title: 'Polynomials Quiz', contentType: 'quiz', content: '{"question": "What is (x+2)(x-2)?"}' , durationMinutes: 15},
          { id: 'math-g10-m1-l3', title: 'Factorization Techniques', contentType: 'text', content: 'Detailed notes on various factorization methods.', durationMinutes: 45 },
          { id: 'math-g10-m1-l4', title: 'Algebra Worksheet', contentType: 'resource', content: '/resources/algebra-worksheet.pdf', durationMinutes: 60 },
        ],
      },
      {
        id: 'math-g10-m2',
        title: 'Euclidean Geometry',
        description: 'Exploring theorems and properties of geometric figures.',
        progress: 10,
        lessons: [
          { id: 'math-g10-m2-l1', title: 'Lines and Angles', contentType: 'video', content: 'https://picsum.photos/seed/geomvid/600/400', durationMinutes: 30 },
          { id: 'math-g10-m2-l2', title: 'Triangles and Quadrilaterals', contentType: 'text', content: 'Properties of triangles and quadrilaterals.', durationMinutes: 50 },
        ],
      },
    ],
  },
  {
    id: 'physics-grade11',
    title: 'Physical Sciences Grade 11',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    description: 'Covering mechanics, waves, electricity, and magnetism for Grade 11.',
    imageUrl: 'https://picsum.photos/seed/physics11/600/400',
    instructor: 'Ms. Sarah Naidoo',
    deadline: '2024-10-30',
    progress: 55,
    modules: [
      {
        id: 'phy-g11-m1',
        title: 'Newtonian Mechanics',
        description: 'Laws of motion, work, energy, and power.',
        progress: 75,
        lessons: [
          { id: 'phy-g11-m1-l1', title: 'Newton\'s Laws Video', contentType: 'video', content: 'https://picsum.photos/seed/newtonvid/600/400', durationMinutes: 40 },
          { id: 'phy-g11-m1-l2', title: 'Work Energy Theorem Notes', contentType: 'text', content: 'Explanation of the work-energy theorem.', durationMinutes: 30 },
        ],
      },
      {
        id: 'phy-g11-m2',
        title: 'Electricity and Magnetism',
        description: 'Fundamentals of electric circuits and magnetic fields.',
        progress: 20,
        lessons: [
          { id: 'phy-g11-m2-l1', title: 'Circuit Analysis', contentType: 'video', content: 'https://picsum.photos/seed/circuitvid/600/400', durationMinutes: 35 },
        ],
      },
    ],
  },
  {
    id: 'life-sci-grade12',
    title: 'Life Sciences Grade 12',
    subject: 'Life Sciences',
    grade: 'Grade 12',
    description: 'In-depth study of genetics, evolution, and human physiology for matric finals.',
    imageUrl: 'https://picsum.photos/seed/lifesci12/600/400',
    instructor: 'Dr. Bongiwe Dlamini',
    deadline: '2024-09-20',
    progress: 15,
    modules: [
      {
        id: 'ls-g12-m1',
        title: 'Genetics and Inheritance',
        description: 'Mendelian genetics, DNA, and protein synthesis.',
        progress: 40,
        lessons: [
          { id: 'ls-g12-m1-l1', title: 'DNA Structure Lecture', contentType: 'video', content: 'https://picsum.photos/seed/dnavid/600/400', durationMinutes: 45 },
          { id: 'ls-g12-m1-l2', title: 'Genetics Problems Set', contentType: 'resource', content: '/resources/genetics-problems.pdf', durationMinutes: 60 },
        ],
      },
    ],
  },
  {
    id: 'eng-fal-grade10',
    title: 'English First Additional Language Grade 10',
    subject: 'English FAL',
    grade: 'Grade 10',
    description: 'Developing language skills: reading, writing, listening, and speaking.',
    imageUrl: 'https://picsum.photos/seed/english10/600/400',
    instructor: 'Mrs. Jane Smith',
    progress: 70,
    modules: [
      {
        id: 'eng-g10-m1',
        title: 'Reading Comprehension',
        description: 'Techniques for understanding various texts.',
        progress: 80,
        lessons: [
          { id: 'eng-g10-m1-l1', title: 'Analyzing Short Stories', contentType: 'text', content: 'How to analyze themes and characters in short stories.', durationMinutes: 50 },
        ],
      },
      {
        id: 'eng-g10-m1',
        title: 'Creative Writing',
        description: 'Techniques for writing essays and narratives.',
        progress: 60,
        lessons: [
          { id: 'eng-g10-m1-l1', title: 'Essay Writing Guide', contentType: 'resource', content: '/resources/essay-guide.pdf', durationMinutes: 40 },
        ],
      },
    ],
  },
];

export const mockDeadlines: Deadline[] = mockCourses
  .filter(course => course.deadline)
  .map(course => ({
    courseName: course.title,
    date: course.deadline!,
  }));

export const getCourseById = (id: string): Course | undefined => mockCourses.find(course => course.id === id);

export const getModuleById = (courseId: string, moduleId: string) => {
  const course = getCourseById(courseId);
  return course?.modules.find(module => module.id === moduleId);
}

export const getLessonById = (courseId: string, moduleId: string, lessonId: string) => {
  const module = getModuleById(courseId, moduleId);
  return module?.lessons.find(lesson => lesson.id === lessonId);
}

// Add data-ai-hint for images
mockCourses.forEach(course => {
  if (course.subject.toLowerCase().includes('math')) {
    course.imageUrl = `https://picsum.photos/seed/${course.id}/600/400" data-ai-hint="mathematics textbook`;
  } else if (course.subject.toLowerCase().includes('physics') || course.subject.toLowerCase().includes('physical')) {
    course.imageUrl = `https://picsum.photos/seed/${course.id}/600/400" data-ai-hint="science experiment`;
  } else if (course.subject.toLowerCase().includes('life sci')) {
    course.imageUrl = `https://picsum.photos/seed/${course.id}/600/400" data-ai-hint="biology dna`;
  } else if (course.subject.toLowerCase().includes('english')) {
    course.imageUrl = `https://picsum.photos/seed/${course.id}/600/400" data-ai-hint="books library`;
  } else {
    course.imageUrl = `https://picsum.photos/seed/${course.id}/600/400" data-ai-hint="education learning`;
  }

  course.modules.forEach(module => {
    module.lessons.forEach(lesson => {
      if (lesson.contentType === 'video') {
        lesson.content = `https://picsum.photos/seed/${lesson.id}/600/400" data-ai-hint="video lecture`;
      }
    });
  });
});
