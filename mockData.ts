
import { Subject, Teacher, Course, Lecture, Exam, Question, Announcement, Admin } from './types';

export interface EnhancedSubject extends Subject {
  category: string;
  lessonsCount: number;
  progress: number;
  isNew?: boolean;
}

export const VALID_CODES = [
  { code: '1111111', studentName: 'أحمد علي', expiryDate: null as string | null, durationDays: 30, section: 'علمي علوم', deviceId: null as string | null },
  { code: '2222222', studentName: 'سارة محمد', expiryDate: null as string | null, durationDays: 7, section: 'أدبي', deviceId: null as string | null },
];

export const subjects: EnhancedSubject[] = [
  { id: '1', name: 'الفيزياء', image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400', category: 'العلمية', lessonsCount: 8, progress: 65 },
  { id: '2', name: 'الكيمياء', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400', category: 'العلمية', lessonsCount: 12, progress: 30, isNew: true },
  { id: '3', name: 'الأحياء', image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400', category: 'العلمية', lessonsCount: 15, progress: 85 },
]; 

export const teachers: Teacher[] = [
  { id: 't1', name: 'أ. محمد عبدالمعبود', avatar: 'https://i.pravatar.cc/150?u=t1', subjectId: '1', rating: 4.9, specialty: 'أسطورة الفيزياء' },
  { id: 't2', name: 'أ. محمد صالح', avatar: 'https://i.pravatar.cc/150?u=t2', subjectId: '3', rating: 4.8, specialty: 'خبير الأحياء' },
];

export const courses: Course[] = [
  { id: 'c1', title: 'كورس الكهربية التيار المستمر', teacherId: 't1', thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400', lectureCount: 3, duration: '10 ساعات' },
];

export const lectures: Lecture[] = [
  { 
    id: 'l1', 
    courseId: 'c1', 
    title: 'المحاضرة 1: شدة التيار وفرق الجهد', 
    videoUrl: 'https://iframe.mediadelivery.net/embed/571608/620c1c74-3b58-476b-8526-c0eb12c30272?autoplay=true&loop=false&muted=false&preload=true&responsive=true',
    duration: '45:00', 
    isCompleted: true,
    description: 'شرح تفصيلي لمفهوم شدة التيار الكهربي وفرق الجهد وقانون أوم.',
    thumbnail: 'https://images.unsplash.com/photo-1603126010305-2f560a3d5e7e?auto=format&fit=crop&q=80&w=400',
    pdfs: [
      { title: 'مذكرة الشرح (بي دي اف)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { title: 'مذكرة الواجب المنزلي', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ],
    exams: [
      { id: 'ex1', title: 'اختبار تجريبي 1' },
      { id: 'ex2', title: 'اختبار المتفوقين' }
    ],
    parts: [
        { title: 'الجزء 1: الشرح النظري', videoUrl: 'https://iframe.mediadelivery.net/embed/571608/620c1c74-3b58-476b-8526-c0eb12c30272?autoplay=true&loop=false&muted=false&preload=true&responsive=true', duration: '20:00' },
        { title: 'الجزء 2: حل المسائل', videoUrl: 'https://www.youtube.com/watch?v=9jJmGqF4Jkg', duration: '25:00' }
    ]
  },
];

export const admins: Admin[] = [
  { id: '1', name: 'أدمن المنصة', telegram_username: 'official_admin', avatar_url: 'https://i.pravatar.cc/150?u=admin1', role: 'أدمن' },
  { id: '2', name: 'الدعم الفني', telegram_username: 'student_support', avatar_url: 'https://i.pravatar.cc/150?u=admin2', role: 'أدمن' }
];

export const exams: Exam[] = [
  { id: 'ex1', title: 'اختبار تجريبي 1', passingScore: 50, lectureId: 'l1', durationMinutes: 45 },
];

export const questions: Question[] = [
  { id: 'q1', examId: 'ex1', text: 'ما هو قانون أوم؟', options: ['V=IR', 'V=I/R', 'I=V*R', 'R=V*I'], correctAnswer: 0 },
];

export const announcements: Announcement[] = [
    { id: 'a1', title: 'تنبيه هام', message: 'تم تفعيل كودك بنجاح.', date: new Date().toISOString(), type: 'success' }
];
