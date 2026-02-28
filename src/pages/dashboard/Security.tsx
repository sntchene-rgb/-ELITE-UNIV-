import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Server, Lock, AlertTriangle, Activity, Database, Key } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function Security() {
  const { showToast } = useToast();
  const [isLockdown, setIsLockdown] = useState(false);

  const handleLockdown = () => {
    setIsLockdown(!isLockdown);
    if (!isLockdown) {
      showToast('تم تفعيل وضع الحماية القصوى! تم تشفير جميع البيانات وإغلاق المنافذ.', 'error');
    } else {
      showToast('تم إيقاف وضع الحماية القصوى. النظام يعمل بشكل طبيعي.', 'success');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">الأمان والأرشفة السيادية</h2>
          <p className="text-slate-500 text-sm mt-1">مراقبة حالة الخوادم، التشفير، وحماية البيانات من الاعتداءات</p>
        </div>
        <button 
          onClick={handleLockdown}
          className={`${
            isLockdown 
              ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
              : 'bg-slate-800 hover:bg-slate-900'
          } text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d`}
        >
          <AlertTriangle size={18} />
          {isLockdown ? 'إيقاف وضع الطوارئ' : 'تفعيل وضع الحماية القصوى'}
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl transform-3d transition-colors ${isLockdown ? 'bg-red-50 border-red-200 border-2 shadow-red-500/50 shadow-lg' : 'card-3d'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isLockdown ? 'bg-red-100 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <ShieldCheck size={24} />
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isLockdown ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {isLockdown ? 'حالة طوارئ' : 'آمن'}
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">حالة النظام العامة</h3>
          <div className={`text-2xl font-bold ${isLockdown ? 'text-red-700' : 'text-primary'}`}>
            {isLockdown ? 'تشفير شامل نشط' : 'مستقر ومحمي'}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card-3d p-6 rounded-2xl transform-3d"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <Lock size={24} />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
              AES-256
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">مستوى التشفير</h3>
          <div className="text-2xl font-bold text-primary">عسكري (نشط)</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card-3d p-6 rounded-2xl transform-3d"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
              <Database size={24} />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
              موزع
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">الأرشيف السيادي</h3>
          <div className="text-2xl font-bold text-primary">لا يقبل الحذف</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card-3d p-6 rounded-2xl transform-3d"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <Activity size={24} />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
              مراقبة حية
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">محاولات الاختراق المحظورة</h3>
          <div className="text-2xl font-bold text-primary">1,248</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 perspective-1000">
        {/* Server Infrastructure */}
        <motion.div 
          initial={{ opacity: 0, x: 20, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card-3d rounded-3xl overflow-hidden transform-3d"
        >
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <Server className="text-primary" size={24} />
            <h3 className="text-xl font-bold text-primary">البنية التحتية للخوادم</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { name: 'الخادم الرئيسي (الجزائر العاصمة)', status: 'متصل', load: '45%', ip: '192.168.1.100' },
              { name: 'خادم النسخ الاحتياطي (وهران)', status: 'متصل', load: '12%', ip: '192.168.2.100' },
              { name: 'خادم قاعدة البيانات المعزول', status: 'محمي', load: '28%', ip: '10.0.0.5' },
            ].map((server, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Server size={20} className="text-slate-400" />
                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${server.status === 'متصل' || server.status === 'محمي' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{server.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1" dir="ltr">{server.ip}</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-primary">{server.load}</div>
                  <div className="text-xs text-slate-500">الضغط</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Logs */}
        <motion.div 
          initial={{ opacity: 0, x: -20, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card-3d rounded-3xl overflow-hidden flex flex-col transform-3d"
        >
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <Key className="text-primary" size={24} />
            <h3 className="text-xl font-bold text-primary">سجل التشفير والاعتداءات</h3>
          </div>
          <div className="p-0 flex-1 overflow-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">الوقت</th>
                  <th className="px-6 py-3 font-medium">الحدث</th>
                  <th className="px-6 py-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { time: 'منذ دقيقتين', event: 'محاولة وصول غير مصرح بها (IP: 45.33.x.x)', status: 'تم الحظر', type: 'danger' },
                  { time: 'منذ 15 دقيقة', event: 'تشفير قاعدة بيانات المستخدمين (AES-256)', status: 'نجاح', type: 'success' },
                  { time: 'منذ ساعة', event: 'نسخ احتياطي للأرشيف السيادي', status: 'مكتمل', type: 'success' },
                  { time: 'منذ 3 ساعات', event: 'هجوم DDoS موجه للخادم الرئيسي', status: 'تم الصد', type: 'danger' },
                  { time: 'منذ 5 ساعات', event: 'تحديث مفاتيح التشفير الدورية', status: 'نجاح', type: 'success' },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{log.time}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{log.event}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${
                        log.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
