import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { FileText, Printer, User, Book, Building2, BarChart3, PieChart, Sparkles, Megaphone } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import Logo from '../../components/ui/Logo';
import { QRCodeSVG } from 'qrcode.react';

const A4Document = ({ children, orientation = 'portrait' }: { children: React.ReactNode, orientation?: 'portrait' | 'landscape' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const width = orientation === 'portrait' ? 794 : 1123;
  const height = orientation === 'portrait' ? 1123 : 794;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.clientWidth;
        const parentHeight = window.innerHeight * 0.8; // 80% of screen height
        
        // Calculate scale to fit width
        let newScale = (parentWidth - 32) / width;
        
        // If it's still too tall for the screen, scale by height instead
        if (height * newScale > parentHeight && parentWidth < 768) {
           newScale = parentHeight / height;
        }
        
        setScale(newScale);
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [width, height]);

  return (
    <div ref={containerRef} className="w-full flex justify-center bg-slate-200/50 py-4 sm:py-8 rounded-2xl overflow-hidden print:bg-transparent print:py-0 print:rounded-none">
      <style>{`
        @media print {
          @page { size: A4 ${orientation}; margin: 0; }
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            background: white !important; 
          }
          .a4-print-wrapper {
            width: ${orientation === 'portrait' ? '210mm' : '297mm'} !important;
            height: ${orientation === 'portrait' ? '297mm' : '210mm'} !important;
            min-height: ${orientation === 'portrait' ? '297mm' : '210mm'} !important;
            margin: 0 !important;
            padding: ${orientation === 'portrait' ? '20mm 25mm' : '20mm'} !important;
            transform: none !important;
            box-shadow: none !important;
            page-break-after: always;
          }
        }
      `}</style>
      <div 
        className="bg-white shadow-2xl origin-top relative a4-print-wrapper"
        style={{ 
          width: `${width}px`, 
          minHeight: `${height}px`,
          padding: orientation === 'portrait' ? '60px 80px' : '60px',
          transform: `scale(${scale})`,
          marginBottom: scale < 1 ? `-${height * (1 - scale)}px` : '0'
        }}
      >
        {children}
      </div>
    </div>
  );
};

const DocumentHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="flex justify-between items-start border-b-4 border-double border-slate-800 pb-6 mb-8">
    <div className="text-right flex-1">
      <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight font-serif">
        منصة <span className="text-primary">ELITE</span> <span className="text-secondary">UNIV</span>
      </h1>
      <p className="text-slate-600 font-bold text-sm">نحو ريادة التعليم العالي والبحث العلمي</p>
      <p className="text-slate-500 text-xs mt-1">المنصة الأكاديمية الأولى - معتمدة وموثقة</p>
    </div>
    
    <div className="flex-1 flex justify-center">
      <div className="w-24 h-24 bg-slate-50 rounded-full border-2 border-slate-200 flex items-center justify-center shadow-inner">
        <Book size={40} className="text-primary opacity-80" />
      </div>
    </div>

    <div className="text-left flex-1">
      <p className="text-slate-800 font-bold text-sm mb-1">الجمهورية الجزائرية الديمقراطية الشعبية</p>
      <p className="text-slate-600 font-bold text-xs mb-4">وزارة التعليم العالي والبحث العلمي</p>
      <div className="inline-block bg-slate-50 px-4 py-2 rounded border border-slate-200 text-center min-w-[150px]">
        <p className="text-slate-800 font-bold text-sm">{title}</p>
        {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  </div>
);

type ContractType = 'professor' | 'book' | 'library' | 'student_free' | 'student_academic' | 'coordinator' | 'admin';

