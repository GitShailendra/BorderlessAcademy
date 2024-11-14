// src/components/layout/Layout.jsx
import { useTheme } from '../../assets/Theme/ThemeContext';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const { theme } = useTheme();

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