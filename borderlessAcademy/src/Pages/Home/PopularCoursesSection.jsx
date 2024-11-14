import React from 'react';
import { Star, Users, Clock } from 'lucide-react';
import mathicon from "../../assets/Images/home/user.png";
import mathimage from "../../assets/Images/home/mathimage.jpg"
import scienceimage from "../../assets/Images/home/scienceimage.jpg";
import scienceicon from "../../assets/Images/home/user.png";
import englishimage from "../../assets/Images/home/englishimage.jpg";
import englishicon from "../../assets/Images/home/user.png";

const PopularCoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Malaysian National Curriculum",
      category: "Grades 1-5",
      thumbnail: mathimage,
      teacher: {
        name: "Dr. Sarah Lee",
        avatar: mathicon,
        qualification: "KPLI Certified Educator"
      },
      features: [
        "Aligned with KPM standards",
        "Dual language: Bahasa Malaysia & English",
        "Malaysian-focused content",
        "KSSR curriculum framework"
      ],
      students: 2500,
      duration: "Full Academic Year"
    },
    {
      id: 2,
      title: "International Curriculum",
      category: "Grades 1-5",
      thumbnail: scienceimage,
      teacher: {
        name: "Prof. David Wilson",
        avatar: scienceicon,
        qualification: "International Education Expert"
      },
      features: [
        "Cambridge Primary curriculum",
        "International standards",
        "Global perspective",
        "English medium instruction"
      ],
      students: 1800,
      duration: "Full Academic Year"
    },
    {
      id: 3,
      title: "Chinese National Type Curriculum",
      category: "Grades 1-5",
      thumbnail: englishimage,
      teacher: {
        name: "Ms. Wong Mei Ling",
        avatar: englishicon,
        qualification: "SJKC Education Specialist"
      },
      features: [
        "SJKC curriculum alignment",
        "Trilingual approach",
        "Chinese cultural integration",
        "Malaysian education standards"
      ],
      students: 1200,
      duration: "Full Academic Year"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Country-Specific Syllabus
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully designed curriculums that align with Malaysian 
            national education standards while embracing global perspectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Course Image */}
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </div>
              </div>

              <div className="p-6">
                {/* Teacher Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={course.teacher.avatar}
                    alt={course.teacher.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-primary">{course.teacher.name}</h4>
                    <p className="text-sm text-gray-600">{course.teacher.qualification}</p>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-primary mb-4">{course.title}</h3>

                {/* Features */}
                <ul className="mb-4 space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Enroll Now
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
            Explore All Programs
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;