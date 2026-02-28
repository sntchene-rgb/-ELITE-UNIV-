import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Award,
  FileText,
  BarChart3,
  GraduationCap,
  UploadCloud,
  FolderOpen,
  Video,
  MoreVertical,
  Download,
  AlertCircle,
  Calendar as CalendarIcon,
  MapPin,
  Star,
  X,
  FileSignature
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const studentProgressData = [
  { name: 'الأسبوع 1', progress: 45 },
  { name: 'الأسبوع 2', progress: 55 },
  { name: 'الأسبوع 3', progress: 68 },
  { name: 'الأسبوع 4', progress: 82 },
];

const assignmentData = [
  { name: 'مقدمة في الخوارزميات', submitted: 45, pending: 5 },
  { name: 'هياكل البيانات', submitted: 38, pending: 12 },
  { name: 'الذكاء الاصطناعي', submitted: 20, pending: 30 },
];

const gradeDistributionData = [
  { range: '90-100', count: 15 },
  { range: '80-89', count: 35 },
  { range: '70-79', count: 45 },
  { range: '60-69', count: 20 },
  { range: '< 60', count: 5 },
];

const coursePerformanceData = [
  { course: 'الذكاء الاصطناعي', average: 85, topScore: 98, lowestScore: 65 },
  { course: 'هياكل البيانات', average: 78, topScore: 95, lowestScore: 55 },
  { course: 'مقدمة في الخوارزميات', average: 82, topScore: 100, lowestScore: 60 },
];

const courseMaterials = [
  { id: 1, title: 'المحاضرة الأولى: مفاهيم أساسية', type: 'video', course: 'الذكاء الاصطناعي', date: '2026-02-20', size: '156 MB', rating: 4.8, reviews: 124 },
  { id: 2, title: 'واجب تطبيقي رقم 1', type: 'assignment', course: 'هياكل البيانات', date: '2026-02-22', size: '2.4 MB', rating: 4.5, reviews: 89 },
  { id: 3, title: 'كتاب المرجع الأساسي', type: 'document', course: 'مقدمة في الخوارزميات', date: '2026-02-25', size: '12.8 MB', rating: 4.9, reviews: 210 },
  { id: 4, title: 'المحاضرة الثانية: خوارزميات البحث', type: 'video', course: 'الذكاء الاصطناعي', date: '2026-02-27', size: '210 MB', rating: 4.7, reviews: 56 },
];

const studentTrackingData = [
  { id: 1, name: 'أحمد محمود', course: 'الذكاء الاصطناعي', progress: 85, lastActive: 'قبل ساعتين', status: 'excellent', email: 'ahmed.m@elite.edu.dz', phone: '+213 555 123 456', assignmentsCompleted: 8, totalAssignments: 10, attendanceRate: 92 },
  { id: 2, name: 'سارة خالد', course: 'هياكل البيانات', progress: 62, lastActive: 'أمس', status: 'good', email: 'sara.k@elite.edu.dz', phone: '+213 666 987 654', assignmentsCompleted: 5, totalAssignments: 10, attendanceRate: 75 },
  { id: 3, name: 'محمد علي', course: 'مقدمة في الخوارزميات', progress: 30, lastActive: 'منذ أسبوع', status: 'at_risk', email: 'mohamed.a@elite.edu.dz', phone: '+213 777 456 123', assignmentsCompleted: 2, totalAssignments: 10, attendanceRate: 45 },
  { id: 4, name: 'فاطمة الزهراء', course: 'الذكاء الاصطناعي', progress: 95, lastActive: 'الآن', status: 'excellent', email: 'fatima.z@elite.edu.dz', phone: '+213 555 789 012', assignmentsCompleted: 9, totalAssignments: 10, attendanceRate: 98 },
];

const scheduleData = [
  { id: 1, title: 'محاضرة: الذكاء الاصطناعي', type: 'class', time: '09:00 - 11:00', date: '2026-03-01', location: 'المدرج أ', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 2, title: 'تسليم واجب: هياكل البيانات', type: 'deadline', time: '23:59', date: '2026-03-02', location: 'المنصة', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 3, title: 'محاضرة: مقدمة في الخوارزميات', type: 'class', time: '13:00 - 15:00', date: '2026-03-03', location: 'القاعة 12', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 4, title: 'مناقشة مشاريع التخرج', type: 'meeting', time: '10:00 - 14:00', date: '2026-03-05', location: 'قاعة الاجتماعات', color: 'bg-purple-50 text-purple-600 border-purple-200' },
];

