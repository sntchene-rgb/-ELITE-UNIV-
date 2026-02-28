import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, CheckCircle, Printer, ArrowRight } from 'lucide-react';
import Logo from '../../components/ui/Logo';

export default function ProfessorContract() {
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setIsAccepted(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const currentDate = new Date().toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto my-auto">
        <div className="text-center mb-8">
          <Link to="/" className="flex justify-center items-center gap-3 mb-6">
            <Logo className="w-16 h-16 rounded-full shadow-md" />
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              ELITE <span className="text-secondary">UNIV</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-extrabold text-primary">توثيق عقد الأستاذ</h2>
          <p className="mt-2 text-sm text-slate-600">
            يتم إصدار هذا العقد آلياً لحفظ حقوقك وحقوق المنصة
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className="card-3d p-8 md:p-12 rounded-3xl transform-3d perspective-1000"
        >
          {/* Contract Content */}
          <div className="space-y-6 text-slate-800 leading-relaxed text-justify mb-12">
            <div className="text-center border-b-2 border-primary pb-6 mb-6">
              <h1 className="text-2xl font-black text-primary mb-2 tracking-tight">
                ELITE <span className="text-secondary">UNIV</span>
              </h1>
              <h2 className="text-xl font-bold text-slate-800">عقد شراكة وتقديم محتوى أكاديمي</h2>
            </div>

            <p>أبرم هذا العقد آلياً بتاريخ <strong>{currentDate}</strong>، بين كل من:</p>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
              <div>
                <h3 className="font-bold text-primary text-lg">الطرف الأول (المنصة):</h3>
                <p>منصة <strong>ELITE UNIV</strong>، ممثلة في مالكها ومديرها العام السيد <strong>MELLOUK MOHAMED</strong>.</p>
              </div>
              <hr className="border-slate-200" />
              <div>
                <h3 className="font-bold text-primary text-lg">الطرف الثاني (الأستاذ):</h3>
                <p>الأستاذ المسجل حديثاً بالمنصة، والمقر بصحة بياناته المدخلة أثناء التسجيل.</p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الأول: موضوع العقد</h3>
              <p>
                يلتزم الطرف الثاني بتقديم محتوى أكاديمي حصري وعالي الجودة لصالح منصة ELITE UNIV في مختلف التخصصات العلمية والأدبية (فيزياء، رياضيات، فلسفة، شريعة إسلامية، أدب عربي، تاريخ، وغيرها).
              </p>

              <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الثاني: الحقوق المالية</h3>
              <p>
                يستفيد الأستاذ من نسبة أرباح مبرمجة آلياً وشفافة تقدر بـ 35% من إجمالي اشتراكات الطلبة المسجلين في مساقاته، مع إمكانية السحب عبر الحساب البريدي (RIP).
              </p>

              <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الثالث: الملكية الفكرية والأمان</h3>
              <p>
                تحتفظ المنصة بحق حماية المحتوى المقدم باستخدام تشفير عسكري (AES-256). يقر الطرف الثاني بأن المحتوى المقدم هو ملكية فكرية خالصة له ولا ينتهك حقوق أي طرف ثالث.
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="border-t border-slate-200 pt-8 flex flex-col items-center gap-6">
            {!isAccepted ? (
              <>
                <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-xl border border-slate-200 w-full max-w-lg hover:bg-slate-100 transition-colors">
                  <input type="checkbox" required className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary" />
                  <span className="font-medium text-slate-700">أقر بموافقتي التامة على جميع بنود هذا العقد الإلكتروني</span>
                </label>
                
                <div className="flex gap-4 w-full max-w-lg">
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                  >
                    <FileText size={20} />
                    توقيع إلكتروني ومتابعة
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 px-6 rounded-xl font-bold transition-colors flex justify-center items-center gap-2"
                  >
                    <Printer size={20} />
                  </button>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4 text-emerald-600"
              >
                <CheckCircle size={64} />
                <h3 className="text-2xl font-bold">تم توقيع العقد بنجاح!</h3>
                <p className="text-slate-500">جاري تحويلك لصفحة تسجيل الدخول...</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
