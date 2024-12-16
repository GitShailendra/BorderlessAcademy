// src/components/layout/Layout.jsx
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../assets/Theme/ThemeContext';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const { theme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.includes('/guardian');
  const isStudent = location.pathname.includes('/student')
  const isTeacher = location.pathname.includes('/teacher')
  const isAdmin = location.pathname.includes('/admin')

  if (isDashboard) {
    return <>{children}</>;
  }
  if (isStudent) {
    return <>{children}</>;
  }
  if (isTeacher) {
    return <>{children}</>;
  }
  if (isAdmin) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}