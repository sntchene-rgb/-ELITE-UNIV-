import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Upload, CheckCircle, CreditCard, Tag, Clock } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const packagesList = [
  { id: 'qcm', name: 'أسئلة متعددة الخيارات (QCM)', price: 500 },
  { id: 'qcs', name: 'أسئلة إجابات قصيرة (QCS)', price: 500 },
  { id: 'memos', name: 'المذكرات والبحوث', price: 800 },
  { id: 'library', name: 'المكتبة الرقمية', price: 1000 },
  { id: 'questions', name: 'الأسئلة المباشرة', price: 600 },
  { id: 'videos', name: 'الفيديوهات التعليمية', price: 700 },
  { id: 'presentations', name: 'العروض التقديمية', price: 600 },
];

export default function Packages() {
  const { showToast } = useToast();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [duration, setDuration] = useState<'semester' | 'annual'>('semester');
  const [isRankOne, setIsRankOne] = useState(true); // Mocking that the user is rank 1
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTogglePackage = (id: string) => {
    setSelectedPackages(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const baseTotal = selectedPackages.reduce((sum, id) => {
    const pkg = packagesList.find(p => p.id === id);
    return sum + (pkg ? pkg.price : 0);
  }, 0);

  const durationMultiplier = duration === 'annual' ? 2 : 1; // Assuming annual is double the semester price for simplicity, or just *2
  const subtotal = baseTotal * durationMultiplier;

  const multiPackageDiscount = selectedPackages.length > 1 ? 0.20 : 0;
  const rankDiscount = isRankOne ? 0.10 : 0;
  const totalDiscountPercent = multiPackageDiscount + rankDiscount;
  
  const discountAmount = subtotal * totalDiscountPercent;
  const finalTotal = subtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPackages.length === 0) {
      showToast('يرجى اختيار باقة واحدة على الأقل', 'error');
      return;
    }
    if (!receiptUploaded) {
      showToast('يرجى تحميل وصل الدفع', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for Revenue Split Logic & Auto-Termination Setup
    setTimeout(() => {
      showToast('تم إرسال طلب الاشتراك بنجاح. سيتم إشعارك فور تحقق المنسق من الوصل.', 'success');
      showToast('سيتم تفعيل خوارزمية الإنهاء الحتمي (Auto-Termination) فور قبول الاشتراك.', 'info');
      setSelectedPackages([]);
      setReceiptUploaded(false);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans perspective-1000">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transform-3d">
        <div>
          <h2 className="text-2xl font-bold text-primary">الباقات والاشتراكات</h2>
          <p className="text-slate-500 text-sm mt-1">اختر الباقات المناسبة، ارفع وصل الدفع، واحصل على تخفيضاتك</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 transform-3d">
        {/* Packages Selection */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            className="card-3d p-6 rounded-3xl transform-3d"
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <ShoppingCart size={24} className="text-secondary" />
              قائمة الباقات المتاحة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packagesList.map((pkg) => (
                <label 
                  key={pkg.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all btn-3d ${
                    selectedPackages.includes(pkg.id) 
                      ? 'border-secondary bg-secondary/5' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={selectedPackages.includes(pkg.id)}
                      onChange={() => handleTogglePackage(pkg.id)}
                      className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary"
                    />
                    <span className="font-bold text-slate-800">{pkg.name}</span>
                  </div>
                  <span className="font-bold text-primary bg-slate-50 px-3 py-1 rounded-lg">{pkg.price} د.ج</span>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.1 }}
            className="card-3d p-6 rounded-3xl transform-3d"
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Clock size={24} className="text-secondary" />
              مدة الاشتراك
            </h3>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all btn-3d ${
                duration === 'semester' ? 'border-primary bg-primary text-white' : 'border-slate-100 bg-white text-slate-600'
              }`}>
                <input type="radio" name="duration" checked={duration === 'semester'} onChange={() => setDuration('semester')} className="hidden" />
                <span className="font-bold">سداسي (فصل دراسي)</span>
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all btn-3d ${
                duration === 'annual' ? 'border-primary bg-primary text-white' : 'border-slate-100 bg-white text-slate-600'
              }`}>
                <input type="radio" name="duration" checked={duration === 'annual'} onChange={() => setDuration('annual')} className="hidden" />
                <span className="font-bold">سنوي (عام كامل)</span>
              </label>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center font-bold text-red-500">
              ملاحظة سيادية: ينتهي الاشتراك آلياً وبشكل قطعي بعد 10 ثواني تماماً من نهاية المدة المحددة (Auto-Termination Logic).
            </p>
          </motion.div>
        </div>

        {/* Summary and Payment */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.2 }}
            className="card-3d p-6 rounded-3xl transform-3d bg-primary text-white"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard size={24} className="text-secondary" />
              ملخص الدفع
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-300">
                <span>المجموع الفرعي:</span>
                <span className="font-bold">{subtotal} د.ج</span>
              </div>
              
              {multiPackageDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 text-sm">
                  <span className="flex items-center gap-1"><Tag size={14}/> تخفيض الباقات المتعددة (20%):</span>
                  <span>- {subtotal * 0.20} د.ج</span>
                </div>
              )}
              
              {rankDiscount > 0 && (
                <div className="flex justify-between text-secondary text-sm">
                  <span className="flex items-center gap-1"><Tag size={14}/> تخفيض المرتبة الأولى (10%):</span>
                  <span>- {subtotal * 0.10} د.ج</span>
                </div>
              )}
            </div>
            
            <div className="border-t border-white/20 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg">المبلغ الإجمالي:</span>
                <span className="text-3xl font-black text-secondary">{finalTotal} د.ج</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 border-dashed text-center cursor-pointer hover:bg-white/20 transition-colors" onClick={() => setReceiptUploaded(true)}>
                {receiptUploaded ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-400">
                    <CheckCircle size={32} />
                    <span className="font-bold text-sm">تم إرفاق وصل الدفع</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-300">
                    <Upload size={32} />
                    <span className="font-bold text-sm">اضغط لتحميل وصل الدفع (PDF/Image)</span>
                  </div>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-2xl font-bold text-lg transition-all btn-3d shadow-lg shadow-secondary/30 disabled:opacity-70"
              >
                {isSubmitting ? 'جاري معالجة الطلب...' : 'تأكيد وإرسال للمنسق'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
