import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  AlertCircle 
} from 'lucide-react';
import authService from '../../Components/services/authService';
import { useAuth } from '../../Components/auth/AuthContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLocked) {
      setError('Account temporarily locked. Please try again later or contact support.');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    
    try {
      console.log('Attempting login with:', { email, userType: 'admin' });
      const response = await authService.login({
        email,
        password,
        userType: 'admin'
      });
      console.log('Login response:', response);
      
      // const userData = {
      //   id: userId,
      //   role: 'admin',
      //   info: response.data?.user || response.data || response.user || {}
      // };
      if (response.success) {
        console.log('hello')
        const userData = {
          id: response.user.id,
          role: 'admin',
          info: response.user
        };

        login(response.token, userData);
        navigate('/admin/dashboard');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginAttempts(prev => prev + 1);
      setError('Invalid credentials. Please try again.');
      console.log(error)
      // if (loginAttempts >= 4) {
      //   setIsLocked(true);
      //   setError('Too many failed attempts. Account temporarily locked.');
      // } else {
      //   setError('Invalid credentials. Please try again.');
      // }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-32 from-primary/5 via-white to-primary/10 py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldAlert className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Admin Portal</h1>
          </div>
          <p className="text-secondary">Secure administrative access</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="mb-6 text-center">
            <p className="text-secondary text-sm">
              Access administrative controls and system management
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
                Administrative Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="admin@borderless.admin.edu"
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
                  placeholder="Enter your admin password"
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

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLocked}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Access Admin Dashboard
              <ShieldAlert className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary text-sm">
              Forgot your credentials?{' '}
              <motion.a
                href="/admin/recover"
                whileHover={{ scale: 1.02 }}
                className="text-primary font-semibold hover:text-primary/90"
              >
                Contact System Administrator
              </motion.a>
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-secondary text-sm"
        >
          <p>This is a secure administrative portal. Unauthorized access attempts will be logged and reported.</p>
          <p className="mt-2">
            Need help? <a href="/admin/support" className="text-primary hover:text-primary/90">Contact IT Support</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;