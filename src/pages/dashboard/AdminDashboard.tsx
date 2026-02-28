import React from 'react';
import { motion } from 'motion/react';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  ShieldCheck,
  TrendingUp,
  Brain,
  Code,
  Settings,
  FileBarChart,
  Activity,
  Server,
  UserCheck,
  BookCheck,
  Download,
  Database,
  Cpu
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import ProfessorDashboard from './ProfessorDashboard';

const financialData = [
  { name: 'المنصة (التطوير والإدارة)', value: 45, color: '#1e293b' },
  { name: 'الأستاذ (صاحب المحتوى)', value: 35, color: '#d4af37' },
  { name: 'الطاقم الإداري', value: 20, color: '#94a3b8' },
];

const usersData = [
  { name: 'الطلاب', count: 12500 },
  { name: 'الأساتذة', count: 850 },
  { name: 'المنسقين', count: 120 },
  { name: 'الإدارة', count: 45 },
];

const systemPerformanceData = [
  { time: '00:00', load: 30, sessions: 120 },
  { time: '04:00', load: 20, sessions: 80 },
  { time: '08:00', load: 60, sessions: 450 },
  { time: '12:00', load: 85, sessions: 1200 },
  { time: '16:00', load: 75, sessions: 950 },
  { time: '20:00', load: 50, sessions: 600 },
];

const institutionalReports = [
  { id: 1, title: 'التقرير الأكاديمي السنوي', type: 'شامل', date: '2026-02-25', size: '4.2 MB' },
  { id: 2, title: 'التدقيق المالي للربع الأول', type: 'مالي', date: '2026-02-20', size: '1.8 MB' },
  { id: 3, title: 'سجل الأمان والوصول (Logs)', type: 'أمني', date: '2026-02-27', size: '12.5 MB' },
  { id: 4, title: 'إحصائيات التسجيل والقبول', type: 'إداري', date: '2026-02-15', size: '3.1 MB' },
];

