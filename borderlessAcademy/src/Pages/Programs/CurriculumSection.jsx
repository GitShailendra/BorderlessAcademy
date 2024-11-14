import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Book, 
  Globe2, 
  GraduationCap, 
  Languages, 
  Calculator, 
  Atom,  // Changed from Flask
  Users, 
  Brain,
  CheckCircle,
  ArrowRight,
  BookOpen,
  ScrollText,  // Added for documents
  Microscope,  // Added for science
} from 'lucide-react';

const CurriculumSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('malaysian');
  const [activeGrade, setActiveGrade] = useState(1);

  const malaysianCurriculum = {
    name: "Malaysian National Curriculum",
    description: "Following KPM standards with comprehensive Bahasa Malaysia medium instruction",
    grades: {
      1: {
        subjects: [
          {
            name: "Bahasa Malaysia",
            icon: <ScrollText className="h-6 w-6" />,
            topics: ["Pembacaan", "Penulisan", "Tatabahasa", "Kemahiran Lisan"]
          },
          {
            name: "Mathematics",
            icon: <Calculator className="h-6 w-6" />,
            topics: ["Nombor", "Operasi Asas", "Bentuk & Ruang", "Data Mudah"]
          },
          {
            name: "Science",
            icon: <Microscope className="h-6 w-6" />,
            topics: ["Dunia Sains", "Makhluk Hidup", "Benda & Bahan", "Teknologi"]
          },
          {
            name: "English",
            icon: <BookOpen className="h-6 w-6" />,
            topics: ["Reading", "Writing", "Grammar", "Speaking"]
          }
        ],
        features: [
          "KSSR aligned content",
          "Dual language support",
          "Cultural integration"
        ]
      },
      2: {
        subjects: [
          {
            name: "Bahasa Malaysia",
            icon: <ScrollText className="h-6 w-6" />,
            topics: ["Pemahaman", "Karangan", "Tatabahasa Lanjutan", "Komunikasi"]
          },
          {
            name: "Mathematics",
            icon: <Calculator className="h-6 w-6" />,
            topics: ["Nombor Bulat", "Pecahan", "Geometri", "Statistik Asas"]
          },
          {
            name: "Science",
            icon: <Microscope className="h-6 w-6" />,
            topics: ["Kehidupan Sains", "Fizikal", "Alam Sekitar", "Teknologi"]
          },
          {
            name: "English",
            icon: <BookOpen className="h-6 w-6" />,
            topics: ["Comprehension", "Composition", "Grammar", "Oral Skills"]
          }
        ],
        features: [
          "Advanced KSSR content",
          "Project-based learning",
          "Interactive assessments"
        ]
      },
      3: {
        subjects: [/* Similar structure with grade-appropriate content */]
      },
      4: {
        subjects: [/* Similar structure with grade-appropriate content */]
      },
      5: {
        subjects: [/* Similar structure with grade-appropriate content */]
      }
    }
  };

  const internationalCurriculum = {
    name: "International Programme",
    description: "Cambridge-aligned curriculum with focus on global perspectives",
    grades: {
      1: {
        subjects: [
          {
            name: "English",
            icon: <BookOpen className="h-6 w-6" />,
            topics: ["Phonics", "Reading Comprehension", "Creative Writing", "Speaking"]
          },
          {
            name: "Mathematics",
            icon: <Calculator className="h-6 w-6" />,
            topics: ["Numbers", "Basic Operations", "Shapes", "Data Handling"]
          },
          {
            name: "Science",
            icon: <Microscope className="h-6 w-6" />,
            topics: ["Living Things", "Materials", "Forces", "Environment"]
          },
          {
            name: "Global Perspectives",
            icon: <Globe2 className="h-6 w-6" />,
            topics: ["World Cultures", "Environment", "Communication", "Innovation"]
          }
        ],
        features: [
          "Cambridge Primary aligned",
          "International perspective",
          "Project-based learning"
        ]
      },
      2: {
        subjects: [/* Similar structure with grade-appropriate content */]
      },
      3: {
        subjects: [/* Similar structure with grade-appropriate content */]
      },
      4: {
        subjects: [/* Similar structure with grade-appropriate content */]
      },
      5: {
        subjects: [/* Similar structure with grade-appropriate content */]
      }
    }
  };

  const activeCurriculum = activeTab === 'malaysian' ? malaysianCurriculum : internationalCurriculum;

  return (
    <section id="curriculum" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Our Curriculum
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Choose between our Malaysian National Curriculum or International Programme, 
            both designed to nurture future-ready learners.
          </p>
        </div>

        {/* Curriculum Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveTab('malaysian')}
              className={`px-6 py-3 rounded-md transition-all ${
                activeTab === 'malaysian'
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/5'
              }`}
            >
              Malaysian Curriculum
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-6 py-3 rounded-md transition-all ${
                activeTab === 'international'
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/5'
              }`}
            >
              International Programme
            </button>
          </div>
        </div>

        {/* Curriculum Overview */}
        <div className="bg-surface rounded-xl p-8 mb-12">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              {activeTab === 'malaysian' ? 
                <Book className="h-8 w-8 text-primary" /> : 
                <Globe2 className="h-8 w-8 text-primary" />
              }
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {activeCurriculum.name}
              </h3>
              <p className="text-secondary">
                {activeCurriculum.description}
              </p>
            </div>
          </div>
        </div>

        {/* Grade Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-2">
            {[1, 2, 3, 4, 5].map((grade) => (
              <button
                key={grade}
                onClick={() => setActiveGrade(grade)}
                className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                  activeGrade === grade
                    ? 'bg-primary text-white'
                    : 'bg-surface hover:bg-primary/5 text-secondary'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Subjects */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary mb-6">
              Core Subjects - Grade {activeGrade}
            </h3>
            {activeCurriculum.grades[activeGrade]?.subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-surface p-6 rounded-xl hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-primary/5 rounded-lg">
                    {subject.icon}
                  </div>
                  <h4 className="font-semibold text-primary">
                    {subject.name}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {subject.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-secondary">
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Features and Benefits */}
          <div>
            <div className="bg-surface rounded-xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">
                Programme Features
              </h3>
              <div className="space-y-4">
                {activeCurriculum.grades[activeGrade]?.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-secondary">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="mt-8 bg-primary/5 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Ready to Enroll?
              </h3>
              <p className="text-secondary mb-6">
                Join our {activeCurriculum.name} and give your child the best educational foundation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-primary text-white rounded-lg 
                  hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  Begin Enrollment
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="px-6 py-3 border border-primary text-primary 
                  rounded-lg hover:bg-primary/5 transition-colors">
                  Download Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;