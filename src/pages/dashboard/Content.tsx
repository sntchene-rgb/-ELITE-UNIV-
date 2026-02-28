import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Book, Upload, FileText, CheckCircle, X, Search, Filter, Sparkles, Calendar, Database, ArrowUpDown, Star, Eye, Lightbulb, User, Mail, Award, Printer } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { useLanguage } from '../../contexts/LanguageContext';
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

const authorsData: Record<string, any> = {
  'د. أحمد محمود': {
    name: 'د. أحمد محمود',
    specialty: 'فيزياء',
    bio: 'أستاذ دكتور في الفيزياء النظرية بجامعة النخبة. حاصل على دكتوراه في فيزياء الكم من جامعة كامبريدج. له العديد من الأبحاث المنشورة في مجلات علمية محكمة.',
    email: 'ahmed.m@elite.edu.dz',
    joinDate: '2015',
  },
  'د. عبد الله صالح': {
    name: 'د. عبد الله صالح',
    specialty: 'شريعة إسلامية',
    bio: 'أستاذ الفقه المقارن وأصول الفقه. متخصص في المعاملات المالية المعاصرة والقضايا الفقهية المستجدة.',
    email: 'abdullah.s@elite.edu.dz',
    joinDate: '2018',
  },
  'د. فاطمة الزهراء': {
    name: 'د. فاطمة الزهراء',
    specialty: 'تاريخ',
    bio: 'باحثة وأستاذة في التاريخ الحديث والمعاصر. متخصصة في تاريخ شمال إفريقيا وحركات التحرر.',
    email: 'fatima.z@elite.edu.dz',
    joinDate: '2020',
  },
  'د. كريم بن علي': {
    name: 'د. كريم بن علي',
    specialty: 'رياضيات',
    bio: 'أستاذ التحليل الرياضي والمعادلات التفاضلية. شارك في العديد من المؤتمرات الدولية للرياضيات التطبيقية.',
    email: 'karim.b@elite.edu.dz',
    joinDate: '2019',
  },
  'د. سمير أمين': {
    name: 'د. سمير أمين',
    specialty: 'فلسفة',
    bio: 'أستاذ الفلسفة الحديثة وفلسفة العلوم. مهتم بقضايا الإبستمولوجيا وتاريخ الأفكار العلمية.',
    email: 'samir.a@elite.edu.dz',
    joinDate: '2016',
  },
  'د. ليلى مراد': {
    name: 'د. ليلى مراد',
    specialty: 'أدب عربي',
    bio: 'أستاذة الأدب الأندلسي والنقد الأدبي. لها عدة مؤلفات حول الشعر الأندلسي وتطوره.',
    email: 'laila.m@elite.edu.dz',
    joinDate: '2021',
  }
};

const initialContent = [
  { id: 1, title: 'مقدمة في فيزياء الكم', author: 'د. أحمد محمود', type: 'كتاب', specialty: 'فيزياء', autoContract: true, year: '2025-2026', uploadDate: '2025-10-15', rating: 4.8, popularity: 1500 },
  { id: 2, title: 'أصول الفقه المقارن', author: 'د. عبد الله صالح', type: 'مذكرة', specialty: 'شريعة إسلامية', autoContract: false, year: '2025-2026', uploadDate: '2025-09-20', rating: 4.5, popularity: 850 },
  { id: 3, title: 'تاريخ الجزائر المعاصر', author: 'د. فاطمة الزهراء', type: 'كتاب', specialty: 'تاريخ', autoContract: true, year: '2024-2025', uploadDate: '2024-11-05', rating: 4.9, popularity: 2100 },
  { id: 4, title: 'التحليل الرياضي المتقدم', author: 'د. كريم بن علي', type: 'محاضرة', specialty: 'رياضيات', autoContract: false, year: '2025-2026', uploadDate: '2025-12-01', rating: 4.2, popularity: 600 },
  { id: 5, title: 'فلسفة العلوم', author: 'د. سمير أمين', type: 'كتاب', specialty: 'فلسفة', autoContract: true, year: '2023-2024', uploadDate: '2023-05-10', rating: 4.7, popularity: 3200 },
  { id: 6, title: 'الأدب الأندلسي', author: 'د. ليلى مراد', type: 'مذكرة', specialty: 'أدب عربي', autoContract: false, year: '2024-2025', uploadDate: '2024-02-18', rating: 4.6, popularity: 1100 },
];

