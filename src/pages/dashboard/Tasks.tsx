import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Plus, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export default function Tasks() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'مراجعة عقود الأساتذة الجدد', description: 'يجب مراجعة وتوثيق 15 عقداً جديداً', status: 'pending', dueDate: '2026-03-01', priority: 'high' },
    { id: 2, title: 'تحديث خوادم المنصة', description: 'تحديث نظام التشغيل وتطبيق الترقيعات الأمنية', status: 'in_progress', dueDate: '2026-02-28', priority: 'high' },
    { id: 3, title: 'إعداد التقرير المالي الشهري', description: 'تجميع بيانات الاشتراكات والمبيعات', status: 'completed', dueDate: '2026-02-25', priority: 'medium' },
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'medium' as 'low' | 'medium' | 'high' });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) {
      showToast('يرجى إدخال عنوان المهمة وتاريخ الاستحقاق', 'error');
      return;
    }
    
    setTasks([
      {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'pending',
        dueDate: newTask.dueDate,
        priority: newTask.priority
      },
      ...tasks
    ]);
    setNewTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    showToast('تمت إضافة المهمة بنجاح', 'success');
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        if (newStatus === 'completed') showToast('تم إنجاز المهمة', 'success');
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">إدارة المهام</h2>
          <p className="text-slate-500 text-sm mt-1">متابعة المهام الإدارية وتواريخ الاستحقاق</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Task Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-3d p-6 rounded-2xl lg:col-span-1 h-fit"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={20} className="text-secondary" />
            مهمة جديدة
          </h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">عنوان المهمة</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                placeholder="أدخل عنوان المهمة"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الوصف</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50 resize-none"
                rows={3}
                placeholder="تفاصيل المهمة..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">تاريخ الاستحقاق (Due Date)</label>
              <div className="relative">
                <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الأولوية</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
              >
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">عالية</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-bold transition-all btn-3d"
            >
              إضافة المهمة
            </button>
          </form>
        </motion.div>

        {/* Tasks List */}
        <div className="lg:col-span-2 space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-3d p-5 rounded-2xl flex items-start gap-4 transition-all ${task.status === 'completed' ? 'opacity-70 bg-slate-50' : 'bg-white'}`}
            >
              <button 
                onClick={() => toggleTaskStatus(task.id)}
                className={`mt-1 flex-shrink-0 transition-colors ${task.status === 'completed' ? 'text-emerald-500' : 'text-slate-300 hover:text-secondary'}`}
              >
                <CheckCircle2 size={24} />
              </button>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold text-lg ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {task.title}
                  </h4>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-600' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className={`flex items-center gap-1.5 ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                    <Calendar size={14} />
                    تاريخ الاستحقاق: {task.dueDate}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={14} />
                    الحالة: {task.status === 'completed' ? 'مكتملة' : task.status === 'in_progress' ? 'قيد التنفيذ' : 'قيد الانتظار'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">لا توجد مهام حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