export default function ProfessorDashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof studentTrackingData[0] | null>(null);
  const [contractTerms, setContractTerms] = useState('يقر الأستاذ بملكية المحتوى المرفوع ويمنح المنصة حق العرض والاستخدام الأكاديمي وفقاً للقوانين المعمول بها.');
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [materialFilter, setMaterialFilter] = useState<'all' | 'video' | 'document'>('all');

  const filteredMaterials = courseMaterials.filter(m => 
    (m.type === 'video' || m.type === 'document') && 
    (materialFilter === 'all' || m.type === materialFilter)
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
        {[
          { title: 'إجمالي الطلاب', value: '350', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'المساقات النشطة', value: '4', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'الواجبات المسلمة', value: '128', icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'تقييمات قيد الانتظار', value: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
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
        
        {/* Student Progress */}
        <motion.div 
          initial={{ opacity: 0, x: 20, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">متوسط تقدم الطلاب</h3>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={14} />
              +12% هذا الشهر
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="progress" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Assignment Submissions */}
        <motion.div 
          initial={{ opacity: 0, x: -20, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">تسليم الواجبات حسب المساق</h3>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              إحصائيات التسليم
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assignmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="submitted" name="تم التسليم" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} barSize={40} />
                <Bar dataKey="pending" name="قيد الانتظار" stackId="a" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm transform-3d md:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-primary">أحدث التسليمات</h4>
            <button className="text-sm text-secondary font-bold hover:underline">عرض الكل</button>
          </div>
          <div className="space-y-4">
            {[
              { student: 'أحمد محمود', course: 'الذكاء الاصطناعي', time: 'قبل 10 دقائق', status: 'pending' },
              { student: 'سارة خالد', course: 'هياكل البيانات', time: 'قبل ساعة', status: 'graded' },
              { student: 'محمد علي', course: 'مقدمة في الخوارزميات', time: 'قبل ساعتين', status: 'pending' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {item.student.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{item.student}</h5>
                    <p className="text-xs text-slate-500">{item.course} • {item.time}</p>
                  </div>
                </div>
                {item.status === 'pending' ? (
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                    تقييم
                  </button>
                ) : (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold flex items-center gap-1">
                    <CheckCircle size={14} />
                    تم التقييم
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-primary text-white p-6 rounded-2xl shadow-2xl transform-3d"
        >
          <Award className="text-secondary mb-4" size={32} />
          <h4 className="text-lg font-bold mb-2">إضافة محتوى جديد</h4>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            قم برفع محاضرات جديدة، إنشاء واجبات، أو إضافة مراجع لمساقاتك الحالية.
          </p>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            إنشاء محتوى
          </button>
        </motion.div>
      </div>
      {/* Detailed Reports Section */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <BarChart3 className="text-secondary" />
          تقارير الأداء التفصيلية
        </h2>
        <p className="text-slate-500 mt-1">تحليل شامل لمستويات الطلاب ومعدلات الإنجاز الأكاديمي</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
        {/* Grade Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d bg-white"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">توزيع العلامات (المنحنى الطبيعي)</h3>
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1">
              <GraduationCap size={14} />
              تقييم عام
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gradeDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value} طالب`, 'العدد']}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Course Performance Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d bg-white"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">متوسط العلامات حسب المساق</h3>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
              مقارنة الأداء
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="course" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={120} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="average" name="المتوسط" fill="#10b981" radius={[0, 6, 6, 0]} barSize={20} />
                <Bar dataKey="topScore" name="أعلى علامة" fill="#fbbf24" radius={[0, 6, 6, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Course Materials & Student Tracking Section */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FolderOpen className="text-secondary" />
          إدارة المحتوى وتتبع الطلاب
        </h2>
        <p className="text-slate-500 mt-1">رفع الموارد الأكاديمية ومراقبة تقدم الطلاب بشكل تفصيلي</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
        {/* Course Materials Management */}
        <motion.div 
          initial={{ opacity: 0, x: 20, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d bg-white flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">الموارد والمحتوى الأكاديمي</h3>
            <div className="flex items-center gap-2">
              <select 
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value as any)}
                className="text-xs font-bold bg-slate-50 text-slate-600 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="all">جميع الموارد</option>
                <option value="video">المحاضرات المرئية</option>
                <option value="document">المستندات والكتب</option>
              </select>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="text-xs font-bold bg-secondary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-secondary-dark transition-colors shadow-md"
              >
                <UploadCloud size={16} />
                رفع محتوى جديد
              </button>
            </div>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    material.type === 'video' ? 'bg-red-50 text-red-500' :
                    material.type === 'assignment' ? 'bg-indigo-50 text-indigo-500' :
                    'bg-blue-50 text-blue-500'
                  }`}>
                    {material.type === 'video' ? <Video size={24} /> :
                     material.type === 'assignment' ? <FileText size={24} /> :
                     <BookOpen size={24} />}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{material.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="font-medium text-primary">{material.course}</span>
                      <span>•</span>
                      <span>{material.date}</span>
                      <span>•</span>
                      <span>{material.size}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex items-center text-amber-400">
                        <Star size={12} className="fill-current" />
                        <span className="text-xs font-bold text-slate-700 mr-1">{material.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({material.reviews} تقييم)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Student Tracking */}
        <motion.div 
          initial={{ opacity: 0, x: -20, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="card-3d p-8 rounded-3xl transform-3d bg-white flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">تتبع تقدم الطلاب</h3>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              تحديث مباشر
            </span>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {studentTrackingData.map((student) => (
              <div 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm border border-indigo-200/50 group-hover:scale-110 transition-transform">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm group-hover:text-secondary transition-colors">{student.name}</h5>
                      <p className="text-xs text-slate-500">{student.course} • آخر نشاط: {student.lastActive}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-lg font-black text-primary">{student.progress}%</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-500">نسبة الإنجاز</span>
                    {student.status === 'at_risk' && (
                      <span className="text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> يحتاج متابعة
                      </span>
                    )}
                    {student.status === 'excellent' && (
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle size={12} /> أداء ممتاز
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        student.status === 'excellent' ? 'bg-emerald-500' :
                        student.status === 'good' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Calendar & Schedule Section */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <CalendarIcon className="text-secondary" />
          الجدول الزمني والمواعيد النهائية
        </h2>
        <p className="text-slate-500 mt-1">متابعة المحاضرات، الاجتماعات، ومواعيد تسليم الواجبات</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="card-3d p-8 rounded-3xl transform-3d bg-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar View (Simplified for UI) */}
          <div className="lg:col-span-1 border-l border-slate-100 pl-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">مارس 2026</h3>
              <div className="flex gap-2">
                <button className="p-1 rounded-md hover:bg-slate-100 text-slate-500">&lt;</button>
                <button className="p-1 rounded-md hover:bg-slate-100 text-slate-500">&gt;</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
              {['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(day => (
                <div key={day} className="font-bold text-slate-400 text-xs">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const hasEvent = scheduleData.some(e => parseInt(e.date.split('-')[2]) === day);
                const isToday = day === 1; // Assuming 1st of March is today for demo
                
                return (
                  <div 
                    key={i} 
                    className={`aspect-square flex items-center justify-center rounded-xl cursor-pointer transition-all ${
                      isToday ? 'bg-secondary text-white font-bold shadow-md' :
                      hasEvent ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100' :
                      'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">الأحداث القادمة</h3>
              <button className="text-xs font-bold text-secondary hover:underline">عرض الجدول الكامل</button>
            </div>
            
            <div className="space-y-4">
              {scheduleData.map((event) => (
                <div key={event.id} className={`flex items-start gap-4 p-4 rounded-2xl border ${event.color} bg-opacity-50 transition-all hover:shadow-sm`}>
                  <div className="flex flex-col items-center justify-center min-w-[60px] p-2 bg-white rounded-xl shadow-sm">
                    <span className="text-xs font-bold text-slate-400">{event.date.split('-')[1]}</span>
                    <span className="text-xl font-black">{event.date.split('-')[2]}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      <span className="text-xs font-bold px-2 py-1 rounded-md bg-white shadow-sm flex items-center gap-1">
                        <Clock size={12} /> {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm opacity-80">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin size={14} /> {event.location}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        {event.type === 'class' ? <Users size={14} /> : 
                         event.type === 'deadline' ? <AlertCircle size={14} /> : 
                         <Users size={14} />}
                        {event.type === 'class' ? 'محاضرة حضورية' : 
                         event.type === 'deadline' ? 'موعد نهائي' : 
                         'اجتماع'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </motion.div>

      {/* Upload Content & Contract Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <UploadCloud className="text-secondary" />
                  رفع محتوى جديد وتوليد العقد
                </h3>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="space-y-6">
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-secondary group-hover:shadow-lg transition-all transform group-hover:-translate-y-1">
                      <UploadCloud size={40} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">اسحب وأفلت الملفات هنا</h4>
                    <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto leading-relaxed">يدعم النظام رفع المحاضرات المرئية (MP4)، المستندات (PDF, DOCX)، وملفات الواجبات (ZIP, RAR).</p>
                    <div className="flex items-center justify-center gap-3">
                      <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:border-secondary hover:text-secondary transition-colors z-10 relative">
                        تصفح الملفات
                      </button>
                      <button className="px-8 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-700 transition-colors z-10 relative flex items-center gap-2">
                        <FolderOpen size={16} />
                        استيراد من السحابة
                      </button>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">عنوان المحتوى</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-secondary bg-slate-50" placeholder="مثال: المحاضرة الثالثة..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">المساق المرتبط</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-secondary bg-slate-50">
                        <option>الذكاء الاصطناعي</option>
                        <option>هياكل البيانات</option>
                        <option>مقدمة في الخوارزميات</option>
                      </select>
                    </div>
                  </div>

                  {/* Contract Generation Section */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
                      <FileSignature className="text-blue-600" />
                      توليد عقد الملكية الفكرية التلقائي
                    </h4>
                    <p className="text-sm text-blue-700 mb-4 leading-relaxed">
                      يتم توليد عقد إلكتروني تلقائياً لحفظ حقوق الملكية الفكرية للمحتوى المرفوع. يمكنك تخصيص شروط العقد أدناه قبل التوقيع.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-blue-900 mb-2">شروط العقد (قابلة للتخصيص)</label>
                        <textarea 
                          className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm leading-relaxed" 
                          rows={3}
                          value={contractTerms}
                          onChange={(e) => setContractTerms(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-blue-100">
                        <input 
                          type="checkbox" 
                          id="sign-contract" 
                          checked={isContractSigned}
                          onChange={(e) => setIsContractSigned(e.target.checked)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                        />
                        <label htmlFor="sign-contract" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                          أقر بموافقتي على الشروط المذكورة وأوقع إلكترونياً على هذا العقد.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  disabled={!isContractSigned}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white flex items-center gap-2 transition-all shadow-md ${
                    isContractSigned ? 'bg-secondary hover:bg-secondary-dark' : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <UploadCloud size={18} />
                  رفع وتوثيق العقد
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Student Details Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Users className="text-secondary" />
                  تفاصيل الطالب
                </h3>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-black text-3xl shadow-sm border border-indigo-200/50">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800">{selectedStudent.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{selectedStudent.course}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        selectedStudent.status === 'excellent' ? 'bg-emerald-100 text-emerald-700' :
                        selectedStudent.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {selectedStudent.status === 'excellent' ? 'أداء ممتاز' :
                         selectedStudent.status === 'good' ? 'أداء جيد' : 'يحتاج متابعة'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xs text-slate-500 mb-1">نسبة الإنجاز العام</span>
                    <span className="text-2xl font-black text-primary">{selectedStudent.progress}%</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xs text-slate-500 mb-1">نسبة الحضور</span>
                    <span className="text-2xl font-black text-primary">{selectedStudent.attendanceRate}%</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xs text-slate-500 mb-1">الواجبات المسلمة</span>
                    <span className="text-2xl font-black text-primary">{selectedStudent.assignmentsCompleted} <span className="text-sm text-slate-400 font-medium">/ {selectedStudent.totalAssignments}</span></span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xs text-slate-500 mb-1">آخر نشاط</span>
                    <span className="text-sm font-bold text-primary mt-2 block">{selectedStudent.lastActive}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-slate-700 text-sm mb-2">معلومات التواصل</h5>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-500">البريد الإلكتروني</span>
                    <span className="text-sm font-bold text-slate-800" dir="ltr">{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-500">رقم الهاتف</span>
                    <span className="text-sm font-bold text-slate-800" dir="ltr">{selectedStudent.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  إغلاق
                </button>
                <button className="px-6 py-2.5 rounded-xl font-bold text-white bg-secondary hover:bg-secondary-dark transition-all shadow-md">
                  مراسلة الطالب
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