export default function AdminDashboard() {
  const { currentRole } = useOutletContext<{ currentRole: string }>() || { currentRole: 'superadmin' };

  if (currentRole === 'professor') {
    return <ProfessorDashboard />;
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
        {[
          { title: 'إجمالي المستخدمين', value: '13,515', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'المحتوى الأكاديمي', value: '4,280', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'الإيرادات (الشهر)', value: '1.2M د.ج', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
          { title: 'حالة الأمان', value: 'AES-256 نشط', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="card-3d p-6 rounded-2xl transform-3d flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
        
        {/* Financial Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 20, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">النظام المالي الآلي والشفاف</h3>
            <span className="text-xs font-semibold bg-secondary/10 text-secondary-dark px-3 py-1 rounded-full">
              توزيع مبرمج
            </span>
          </div>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financialData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {financialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {financialData.map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>{item.value}%</div>
                <div className="text-xs text-slate-500 font-medium">{item.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: -20, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">معمارية المسارات الخمسة</h3>
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
              إحصائيات المستخدمين
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#1e293b" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* System Features Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-primary text-white p-6 rounded-2xl shadow-2xl transform-3d hover:translate-y-[-5px] transition-transform"
        >
          <Brain className="text-secondary mb-4" size={32} />
          <h4 className="text-lg font-bold mb-2">ذكاء اصطناعي تكيفي</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            محرك البحث الذكي يعمل بكفاءة عالية. يتم تفعيل البحث المتطور للطلاب المشتركين تلقائياً.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            النظام نشط
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="card-3d p-6 rounded-2xl transform-3d"
        >
          <Code className="text-primary mb-4" size={32} />
          <h4 className="text-lg font-bold text-primary mb-2">خوارزميات الاستنباط</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            تدعم كافة التخصصات (فيزياء، رياضيات، فلسفة، شريعة، أدب...) وفق القوانين الوطنية.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            شاملة لجميع التخصصات
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="card-3d p-6 rounded-2xl transform-3d"
        >
          <ShieldCheck className="text-secondary mb-4" size={32} />
          <h4 className="text-lg font-bold text-primary mb-2">الأرشفة السيادية</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            تشفير AES-256 مفعل. الأرشيف الدائم يعمل ولا يقبل الحذف لضمان الذاكرة المؤسساتية.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            آمن ومحمي
          </div>
        </motion.div>
      </div>

      {/* Administration & Management Modules */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Settings className="text-secondary" />
          إدارة النظام والإعدادات الأكاديمية
        </h2>
        <p className="text-slate-500 mt-1">التحكم الشامل في المستخدمين، المساقات، والسياسات المؤسساتية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="card-3d p-6 rounded-2xl transform-3d bg-white border border-slate-100 hover:border-blue-200 transition-colors group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UserCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-primary mb-2">إدارة المستخدمين</h3>
          <p className="text-sm text-slate-500 mb-4">اعتماد حسابات الأساتذة، ترقية الصلاحيات، وإدارة سجلات الطلاب والمنسقين.</p>
          <div className="flex items-center justify-between text-xs font-bold text-blue-600">
            <span>12 طلب بانتظار الموافقة</span>
            <span>&larr;</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="card-3d p-6 rounded-2xl transform-3d bg-white border border-slate-100 hover:border-emerald-200 transition-colors group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-primary mb-2">إدارة المساقات الأكاديمية</h3>
          <p className="text-sm text-slate-500 mb-4">مراجعة المناهج، اعتماد المساقات الجديدة، ومراقبة جودة المحتوى التعليمي.</p>
          <div className="flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>5 مساقات قيد المراجعة</span>
            <span>&larr;</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="card-3d p-6 rounded-2xl transform-3d bg-white border border-slate-100 hover:border-purple-200 transition-colors group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <h3 className="text-lg font-bold text-primary mb-2">الإعدادات الأكاديمية</h3>
          <p className="text-sm text-slate-500 mb-4">تكوين الفصول الدراسية، سلالم التقييم، والسياسات العامة للمنصة.</p>
          <div className="flex items-center justify-between text-xs font-bold text-purple-600">
            <span>تحديث السياسات</span>
            <span>&larr;</span>
          </div>
        </motion.div>
      </div>

      {/* System Performance & Institutional Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000 mt-8">
        
        {/* System Performance Monitoring */}
        <motion.div 
          initial={{ opacity: 0, x: 20, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d bg-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <Activity className="text-secondary" />
                مراقبة أداء النظام
              </h3>
              <p className="text-xs text-slate-500 mt-1">حالة الخوادم والجلسات النشطة (مباشر)</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Uptime</span>
                <span className="text-sm font-black text-emerald-600">99.99%</span>
              </div>
              <div className="text-center px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Load</span>
                <span className="text-sm font-black text-amber-500">45%</span>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sessions" name="الجلسات النشطة" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
                <Line type="monotone" dataKey="load" name="حمل الخادم (%)" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Institutional Reports Generation */}
        <motion.div 
          initial={{ opacity: 0, x: -20, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d bg-white flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <FileBarChart className="text-secondary" />
                التقارير المؤسساتية
              </h3>
              <p className="text-xs text-slate-500 mt-1">توليد وتصدير التقارير الرسمية للإدارة العليا</p>
            </div>
            <button className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-md">
              <Database size={16} />
              توليد تقرير جديد
            </button>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {institutionalReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                    report.type === 'مالي' ? 'bg-amber-50 text-amber-600' :
                    report.type === 'أمني' ? 'bg-red-50 text-red-600' :
                    report.type === 'إداري' ? 'bg-blue-50 text-blue-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    <FileBarChart size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{report.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="font-medium text-primary">{report.type}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold">
                  <Download size={16} />
                  <span className="hidden sm:inline">تحميل PDF</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

    </div>
  );
}
