import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Star, Filter, ChevronDown, Users, GraduationCap } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src="/api/placeholder/400/320"
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary z-20">
          Grade {course.grade}
        </span>
        <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
          {course.subject}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-600">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-600">{course.chapters} Chapters</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <img
            src="/api/placeholder/40/40"
            alt={course.instructor}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{course.instructor}</p>
            <p className="text-xs text-gray-600">{course.instructorTitle}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 bg-transparent border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-semibold"
          >
            Learn More
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  const grades = [
    { id: 'all', name: 'All Grades' },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      name: `Grade ${i + 1}`
    }))
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'english', name: 'English' },
    { id: 'social_studies', name: 'Social Studies' },
    { id: 'computer_science', name: 'Computer Science' }
  ];

  const allCourses = [
    {
      id: 1,
      title: "Mathematics: Algebra Fundamentals",
      description: "Master essential algebraic concepts through interactive lessons and practice problems.",
      subject: "Mathematics",
      grade: "8",
      instructor: "Mrs. Sarah Johnson",
      instructorTitle: "Senior Math Teacher",
      rating: 4.8,
      duration: "12 weeks",
      chapters: 24
    },
    {
      id: 2,
      title: "Basic Science: Living World",
      description: "Explore the fascinating world of living organisms through experiments and observations.",
      subject: "Science",
      grade: "6",
      instructor: "Mr. David Chen",
      instructorTitle: "Science Educator",
      rating: 4.9,
      duration: "10 weeks",
      chapters: 18
    },
    {
      id: 3,
      title: "English Grammar & Composition",
      description: "Develop strong language skills through comprehensive grammar lessons and writing exercises.",
      subject: "English",
      grade: "7",
      instructor: "Ms. Emily Brown",
      instructorTitle: "Language Expert",
      rating: 4.7,
      duration: "16 weeks",
      chapters: 32
    },
    {
      id: 4,
      title: "World History: Ancient Civilizations",
      description: "Journey through time to learn about ancient civilizations and their impact on our world.",
      subject: "Social Studies",
      grade: "9",
      instructor: "Dr. Robert Lee",
      instructorTitle: "History Professor",
      rating: 4.9,
      duration: "14 weeks",
      chapters: 28
    },
    {
      id: 5,
      title: "Introduction to Programming",
      description: "Learn basic programming concepts through fun and interactive coding projects.",
      subject: "Computer Science",
      grade: "10",
      instructor: "Mr. Alex Turner",
      instructorTitle: "Computer Science Teacher",
      rating: 4.8,
      duration: "8 weeks",
      chapters: 16
    },
    {
      id: 6,
      title: "Elementary Mathematics",
      description: "Build a strong foundation in basic mathematics through engaging activities and problems.",
      subject: "Mathematics",
      grade: "4",
      instructor: "Ms. Lisa Wang",
      instructorTitle: "Primary Math Specialist",
      rating: 4.9,
      duration: "12 weeks",
      chapters: 24
    }
  ];

  // Filter courses based on selected criteria
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || course.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || course.subject.toLowerCase() === selectedSubject;
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Discover Your School Subjects
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore our comprehensive collection of school courses designed to help you excel in your studies.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 text-lg shadow-lg"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-auto">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full md:w-64 p-3 rounded-lg border border-gray-200 appearance-none cursor-pointer text-gray-700"
                >
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>

              <div className="relative w-full md:w-auto">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full md:w-64 p-3 rounded-lg border border-gray-200 appearance-none cursor-pointer text-gray-700"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;