export default function Contracts() {
  const { showToast } = useToast();
  const [contractType, setContractType] = useState<ContractType>('professor');
  const [secondPartyName, setSecondPartyName] = useState('');
  const [secondPartyId, setSecondPartyId] = useState('');
  const [contentDetails, setContentDetails] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'pending' | 'reports' | 'announcements'>('generate');
  const [reportType, setReportType] = useState<'financial' | 'academic' | 'security'>('financial');
  const [reportPeriod, setReportPeriod] = useState('السداسي الأول 2026');

  const [reportContent, setReportContent] = useState('');
  const [isAiGeneratingReport, setIsAiGeneratingReport] = useState(false);

  const handleAiGenerateReport = () => {
    setIsAiGeneratingReport(true);
    showToast('جاري تحليل البيانات وتوليد التقرير الأكاديمي/الإداري...', 'info');
    
    setTimeout(() => {
      let content = '';
      if (reportType === 'financial') {
        content = 'بناءً على التحليل الخوارزمي للبيانات المالية للفترة المحددة، نسجل ارتفاعاً في الإيرادات بنسبة 45.3% مقارنة بالفترة السابقة. تم معالجة أكثر من 2.5 مليون معاملة مالية بنسبة خطأ 0.00%. نوصي بتوسيع البنية التحتية للخوادم السحابية بنسبة 20% لاستيعاب النمو المتوقع في السداسي القادم، مع تخصيص ميزانية إضافية لتطوير خوارزميات الذكاء الاصطناعي.';
      } else if (reportType === 'academic') {
        content = 'يشير التحليل الدلالي للمحتوى الأكاديمي إلى إثراء المكتبة الرقمية بـ 15,420 مصنفاً جديداً. تم تسجيل تفاعل استثنائي مع مساقات الذكاء الاصطناعي والعلوم الطبية الدقيقة. نسبة الرضا العام للطلبة بلغت 92.8%. نوصي بتوجيه الأساتذة لتكثيف المحتوى التفاعلي (Interactive Content) وتحديث المراجع الكلاسيكية بنسخ رقمية معالجة بتقنية OCR.';
      } else {
        content = 'يؤكد التقرير السيادي سلامة البنية التحتية الرقمية بنسبة 100%. تم صد 54,230 محاولة اختراق (DDoS & SQL Injection) بنجاح تام بفضل جدار الحماية المتقدم. جميع البيانات مشفرة (AES-256) ومؤرشفة في خوادم وطنية سيادية. نوصي بتحديث بروتوكولات المصادقة الثنائية (2FA) لجميع الإداريين قبل نهاية الشهر الجاري.';
      }
      setReportContent(content);
      setIsAiGeneratingReport(false);
      showToast('تم توليد التقرير بنجاح', 'success');
    }, 2000);
  };

  const pendingContracts = [
    { id: 'LIB-001', type: 'كتاب مكتبة', author: 'د. أحمد محمود', title: 'مقدمة في فيزياء الكم', status: 'pending', date: '2026-02-23' },
    { id: 'PROF-002', type: 'أستاذ', author: 'د. عبد الله صالح', title: 'عقد انضمام أستاذ', status: 'pending', date: '2026-02-22' },
  ];

  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAiGenerateContract = () => {
    if (!secondPartyName || !secondPartyId) {
      showToast('يرجى ملء اسم الطرف الثاني ورقم الهوية أولاً لتمكين الصياغة الذكية', 'error');
      return;
    }
    setIsAiGenerating(true);
    showToast('جاري الصياغة الذكية للعقد وفق قوانين التحرير الإداري...', 'info');
    
    setTimeout(() => {
      let aiContent = '';
      switch (contractType) {
        case 'professor':
          aiContent = `بناءً على المرسوم التنفيذي المتعلق بالتعليم العالي، يلتزم الأستاذ بتقديم محتوى أكاديمي محكم (محاضرات، أعمال موجهة، تقييمات) في التخصصات المتفق عليها، مع ضمان الأصالة والابتكار. يخضع المحتوى للتقييم الدوري من قبل اللجنة العلمية للمنصة لضمان الجودة الأكاديمية.`;
          break;
        case 'book':
          aiContent = `وفقاً لقانون حماية حقوق المؤلف والحقوق المجاورة، يمنح المؤلف المنصة حق النشر والتوزيع الإلكتروني الحصري للمصنف المذكور. تلتزم المنصة بتشفير المصنف (AES-256) لمنع النسخ غير المصرح به، وتوفير تقارير مبيعات دورية شفافة.`;
          break;
        case 'library':
          aiContent = `بموجب هذا العقد، يتم دمج الفهرس الرقمي للمكتبة ضمن قواعد بيانات المنصة. تلتزم المنصة بتوفير خوادم سحابية عالية الأداء لضمان وصول سلس للمستفيدين، مع تطبيق بروتوكولات الأمان السيادي على كافة البيانات المستضافة.`;
          break;
        case 'student_academic':
        case 'student_free':
          aiContent = `يلتزم الطالب باحترام ميثاق الأخلاقيات الجامعية واللوائح الداخلية للمنصة. يمنع منعاً باتاً مشاركة بيانات الدخول أو إعادة إنتاج المحتوى الأكاديمي لأغراض تجارية. تحتفظ المنصة بحق المتابعة القانونية في حال تسجيل أي خرق أمني.`;
          break;
        case 'coordinator':
          aiContent = `يعين الطرف الثاني كمنسق محلي معتمد، بصلاحيات إدارية محددة لتسيير شؤون المشتركين في النطاق الجغرافي المعين. يلتزم المنسق برفع تقارير دورية للإدارة المركزية، ويخضع لتقييم أداء سداسي يحدد استمرارية العقد.`;
          break;
        case 'admin':
          aiContent = `يمنح الطرف الثاني صلاحيات إدارة النظام من المستوى الثاني. يلتزم بالسرية التامة وعدم إفشاء أي بيانات استراتيجية أو شخصية للمشتركين. يخضع نشاطه لرقابة السوبر أدمن عبر سجل نشاطات (Activity Log) مشفر وغير قابل للتعديل.`;
          break;
      }
      setContentDetails(aiContent);
      setIsAiGenerating(false);
      showToast('تمت الصياغة الذكية بنجاح', 'success');
    }, 1500);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secondPartyName || !secondPartyId) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }
    setIsGenerated(true);
    setIsSigned(false);
    showToast('تم توليد العقد بنجاح', 'success');
  };

  const handleSignContract = () => {
    setIsSigned(true);
    showToast('تم إمضاء العقد إلكترونياً وإرسال نسخة للطرف الثاني', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-primary">إدارة العقود</h2>
          <p className="text-slate-500 text-sm mt-1">توليد وطباعة العقود الرسمية للمنصة ومتابعة الموافقات</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 pb-2 print:hidden overflow-x-auto">
        <button 
          onClick={() => setActiveTab('generate')}
          className={`font-bold pb-2 px-2 transition-colors whitespace-nowrap ${activeTab === 'generate' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          توليد عقد جديد
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`font-bold pb-2 px-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'reports' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <BarChart3 size={18} />
          توليد التقارير الإدارية
        </button>
        <button 
          onClick={() => setActiveTab('announcements')}
          className={`font-bold pb-2 px-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'announcements' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Megaphone size={18} />
          الإعلانات الإدارية
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`font-bold pb-2 px-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'pending' ? 'text-secondary border-b-2 border-secondary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          العقود قيد الانتظار (السوبر أدمن)
          <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">2</span>
        </button>
      </div>

      {activeTab === 'generate' && (
        <>
          {!isGenerated ? (
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          className="card-3d rounded-2xl overflow-hidden max-w-3xl print:hidden transform-3d perspective-1000"
        >
          <form onSubmit={handleGenerate} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => setContractType('professor')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'professor' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <User size={32} className={contractType === 'professor' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد أستاذ / مشرف</span>
              </button>
              
              <button
                type="button"
                onClick={() => setContractType('student_academic')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'student_academic' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <User size={32} className={contractType === 'student_academic' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد طالب أكاديمي</span>
              </button>

              <button
                type="button"
                onClick={() => setContractType('student_free')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'student_free' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <User size={32} className={contractType === 'student_free' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد طالب حر</span>
              </button>

              <button
                type="button"
                onClick={() => setContractType('coordinator')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'coordinator' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <Building2 size={32} className={contractType === 'coordinator' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد منسق محلي</span>
              </button>

              <button
                type="button"
                onClick={() => setContractType('admin')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'admin' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <Building2 size={32} className={contractType === 'admin' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد أدمن (مدير)</span>
              </button>

              <button
                type="button"
                onClick={() => setContractType('book')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'book' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <Book size={32} className={contractType === 'book' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد نشر كتاب</span>
              </button>

              <button
                type="button"
                onClick={() => setContractType('library')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  contractType === 'library' 
                    ? 'border-secondary bg-secondary/5 text-primary' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <Building2 size={32} className={contractType === 'library' ? 'text-secondary' : ''} />
                <span className="font-bold text-center">عقد مكتبة كاملة</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">اسم الطرف الثاني (الاسم الكامل أو المؤسسة)</label>
                <input 
                  type="text" 
                  required
                  value={secondPartyName}
                  onChange={(e) => setSecondPartyName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                  placeholder="الاسم الكامل أو اسم المؤسسة"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">رقم الهوية / السجل التجاري</label>
                <input 
                  type="text" 
                  required
                  value={secondPartyId}
                  onChange={(e) => setSecondPartyId(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                  placeholder="رقم بطاقة التعريف الوطنية أو السجل التجاري"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {contractType === 'professor' ? 'التخصص والمقاييس المدرسة' : 
                   contractType === 'book' ? 'عنوان الكتاب وتفاصيله' : 
                   contractType === 'library' ? 'تفاصيل المكتبة وعدد الكتب' :
                   contractType === 'student_academic' ? 'الجامعة والتخصص' :
                   contractType === 'student_free' ? 'مجال الاهتمام' :
                   contractType === 'coordinator' ? 'المنطقة الجغرافية والمهام' :
                   'المهام والصلاحيات'}
                </label>
                <textarea 
                  rows={3}
                  value={contentDetails}
                  onChange={(e) => setContentDetails(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50 resize-none"
                  placeholder="تفاصيل المحتوى المتفق عليه..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleAiGenerateContract}
                disabled={isAiGenerating}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border border-indigo-200"
              >
                <Sparkles size={18} className={isAiGenerating ? "animate-pulse" : ""} />
                صياغة ذكية (AI)
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d"
              >
                <FileText size={18} />
                توليد العقد
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-end gap-4 print:hidden">
            <button
              onClick={() => setIsGenerated(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors btn-3d"
            >
              تعديل البيانات
            </button>
            <button
              onClick={handlePrint}
              className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d"
            >
              <Printer size={18} />
              طباعة / تحميل PDF
            </button>
          </div>

          {/* Contract Document */}
          <A4Document>
            
            <DocumentHeader 
              title="عقد إداري رسمي" 
              subtitle={
                contractType === 'professor' ? 'عقد شراكة أكاديمية' : 
                contractType === 'book' ? 'عقد نشر وتوزيع' : 
                contractType === 'library' ? 'عقد استضافة مكتبة' :
                contractType === 'student_academic' ? 'عقد اشتراك أكاديمي' :
                contractType === 'student_free' ? 'عقد اشتراك حر' :
                contractType === 'coordinator' ? 'عقد تعيين منسق' :
                'عقد تعيين إداري'
              } 
            />

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 underline underline-offset-8 decoration-2">
                {contractType === 'professor' ? 'عقد شراكة وتقديم محتوى أكاديمي (أستاذ/مشرف)' : 
                 contractType === 'book' ? 'عقد نشر وتوزيع كتاب إلكتروني' : 
                 contractType === 'library' ? 'عقد استضافة وتوزيع مكتبة رقمية' :
                 contractType === 'student_academic' ? 'عقد اشتراك طالب أكاديمي' :
                 contractType === 'student_free' ? 'عقد اشتراك طالب حر' :
                 contractType === 'coordinator' ? 'عقد تعيين منسق محلي' :
                 'عقد تعيين أدمن (مدير)'}
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-6 text-slate-800 leading-relaxed text-justify">
              <p>أبرم هذا العقد بتاريخ <strong>{currentDate}</strong>، بين كل من:</p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
                <div>
                  <h3 className="font-bold text-primary text-lg">الطرف الأول (المنصة):</h3>
                  <p>منصة <strong>ELITE UNIV</strong>، ممثلة في مالكها ومديرها العام السيد <strong>MELLOUK MOHAMED</strong>، ويشار إليها في هذا العقد بـ "المنصة".</p>
                </div>
                <hr className="border-slate-200" />
                <div>
                  <h3 className="font-bold text-primary text-lg">الطرف الثاني:</h3>
                  <p>السيد/ة (أو المؤسسة): <strong>{secondPartyName}</strong>، الحامل لرقم الهوية/السجل: <strong>{secondPartyId}</strong>، بصفته: <strong>
                    {contractType === 'professor' ? 'أستاذ/مشرف' : 
                     contractType === 'book' ? 'مؤلف/ناشر' : 
                     contractType === 'library' ? 'مالك مكتبة' :
                     contractType === 'student_academic' ? 'طالب أكاديمي' :
                     contractType === 'student_free' ? 'طالب حر' :
                     contractType === 'coordinator' ? 'منسق محلي' :
                     'أدمن (مدير)'}
                  </strong>.</p>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الأول: موضوع العقد</h3>
                <p>
                  {contractType === 'professor' 
                    ? `يلتزم الطرف الثاني بتقديم محتوى أكاديمي حصري وعالي الجودة لصالح منصة ELITE UNIV، يشمل الدروس، المحاضرات، والتقييمات الخاصة بـ: ${contentDetails || 'المقاييس المتفق عليها'}.` 
                    : contractType === 'book'
                    ? `يوافق الطرف الثاني على منح المنصة حقوق النشر والتوزيع الإلكتروني للكتاب المعنون: ${contentDetails || 'الكتاب المذكور أعلاه'} عبر مكتبتها الرقمية.`
                    : contractType === 'library'
                    ? `يوافق الطرف الثاني على استضافة وتوزيع محتوى المكتبة الرقمية الخاصة به والتي تتضمن: ${contentDetails || 'مجموعة الكتب والمراجع المتفق عليها'} عبر منصة ELITE UNIV.`
                    : contractType === 'student_academic' || contractType === 'student_free'
                    ? `يلتزم الطرف الثاني باحترام قوانين المنصة والالتزام بالاستخدام الأكاديمي السليم للمحتوى المقدم في تخصص: ${contentDetails || 'التخصص المذكور'}.`
                    : contractType === 'coordinator'
                    ? `يلتزم الطرف الثاني بمهام التنسيق المحلي وإدارة الاشتراكات والتواصل مع الطلبة والأساتذة في منطقته الجغرافية: ${contentDetails || 'المنطقة المحددة'}، ويخضع لرقابة الأدمن المباشرة.`
                    : `يلتزم الطرف الثاني بإدارة المنصة تقنياً وإدارياً وفق الصلاحيات الممنوحة له كمدير، ويشرف على المنسقين المحليين: ${contentDetails || 'المهام المحددة'}.`}
                </p>

                <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الثاني: الحقوق المالية ونموذج الربح</h3>
                <p>
                  {contractType === 'professor'
                    ? 'يستفيد الأستاذ من نسبة أرباح مبرمجة آلياً وشفافة تقدر بـ 35% من إجمالي اشتراكات الطلبة المسجلين في مساقاته، مع إمكانية السحب عبر الحساب البريدي (RIP) المعتمد.'
                    : contractType === 'book' || contractType === 'library'
                    ? 'يتم توزيع العوائد المالية الناتجة عن مبيعات أو اشتراكات قراءة المحتوى وفق نسبة متفق عليها سلفاً (50% للمنصة و 50% للطرف الثاني) ومبرمجة في النظام المالي الآلي للمنصة.'
                    : contractType === 'coordinator'
                    ? 'يستفيد المنسق من نسبة أرباح محددة عن كل اشتراك يتم تفعيله عبره، وفق سلم العمولات المعتمد في المنصة.'
                    : contractType === 'admin'
                    ? 'يتقاضى الأدمن راتباً ثابتاً أو نسبة من الأرباح العامة للمنصة وفق ما يحدده السوبر أدمن.'
                    : 'يلتزم الطالب بدفع رسوم الاشتراك المحددة للباقات المختارة، ويستفيد من تخفيضات التميز (10% للمرتبة الأولى) وتخفيضات الباقات المتعددة (20%).'}
                </p>

                <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الثالث: الملكية الفكرية والأمان السيادي</h3>
                <p>
                  تحتفظ المنصة بحق حماية المحتوى المقدم باستخدام تشفير عسكري (AES-256) لمنع القرصنة أو التوزيع غير المصرح به. يقر الطرف الثاني بأن المحتوى المقدم هو ملكية فكرية خالصة له ولا ينتهك حقوق أي طرف ثالث. يتم أرشفة المحتوى سيادياً لضمان الذاكرة المؤسساتية.
                </p>

                <h3 className="font-bold text-xl text-primary border-r-4 border-secondary pr-3">البند الرابع: التزامات المنصة</h3>
                <p>
                  تلتزم منصة ELITE UNIV بتوفير البنية التحتية التقنية المتطورة، حماية البيانات، التسويق الأكاديمي للمحتوى، وتوفير لوحة تحكم شفافة للطرف الثاني لمتابعة الإحصائيات والأرباح بدقة.
                </p>
              </div>

            </div>

            {/* Signatures */}
            <div className="mt-16 pt-8 border-t-2 border-slate-100 flex flex-col items-center text-center">
              <div className="w-full max-w-md">
                <h4 className="font-bold text-lg text-primary mb-2">الطرف الأول</h4>
                <p className="text-sm text-slate-500 mb-8">منصة ELITE UNIV<br/>المدير العام: MELLOUK MOHAMED</p>
                
                {!isSigned ? (
                  <button 
                    onClick={handleSignContract}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 w-full print:hidden"
                  >
                    <Sparkles size={24} />
                    إمضاء إلكتروني واعتماد العقد
                  </button>
                ) : (
                  <div className="inline-block border-2 border-emerald-500 bg-emerald-50 rounded-2xl px-12 py-6 text-emerald-700 font-medium relative overflow-hidden w-full">
                    <div className="absolute -right-4 -top-4 text-emerald-200 opacity-50 transform rotate-12">
                      <Sparkles size={64} />
                    </div>
                    <p className="text-sm mb-2 font-bold">تم الإمضاء الإلكتروني والاعتماد</p>
                    <div className="mt-2 text-emerald-800 font-black text-3xl italic tracking-widest">MELLOUK M.</div>
                    <p className="text-xs mt-4 text-emerald-600">تم إرسال نسخة إلكترونية معتمدة آلياً إلى الطرف الثاني ({secondPartyName}) للاحتفاظ بها أو طباعتها.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center text-xs text-slate-400 print:mt-8 absolute bottom-12 left-0 right-0">
              <p>هذا العقد موثق إلكترونياً ومحفوظ في قاعدة بيانات ELITE UNIV الآمنة.</p>
              <p>الرقم المرجعي: EU-{new Date().getFullYear()}-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            </div>

          </A4Document>
        </motion.div>
      )}
        </>
      )}

      {activeTab === 'reports' && (
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          className="space-y-6"
        >
          <div className="card-3d rounded-2xl overflow-hidden max-w-3xl print:hidden transform-3d perspective-1000 p-6">
            <h3 className="text-xl font-bold text-primary mb-6">توليد تقرير إداري / أكاديمي</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setReportType('financial')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  reportType === 'financial' 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <PieChart size={32} className={reportType === 'financial' ? 'text-indigo-600' : ''} />
                <span className="font-bold text-center">تقرير مالي وإحصائي</span>
              </button>
              <button
                onClick={() => setReportType('academic')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  reportType === 'academic' 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <Book size={32} className={reportType === 'academic' ? 'text-indigo-600' : ''} />
                <span className="font-bold text-center">تقرير أكاديمي (المحتوى)</span>
              </button>
              <button
                onClick={() => setReportType('security')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                  reportType === 'security' 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                }`}
              >
                <Building2 size={32} className={reportType === 'security' ? 'text-indigo-600' : ''} />
                <span className="font-bold text-center">تقرير أمني وسيادي</span>
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">الفترة الزمنية للتقرير</label>
              <select 
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
              >
                <option value="السداسي الأول 2026">السداسي الأول 2026</option>
                <option value="السداسي الثاني 2025">السداسي الثاني 2025</option>
                <option value="السنة الجامعية 2025-2026">السنة الجامعية 2025-2026</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleAiGenerateReport}
                disabled={isAiGeneratingReport}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border border-indigo-200"
              >
                <Sparkles size={18} className={isAiGeneratingReport ? "animate-pulse" : ""} />
                توليد ذكي (AI)
              </button>
              <button
                onClick={handlePrint}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d"
              >
                <Printer size={18} />
                طباعة / تحميل PDF
              </button>
            </div>
          </div>

          {/* Report Document (Visible when printing) */}
          <div className="print:block w-full max-w-5xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
            <A4Document>
              <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
                <div className="text-right">
                  <h1 className="text-xl font-bold mb-1">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
                  <h2 className="text-lg font-bold">وزارة التعليم العالي والبحث العلمي</h2>
                  <h3 className="text-md font-bold mt-2">منصة النخبة الجامعية (ELITE UNIV)</h3>
                </div>
                <div className="flex flex-col items-center">
                  <Logo className="w-20 h-20 grayscale" />
                  <span className="text-xs mt-2 font-bold">النظام المركزي للتوثيق</span>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 underline underline-offset-8 decoration-2">
                  {reportType === 'financial' ? 'تقرير الحصيلة المالية والإحصائية الشاملة' :
                   reportType === 'academic' ? 'التقرير الأكاديمي لتقييم المحتوى والمكتبة الرقمية' :
                   'التقرير الأمني والسيادي للبنية التحتية الرقمية'}
                </h2>
                <p className="mt-4 font-bold text-lg text-slate-600">الفترة: {reportPeriod}</p>
              </div>

              <div className="space-y-6 text-slate-800 leading-relaxed text-justify text-lg">
                <p>بناءً على توجيهات الإدارة العليا (السوبر أدمن)، وحرصاً على مبدأ الشفافية والحوكمة الرشيدة في تسيير منصة <strong>ELITE UNIV</strong>، نرفع إليكم هذا التقرير المفصل:</p>
                
                <div className="space-y-4 mt-8">
                  <h3 className="font-bold text-xl border-r-4 border-slate-800 pr-3">أولاً: الإحصائيات العامة</h3>
                  <p>
                    {reportType === 'financial' ? 'سجلت المنصة نمواً مالياً بنسبة 45% مقارنة بالسداسي الماضي، مع تجاوز عدد المشتركين النشطين حاجز الـ 30 مليون مستخدم. تم توزيع الأرباح على الأساتذة والمؤلفين بدقة متناهية عبر النظام الآلي.' :
                     reportType === 'academic' ? 'تم إثراء المكتبة الرقمية بأكثر من 15,000 مصنف أكاديمي جديد (كتب، مذكرات، محاضرات)، مع نسبة تقييم إيجابي بلغت 92% من طرف الطلبة والباحثين.' :
                     'لم تسجل أي اختراقات أمنية بفضل نظام التشفير العسكري (AES-256). تم صد أكثر من 50,000 هجمة سيبرانية بنجاح، مع ضمان أرشفة سيادية لـ 100% من البيانات.'}
                  </p>

                  <h3 className="font-bold text-xl border-r-4 border-slate-800 pr-3">ثانياً: التحليل والتقييم</h3>
                  <p>
                    {reportContent || (reportType === 'financial' ? 'تظهر المؤشرات استقراراً مالياً كبيراً، مع توصية بزيادة الاستثمار في الخوادم السحابية لاستيعاب التوسع المستقبلي.' :
                     reportType === 'academic' ? 'نلاحظ إقبالاً كبيراً على تخصصات الذكاء الاصطناعي والعلوم الطبية. نوصي بتشجيع الأساتذة على نشر المزيد من المحتوى التفاعلي.' :
                     'البنية التحتية تعمل بكفاءة 99.99%. نوصي بإجراء تحديثات دورية لبروتوكولات الأمان لمواكبة التهديدات السيبرانية الحديثة.')}
                  </p>
                </div>
              </div>

              <div className="mt-24 pt-8 grid grid-cols-3 gap-8 text-center items-end">
                <div>
                  <h4 className="font-bold text-lg mb-8">حرر بـ: الجزائر في {currentDate}</h4>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-slate-800 mb-2">التوثيق الإلكتروني (QR)</p>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <QRCodeSVG 
                      value={`https://elite-univ.dz/verify/report/${reportType}-${Date.now()}`} 
                      size={80} 
                      level="H" 
                      includeMargin={false} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">REF: REP-{Date.now().toString().slice(-6)}</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-primary">توقيع السوبر أدمن</h4>
                  <div className="inline-block border-2 border-emerald-500 bg-emerald-50 rounded-2xl px-12 py-6 text-emerald-700 font-medium relative overflow-hidden w-full max-w-sm">
                    <div className="absolute -right-4 -top-4 text-emerald-200 opacity-50 transform rotate-12">
                      <Sparkles size={64} />
                    </div>
                    <p className="text-sm mb-2 font-bold">تم الإمضاء الإلكتروني والاعتماد</p>
                    <div className="mt-2 text-emerald-800 font-black text-3xl italic tracking-widest">MELLOUK M.</div>
                  </div>
                </div>
              </div>
            </A4Document>
          </div>
        </motion.div>
      )}

      {activeTab === 'announcements' && (
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-end gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d"
            >
              <Printer size={18} />
              طباعة / تحميل PDF
            </button>
          </div>

          <div className="print:block w-full max-w-5xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
            <A4Document>
              <div className="flex justify-between items-start mb-12">
                <div className="text-right space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">الجمهورية الجزائرية الديمقراطية الشعبية</h3>
                  <h3 className="text-xl font-bold text-slate-800">وزارة التعليم العالي والبحث العلمي</h3>
                  <h3 className="text-xl font-bold text-slate-800">جامعة تيسمسيلت - احمد بن يحي الونشريسي</h3>
                  <h3 className="text-xl font-bold text-slate-800">كلية الآداب واللغات</h3>
                  <h3 className="text-xl font-bold text-slate-800">نيابة العمادة المكلفة بالدراسات وشؤون الطلبة</h3>
                </div>
                <div className="flex flex-col items-center">
                  <Logo className="w-24 h-24 grayscale" />
                </div>
              </div>

              <div className="text-center mb-16 mt-8">
                <h1 className="text-7xl font-black text-slate-900 tracking-widest underline underline-offset-[20px] decoration-4">إعـــــــــــــــــــــلان</h1>
              </div>

              <div className="space-y-8 text-slate-900 text-2xl leading-[2.2] text-justify px-12">
                <p className="indent-16">
                  تنهي نيابة العمادة المكلفة بالدراسات وشؤون الطلبة إلى علم كافة طلبة الكلية، أنه وفي إطار تفعيل أحكام <strong>القرار الوزاري رقم 1275 المعدل والمتمم</strong>، المتضمن آلية "شهادة - مؤسسة ناشئة / شهادة - براءة اختراع"، فقد تقرر <strong>تمديد آجال التسجيل</strong> والانخراط في هذه الآلية الاستراتيجية إلى غاية <strong>28 فيفري 2026</strong>.
                </p>

                <div className="my-10">
                  <p className="font-bold mb-6">تهدف هذه الآلية إلى تمكين الطلبة من الاستفادة من المزايا التالية:</p>
                  <ul className="list-disc list-inside space-y-4 pr-12 font-bold text-slate-800">
                    <li>الابتكار.</li>
                    <li>إنشاء المؤسسات الناشئة.</li>
                    <li>إنشاء المؤسسات المصغرة.</li>
                    <li>الحصول على براءة اختراع.</li>
                    <li>تحويل الأفكار إلى مشاريع اقتصادية.</li>
                  </ul>
                </div>

                <p className="indent-16 font-bold text-slate-800">
                  وعليه، نهيب بجميع الطلبة حاملي الأفكار والمشاريع المبتكرة إلى عدم تفويت هذه الفرصة الثمينة، والمبادرة بالتسجيل والانخراط الفعال في هذه المنظومة الريادية التي تفتح آفاقاً واعدة لمسارهم المهني والمقاولاتي.
                </p>
              </div>

              <div className="mt-24 px-12 flex justify-between items-end">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300">
                  <p className="text-xl font-bold text-slate-800 mb-3">رابط التسجيل:</p>
                  <p className="text-2xl text-blue-700 font-mono font-bold" dir="ltr">https://elite-univ.dz/register-1275</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <p className="text-sm font-bold text-slate-800 mb-2">التوثيق الإلكتروني (QR)</p>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <QRCodeSVG 
                      value={`https://elite-univ.dz/verify/announcement/1275-${Date.now()}`} 
                      size={80} 
                      level="H" 
                      includeMargin={false} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">REF: ANN-1275</p>
                </div>

                <div className="text-center">
                  <h4 className="font-bold text-2xl mb-6">نائب العميد المكلف بالدراسات وشؤون الطلبة</h4>
                  <div className="w-72 h-40 border-2 border-slate-300 border-dashed rounded-2xl flex items-center justify-center text-slate-400 text-xl">
                    الختم والتوقيع
                  </div>
                </div>
              </div>
            </A4Document>
          </div>
        </motion.div>
      )}

      {activeTab === 'pending' && (
        <motion.div 
          initial={{ opacity: 0, y: 20, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          className="card-3d rounded-3xl overflow-hidden transform-3d bg-white"
        >
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-primary">موافقات السوبر أدمن</h3>
            <p className="text-sm text-slate-500 mt-1">الموافقة أو الرفض النهائي للعقود، خاصة عقود المكتبة الرقمية (تقاسم الأرباح 50%)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">رقم العقد</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">النوع</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">الطرف الثاني</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">الموضوع</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">التاريخ</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-slate-500">{contract.id}</td>
                    <td className="px-6 py-4 font-bold text-primary">{contract.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-800">{contract.author}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contract.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{contract.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => showToast('تمت الموافقة على العقد واعتماده نهائياً', 'success')}
                          className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors text-sm font-bold btn-3d"
                        >
                          موافقة
                        </button>
                        <button 
                          onClick={() => showToast('تم رفض العقد', 'error')}
                          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-bold btn-3d"
                        >
                          رفض
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
