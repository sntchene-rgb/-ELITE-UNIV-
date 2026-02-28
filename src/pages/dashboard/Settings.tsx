import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Shield, Bell, Globe, Lock, Database, Languages } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Settings() {
  const { showToast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const [isSaving, setIsSaving] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [twoFAMethod, setTwoFAMethod] = useState<'sms' | 'app'>('app');
  const [autoArchive, setAutoArchive] = useState(true);
  const [academicYear, setAcademicYear] = useState('2025-2026');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showToast('تم حفظ الإعدادات بنجاح', 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-primary">{t('settings.title')}</h2>
        <p className="text-slate-500 text-sm mt-1">{t('settings.subtitle')}</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5 }}
        className="card-3d rounded-2xl overflow-hidden transform-3d perspective-1000"
      >
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-8">
            
            {/* General Settings */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Globe size={20} />
                <h3 className="text-lg font-bold">الإعدادات العامة</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">اسم المنصة</label>
                  <input 
                    type="text" 
                    defaultValue="ELITE UNIV"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">البريد الإلكتروني للدعم</label>
                  <input 
                    type="email" 
                    defaultValue="support@elite.edu.dz"
                    dir="ltr"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                  />
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Language Settings */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Languages size={20} />
                <h3 className="text-lg font-bold">{t('settings.language.title')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('settings.language.label')}</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                  >
                    <option value="ar">العربية (Arabic)</option>
                    <option value="en">English (الإنجليزية)</option>
                    <option value="fr">Français (الفرنسية)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">{t('settings.language.desc')}</p>
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Storage & Archiving */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Database size={20} />
                <h3 className="text-lg font-bold">{t('settings.storage.title')}</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('settings.storage.yearLabel')}</label>
                    <select 
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                    >
                      <option value="2025-2026">2025 - 2026</option>
                      <option value="2024-2025">2024 - 2025</option>
                      <option value="2023-2024">2023 - 2024</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('settings.storage.statusLabel')}</label>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
                      <div className="bg-secondary h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{t('settings.storage.statusDesc')}</p>
                  </div>
                </div>
                
                <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={autoArchive}
                    onChange={(e) => setAutoArchive(e.target.checked)}
                    className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary" 
                  />
                  <div>
                    <div className="font-medium text-slate-800">{t('settings.storage.autoArchive')}</div>
                    <div className="text-sm text-slate-500">{t('settings.storage.autoArchiveDesc')}</div>
                  </div>
                </label>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Security Settings */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Shield size={20} />
                <h3 className="text-lg font-bold">الأمان والخصوصية</h3>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary" />
                  <div>
                    <div className="font-medium text-slate-800">تفعيل التشفير العسكري (AES-256)</div>
                    <div className="text-sm text-slate-500">تشفير جميع بيانات المستخدمين والمحتوى الأكاديمي</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary" />
                  <div>
                    <div className="font-medium text-slate-800">الأرشفة السيادية الدائمة</div>
                    <div className="text-sm text-slate-500">منع الحذف النهائي للبيانات لضمان الذاكرة المؤسساتية</div>
                  </div>
                </label>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Two-Factor Authentication (2FA) */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Lock size={20} />
                <h3 className="text-lg font-bold">المصادقة الثنائية (2FA)</h3>
              </div>
              <div className="space-y-6">
                <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={is2FAEnabled}
                    onChange={(e) => setIs2FAEnabled(e.target.checked)}
                    className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary" 
                  />
                  <div>
                    <div className="font-medium text-slate-800">تفعيل المصادقة الثنائية</div>
                    <div className="text-sm text-slate-500">إضافة طبقة حماية إضافية لحسابك عند تسجيل الدخول</div>
                  </div>
                </label>

                {is2FAEnabled && (
                  <div className="pl-8 space-y-6 border-r-2 border-slate-100 pr-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">طريقة المصادقة</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="2fa-method" 
                            value="sms" 
                            checked={twoFAMethod === 'sms'}
                            onChange={(e) => setTwoFAMethod(e.target.value as 'sms' | 'app')}
                            className="text-secondary focus:ring-secondary" 
                          />
                          <span className="text-sm text-slate-700">رسالة نصية (SMS)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="2fa-method" 
                            value="app" 
                            checked={twoFAMethod === 'app'}
                            onChange={(e) => setTwoFAMethod(e.target.value as 'sms' | 'app')}
                            className="text-secondary focus:ring-secondary" 
                          />
                          <span className="text-sm text-slate-700">تطبيق مصادقة (Authenticator)</span>
                        </label>
                      </div>
                    </div>

                    {twoFAMethod === 'sms' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-slate-700 mb-2">رقم الهاتف</label>
                        <div className="flex gap-2">
                          <input 
                            type="tel" 
                            placeholder="+213 555 000 000"
                            dir="ltr"
                            className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50 text-left"
                          />
                          <button type="button" className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            إرسال الرمز
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">سيتم إرسال رمز تحقق إلى هذا الرقم لتأكيده.</p>
                      </div>
                    )}

                    {twoFAMethod === 'app' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p className="text-sm text-slate-700 mb-4">
                          قم بمسح رمز الاستجابة السريعة (QR Code) باستخدام تطبيق مصادقة مثل Google Authenticator أو Authy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                          <div className="w-32 h-32 bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
                            {/* Placeholder for QR Code */}
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs text-center p-2">
                              QR Code Placeholder
                            </div>
                          </div>
                          <div className="space-y-3 flex-1 w-full">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">أو أدخل هذا الرمز يدوياً:</label>
                              <div className="bg-white px-3 py-2 rounded border border-slate-200 font-mono text-sm text-slate-800 tracking-wider text-center sm:text-left" dir="ltr">
                                ABCD EFGH IJKL MNOP
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">رمز التحقق من التطبيق:</label>
                              <input 
                                type="text" 
                                placeholder="000000"
                                maxLength={6}
                                dir="ltr"
                                className="w-full max-w-[150px] px-3 py-2 border border-slate-200 rounded-lg focus:ring-secondary focus:border-secondary text-center tracking-widest font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Notifications */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Bell size={20} />
                <h3 className="text-lg font-bold">الإشعارات</h3>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-secondary rounded border-slate-300 focus:ring-secondary" />
                  <div>
                    <div className="font-medium text-slate-800">إشعارات التسجيلات الجديدة</div>
                    <div className="text-sm text-slate-500">تلقي تنبيه عند تسجيل مستخدم جديد في المنصة</div>
                  </div>
                </label>
              </div>
            </section>

          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 btn-3d disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? 'جاري الحفظ...' : t('settings.save')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
