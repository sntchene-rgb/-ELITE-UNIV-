import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  BookOpen, 
  ShieldCheck, 
  Server, 
  PieChart as PieChartIcon, 
  Brain, 
  Code,
  Users,
  Lock,
  Search,
  Scale,
  ArrowLeft,
  GraduationCap,
  Globe
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Logo from '../components/ui/Logo';

const data = [
  { name: 'المنصة (التطوير والإدارة)', value: 45, color: '#1e293b' },
  { name: 'الأستاذ (صاحب المحتوى)', value: 35, color: '#d4af37' },
  { name: 'الطاقم الإداري (مدير ومنسق)', value: 20, color: '#94a3b8' },
];

export default function Landing() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-secondary selection:text-white">
      {/* Header */}
      <header className="glass-3d sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 rounded-full shadow-md" />
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              ELITE <span className="text-secondary">UNIV</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4 hidden sm:flex">
              <Globe size={20} className="text-slate-400" />
              <select 
                className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
                defaultValue="ar"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
              تسجيل الدخول
            </Link>
            <Link to="/register" className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2.5 rounded-full font-semibold btn-3d flex items-center gap-2">
              إنشاء حساب
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden perspective-1000">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute -top-[20%] -left-0 -right-0 -bottom-[20%] bg-[url('https://picsum.photos/seed/elite/1920/1080?blur=10')] opacity-5 bg-cover bg-center" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center transform-3d">
          <motion.h2 
            initial={{ opacity: 0, y: 20, translateZ: -50 }}
            animate={{ opacity: 1, y: 0, translateZ: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl font-black text-primary mb-6 leading-tight drop-shadow-xl"
          >
            نحو ريادة <span className="text-secondary">التعليم العالي</span><br/> والبحث العلمي
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            منصة أكاديمية متكاملة تجمع بين الابتكار التكنولوجي، الأمان السيادي، والنموذج الربحي الشفاف لخدمة الطالب والأستاذ والإدارة.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
             <Link to="/register" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-bold btn-3d">
              ابدأ رحلتك الأكاديمية الآن
              <ArrowLeft size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 perspective-1000">
        <div className="grid lg:grid-cols-2 gap-16 transform-3d">
          
          {/* Left Column */}
          <div className="space-y-12">
            <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-lg font-bold mb-8 btn-3d">
              من الفجوة الأكاديمية إلى الحل السيادي
            </div>

            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-3d p-8 rounded-3xl transform-3d"
            >
              <div className="flex items-start gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">تشتت الجهود وغياب العوائد</h3>
                  <p className="text-slate-600 leading-relaxed">
                    يعاني القطاع من غياب منصات موحدة تجمع الدروس والمراجع مع ضياع حقوق الأساتذة مادياً وتوثيقياً.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-3d p-8 rounded-3xl transform-3d"
            >
              <div className="flex items-start gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                  <Users size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">معمارية المسارات الخمسة</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    نظام إداري معزول الصلاحيات يربط المدير العام، المنسقين، الأساتذة، والطلاب في بيئة رقمية متكاملة.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['المدير العام', 'المنسقين', 'الأساتذة', 'الطلاب', 'الإدارة'].map((role, i) => (
                      <span key={i} className="bg-slate-100 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-3d p-8 rounded-3xl transform-3d"
            >
              <div className="flex items-start gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-secondary">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">الأمان والأرشفة السيادية</h3>
                  <p className="text-slate-600 leading-relaxed">
                    حماية البيانات بتشفير عسكري (AES-256) مع أرشيف دائم لا يقبل الحذف لضمان الذاكرة المؤسساتية.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <div className="inline-block bg-secondary text-white px-6 py-2 rounded-full text-lg font-bold mb-8 btn-3d">
              الابتكار التكنولوجي والنموذج الربحي
            </div>

            {/* Feature 4 */}
            <motion.div 
              initial={{ opacity: 0, x: -20, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-3d p-8 rounded-3xl transform-3d"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-primary">
                  <PieChartIcon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">نظام مالي آلي وشفاف</h3>
                  <p className="text-slate-600 leading-relaxed">
                    توزيع مبرمج للأرباح يضمن 35% للأستاذ و10% للإدارة مع إمكانية السحب عبر الحساب البريدي (RIP).
                  </p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
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
              <div className="flex flex-col gap-3 mt-4">
                {data.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-primary">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div 
              initial={{ opacity: 0, x: -20, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-3d p-8 rounded-3xl transform-3d"
            >
              <div className="flex items-start gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-primary">
                  <Brain size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">ذكاء اصطناعي تكيفي (Freemium AI)</h3>
                  <p className="text-slate-600 leading-relaxed">
                    محرك بحث ذكي يتحول من البحث المحدود إلى المتطور جداً فور تفعيل اشتراك الطالب.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 6 */}
            <motion.div 
              initial={{ opacity: 0, x: -20, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-3d p-8 rounded-3xl transform-3d"
            >
              <div className="flex items-start gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-primary">
                  <Code size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">خوارزميات الاستنباط الحصرية</h3>
                  <p className="text-slate-600 leading-relaxed">
                    محركات بحث تعتمد في برمجتها على القوانين الوطنية الحديثة وأحكام الشريعة الإسلامية، وتدعم خوارزميات كل التخصصات العلمية والأدبية (فيزياء، رياضيات، فلسفة، شريعة، أدب عربي، تاريخ...).
                  </p>
                  <div className="flex gap-4 mt-4 text-slate-400">
                    <Scale size={24} />
                    <Search size={24} />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Logo className="w-12 h-12 rounded-full shadow-md" />
            <h2 className="text-2xl font-bold tracking-tight">
              ELITE <span className="text-secondary">UNIV</span>
            </h2>
          </div>
          <p className="text-slate-400 mb-8">نحو ريادة التعليم العالي والبحث العلمي</p>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ELITE UNIV. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
