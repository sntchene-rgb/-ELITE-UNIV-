import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut,
  GraduationCap,
  PieChart,
  ShieldCheck,
  FileText,
  MessageSquare,
  Menu,
  X,
  Globe,
  ShoppingCart,
  Trophy,
  CreditCard,
  Activity,
  Bot,
  Send,
  CheckSquare,
  Ticket,
  User,
  ChevronDown,
  Bell,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import Logo from '../../components/ui/Logo';

export default function DashboardLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<'superadmin' | 'admin' | 'coordinator' | 'student_academic' | 'student_free' | 'student_researcher' | 'professor' | 'cyber_admin'>('superadmin');
  const [language, setLanguage] = useState<'ar' | 'en' | 'fr'>('ar');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponses, setAiResponses] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'مرحباً بك في لوحة تحكم السوبر أدمن. أنا المساعد الذكي للمنصة. يمكنني تزويدك بإحصائيات دقيقة، تحليل البيانات، أو تنفيذ أوامر إدارية متقدمة. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  
  // Sample notifications for professors
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'submission', title: 'تسليم واجب جديد', message: 'قام الطالب أحمد محمود بتسليم الواجب الأول في مقياس الخوارزميات.', time: 'منذ 10 دقائق', read: false, icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 2, type: 'risk', title: 'تنبيه: تراجع المستوى', message: 'الطالبة سارة خالد سجلت غيابين متتاليين وتراجع في التقييم المستمر.', time: 'منذ ساعتين', read: false, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 3, type: 'message', title: 'رسالة جديدة', message: 'لديك استفسار جديد من الطالب محمد علي حول المحاضرة الثالثة.', time: 'منذ 5 ساعات', read: true, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setAiResponses([...aiResponses, { role: 'user', text: aiQuery }]);
    const query = aiQuery.toLowerCase();
    setAiQuery('');
    
    setTimeout(() => {
      let responseText = '';
      
      if (query.includes('سلام') || query.includes('مرحبا') || query.includes('صباح') || query.includes('مساء') || query.includes('أهلا')) {
        responseText = 'وعليكم السلام ورحمة الله وبركاته. بصفتي المساعد الذكي المتقدم للمنصة، أنا جاهز لتنفيذ أوامركم الإدارية، توليد التقارير، أو تحليل البيانات اللحظية لأكثر من 30 مليون مستخدم نشط. كيف يمكنني دعم قراراتكم اليوم؟';
      } else if (query.includes('تقرير') || query.includes('احصائيات') || query.includes('إحصائيات') || query.includes('تقارير')) {
        responseText = 'بناءً على توجيهاتكم، قمت بإجراء مسح شامل لقواعد البيانات السيادية. المؤشرات الحالية تؤكد استقرار البنية التحتية بنسبة 99.99%، مع تسجيل نمو في المحتوى الأكاديمي بنسبة 45%. يمكنني إصدار تقرير مالي أو أكاديمي مفصل وموثق وفق معايير التحرير الإداري الرسمية للجمهورية فور طلبكم.';
      } else if (query.includes('عقد') || query.includes('عقود') || query.includes('توثيق')) {
        responseText = 'تم تفعيل بروتوكول صياغة العقود الذكية. جميع العقود (أساتذة، طلبة، دور نشر) تتم صياغتها آلياً وفق القوانين والتشريعات المعمول بها، مع ضمان التشفير العسكري (AES-256) لحقوق الملكية الفكرية. يرجى التوجه إلى قسم "العقود" لإصدار العقد المطلوب بالصيغة القانونية المعتمدة.';
      } else if (query.includes('شهادة') || query.includes('شهادات') || query.includes('اصدار')) {
        responseText = 'نظام إصدار الشهادات الأكاديمية يعمل بكفاءة. يتم توليد الشهادات بصيغة إدارية رسمية، تتضمن الديباجة القانونية، التوثيق الرقمي، والختم السيادي، مما يضمن موثوقيتها عالمياً. يرجى التوجه إلى قسم "المحتوى الأكاديمي" وتحديد الباحث أو المصنف لإصدار الشهادة فوراً.';
      } else {
        responseText = `تم استلام توجيهكم بخصوص "${query}". جاري معالجة الطلب عبر خوارزميات المعالجة اللغوية الطبيعية (NLP) المتقدمة. النظام مصمم لضمان الامتثال التام لقوانين التحرير الإداري والسيادة الرقمية. سيتم موافاتكم بالنتائج الموثقة في أقرب وقت.`;
      }

      setAiResponses(prev => [...prev, { 
        role: 'ai', 
        text: responseText 
      }]);
    }, 1000);
  };

  const getNavItems = () => {
    const baseItems = [
      { name: 'الرئيسية', path: '/dashboard', icon: LayoutDashboard },
      { name: 'الرسائل الخاصة', path: '/dashboard/messages', icon: MessageSquare },
      { name: 'لوحة الشرف', path: '/dashboard/leaderboard', icon: Trophy },
    ];

    if (currentRole === 'superadmin') {
      return [
        ...baseItems,
        { name: 'إدارة المستخدمين', path: '/dashboard/users', icon: Users },
        { name: 'المحتوى الأكاديمي', path: '/dashboard/content', icon: BookOpen },
        { name: 'العقود', path: '/dashboard/contracts', icon: FileText },
        { name: 'المهام', path: '/dashboard/tasks', icon: CheckSquare },
        { name: 'الدعم الفني', path: '/dashboard/support', icon: Ticket },
        { name: 'سجل النشاطات', path: '/dashboard/activity', icon: Activity },
        { name: 'التقارير المالية', path: '/dashboard/finance', icon: PieChart },
        { name: 'الأمان والأرشفة', path: '/dashboard/security', icon: ShieldCheck },
        { name: 'الإعدادات', path: '/dashboard/settings', icon: Settings },
      ];
    }

    if (currentRole === 'admin') {
      return [
        ...baseItems,
        { name: 'إدارة المستخدمين', path: '/dashboard/users', icon: Users },
        { name: 'المحتوى الأكاديمي', path: '/dashboard/content', icon: BookOpen },
        { name: 'التقارير المالية', path: '/dashboard/finance', icon: PieChart },
      ];
    }

    if (currentRole === 'coordinator') {
      return [
        ...baseItems,
        { name: 'إدارة الاشتراكات', path: '/dashboard/subscriptions', icon: CreditCard },
      ];
    }

    if (currentRole === 'student_academic' || currentRole === 'student_free' || currentRole === 'student_researcher' || currentRole === 'professor') {
      return [
        ...baseItems,
        { name: 'الباقات والاشتراكات', path: '/dashboard/packages', icon: ShoppingCart },
      ];
    }

    if (currentRole === 'cyber_admin') {
      return [
        ...baseItems,
        { name: 'إدارة المكتبة الرقمية', path: '/dashboard/content', icon: BookOpen },
        { name: 'التقارير المالية', path: '/dashboard/finance', icon: PieChart },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen w-64 bg-primary text-white flex flex-col z-50
        transition-transform duration-300 ease-in-out transform-3d shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-primary-dark">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10 rounded-full shadow-md" />
            <span className="text-xl font-bold tracking-tight">
              ELITE <span className="text-secondary">UNIV</span>
            </span>
          </Link>
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden text-slate-300 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            {currentRole === 'superadmin' ? 'لوحة تحكم السوبر أدمن' : 
             currentRole === 'admin' ? 'لوحة تحكم الإدارة' : 
             currentRole === 'coordinator' ? 'لوحة تحكم المنسق' : 
             currentRole === 'professor' ? 'لوحة تحكم الأستاذ' : 
             currentRole === 'cyber_admin' ? 'لوحة تحكم السيبر أدمن' : 'لوحة تحكم الطالب'}
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-dark text-secondary font-medium' 
                      : 'text-slate-300 hover:bg-primary-dark hover:text-white'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-secondary' : 'text-slate-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-primary-dark">
          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-primary-dark hover:text-white transition-colors w-full"
          >
            <LogOut size={20} className="text-slate-400" />
            تسجيل الخروج
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-16rem)]">
        <header className="h-20 glass-3d flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden text-slate-500 hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-primary hidden sm:block">لوحة القيادة</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <Globe size={20} className="text-slate-400" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            {/* Role Switcher (For Demo Purposes) */}
            <select 
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as any)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-secondary focus:border-secondary block w-full p-2.5 btn-3d hidden md:block"
            >
              <option value="superadmin">سوبر أدمن</option>
              <option value="admin">أدمن (صلاحيات مدير)</option>
              <option value="coordinator">منسق (مسؤول محلي)</option>
              <option value="professor">أستاذ / مشرف</option>
              <option value="student_academic">طالب أكاديمي</option>
              <option value="student_free">طالب حر</option>
              <option value="student_researcher">طالب باحث</option>
              <option value="cyber_admin">سيبر أدمن</option>
            </select>

            {/* Notifications Dropdown (Visible for Professors) */}
            {currentRole === 'professor' && (
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                  className="relative p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>

                {isNotificationMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationMenuOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 transform-3d">
                      <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">الإشعارات</h3>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                          >
                            تحديد الكل كمقروء
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                              <div 
                                key={notification.id} 
                                className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-4 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.bg} ${notification.color}`}>
                                  <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm font-bold ${!notification.read ? 'text-slate-800' : 'text-slate-600'}`}>
                                      {notification.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 whitespace-nowrap mr-2">{notification.time}</span>
                                  </div>
                                  <p className="text-xs text-slate-500 leading-relaxed">{notification.message}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-8 text-center text-slate-500 text-sm">
                            لا توجد إشعارات حالياً
                          </div>
                        )}
                      </div>
                      <div className="p-3 border-t border-slate-50 bg-slate-50/50 text-center">
                        <Link 
                          to="/dashboard/messages" 
                          onClick={() => setIsNotificationMenuOpen(false)}
                          className="text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                        >
                          عرض كل الإشعارات
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors"
              >
                <div className="text-sm text-slate-500 hidden sm:block text-left">
                  مرحباً، <span className="font-bold text-primary">M. MELLOUK</span>
                  <div className="text-xs text-slate-400">
                    {currentRole === 'superadmin' ? 'سوبر أدمن' : 
                     currentRole === 'admin' ? 'مدير' : 
                     currentRole === 'coordinator' ? 'منسق محلي' : 
                     currentRole === 'professor' ? 'أستاذ/مشرف' : 
                     currentRole === 'cyber_admin' ? 'سيبر أدمن' : 'طالب'}
                  </div>
                </div>
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                  M
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 transform-3d">
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                      <p className="font-bold text-slate-800">M. MELLOUK</p>
                      <p className="text-xs text-slate-500 truncate" dir="ltr">m.mellouk@elite-univ.dz</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        to="/dashboard/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors"
                      >
                        <User size={18} />
                        الملف الشخصي
                      </Link>
                      <Link 
                        to="/dashboard/settings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors"
                      >
                        <Settings size={18} />
                        إعدادات الحساب
                      </Link>
                    </div>
                    <div className="p-2 border-t border-slate-50">
                      <Link 
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut size={18} />
                        تسجيل الخروج
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-8 flex-1 overflow-auto">
          <Outlet context={{ currentRole }} />
        </div>
      </main>

      {/* Super Admin AI Assistant */}
      {currentRole === 'superadmin' && (
        <>
          <button
            onClick={() => setIsAiChatOpen(!isAiChatOpen)}
            className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform z-50 btn-3d"
          >
            <Bot size={28} />
          </button>

          {isAiChatOpen && (
            <div className="fixed bottom-24 left-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50 transform-3d card-3d">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <span className="font-bold">المساعد الذكي (Super Admin)</span>
                </div>
                <button onClick={() => setIsAiChatOpen(false)} className="text-white/80 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-slate-50">
                {aiResponses.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tl-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tr-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAiSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="اسأل الذكاء الاصطناعي..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                />
                <button 
                  type="submit"
                  className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
