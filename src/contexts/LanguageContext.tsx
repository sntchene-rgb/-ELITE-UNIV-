import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    'content.title': 'المحتوى الأكاديمي والمكتبة',
    'content.subtitle': 'إدارة الكتب، المحاضرات، والمذكرات مع التوثيق الآلي للعقود',
    'content.uploadBtn': 'رفع كتاب جديد',
    'content.searchPlaceholder': 'البحث باسم الكتاب أو المؤلف...',
    'content.allSpecialties': 'كل التخصصات',
    'content.allTypes': 'كل الأنواع',
    'content.allYears': 'كل السنوات',
    'content.contract.all': 'حالة العقد (الكل)',
    'content.contract.autoAll': 'موثق بعقد آلي (الكل)',
    'content.contract.books': 'عقود الكتب فقط',
    'content.contract.lectures': 'عقود المحاضرات فقط',
    'content.contract.notes': 'عقود المذكرات فقط',
    'content.contract.none': 'بدون عقد',
    'content.aiAssistant': 'مساعد AI',
    'content.sort.newest': 'الأحدث',
    'content.sort.rating': 'الأعلى تقييماً',
    'content.sort.popularity': 'الأكثر شعبية',
    'content.sort.oldest': 'الأقدم',
    'content.noResults': 'لا يوجد محتوى يطابق معايير البحث والفلترة.',
    'content.recommended': 'اقتراحات ذكية مخصصة لك',
    'content.recommended.subtitle': 'بناءً على تخصصك (فيزياء) وسجل اهتماماتك الأكاديمية',
    'content.badge.autoContract': 'موثق بعقد آلي',
    'content.badge.noContract': 'غير موثق آلياً',
    'content.archive': 'أرشيف:',
    'settings.title': 'الإعدادات',
    'settings.subtitle': 'إدارة تفضيلات حسابك، الأمان، والإشعارات',
    'settings.language.title': 'اللغة والمنطقة (دعم عالمي)',
    'settings.language.label': 'لغة النظام الأساسية',
    'settings.language.desc': 'النظام مزود بذكاء اصطناعي لترجمة وتكييف المحتوى لجميع لغات العالم باحترافية.',
    'settings.storage.title': 'التخزين السحابي والتنظيم السنوي',
    'settings.storage.yearLabel': 'السنة الجامعية الحالية',
    'settings.storage.statusLabel': 'حالة التخزين (مساحة غير محدودة)',
    'settings.storage.statusDesc': 'مساحة مستخدمة: 15TB / سعة غير محدودة (تستوعب أكثر من 30 مليون مستخدم نشط في آن واحد)',
    'settings.storage.autoArchive': 'التنظيم والأرشفة السنوية الذكية',
    'settings.storage.autoArchiveDesc': 'يقوم الذكاء الاصطناعي بفرز وأرشفة جميع البيانات والمحتوى تلقائياً حسب السنة الجامعية لضمان سرعة الوصول.',
    'settings.save': 'حفظ التغييرات',
  },
  en: {
    'content.title': 'Academic Content & Library',
    'content.subtitle': 'Manage books, lectures, and notes with automated contract documentation',
    'content.uploadBtn': 'Upload New Book',
    'content.searchPlaceholder': 'Search by book title or author...',
    'content.allSpecialties': 'All Specialties',
    'content.allTypes': 'All Types',
    'content.allYears': 'All Years',
    'content.contract.all': 'Contract Status (All)',
    'content.contract.autoAll': 'Auto-Contracted (All)',
    'content.contract.books': 'Books Only',
    'content.contract.lectures': 'Lectures Only',
    'content.contract.notes': 'Notes Only',
    'content.contract.none': 'No Contract',
    'content.aiAssistant': 'AI Assistant',
    'content.sort.newest': 'Newest',
    'content.sort.rating': 'Highest Rated',
    'content.sort.popularity': 'Most Popular',
    'content.sort.oldest': 'Oldest',
    'content.noResults': 'No content matches your search and filter criteria.',
    'content.recommended': 'Smart Recommendations For You',
    'content.recommended.subtitle': 'Based on your specialty (Physics) and academic interests',
    'content.badge.autoContract': 'Auto-Contracted',
    'content.badge.noContract': 'No Auto-Contract',
    'content.archive': 'Archive:',
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account preferences, security, and notifications',
    'settings.language.title': 'Language & Region (Global Support)',
    'settings.language.label': 'System Language',
    'settings.language.desc': 'The system uses AI to translate and adapt content for all languages professionally.',
    'settings.storage.title': 'Cloud Storage & Annual Organization',
    'settings.storage.yearLabel': 'Current Academic Year',
    'settings.storage.statusLabel': 'Storage Status (Unlimited Space)',
    'settings.storage.statusDesc': 'Used space: 15TB / Unlimited capacity (Supports over 30 million concurrent active users)',
    'settings.storage.autoArchive': 'Smart Annual Organization & Archiving',
    'settings.storage.autoArchiveDesc': 'AI automatically sorts and archives all data and content by academic year to ensure fast access.',
    'settings.save': 'Save Changes',
  },
  fr: {
    'content.title': 'Contenu Académique et Bibliothèque',
    'content.subtitle': 'Gérer les livres, conférences et notes avec documentation automatisée',
    'content.uploadBtn': 'Nouveau Livre',
    'content.searchPlaceholder': 'Rechercher par titre ou auteur...',
    'content.allSpecialties': 'Toutes Spécialités',
    'content.allTypes': 'Tous Types',
    'content.allYears': 'Toutes Années',
    'content.contract.all': 'Statut du Contrat (Tous)',
    'content.contract.autoAll': 'Contrat Auto (Tous)',
    'content.contract.books': 'Livres Uniquement',
    'content.contract.lectures': 'Conférences Uniquement',
    'content.contract.notes': 'Notes Uniquement',
    'content.contract.none': 'Sans Contrat',
    'content.aiAssistant': 'Assistant IA',
    'content.sort.newest': 'Plus Récent',
    'content.sort.rating': 'Mieux Noté',
    'content.sort.popularity': 'Plus Populaire',
    'content.sort.oldest': 'Plus Ancien',
    'content.noResults': 'Aucun contenu ne correspond à vos critères.',
    'content.recommended': 'Recommandations Intelligentes',
    'content.recommended.subtitle': 'Basé sur votre spécialité (Physique) et vos intérêts',
    'content.badge.autoContract': 'Contrat Auto',
    'content.badge.noContract': 'Sans Contrat',
    'content.archive': 'Archive:',
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Gérez vos préférences de compte, sécurité et notifications',
    'settings.language.title': 'Langue et Région (Support Global)',
    'settings.language.label': 'Langue du Système',
    'settings.language.desc': 'Le système utilise l\'IA pour traduire et adapter le contenu pour toutes les langues.',
    'settings.storage.title': 'Stockage Cloud et Organisation Annuelle',
    'settings.storage.yearLabel': 'Année Académique Actuelle',
    'settings.storage.statusLabel': 'Statut du Stockage (Espace Illimité)',
    'settings.storage.statusDesc': 'Espace utilisé: 15TB / Capacité illimitée (Prend en charge plus de 30 millions d\'utilisateurs actifs simultanés)',
    'settings.storage.autoArchive': 'Organisation et Archivage Annuel Intelligent',
    'settings.storage.autoArchiveDesc': 'L\'IA trie et archive automatiquement toutes les données et le contenu par année académique pour garantir un accès rapide.',
    'settings.save': 'Enregistrer',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['ar'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