export default function Content() {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('الكل');
  const [filterType, setFilterType] = useState('الكل');
  const [filterContractStatus, setFilterContractStatus] = useState('الكل');
  const [filterYear, setFilterYear] = useState('الكل');
  const [sortBy, setSortBy] = useState('newest');
  const [aiActive, setAiActive] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateData, setCertificateData] = useState<{author: string, title: string, type: string} | null>(null);
  const [isAiGeneratingCertificate, setIsAiGeneratingCertificate] = useState(false);
  const [certificateText, setCertificateText] = useState('');

  const handleAiGenerateCertificate = () => {
    if (!certificateData) return;
    setIsAiGeneratingCertificate(true);
    showToast('جاري صياغة نص الشهادة التقديرية باستخدام الذكاء الاصطناعي...', 'info');
    
    setTimeout(() => {
      const aiText = `تتشرف الإدارة العليا لمنصة ELITE UNIV، وبناءً على التقييم الإيجابي للجنة العلمية والمراجعة الدقيقة عبر خوارزميات الذكاء الاصطناعي، بمنح هذه الشهادة التقديرية للباحث المتميز، اعترافاً بجهوده العلمية الرصينة في إعداد ونشر المصنف الأكاديمي المذكور. إن هذا العمل يشكل إضافة نوعية للمكتبة الرقمية السيادية، ويسهم بشكل فعال في إثراء البحث العلمي والارتقاء بجودة التعليم العالي. نتمنى للباحث دوام التألق والنجاح في مسيرته الأكاديمية.`;
      setCertificateText(aiText);
      setIsAiGeneratingCertificate(false);
      showToast('تمت صياغة نص الشهادة بنجاح', 'success');
    }, 1500);
  };

  const handleAIFilter = () => {
    setAiActive(true);
    showToast('جاري تفعيل خوارزميات الذكاء الاصطناعي لتحليل التفضيلات الأكاديمية بدقة عالية...', 'info');
    setTimeout(() => {
      setFilterSpecialty('فيزياء');
      setFilterYear('2025-2026');
      setSortBy('popularity');
      setAiActive(false);
      showToast('تمت الفلترة الذكية بنجاح وفق المعايير الأكاديمية المتقدمة', 'success');
    }, 2000);
  };

  // Mock User Profile for Recommendations
  const userProfile = useMemo(() => ({
    specialty: 'فيزياء',
    interests: ['رياضيات', 'فلسفة'],
  }), []);

  // Smart Recommendation Algorithm
  const recommendedContent = useMemo(() => {
    return initialContent
      .map(item => {
        let score = 0;
        if (item.specialty === userProfile.specialty) score += 10;
        if (userProfile.interests.includes(item.specialty)) score += 5;
        score += (item.rating * 0.5); // Add rating weight
        score += (item.popularity / 1000); // Add popularity weight
        return { ...item, score };
      })
      .filter(item => item.score > 5) // Threshold for recommendation
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Top 3 recommendations
  }, [userProfile]);

  const filteredContent = useMemo(() => {
    let result = initialContent.filter(item => {
      const matchesSearch = item.title.includes(searchQuery) || item.author.includes(searchQuery);
      const matchesSpecialty = filterSpecialty === 'الكل' || item.specialty === filterSpecialty;
      const matchesType = filterType === 'الكل' || item.type === filterType;
      
      let matchesAutoContract = true;
      if (filterContractStatus === 'autoAll') matchesAutoContract = item.autoContract;
      else if (filterContractStatus === 'books') matchesAutoContract = item.autoContract && item.type === 'كتاب';
      else if (filterContractStatus === 'lectures') matchesAutoContract = item.autoContract && item.type === 'محاضرة';
      else if (filterContractStatus === 'notes') matchesAutoContract = item.autoContract && item.type === 'مذكرة';
      else if (filterContractStatus === 'none') matchesAutoContract = !item.autoContract;

      const matchesYear = filterYear === 'الكل' || item.year === filterYear;
      
      return matchesSearch && matchesSpecialty && matchesType && matchesAutoContract && matchesYear;
    });

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'popularity') {
        return b.popularity - a.popularity;
      }
      return 0;
    });

    return result;
  }, [searchQuery, filterSpecialty, filterType, filterContractStatus, filterYear, sortBy]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUploadModal(false);
    // Show auto-generated contract immediately after upload
    setShowContractModal(true);
  };

  const handleSignContract = () => {
    setShowContractModal(false);
    showToast('تم توقيع عقد النشر آلياً ورفع الكتاب بنجاح', 'success');
    setBookTitle('');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">{t('content.title')}</h2>
          <p className="text-slate-500 text-sm mt-1">{t('content.subtitle')}</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d shrink-0"
        >
          <Upload size={18} />
          {t('content.uploadBtn')}
        </button>
      </div>

      {/* Smart Recommendations Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100"
      >
        <div className="flex items-center gap-2 mb-4 text-indigo-800">
          <Lightbulb size={24} className="text-amber-500" />
          <div>
            <h3 className="font-bold text-lg">{t('content.recommended')}</h3>
            <p className="text-xs text-indigo-600/80">{t('content.recommended.subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedContent.map((item, i) => (
            <motion.div 
              key={`rec-${item.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600">
                  {item.specialty}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Star size={12} className="fill-current" />
                  {item.rating}
                </div>
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{item.title}</h4>
              <p 
                className="text-xs text-slate-500 hover:text-secondary transition-colors"
                onClick={(e) => { e.stopPropagation(); setSelectedAuthor(item.author); }}
              >
                {item.author}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pr-10 pl-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
            placeholder={t('content.searchPlaceholder')}
          />
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto">
          <button 
            onClick={handleAIFilter}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${aiActive ? 'bg-indigo-100 text-indigo-700 animate-pulse' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'}`}
            title="فلترة ذكية بالذكاء الاصطناعي"
          >
            <Sparkles size={16} className={aiActive ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{t('content.aiAssistant')}</span>
          </button>

          <div className="flex items-center gap-2 w-full md:w-auto border-r border-slate-200 pr-4">
            <ArrowUpDown size={18} className="text-slate-400 shrink-0" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
            >
              <option value="newest">{t('content.sort.newest')}</option>
              <option value="oldest">{t('content.sort.oldest')}</option>
              <option value="rating">{t('content.sort.rating')}</option>
              <option value="popularity">{t('content.sort.popularity')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto border-r border-slate-200 pr-4">
            <Filter size={18} className="text-slate-400 shrink-0" />
            <select 
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
            >
              <option value="الكل">{t('content.allSpecialties')}</option>
              <option value="فيزياء">فيزياء</option>
              <option value="رياضيات">رياضيات</option>
              <option value="فلسفة">فلسفة</option>
              <option value="شريعة إسلامية">شريعة إسلامية</option>
              <option value="أدب عربي">أدب عربي</option>
              <option value="تاريخ">تاريخ</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Calendar size={18} className="text-slate-400 shrink-0" />
            <select 
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
            >
              <option value="الكل">{t('content.allYears')}</option>
              <option value="2025-2026">2025 - 2026</option>
              <option value="2024-2025">2024 - 2025</option>
              <option value="2023-2024">2023 - 2024</option>
            </select>
          </div>

          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
          >
            <option value="الكل">{t('content.allTypes')}</option>
            <option value="كتاب">كتاب</option>
            <option value="محاضرة">محاضرة</option>
            <option value="مذكرة">مذكرة</option>
          </select>

          <div className="flex items-center gap-2 w-full md:w-auto border-r border-slate-200 pr-4">
            <FileText size={18} className="text-slate-400 shrink-0" />
            <select 
              value={filterContractStatus}
              onChange={(e) => setFilterContractStatus(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
            >
              <option value="الكل">{t('content.contract.all')}</option>
              <option value="autoAll">{t('content.contract.autoAll')}</option>
              <option value="books">{t('content.contract.books')}</option>
              <option value="lectures">{t('content.contract.lectures')}</option>
              <option value="notes">{t('content.contract.notes')}</option>
              <option value="none">{t('content.contract.none')}</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
        {/* Sample Content Cards */}
        {filteredContent.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="card-3d p-6 rounded-2xl transform-3d"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/5 text-primary rounded-xl">
                <Book size={24} />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {item.specialty}
              </span>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-1">{item.title}</h3>
            <p 
              className="text-sm text-slate-500 mb-2 cursor-pointer hover:text-secondary transition-colors inline-block"
              onClick={() => setSelectedAuthor(item.author)}
            >
              {item.author}
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <Database size={12} />
                {t('content.archive')} {item.year}
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                <Star size={12} className="fill-current" />
                {item.rating}
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                <Eye size={12} />
                {item.popularity}
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              {item.autoContract ? (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  {t('content.badge.autoContract')}
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  {t('content.badge.noContract')}
                </span>
              )}
              <span className="text-xs text-slate-400">{item.type}</span>
            </div>
          </motion.div>
        ))}
        
        {filteredContent.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100">
            {t('content.noResults')}
          </div>
        )}
      </div>

      {/* Author Profile Modal */}
      {selectedAuthor && authorsData[selectedAuthor] && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card-3d rounded-3xl max-w-2xl w-full overflow-hidden transform-3d bg-white"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border-2 border-primary/20">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{authorsData[selectedAuthor].name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-secondary/10 text-secondary">
                      {authorsData[selectedAuthor].specialty}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> انضم منذ {authorsData[selectedAuthor].joinDate}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedAuthor(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Bio Section */}
              <section>
                <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  السيرة الذاتية والأكاديمية
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {authorsData[selectedAuthor].bio}
                </p>
              </section>

              {/* Contact Info */}
              <section>
                <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  معلومات التواصل
                </h4>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <a href={`mailto:${authorsData[selectedAuthor].email}`} className="hover:text-secondary transition-colors">
                    {authorsData[selectedAuthor].email}
                  </a>
                </div>
              </section>

              {/* Publications Section */}
              <section>
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Book size={16} className="text-primary" />
                  المنشورات والمحتوى الأكاديمي
                </h4>
                <div className="space-y-3">
                  {initialContent.filter(item => item.author === selectedAuthor).map(pub => (
                    <div key={pub.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-secondary/30 hover:bg-secondary/5 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 text-primary rounded-lg group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                          <Book size={16} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800">{pub.title}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">{pub.type}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="text-xs text-slate-500">{pub.year}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-amber-600">
                          <Star size={12} className="fill-current" />
                          {pub.rating}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <Eye size={12} />
                          {pub.popularity}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCertificateData({ author: pub.author, title: pub.title, type: pub.type });
                            setShowCertificateModal(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="إصدار شهادة نشر"
                        >
                          <Award size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {initialContent.filter(item => item.author === selectedAuthor).length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">لا توجد منشورات حالياً.</p>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, rotateX: -5 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.4 }}
            className="card-3d rounded-3xl max-w-md w-full overflow-hidden transform-3d"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary">رفع كتاب للمكتبة</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">عنوان الكتاب</label>
                <input 
                  type="text" 
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">التخصص</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50">
                  <option>فيزياء</option>
                  <option>رياضيات</option>
                  <option>فلسفة</option>
                  <option>شريعة إسلامية</option>
                  <option>أدب عربي</option>
                  <option>تاريخ</option>
                  <option>أخرى...</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ملف الكتاب (PDF)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                  <span className="text-sm text-slate-500">اضغط لاختيار الملف</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition-colors mt-4 btn-3d">
                رفع ومتابعة
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Auto Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, rotateX: -5 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.4 }}
            className="card-3d rounded-3xl max-w-3xl w-full overflow-hidden transform-3d bg-white"
          >
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-primary to-primary-dark text-white text-center relative">
              <div className="absolute top-4 right-4 opacity-20">
                <FileText size={64} />
              </div>
              <FileText className="mx-auto mb-3 text-secondary" size={40} />
              <h3 className="text-2xl font-bold">عقد نشر وتوزيع إلكتروني (إصدار آلي)</h3>
              <p className="text-sm text-slate-200 mt-2">وثيقة قانونية ملزمة وفق قوانين الملكية الفكرية والتحرير الإداري</p>
            </div>
            <div className="p-8 space-y-6 text-slate-700 text-justify leading-relaxed max-h-[60vh] overflow-y-auto">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <h4 className="font-bold text-primary mb-2 border-b border-slate-200 pb-2">الديباجة:</h4>
                <p className="text-sm">
                  بناءً على القوانين والتشريعات المنظمة لحقوق المؤلف والحقوق المجاورة، وحرصاً من منصة <strong>ELITE UNIV</strong> على حماية الإنتاج الفكري والأكاديمي، تم إبرام هذا العقد الآلي بين المنصة (الطرف الأول) والمؤلف/الرافع (الطرف الثاني) بخصوص المصنف الموسوم: <span className="font-bold text-primary">"{bookTitle}"</span>.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">المادة الأولى: موضوع العقد</h4>
                  <p className="text-sm">يمنح الطرف الثاني للطرف الأول حق النشر، التوزيع، والإتاحة الإلكترونية للمصنف المذكور أعلاه عبر مكتبة المنصة الرقمية، وذلك لاستخدامات البحث العلمي والتعليم الأكاديمي.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">المادة الثانية: ضمانات الأصالة</h4>
                  <p className="text-sm">يقر الطرف الثاني بأن المصنف هو من إنتاجه الأصلي، أو أنه يمتلك الحقوق القانونية لرفعه، وأنه لا ينتهك أي حقوق ملكية فكرية لطرف ثالث. يتحمل الطرف الثاني كامل المسؤولية القانونية والأخلاقية في حال ثبوت العكس.</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-1">المادة الثالثة: الحماية التقنية</h4>
                  <p className="text-sm">تلتزم المنصة بتطبيق أعلى معايير الحماية التقنية، بما في ذلك التشفير العسكري (AES-256)، لمنع النسخ غير المصرح به أو القرصنة، مع توفير تقارير دورية حول معدلات الوصول والاستخدام.</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-1">المادة الرابعة: العوائد المالية (إن وجدت)</h4>
                  <p className="text-sm">تخضع العوائد المالية الناتجة عن القراءات والتحميلات للنظام المالي الشفاف المعتمد في المنصة، والذي يتم تحديثه ومراجعته دورياً وفق معايير الجودة الأكاديمية.</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSignContract}
                  className="flex-1 bg-secondary hover:bg-secondary-dark text-white py-3.5 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 btn-3d shadow-lg shadow-secondary/30"
                >
                  <CheckCircle size={20} />
                  المصادقة والتوقيع الإلكتروني
                </button>
                <button 
                  onClick={() => setShowContractModal(false)}
                  className="px-8 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors btn-3d"
                >
                  إلغاء العملية
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Certificate Modal */}
      {showCertificateModal && certificateData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
          <style>{`
            @media print {
              body * { visibility: hidden; }
              #certificate-print-area, #certificate-print-area * { visibility: visible; }
              #certificate-print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
            }
          `}</style>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, rotateX: -5 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.4 }}
            className="card-3d rounded-3xl w-[95vw] max-w-7xl overflow-hidden transform-3d bg-white print:shadow-none print:rounded-none my-8 print:my-0"
          >
            <div id="certificate-print-area" className="print:block" style={{ fontFamily: 'Arial, sans-serif' }}>
              <A4Document orientation="landscape">
                <div className="h-full border-8 border-double border-slate-200 bg-gradient-to-br from-slate-50 to-white relative p-12 flex flex-col justify-between">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                    <Award size={400} />
                  </div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-right">
                      <h1 className="text-xl font-bold mb-1">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
                      <h2 className="text-lg font-bold">وزارة التعليم العالي والبحث العلمي</h2>
                    </div>
                    <div className="flex flex-col items-center">
                      <Logo className="w-20 h-20 grayscale" />
                      <span className="text-xs mt-2 font-bold">منصة النخبة الجامعية</span>
                    </div>
                  </div>

                  <div className="text-center z-10 relative flex-1 flex flex-col justify-center">
                    <div className="mb-8">
                      <h2 className="text-4xl font-bold text-primary mb-2">شهادة نشر وتقدير أكاديمي</h2>
                      <div className="w-32 h-1 bg-secondary mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-6 text-slate-800 text-lg leading-relaxed">
                      <p>تشهد إدارة منصة <span className="font-bold text-primary">ELITE UNIV</span> للبحث العلمي والنشر الأكاديمي،</p>
                      
                      <p>بأن الباحث / الأستاذ:</p>
                      <h3 className="text-3xl font-bold text-secondary my-4">{certificateData.author}</h3>
                      
                      <p>قد قام بنشر وإتاحة مصنفه الأكاديمي المتمثل في ({certificateData.type}) والموسوم بـ:</p>
                      <h4 className="text-2xl font-bold text-primary my-4">"{certificateData.title}"</h4>
                      
                      <p className="text-sm text-slate-600 mt-8 max-w-2xl mx-auto leading-relaxed">
                        {certificateText || 'تُمنح هذه الشهادة تقديراً لجهوده العلمية ومساهمته الفعالة في إثراء المحتوى الأكاديمي والمكتبة الرقمية للمنصة، متمنين له دوام التوفيق والنجاح في مسيرته العلمية.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-end px-12 z-10 relative">
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800 mb-2">تاريخ الإصدار</p>
                      <p className="text-sm text-slate-600">{new Date().toLocaleDateString('ar-DZ')}</p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                      <p className="text-sm font-bold text-slate-800 mb-2">التوثيق الإلكتروني (QR)</p>
                      <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <QRCodeSVG 
                          value={`https://elite-univ.dz/verify/cert/${certificateData.id || '12345'}`} 
                          size={80} 
                          level="H" 
                          includeMargin={false} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">REF: CERT-{certificateData.id || '12345'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800 mb-2">توقيع الإدارة العليا</p>
                      <div className="w-48 h-16 border-b-2 border-slate-800 border-dashed mx-auto flex items-end justify-center pb-2">
                        <span className="text-slate-800 font-black text-xl italic opacity-80">MELLOUK M.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </A4Document>
            </div>
            
            <div className="p-4 bg-slate-100 flex justify-end gap-4 print:hidden">
              <button 
                onClick={handleAiGenerateCertificate}
                disabled={isAiGeneratingCertificate}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-6 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 border border-indigo-200"
              >
                <Sparkles size={18} className={isAiGeneratingCertificate ? "animate-pulse" : ""} />
                صياغة ذكية (AI)
              </button>
              <button 
                onClick={() => {
                  window.print();
                  showToast('جاري تحضير الشهادة للطباعة / التحميل', 'success');
                }}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-bold transition-colors flex items-center gap-2"
              >
                <Printer size={18} />
                طباعة / تحميل PDF
              </button>
              <button 
                onClick={() => {
                  setShowCertificateModal(false);
                  setCertificateText('');
                }}
                className="px-6 py-2 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
