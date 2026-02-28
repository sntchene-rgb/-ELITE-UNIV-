import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, Mail } from 'lucide-react';
import Logo from '../../components/ui/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            استرجاع الحساب
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md perspective-1000"
        >
        <div className="card-3d py-8 px-4 sm:rounded-3xl sm:px-10 transform-3d">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50"
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm hover:shadow-md text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                >
                  إرسال رابط الاسترجاع
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">تم إرسال الرابط</h3>
              <p className="text-sm text-gray-500 mb-6">
                يرجى التحقق من بريدك الإلكتروني ({email}) للحصول على تعليمات إعادة تعيين كلمة المرور.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-secondary hover:text-secondary-dark font-medium text-sm"
              >
                إرسال مرة أخرى
              </button>
            </div>
          )}
          
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-primary font-medium hover:text-primary-dark transition-colors">
              العودة لتسجيل الدخول
            </Link>
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
