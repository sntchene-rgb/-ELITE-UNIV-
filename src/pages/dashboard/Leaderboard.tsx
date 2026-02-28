import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, GraduationCap, User } from 'lucide-react';

const topStudents = [
  { rank: 1, name: 'سارة خالد', score: 9850, specialty: 'ماستر - فيزياء', avatar: 'س' },
  { rank: 2, name: 'محمد الأمين', score: 9200, specialty: 'ليسانس - رياضيات', avatar: 'م' },
  { rank: 3, name: 'فاطمة الزهراء', score: 8900, specialty: 'ماستر - أدب عربي', avatar: 'ف' },
];

const topProfessors = [
  { rank: 1, name: 'د. أحمد محمود', score: 15400, specialty: 'فيزياء الكم', avatar: 'أ' },
  { rank: 2, name: 'د. عبد الله صالح', score: 14200, specialty: 'شريعة إسلامية', avatar: 'ع' },
  { rank: 3, name: 'د. سمير أمين', score: 13800, specialty: 'فلسفة', avatar: 'س' },
];

const RankCard = ({ person, type }: { person: any, type: 'student' | 'professor' }) => {
  const isFirst = person.rank === 1;
  const isSecond = person.rank === 2;
  const isThird = person.rank === 3;

  let colors = '';
  let icon = null;

  if (isFirst) {
    colors = 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-300 text-yellow-800';
    icon = <Trophy size={32} className="text-yellow-500" />;
  } else if (isSecond) {
    colors = 'bg-gradient-to-br from-slate-200 to-slate-100 border-slate-300 text-slate-800';
    icon = <Medal size={32} className="text-slate-500" />;
  } else {
    colors = 'bg-gradient-to-br from-orange-200 to-orange-100 border-orange-300 text-orange-800';
    icon = <Medal size={32} className="text-orange-600" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: person.rank * 0.1 }}
      className={`card-3d p-6 rounded-3xl transform-3d flex flex-col items-center text-center relative overflow-hidden ${isFirst ? 'scale-105 z-10 shadow-2xl' : ''}`}
    >
      <div className={`absolute top-0 left-0 w-full h-2 ${isFirst ? 'bg-yellow-400' : isSecond ? 'bg-slate-400' : 'bg-orange-400'}`} />
      
      <div className="mb-4 relative">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black shadow-inner ${colors}`}>
          {person.avatar}
        </div>
        <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1 shadow-md">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary mb-1">{person.name}</h3>
      <p className="text-sm text-slate-500 mb-4">{person.specialty}</p>
      
      <div className="bg-slate-50 w-full py-3 rounded-xl border border-slate-100 flex justify-center items-center gap-2">
        <Star size={18} className={isFirst ? 'text-yellow-500' : 'text-slate-400'} />
        <span className="font-black text-lg text-primary">{person.score}</span>
        <span className="text-xs text-slate-500">نقطة</span>
      </div>

      {isFirst && type === 'student' && (
        <div className="mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-full">
          مستفيد من تخفيض 10% إضافي
        </div>
      )}
    </motion.div>
  );
};

export default function Leaderboard() {
  return (
    <div className="space-y-12 font-sans perspective-1000">
      <div className="text-center transform-3d">
        <h2 className="text-3xl font-black text-primary mb-2">لوحة الشرف والتنافس</h2>
        <p className="text-slate-500">تصنيف أفضل الطلبة والأساتذة بناءً على التفاعل، التقييمات، والمساهمات الأكاديمية</p>
      </div>

      {/* Students Section */}
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
          <div className="bg-primary text-white p-2 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <h3 className="text-2xl font-bold text-primary">فرسان النخبة (الطلبة)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="order-2 md:order-1"><RankCard person={topStudents[1]} type="student" /></div>
          <div className="order-1 md:order-2"><RankCard person={topStudents[0]} type="student" /></div>
          <div className="order-3 md:order-3"><RankCard person={topStudents[2]} type="student" /></div>
        </div>
      </section>

      {/* Professors Section */}
      <section>
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
          <div className="bg-secondary text-white p-2 rounded-xl">
            <User size={24} />
          </div>
          <h3 className="text-2xl font-bold text-primary">صناع المعرفة (الأساتذة)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="order-2 md:order-1"><RankCard person={topProfessors[1]} type="professor" /></div>
          <div className="order-1 md:order-2"><RankCard person={topProfessors[0]} type="professor" /></div>
          <div className="order-3 md:order-3"><RankCard person={topProfessors[2]} type="professor" /></div>
        </div>
      </section>
    </div>
  );
}
