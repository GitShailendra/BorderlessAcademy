// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './assets/Theme/ThemeContext';
import './i18n/i18n'; // Import i18n configuration
import About from './Pages/AboutUs/About';
import Programs from './Pages/Programs/Programs';
import Contact from './Pages/ContactUs/Contact';
import { Import } from 'lucide-react';

// Lazy load components
const Layout = lazy(() => import('./components/layout/Layout'));
const Home = lazy(() => import('./Pages/Home/home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Courses = lazy(() => import('./Pages/Courses/Courses'));
const RegisterPage = lazy(() => import('./Pages/Registration/RegisterPage'));
const LoginPage = lazy(() => import('./Pages/Registration/LoginPage'));
const GuardianDashboard = lazy(() => import('./Pages/Registration/GaurdianRegistration/GuardianDashboard'))
const StudentDashboard = lazy(()=> import('./Pages/Registration/student/StudentDashboard'))
const TeacherDashboard = lazy(()=>import('./Pages/Registration/TeacherRegistration/TeacherDashboard'))
const AdminDashboard = lazy(()=>import('./Pages/Registration/Admin/AdminDashboard'))
// Loading component with translation
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="text-primary text-center">
      <div className="animate-pulse text-xl font-semibold">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading...
      </div>
    </div>
  </div>
);

function App() {
  // Initialize language detection and RTL support
  React.useEffect(() => {
    // Get stored language or browser language
    const storedLang = localStorage.getItem('i18nextLng') || navigator.language;

    // Set RTL for Arabic
    if (storedLang.startsWith('ar')) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/About"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="/programs"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Programs />
                    </Suspense>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Courses />
                    </Suspense>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <RegisterPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Contact />
                    </Suspense>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <LoginPage />
                    </Suspense>
                  }
                />
                <Route path="/guardian/*" element={<GuardianDashboard />}>
                  {/* <Route index element={<Navigate to="overview" />} />
                  <Route path="overview" element={<GuardianDashboard />} />
                  <Route path="students/:studentId/*" element={<StudentDashboard />} />
                  <Route path="messages" element={<GuardianMessages />} />
                  <Route path="payments" element={<GuardianPayments />} />
                  <Route path="settings" element={<GuardianSettings />} /> */}
                </Route>
                <Route path="/student/*" element={<StudentDashboard/>}>
                  {/* <Route index element={<Navigate to="overview" />} />
                  <Route path="overview" element={<GuardianDashboard />} />
                  <Route path="students/:studentId/*" element={<StudentDashboard />} />
                  <Route path="messages" element={<GuardianMessages />} />
                  <Route path="payments" element={<GuardianPayments />} />
                  <Route path="settings" element={<GuardianSettings />} /> */}
                </Route>
                <Route path="/teacher/*" element={<TeacherDashboard/>}>
                  {/* <Route index element={<Navigate to="overview" />} />
                  <Route path="overview" element={<GuardianDashboard />} />
                  <Route path="students/:studentId/*" element={<StudentDashboard />} />
                  <Route path="messages" element={<GuardianMessages />} />
                  <Route path="payments" element={<GuardianPayments />} />
                  <Route path="settings" element={<GuardianSettings />} /> */}
                </Route>
                <Route path="/admin/*" element={<AdminDashboard/>}>
                  {/* <Route index element={<Navigate to="overview" />} />
                  <Route path="overview" element={<GuardianDashboard />} />
                  <Route path="students/:studentId/*" element={<StudentDashboard />} />
                  <Route path="messages" element={<GuardianMessages />} />
                  <Route path="payments" element={<GuardianPayments />} />
                  <Route path="settings" element={<GuardianSettings />} /> */}
                </Route>

                <Route
                  path="*"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Routes>
            </Suspense>
          </Layout>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

// Add error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-background">
          <div className="text-primary text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap App with ErrorBoundary
export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}