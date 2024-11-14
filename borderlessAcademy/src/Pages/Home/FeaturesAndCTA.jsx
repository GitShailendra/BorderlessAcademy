import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, ChartLine } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 rounded-full bg-blue-50"
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-xl font-heading font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesAndCTA = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning Tools",
      description: "Engage with dynamic content and real-time collaboration tools designed for maximum learning impact."
    },
    {
      icon: Users,
      title: "Expert-Led Courses",
      description: "Learn from certified educators with years of experience in their respective fields."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with students worldwide and experience diverse perspectives in every class."
    },
    {
      icon: ChartLine,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and personalized insights."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
      {/* Features Section */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Why Choose BoderlessAcademy?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the features that make our platform the perfect choice for your educational journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mt-20"
      >
        <div className="bg-primary rounded-2xl overflow-hidden shadow-xl">
          <div className="p-12 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-heading font-bold text-white mb-6"
            >
              Ready to Start Your Learning Journey?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
            >
              Join thousands of students worldwide and transform your educational experience today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Start Learning Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesAndCTA;