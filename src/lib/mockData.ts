
import type { Course, Deadline, Survey, SurveyQuestion } from '@/lib/types';

const sampleVideoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const samplePdfUrl = '/resources/sample-document.pdf'; // Generic placeholder for PDF resources

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
          { id: 'math-g10-m1-l1', title: 'Introduction to Algebra', contentType: 'video', content: sampleVideoUrl, durationMinutes: 25 },
          { id: 'math-g10-m1-l2', title: 'Polynomials Quiz', contentType: 'quiz', content: '{"question": "What is (x+2)(x-2)?"}' , durationMinutes: 15},
          { id: 'math-g10-m1-l3', title: 'Factorization Techniques', contentType: 'text', content: 'Detailed notes on various factorization methods.', durationMinutes: 45 },
          { id: 'math-g10-m1-l4', title: 'Algebra Worksheet', contentType: 'resource', content: samplePdfUrl, durationMinutes: 60 },
        ],
      },
      {
        id: 'math-g10-m2',
        title: 'Euclidean Geometry',
        description: 'Exploring theorems and properties of geometric figures.',
        progress: 10,
        lessons: [
          { id: 'math-g10-m2-l1', title: 'Lines and Angles', contentType: 'video', content: sampleVideoUrl, durationMinutes: 30 },
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
          { id: 'phy-g11-m1-l1', title: 'Newton\'s Laws Video', contentType: 'video', content: sampleVideoUrl, durationMinutes: 40 },
          { id: 'phy-g11-m1-l2', title: 'Work Energy Theorem Notes', contentType: 'text', content: 'Explanation of the work-energy theorem.', durationMinutes: 30 },
        ],
      },
      {
        id: 'phy-g11-m2',
        title: 'Electricity and Magnetism',
        description: 'Fundamentals of electric circuits and magnetic fields.',
        progress: 20,
        lessons: [
          { id: 'phy-g11-m2-l1', title: 'Circuit Analysis', contentType: 'video', content: sampleVideoUrl, durationMinutes: 35 },
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
          { id: 'ls-g12-m1-l1', title: 'DNA Structure Lecture', contentType: 'video', content: sampleVideoUrl, durationMinutes: 45 },
          { id: 'ls-g12-m1-l2', title: 'Genetics Problems Set', contentType: 'resource', content: samplePdfUrl, durationMinutes: 60 },
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
        id: 'eng-g10-m2',
        title: 'Creative Writing',
        description: 'Techniques for writing essays and narratives.',
        progress: 60,
        lessons: [
          { id: 'eng-g10-m2-l1', title: 'Essay Writing Guide', contentType: 'resource', content: samplePdfUrl, durationMinutes: 40 },
        ],
      },
    ],
  },
  {
    id: 'zulu-hl-grade10',
    title: 'isiZulu Home Language Grade 10',
    subject: 'isiZulu HL',
    grade: 'Grade 10',
    description: 'Ukuthuthukisa amakhono olimi: ukufunda, ukubhala, ukulalela nokukhuluma.',
    imageUrl: 'https://picsum.photos/seed/zulu10/600/400', 
    instructor: 'Nkz. Thandi Zulu',
    progress: 25,
    modules: [
      {
        id: 'zulu-g10-m1',
        title: 'Izinkondlo (Poetry)',
        description: 'Ukuhlaziya nokujabulela izinkondlo zesiZulu.',
        progress: 50,
        lessons: [
          { id: 'zulu-g10-m1-l1', title: 'Isingeniso Ezinkondlweni', contentType: 'video', content: sampleVideoUrl, durationMinutes: 30 },
          { id: 'zulu-g10-m1-l2', title: 'Izinhlobo Zezinkondlo', contentType: 'text', content: 'Amanothi ngezinhlobo ezahlukene zezinkondlo zesiZulu.', durationMinutes: 40 },
        ],
      },
      {
        id: 'zulu-g10-m2',
        title: 'Uhlelo LwesiZulu (Grammar)',
        description: 'Izisekelo zohlelo lolimi lwesiZulu.',
        progress: 10,
        lessons: [
          { id: 'zulu-g10-m2-l1', title: 'Amabizwana (Nouns)', contentType: 'text', content: 'Incazelo yamabizwana nezibonelo.', durationMinutes: 45 },
        ],
      },
    ],
  },
  {
    id: 'afrikaans-fal-grade11',
    title: 'Afrikaans First Additional Language Grade 11',
    subject: 'Afrikaans FAL',
    grade: 'Grade 11',
    description: 'Verbeter taalvaardighede: lees, skryf, luister en praat.',
    imageUrl: 'https://picsum.photos/seed/afrikaans11/600/400',
    instructor: 'Mnr. Johan van der Merwe',
    progress: 40,
    modules: [
      {
        id: 'afr-g11-m1',
        title: 'Taalleer (Language Study)',
        description: 'Fokus op Afrikaanse grammatika en taalstrukture.',
        progress: 60,
        lessons: [
          { id: 'afr-g11-m1-l1', title: 'Woordsoorte Video Les', contentType: 'video', content: sampleVideoUrl, durationMinutes: 35 },
          { id: 'afr-g11-m1-l2', title: 'Opstel Skryfwerk (Essay Writing)', contentType: 'resource', content: samplePdfUrl, durationMinutes: 50 },
        ],
      },
    ],
  },
  {
    id: 'sepedi-hl-grade10',
    title: 'Sepedi Home Language Grade 10',
    subject: 'Sepedi HL',
    grade: 'Grade 10',
    description: 'Go godiša bokgoni bja polelo: go bala, go ngwala, go theeletša le go bolela.',
    imageUrl: 'https://picsum.photos/seed/sepedi10/600/400',
    instructor: 'Mof. Maria Rakgadi',
    progress: 10,
    modules: [
      {
        id: 'sepedi-g10-m1',
        title: 'Direto (Poetry)',
        description: 'Go sekaseka le go thabela direto tša Sepedi.',
        progress: 20,
        lessons: [
          { id: 'sepedi-g10-m1-l1', title: 'Matseno go Direto', contentType: 'video', content: sampleVideoUrl, durationMinutes: 28 },
          { id: 'sepedi-g10-m1-l2', title: 'Mehuta ya Direto', contentType: 'text', content: 'Dintlha ka ga mehuta ya direto tša Sepedi.', durationMinutes: 38 },
        ],
      },
    ],
  },
  {
    id: 'xitsonga-hl-grade11',
    title: 'Xitsonga Home Language Grade 11',
    subject: 'Xitsonga HL',
    grade: 'Grade 11',
    description: 'Ku antswisa vutshila bya ririmi: ku hlaya, ku tsala, ku yingisela na ku vulavula.',
    imageUrl: 'https://picsum.photos/seed/xitsonga11/600/400',
    instructor: 'Nkul. James Maluleke',
    progress: 5,
    modules: [
      {
        id: 'xitsonga-g11-m1',
        title: 'Switlhokovetselo (Poetry)',
        description: 'Ku kambisisa na ku tiphina hi switlhokovetselo swa Xitsonga.',
        progress: 15,
        lessons: [
          { id: 'xitsonga-g11-m1-l1', title: 'Marungula ya Switlhokovetselo', contentType: 'video', content: sampleVideoUrl, durationMinutes: 32 },
        ],
      },
    ],
  },
  {
    id: 'sesotho-hl-grade12',
    title: 'Sesotho Home Language Grade 12',
    subject: 'Sesotho HL',
    grade: 'Grade 12',
    description: 'Ho ntshetsapele bokgoni ba puo: ho bala, ho ngola, ho mamela le ho bua.',
    imageUrl: 'https://picsum.photos/seed/sesotho12/600/400',
    instructor: 'Mme. Lerato Mohapi',
    progress: 22,
    modules: [
      {
        id: 'sesotho-g12-m1',
        title: 'Dithothokiso (Poetry)',
        description: 'Tshekatsheko le kananelo ya dithothokiso tsa Sesotho.',
        progress: 30,
        lessons: [
          { id: 'sesotho-g12-m1-l1', title: 'Selelekela ho Dithothokiso', contentType: 'text', content: 'Dintlha tsa selelekela mabapi le dithothokiso.', durationMinutes: 42 },
        ],
      },
    ],
  },
  {
    id: 'business-studies-grade10',
    title: 'Business Studies Grade 10',
    subject: 'Business Studies',
    grade: 'Grade 10',
    description: 'Introduction to business environments, entrepreneurship, and management.',
    imageUrl: 'https://picsum.photos/seed/business10/600/400',
    instructor: 'Mr. John Miller',
    deadline: '2024-11-01',
    progress: 45,
    modules: [
      {
        id: 'bs-g10-m1',
        title: 'Business Environments',
        description: 'Understanding micro, market, and macro environments.',
        progress: 70,
        lessons: [
          { id: 'bs-g10-m1-l1', title: 'Micro Environment Explained', contentType: 'video', content: sampleVideoUrl, durationMinutes: 30 },
          { id: 'bs-g10-m1-l2', title: 'SWOT Analysis Guide', contentType: 'resource', content: samplePdfUrl, durationMinutes: 40 },
        ],
      },
      {
        id: 'bs-g10-m2',
        title: 'Entrepreneurship',
        description: 'Exploring the qualities and roles of entrepreneurs.',
        progress: 20,
        lessons: [
          { id: 'bs-g10-m2-l1', title: 'What is an Entrepreneur?', contentType: 'text', content: 'Characteristics and importance of entrepreneurs.', durationMinutes: 35 },
        ],
      },
    ],
  },
  {
    id: 'economics-grade11',
    title: 'Economics Grade 11',
    subject: 'Economics',
    grade: 'Grade 11',
    description: 'Study of markets, economic growth, inflation, and fiscal policy.',
    imageUrl: 'https://picsum.photos/seed/economics11/600/400',
    instructor: 'Ms. Linda Chen',
    deadline: '2024-10-15',
    progress: 60,
    modules: [
      {
        id: 'econ-g11-m1',
        title: 'Markets and Market Failure',
        description: 'Understanding demand, supply, and types of market failure.',
        progress: 80,
        lessons: [
          { id: 'econ-g11-m1-l1', title: 'Demand and Supply Curves', contentType: 'video', content: sampleVideoUrl, durationMinutes: 38 },
          { id: 'econ-g11-m1-l2', title: 'Market Failure Quiz', contentType: 'quiz', content: '{"question": "Define externality."}', durationMinutes: 20 },
        ],
      },
    ],
  },
  {
    id: 'accounting-grade12',
    title: 'Accounting Grade 12',
    subject: 'Accounting',
    grade: 'Grade 12',
    description: 'Advanced financial accounting, cost accounting, and budgeting for matric.',
    imageUrl: 'https://picsum.photos/seed/accounting12/600/400',
    instructor: 'Mr. Peter Jones',
    deadline: '2024-09-30',
    progress: 25,
    modules: [
      {
        id: 'acc-g12-m1',
        title: 'Financial Statements',
        description: 'Preparation and analysis of company financial statements.',
        progress: 50,
        lessons: [
          { id: 'acc-g12-m1-l1', title: 'Income Statement Analysis', contentType: 'video', content: sampleVideoUrl, durationMinutes: 42 },
          { id: 'acc-g12-m1-l2', title: 'Balance Sheet Practice', contentType: 'resource', content: samplePdfUrl, durationMinutes: 55 },
        ],
      },
      {
        id: 'acc-g12-m2',
        title: 'Cost Accounting',
        description: 'Understanding cost concepts and break-even analysis.',
        progress: 10,
        lessons: [
          { id: 'acc-g12-m2-l1', title: 'Break-Even Point Calculation', contentType: 'text', content: 'Step-by-step guide to calculating break-even points.', durationMinutes: 30 },
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

// Add data-ai-hint for course images
mockCourses.forEach(course => {
  let hint = "education learning"; // Default hint
  const subjectLower = course.subject.toLowerCase();

  if (subjectLower.includes('math')) {
    hint = "mathematics textbook";
  } else if (subjectLower.includes('physics') || subjectLower.includes('physical')) {
    hint = "science experiment";
  } else if (subjectLower.includes('life sci')) {
    hint = "biology dna";
  } else if (subjectLower.includes('business')) {
    hint = "business meeting";
  } else if (subjectLower.includes('economics')) {
    hint = "stock market";
  } else if (subjectLower.includes('accounting')) {
    hint = "calculator ledger";
  } else if (
    subjectLower.includes('english') ||
    subjectLower.includes('zulu') ||
    subjectLower.includes('afrikaans') ||
    subjectLower.includes('sepedi') ||
    subjectLower.includes('xitsonga') ||
    subjectLower.includes('sesotho') ||
    subjectLower.includes('language') // Generic catch-all for languages
  ) {
    hint = "language study";
  }
  // Ensure existing data-ai-hint is not overwritten if present, and correctly format
  const baseUrl = course.imageUrl.includes('"') ? course.imageUrl.split('"')[0] : course.imageUrl;
  course.imageUrl = `${baseUrl}" data-ai-hint="${hint}`;
});


// Mock Survey Data
export const mockSurveys: Survey[] = [
  {
    id: 'platform-feedback-survey',
    title: 'Platform Feedback Survey',
    description: 'Help us improve AlamedaLearn by sharing your experience with our platform.',
    isActive: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1-ease-of-use',
        text: 'How easy is it to navigate and use the AlamedaLearn platform?',
        type: 'rating',
        minRating: 1,
        maxRating: 5,
        ratingLabels: { min: 'Very Difficult', max: 'Very Easy' },
        isRequired: true,
      },
      {
        id: 'q2-course-content',
        text: 'How satisfied are you with the quality and relevance of the course content?',
        type: 'rating',
        minRating: 1,
        maxRating: 5,
        ratingLabels: { min: 'Very Dissatisfied', max: 'Very Satisfied' },
        isRequired: true,
      },
      {
        id: 'q3-features',
        text: 'Which features do you find most useful? (Select all that apply)',
        type: 'multiple-choice',
        isRequired: false,
        options: [
          { id: 'feat1', value: 'ai_study_planner', label: 'AI Study Planner' },
          { id: 'feat2', value: 'course_videos', label: 'Course Videos' },
          { id: 'feat3', value: 'quizzes', label: 'Quizzes' },
          { id: 'feat4', value: 'progress_tracking', label: 'Progress Tracking' },
          { id: 'feat5', value: 'downloadable_resources', label: 'Downloadable Resources' },
        ],
      },
      {
        id: 'q4-improvements',
        text: 'What improvements or new features would you like to see on AlamedaLearn?',
        type: 'text',
        isRequired: false,
      },
      {
        id: 'q5-recommend',
        text: 'Would you recommend AlamedaLearn to a friend or colleague?',
        type: 'yes-no',
        isRequired: true,
      },
      {
        id: 'q6-primary-device',
        text: 'What is your primary device for accessing AlamedaLearn?',
        type: 'single-choice',
        isRequired: true,
        options: [
            {id: 'dev1', value: 'desktop', label: 'Desktop Computer'},
            {id: 'dev2', value: 'laptop', label: 'Laptop Computer'},
            {id: 'dev3', value: 'tablet', label: 'Tablet'},
            {id: 'dev4', value: 'smartphone', label: 'Smartphone'},
        ]
      }
    ],
  },
  {
    id: 'math-course-feedback',
    title: 'Mathematics Course Feedback',
    description: 'Please provide feedback specific to your experience with our Mathematics courses.',
    isActive: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: 'math-q1-difficulty',
        text: 'How would you rate the difficulty level of the Mathematics course content?',
        type: 'single-choice',
        isRequired: true,
        options: [
          { id: 'diff1', value: 'too_easy', label: 'Too Easy' },
          { id: 'diff2', value: 'just_right', label: 'Just Right' },
          { id: 'diff3', value: 'too_difficult', label: 'Too Difficult' },
        ],
      },
      {
        id: 'math-q2-video-lessons',
        text: 'How helpful are the video lessons for understanding mathematical concepts?',
        type: 'rating',
        minRating: 1,
        maxRating: 5,
        ratingLabels: { min: 'Not Helpful', max: 'Very Helpful' },
        isRequired: true,
      },
      {
        id: 'math-q3-suggestions',
        text: 'Do you have any specific suggestions for improving the Mathematics courses?',
        type: 'text',
        isRequired: false,
      },
    ],
  },
  {
    id: 'inactive-survey-example',
    title: 'Past Event Feedback (Closed)',
    description: 'This survey is no longer active.',
    isActive: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    questions: [
       {
        id: 'past-q1',
        text: 'This is a question from a past, inactive survey.',
        type: 'text',
        isRequired: false,
      },
    ]
  }
];

export const getAllSurveys = (): Survey[] => mockSurveys;

export const getActiveSurveys = (): Survey[] => mockSurveys.filter(survey => survey.isActive);

export const getSurveyById = (id: string): Survey | undefined => mockSurveys.find(survey => survey.id === id);
