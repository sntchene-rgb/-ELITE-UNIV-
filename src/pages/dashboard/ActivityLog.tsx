import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Activity, User, BookOpen, ShieldAlert, FileText, Download, Printer, Database } from 'lucide-react';
import { storageService, ActivityLogEntry } from '../../services/storageService';
import Logo from '../../components/ui/Logo';
import { QRCodeSVG } from 'qrcode.react';

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  FileText,
  User,
  BookOpen,
  Activity
};

export default function ActivityLog() {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await storageService.getLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs from permanent storage", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans perspective-1000">
      {/* --- Screen View --- */}
      <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transform-3d">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            سجل النشاطات (السوبر أدمن)
            <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full border border-emerald-200">
              <Database size={12} />
              متصل بالتخزين الدائم
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">المتابعة اليومية الدقيقة لكل الحركات والنشاطات على المنصة</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 btn-3d shadow-sm"
        >
          <Printer size={18} className="text-secondary" />
          استصدار وثيقة إدارية (PDF)
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        className="print:hidden card-3d rounded-3xl overflow-hidden transform-3d bg-white"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">النشاطات الأخيرة الموثقة</h3>
          {isLoading && <div className="w-4 h-4 rounded-full border-2 border-secondary border-t-transparent animate-spin"></div>}
        </div>
        <div className="divide-y divide-slate-100">
          {logs.map((activity) => {
            const Icon = iconMap[activity.iconName] || Activity;
            return (
              <div key={activity.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className={`p-3 rounded-2xl ${activity.bg} ${activity.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800">{activity.action}</h4>
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md" dir="ltr">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    بواسطة: <span className="font-bold text-primary">{activity.user}</span>
                  </p>
                </div>
              </div>
            );
          })}
          {!isLoading && logs.length === 0 && (
            <div className="p-8 text-center text-slate-500">لا توجد نشاطات مسجلة حالياً.</div>
          )}
        </div>
      </motion.div>

      {/* --- Print View (Administrative Document) --- */}
      <div className="hidden print:block bg-white text-black p-8" style={{ fontFamily: 'Arial, sans-serif' }} dir="rtl">
        <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-1">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
            <h2 className="text-lg font-bold">وزارة التعليم العالي والبحث العلمي</h2>
            <h3 className="text-md font-bold mt-2">منصة النخبة الجامعية (ELITE UNIV)</h3>
          </div>
          <div className="flex flex-col items-center">
            <Logo className="w-20 h-20 grayscale" />
            <span className="text-xs mt-2 font-bold">النظام المركزي للتوثيق</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold underline underline-offset-8 mb-2">وثيقة إدارية: سجل النشاطات الموثق</h2>
          <p className="text-sm">تاريخ الاستخراج: {new Date().toLocaleDateString('ar-DZ')} | الوقت: {new Date().toLocaleTimeString('ar-DZ')}</p>
        </div>

        <table className="w-full border-collapse border border-black mb-12 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-3 text-right w-16">الرقم</th>
              <th className="border border-black p-3 text-right w-1/4">المستخدم / الجهة</th>
              <th className="border border-black p-3 text-right w-1/2">النشاط (الإجراء المتخذ)</th>
              <th className="border border-black p-3 text-right w-1/4">التوقيت الزمني</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id}>
                <td className="border border-black p-3 text-center font-bold">{index + 1}</td>
                <td className="border border-black p-3 font-bold">{log.user}</td>
                <td className="border border-black p-3">{log.action}</td>
                <td className="border border-black p-3" dir="ltr">{new Date(log.timestamp).toLocaleString('ar-DZ')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-end mt-16 pt-8">
          <div className="text-center">
            <p className="font-bold mb-8">ختم وتوقيع السوبر أدمن</p>
            <div className="w-40 h-20 border-2 border-dashed border-gray-400 mx-auto flex items-center justify-center text-gray-400 text-xs">
              مساحة الختم الإلكتروني
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-slate-800 mb-2">التوثيق الإلكتروني (QR)</p>
            <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
              <QRCodeSVG 
                value={`https://elite-univ.dz/verify/log/EU-LOG-${Date.now().toString().slice(-6)}`} 
                size={80} 
                level="H" 
                includeMargin={false} 
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">REF: EU-LOG-{Date.now().toString().slice(-6)}</p>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">تم توليد هذه الوثيقة آلياً من نظام التخزين الدائم.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
