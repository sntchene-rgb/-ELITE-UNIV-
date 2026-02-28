import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, User, Lock } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import Logo from '../../components/ui/Logo';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'super admin') {
      if (password === '00000') {
        showToast('مرحباً بك في لوحة تحكم السوبر أدمن', 'success');
        navigate('/dashboard');
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } else {
      setError('اسم المستخدم غير صحيح');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-y-auto">
      <div className="w-full max-w-md mx-auto my-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center items-center gap-3 mb-6">
            <Logo className="w-16 h-16 rounded-full shadow-md" />
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              ELITE <span className="text-secondary">UNIV</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل الدخول لحسابك
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أو{' '}
            <Link to="/register" className="font-medium text-secondary hover:text-secondary-dark">
              قم بإنشاء حساب جديد
            </Link>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md perspective-1000"
        >
        <div className="card-3d py-8 px-4 sm:rounded-3xl sm:px-10 transform-3d">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium text-center">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                اسم المستخدم
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50"
                  placeholder="super admin"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                  تذكرني
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-secondary hover:text-secondary-dark">
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm hover:shadow-md text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                دخول
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <Link to="/" className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowRight size={16} />
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
