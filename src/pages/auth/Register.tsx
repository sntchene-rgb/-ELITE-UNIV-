import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, User, Lock, Mail, Shield, Building2, BookOpen, FileText, MapPin, Search } from 'lucide-react';
import Logo from '../../components/ui/Logo';
import { useToast } from '../../components/ui/Toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student_academic');
  
  // Dynamic Fields State
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [module, setModule] = useState('');
  const [researchTrack, setResearchTrack] = useState('');
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      showToast('يجب الموافقة على شروط الخدمة وسياسة الخصوصية', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('كلمتا المرور غير متطابقتين', 'error');
      return;
    }
    // Instead of navigating immediately, show verification step
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowVerification(true);
      showToast('تم إرسال رمز التحقق إلى بريدك الإلكتروني', 'info');
    }, 1500);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === '123456') { // Mock verification
      showToast('تم التحقق من البريد الإلكتروني بنجاح', 'success');
      if (role === 'professor') {
        navigate('/professor-contract');
      } else {
        navigate('/login');
      }
    } else {
      showToast('رمز التحقق غير صحيح. جرب 123456', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-grow"></div>
      <div className="w-full max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center items-center gap-3 mb-6">
            <Logo className="w-16 h-16 rounded-full shadow-md" />
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              ELITE <span className="text-secondary">UNIV</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="font-medium text-secondary hover:text-secondary-dark">
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md perspective-1000"
        >
        <div className="card-3d py-8 px-4 sm:rounded-3xl sm:px-10 transform-3d">
          
          {!showVerification ? (
            <form className="space-y-6" onSubmit={handleRegister}>
              
              <label className="block cursor-pointer">
                <span className="block text-sm font-medium text-gray-700">
                  الاسم الكامل
                </span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50 cursor-pointer"
                    placeholder="محمد أحمد"
                  />
                </div>
              </label>

              <label className="block cursor-pointer">
                <span className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </span>
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
                    className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50 cursor-pointer"
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                </div>
              </label>

              <div className="block">
                <span className="block text-sm font-medium text-gray-700 mb-3">
                  الصفة (الدور في المنصة)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'student_academic', label: 'طالب أكاديمي (نظامي)', icon: GraduationCap },
                    { id: 'student_free', label: 'طالب حر (تحضير دكتوراه)', icon: BookOpen },
                    { id: 'student_researcher', label: 'طالب باحث (أطروحة)', icon: Search },
                    { id: 'professor', label: 'أستاذ / مشرف', icon: User },
                    { id: 'coordinator', label: 'منسق (مسؤول محلي)', icon: MapPin },
                    { id: 'admin', label: 'مدير (إدارة عامة)', icon: Shield },
                    { id: 'cyber_admin', label: 'سيبر أدمن (نقطة بيع)', icon: Building2 },
                  ].map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`cursor-pointer border rounded-xl p-3 flex items-center gap-3 transition-all ${
                        role === r.id
                          ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                          : 'border-gray-200 bg-white hover:border-secondary/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${role === r.id ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <r.icon size={18} />
                      </div>
                      <span className={`text-sm font-bold ${role === r.id ? 'text-secondary-dark' : 'text-slate-700'}`}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <label className="block cursor-pointer">
                <span className="block text-sm font-medium text-gray-700">
                  كلمة المرور
                </span>
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
                    className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50 cursor-pointer"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              </label>

              <label className="block cursor-pointer">
                <span className="block text-sm font-medium text-gray-700">
                  تأكيد كلمة المرور
                </span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-3 border bg-slate-50 cursor-pointer"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              </label>

              {/* Dynamic Fields Based on Role */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-primary mb-2">معلومات إضافية (حسب الصفة)</h3>
                
                {(role === 'student_academic' || role === 'student_free' || role === 'student_researcher' || role === 'professor' || role === 'coordinator') && (
                  <label className="block cursor-pointer">
                    <span className="block text-sm font-medium text-gray-700 mb-1">الجامعة {role === 'student_free' && '(التي ستجتاز فيها المسابقة)'}</span>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        <Building2 size={18} />
                      </div>
                      <input type="text" required value={university} onChange={(e) => setUniversity(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="اسم الجامعة" />
                    </div>
                  </label>
                )}

                {(role === 'student_academic' || role === 'professor') && (
                  <>
                    <label className="block cursor-pointer">
                      <span className="block text-sm font-medium text-gray-700 mb-1">الكلية</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <Building2 size={18} />
                        </div>
                        <input type="text" required value={faculty} onChange={(e) => setFaculty(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="اسم الكلية" />
                      </div>
                    </label>
                    <label className="block cursor-pointer">
                      <span className="block text-sm font-medium text-gray-700 mb-1">التخصص</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <BookOpen size={18} />
                        </div>
                        <input type="text" required value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="التخصص الدقيق" />
                      </div>
                    </label>
                    <label className="block cursor-pointer">
                      <span className="block text-sm font-medium text-gray-700 mb-1">المقياس</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <BookOpen size={18} />
                        </div>
                        <input type="text" required value={module} onChange={(e) => setModule(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="المقياس" />
                      </div>
                    </label>
                  </>
                )}

                {role === 'student_academic' && (
                  <label className="block cursor-pointer">
                    <span className="block text-sm font-medium text-gray-700 mb-1">السنة الدراسية</span>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        <GraduationCap size={18} />
                      </div>
                      <input type="text" required value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="مثال: السنة الثانية ماستر" />
                    </div>
                  </label>
                )}

                {role === 'student_researcher' && (
                  <label className="block cursor-pointer">
                    <span className="block text-sm font-medium text-gray-700 mb-1">مسار البحث الدقيق</span>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        <Search size={18} />
                      </div>
                      <input type="text" required value={researchTrack} onChange={(e) => setResearchTrack(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="موضوع البحث أو الأطروحة" />
                    </div>
                  </label>
                )}

                {role === 'cyber_admin' && (
                  <>
                    <label className="block cursor-pointer">
                      <span className="block text-sm font-medium text-gray-700 mb-1">اسم المكتبة / نقطة البيع</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <Building2 size={18} />
                        </div>
                        <input type="text" required value={storeName} onChange={(e) => setStoreName(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="اسم المحل التجاري" />
                      </div>
                    </label>
                    <label className="block cursor-pointer">
                      <span className="block text-sm font-medium text-gray-700 mb-1">الموقع (الولاية / البلدية)</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <MapPin size={18} />
                        </div>
                        <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="focus:ring-secondary focus:border-secondary block w-full pr-10 sm:text-sm border-gray-300 rounded-xl py-2.5 border bg-slate-50 cursor-pointer" placeholder="العنوان بالتفصيل" />
                      </div>
                    </label>
                  </>
                )}

                {/* File Uploads */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {role === 'student_academic' ? 'سكانير لبطاقة الطالب' :
                     role === 'student_free' ? 'سكانير لبطاقة التعريف الوطنية' :
                     role === 'student_researcher' ? 'سكانير لبطاقة الطالب/الباحث' :
                     role === 'professor' || role === 'coordinator' ? 'إثبات المهنة (شهادة عمل)' :
                     role === 'cyber_admin' ? 'سكانير للسجل التجاري' : 'وثيقة إثبات الهوية'}
                  </label>
                  <label 
                    htmlFor="file-upload" 
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-secondary transition-colors cursor-pointer bg-slate-50 relative overflow-hidden group"
                  >
                    <div className="space-y-1 text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative font-medium text-secondary group-hover:text-secondary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-secondary">
                          {selectedFile ? selectedFile.name : 'رفع ملف'}
                        </span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          required 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 850 * 1024) {
                                showToast('حجم الملف يتجاوز 850 كيلوبايت', 'error');
                                e.target.value = '';
                                setSelectedFile(null);
                              } else {
                                setSelectedFile(file);
                              }
                            }
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG حتى 850KB</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms and Privacy Checkbox */}
              <div className="flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="focus:ring-secondary h-4 w-4 text-secondary border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="mr-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">
                    أوافق على{' '}
                    <Link to="/terms" className="text-secondary hover:text-secondary-dark underline" target="_blank">
                      شروط الخدمة
                    </Link>{' '}
                    و{' '}
                    <Link to="/privacy" className="text-secondary hover:text-secondary-dark underline" target="_blank">
                      سياسة الخصوصية
                    </Link>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm hover:shadow-md text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70"
                >
                  {isVerifying ? 'جاري إرسال رمز التحقق...' : 'إنشاء حساب'}
                </button>
              </div>
            </form>
          ) : (
            <motion.form 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6" 
              onSubmit={handleVerify}
            >
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">التحقق من البريد الإلكتروني</h3>
                <p className="text-sm text-gray-500 mt-2">
                  لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى بريدك الإلكتروني. يرجى إدخاله أدناه.
                </p>
              </div>

              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 text-center mb-2">
                  رمز التحقق (OTP)
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="focus:ring-secondary focus:border-secondary block w-full text-center text-2xl tracking-widest sm:text-lg border-gray-300 rounded-xl py-3 border bg-slate-50"
                  placeholder="------"
                  dir="ltr"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm hover:shadow-md text-sm font-bold text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all"
                >
                  تأكيد الحساب
                </button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowVerification(false)}
                  className="text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  تعديل البريد الإلكتروني
                </button>
              </div>
            </motion.form>
          )}
          
          <div className="mt-6">
            <Link to="/" className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowRight size={16} />
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
        </motion.div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
}
