import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Users, // For Parent icon
  ArrowRight,
  AlertCircle,
  GraduationCap // For Teacher icon
} from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('teacher'); // 'teacher' or 'parent'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    // Handle login submission based on loginType
    console.log(`Attempting ${loginType} login`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-32 from-primary/5 via-white to-primary/10 py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Borderless Academy</h1>
          <p className="text-secondary">Access your educational portal</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Login Type Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLoginType('teacher')}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
                ${loginType === 'teacher' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-secondary hover:bg-primary/5'}`}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="font-medium">Teacher</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLoginType('parent')}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
                ${loginType === 'parent' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-secondary hover:bg-primary/5'}`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Parent</span>
            </motion.button>
          </div>

          {/* Login Instructions */}
          <div className="mb-6 text-center">
            <p className="text-secondary text-sm">
              {loginType === 'teacher' 
                ? 'Access your teaching dashboard and resources'
                : 'Monitor your childs progress and activities'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {loginType === 'teacher' ? 'Teacher Email' : 'Parent Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder={loginType === 'teacher' ? "teacher@borderless.edu" : "parent@example.com"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-surface text-primary focus:ring-primary"
                />
                <span className="text-sm text-secondary">Remember me</span>
              </label>
              <motion.a
                href="/forgot-password"
                whileHover={{ scale: 1.02 }}
                className="text-sm text-primary hover:text-primary/90 font-medium"
              >
                Forgot password?
              </motion.a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              {loginType === 'teacher' ? 'Access Dashboard' : 'View Child\'s Progress'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-secondary text-sm">
              {loginType === 'teacher' 
                ? 'New teacher? Contact your administrator for access'
                : "Don't have an account yet? "}
              {loginType === 'parent' && (
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.02 }}
                  className="text-primary font-semibold hover:text-primary/90 ml-1"
                >
                  Register here
                </motion.a>
              )}
            </p>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-secondary text-sm"
        >
          <p>By signing in, you agree to our{' '}
            <a href="/terms" className="text-primary hover:text-primary/90">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary hover:text-primary/90">Privacy Policy</a>
          </p>
          <p className="mt-2">
            Need help? <a href="/support" className="text-primary hover:text-primary/90">Contact Support</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;