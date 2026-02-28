import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Eye, FileText, Search } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const initialSubscriptions = [
  { id: 'SUB-001', student: 'سارة خالد', package: 'المكتبة الرقمية + المذكرات', amount: 1440, status: 'pending', date: '2026-02-23' },
  { id: 'SUB-002', student: 'محمد الأمين', package: 'QCM + QCS', amount: 800, status: 'pending', date: '2026-02-23' },
  { id: 'SUB-003', student: 'ياسين بوعلام', package: 'الفيديوهات التعليمية', amount: 700, status: 'approved', date: '2026-02-22' },
];

export default function Subscriptions() {
  const { showToast } = useToast();
  const [subs, setSubs] = useState(initialSubscriptions);

  const handleApprove = (id: string, student: string) => {
    setSubs(subs.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    showToast(`تم التحقق من الدفع وتفعيل اشتراك "${student}" بنجاح.`, 'success');
    
    // Simulate Revenue Split Logic
    setTimeout(() => {
      showToast('تم تنفيذ خوارزمية تقسيم الأرباح (Revenue Split Logic) بنجاح: 45% منصة، 35% أستاذ، 10% مدير، 10% منسق.', 'info');
      showToast('تم تفعيل محرك الذكاء الاصطناعي (AI Trigger) للطالب.', 'info');
    }, 1000);
  };

  const handleReject = (id: string) => {
    setSubs(subs.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    showToast('تم رفض طلب الاشتراك لعدم تطابق الوصل', 'error');
  };

  return (
    <div className="space-y-6 font-sans perspective-1000">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transform-3d">
        <div>
          <h2 className="text-2xl font-bold text-primary">إدارة الاشتراكات (المنسق)</h2>
          <p className="text-slate-500 text-sm mt-1">التحقق من وصولات الدفع وتفعيل اشتراكات الطلبة</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        className="card-3d rounded-3xl overflow-hidden transform-3d"
      >
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-white">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="block w-full pr-10 pl-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
              placeholder="البحث برقم الطلب أو اسم الطالب..."
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">رقم الطلب</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الطالب</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الباقات المطلوبة</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">المبلغ المدفوع</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">وصل الدفع</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الحالة</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subs.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">{sub.id}</td>
                  <td className="px-6 py-4 font-bold text-primary">{sub.student}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{sub.package}</td>
                  <td className="px-6 py-4 font-bold text-secondary">{sub.amount} د.ج</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-lg btn-3d">
                      <Eye size={16} /> عرض الوصل
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                      sub.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                      sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {sub.status === 'pending' ? 'قيد المراجعة' : sub.status === 'approved' ? 'مفعل' : 'مرفوض'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {sub.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleApprove(sub.id, sub.student)}
                          className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors btn-3d"
                          title="موافقة وتفعيل"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleReject(sub.id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors btn-3d"
                          title="رفض"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">تمت المعالجة</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
