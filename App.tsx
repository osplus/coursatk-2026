
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { API } from './services/api';
import Login from './pages/Login';
import Subjects from './pages/Subjects';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import LecturesList from './pages/LecturesList';
import LectureView from './pages/LectureView';
import QuizView from './pages/QuizView';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import PdfViewer from './pages/PdfViewer';
import HowToSubscribe from './pages/HowToSubscribe';

const App: React.FC = () => {
  const [student, setStudent] = useState<any>(() => {
    try {
      const savedData = localStorage.getItem('app_student_data');
      return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
      localStorage.removeItem('app_student_data');
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!student);

  const handleLogin = (studentData: any) => {
    if (studentData) {
      localStorage.setItem('app_student_data', JSON.stringify(studentData));
      setStudent(studentData);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('app_student_data');
    setStudent(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !student?.code) return;
    
    const checkStatus = async () => {
      try {
        const status = await API.checkCodeStatus(student.code);
        
        if (!status.valid) {
          // إذا كان الكود غير صالح (محذوف أو منتهي)
          // 1. نقوم بتخزين رسالة الخطأ ليقرأها كود صفحة الدخول
          localStorage.setItem('login_error', status.message || "تم إنهاء الجلسة من قبل النظام");
          
          // 2. نقوم بمسح بيانات الطالب وتسجيل الخروج فوراً
          localStorage.removeItem('app_student_data');
          setStudent(null);
          setIsAuthenticated(false);
          return false;
        }
        return true;
      } catch (e) {
        // نتجاهل أخطاء الشبكة المؤقتة
        return true; 
      }
    };

    checkStatus();

    const checkInterval = setInterval(async () => {
      const isValid = await checkStatus();
      if (!isValid) {
        clearInterval(checkInterval);
      }
    }, 10000); // التحقق كل 10 ثواني

    return () => clearInterval(checkInterval);
  }, [isAuthenticated, student]);

  return (
    <HashRouter>
      <div className="min-h-screen text-right font-['Tajawal'] overflow-x-hidden text-white" dir="rtl">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} />
          <Route path="/how-to-subscribe" element={<HowToSubscribe />} />
          <Route path="/" element={isAuthenticated ? <Subjects student={student} /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={isAuthenticated ? <Profile onLogout={handleLogout} student={student} /> : <Navigate to="/login" replace />} />
          <Route path="/notifications" element={isAuthenticated ? <Notifications student={student} /> : <Navigate to="/login" replace />} />
          <Route path="/subject/:id/teachers" element={isAuthenticated ? <Teachers /> : <Navigate to="/login" replace />} />
          <Route path="/teacher/:id/courses" element={isAuthenticated ? <Courses /> : <Navigate to="/login" replace />} />
          <Route path="/course/:id/lectures" element={isAuthenticated ? <LecturesList /> : <Navigate to="/login" replace />} />
          <Route path="/lecture/:id" element={isAuthenticated ? <LectureView /> : <Navigate to="/login" replace />} />
          <Route path="/quiz/:examId" element={isAuthenticated ? <QuizView /> : <Navigate to="/login" replace />} />
          <Route path="/pdf" element={isAuthenticated ? <PdfViewer /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
