import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Shield, Key, Camera, Award, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function Profile() {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'محمد',
    lastName: 'ملوك',
    email: 'm.mellouk@elite-univ.dz',
    phone: '+213 555 123 456',
    address: 'جامعة تيسمسيلت، الجزائر',
    bio: 'أستاذ باحث في مجال الذكاء الاصطناعي والأنظمة الموزعة. مهتم بتطوير حلول تكنولوجية مبتكرة لقطاع التعليم العالي.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('تم تحديث الملف الشخصي بنجاح', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">الملف الشخصي</h1>
          <p className="text-slate-500 mt-2">إدارة معلوماتك الشخصية والأكاديمية</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            isEditing 
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
              : 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
          }`}
        >
          {isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-secondary opacity-10"></div>
            
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                M
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-primary hover:text-secondary transition-colors">
                  <Camera size={20} />
                </button>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">{formData.firstName} {formData.lastName}</h2>
            <p className="text-primary font-medium mb-6">سوبر أدمن / أستاذ باحث</p>

            <div className="flex justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Award size={24} />
                </div>
                <span className="text-xs font-bold text-slate-500">موثق</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <BookOpen size={24} />
                </div>
                <span className="text-xs font-bold text-slate-500">12 بحث</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Clock size={24} />
                </div>
                <span className="text-xs font-bold text-slate-500">نشط</span>
              </div>
            </div>

            <div className="space-y-4 text-right">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm" dir="ltr">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm" dir="ltr">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <span className="text-sm">{formData.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Security Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="text-emerald-500" size={20} />
              حالة الأمان
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm font-bold text-emerald-700">المصادقة الثنائية (2FA)</span>
                </div>
                <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-2 py-1 rounded-md">مفعل</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Key className="text-slate-400" size={20} />
                  <span className="text-sm font-bold text-slate-600">آخر تغيير لكلمة المرور</span>
                </div>
                <span className="text-xs text-slate-500">منذ 3 أشهر</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">المعلومات الأساسية</h2>
              <p className="text-sm text-slate-500 mt-1">تحديث بياناتك الشخصية ومعلومات الاتصال</p>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">الاسم الأول</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">اللقب</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">البريد الإلكتروني المهني</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500 transition-all text-left"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">رقم الهاتف</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500 transition-all text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">العنوان الأكاديمي</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">النبذة التعريفية (Bio)</label>
                <textarea
                  disabled={!isEditing}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500 transition-all resize-none"
                />
              </div>

              {isEditing && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-6 flex justify-end gap-4"
                >
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all"
                  >
                    حفظ التغييرات
                  </button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
