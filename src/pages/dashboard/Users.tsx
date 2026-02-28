import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Trash2, Edit, Search, UserPlus, Shield, ChevronDown, Filter, Save, X, AlertTriangle } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const initialUsers = [
  { id: 1, name: 'أحمد محمود', email: 'ahmed@elite.edu.dz', role: 'أستاذ', status: 'نشط' },
  { id: 2, name: 'سارة خالد', email: 'sara@elite.edu.dz', role: 'طالب', status: 'نشط' },
  { id: 3, name: 'محمد علي', email: 'mohamed@elite.edu.dz', role: 'منسق', status: 'غير نشط' },
  { id: 4, name: 'فاطمة الزهراء', email: 'fatima@elite.edu.dz', role: 'طالب', status: 'نشط' },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const { showToast } = useToast();

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '' });
  const [userToDelete, setUserToDelete] = useState<{ id: number, name: string } | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('الكل');
  const [filterStatus, setFilterStatus] = useState('الكل');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.includes(searchQuery) || user.email.includes(searchQuery);
      const matchesRole = filterRole === 'الكل' || user.role === filterRole;
      const matchesStatus = filterStatus === 'الكل' || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterStatus]);

  const handleDeleteClick = (id: number, name: string) => {
    setUserToDelete({ id, name });
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      showToast(`تم حذف المستخدم "${userToDelete.name}" بنجاح`, 'success');
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const handleStatusChange = (id: number, newStatus: string, name: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    showToast(`تم تغيير حالة المستخدم "${name}" إلى ${newStatus}`, 'success');
  };

  const handleEditClick = (user: typeof initialUsers[0]) => {
    setEditingUserId(user.id);
    setEditFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveEdit = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...editFormData } : u));
    setEditingUserId(null);
    showToast(`تم تحديث بيانات المستخدم "${editFormData.name}" بنجاح`, 'success');
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">إدارة المستخدمين</h2>
          <p className="text-slate-500 text-sm mt-1">إدارة حسابات الطلاب، الأساتذة، والمنسقين</p>
        </div>
        <button 
          onClick={() => showToast('تم فتح نافذة إضافة مستخدم جديد', 'info')}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 btn-3d"
        >
          <UserPlus size={18} />
          إضافة مستخدم
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: -5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5 }}
        className="card-3d rounded-2xl overflow-hidden transform-3d perspective-1000"
      >
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 pl-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
              placeholder="البحث عن مستخدم (الاسم أو البريد)..."
            />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter size={18} className="text-slate-400 shrink-0" />
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
              >
                <option value="الكل">كل الأدوار</option>
                <option value="أستاذ">أستاذ</option>
                <option value="طالب">طالب</option>
                <option value="منسق">منسق</option>
              </select>
            </div>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
            >
              <option value="الكل">كل الحالات</option>
              <option value="نشط">نشط</option>
              <option value="غير نشط">غير نشط</option>
              <option value="موقوف">موقوف</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الاسم</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الدور</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الحالة</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                editingUserId === user.id ? (
                  <tr key={user.id} className="bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                        className="w-full px-3 py-1.5 border border-blue-200 rounded-lg text-sm focus:ring-secondary focus:border-secondary bg-white"
                      />
                    </td>
                    <td className="px-6 py-4" dir="ltr">
                      <input 
                        type="email" 
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                        className="w-full px-3 py-1.5 border border-blue-200 rounded-lg text-sm focus:ring-secondary focus:border-secondary bg-white text-left"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editFormData.role}
                        onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                        className="w-full px-3 py-1.5 border border-blue-200 rounded-lg text-sm focus:ring-secondary focus:border-secondary bg-white"
                      >
                        <option value="أستاذ">أستاذ</option>
                        <option value="طالب">طالب</option>
                        <option value="منسق">منسق</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block text-right opacity-50 pointer-events-none">
                        <select
                          value={user.status}
                          readOnly
                          className={`appearance-none inline-flex items-center gap-1.5 pl-8 pr-3 py-1 rounded-full text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors ${
                            user.status === 'نشط' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                            user.status === 'موقوف' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <option value="نشط">نشط</option>
                          <option value="غير نشط">غير نشط</option>
                          <option value="موقوف">موقوف</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                          <ChevronDown size={14} className={
                            user.status === 'نشط' ? 'text-emerald-500' : 
                            user.status === 'موقوف' ? 'text-red-500' :
                            'text-slate-400'
                          } />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSaveEdit(user.id)}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 hover:bg-emerald-100 p-1.5 rounded-md"
                          title="حفظ"
                        >
                          <Save size={18} />
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-1.5 rounded-md"
                          title="إلغاء"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500" dir="ltr">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        <Shield size={14} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block text-right">
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value, user.name)}
                          className={`appearance-none inline-flex items-center gap-1.5 pl-8 pr-3 py-1 rounded-full text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-colors ${
                            user.status === 'نشط' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                            user.status === 'موقوف' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <option value="نشط">نشط</option>
                          <option value="غير نشط">غير نشط</option>
                          <option value="موقوف">موقوف</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                          <ChevronDown size={14} className={
                            user.status === 'نشط' ? 'text-emerald-500' : 
                            user.status === 'موقوف' ? 'text-red-500' :
                            'text-slate-400'
                          } />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="تعديل"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user.id, user.name)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              لا يوجد مستخدمين يطابقون معايير البحث والفلترة.
            </div>
          )}
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">تأكيد الحذف</h3>
              <p className="text-slate-600 mb-6">
                هل أنت متأكد من أنك تريد حذف المستخدم <span className="font-bold text-slate-800">"{userToDelete.name}"</span>؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
                >
                  حذف المستخدم
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
