import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ticket, Search, Filter, MessageSquare, AlertCircle, CheckCircle2, Clock, Send, Eye } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

interface SupportTicket {
  id: string;
  user: string;
  role: string;
  subject: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  messages: { sender: string; text: string; time: string; isStaff: boolean }[];
  isReviewed?: boolean;
}

export default function Support() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'closed'>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-2026-001',
      user: 'أحمد محمود',
      role: 'أستاذ',
      subject: 'مشكلة في رفع المحاضرات',
      status: 'open',
      priority: 'high',
      date: '2026-02-25',
      messages: [
        { sender: 'أحمد محمود', text: 'السلام عليكم، أواجه مشكلة في رفع ملف PDF الخاص بالمحاضرة الثالثة. يظهر لي خطأ في الخادم.', time: '09:00', isStaff: false }
      ]
    },
    {
      id: 'TCK-2026-002',
      user: 'سارة خالد',
      role: 'طالبة',
      subject: 'استفسار حول الاشتراك',
      status: 'in_progress',
      priority: 'medium',
      date: '2026-02-24',
      messages: [
        { sender: 'سارة خالد', text: 'متى يتم تفعيل اشتراكي بعد الدفع؟', time: '14:30', isStaff: false },
        { sender: 'الدعم الفني', text: 'مرحباً سارة، يتم التفعيل تلقائياً خلال 24 ساعة كحد أقصى.', time: '15:00', isStaff: true }
      ]
    },
    {
      id: 'TCK-2026-003',
      user: 'محمد علي',
      role: 'منسق',
      subject: 'طلب تقرير مالي',
      status: 'closed',
      priority: 'low',
      date: '2026-02-20',
      messages: [
        { sender: 'محمد علي', text: 'أحتاج إلى التقرير المالي الخاص بالمنطقة الغربية لشهر جانفي.', time: '10:00', isStaff: false },
        { sender: 'الدعم الفني', text: 'تم إرسال التقرير إلى بريدك الإلكتروني المؤسسي.', time: '11:30', isStaff: true }
      ]
    }
  ]);

  const filteredTickets = tickets.filter(t => activeTab === 'all' || t.status === activeTab);

  const handleMarkReviewed = (id: string) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        const updatedTicket = { ...t, isReviewed: true };
        if (selectedTicket?.id === id) {
          setSelectedTicket(updatedTicket);
        }
        return updatedTicket;
      }
      return t;
    }));
    showToast('تم تحديد التذكرة كمقروءة ومراجعتها', 'success');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const updatedTicket = {
          ...t,
          status: 'in_progress' as const,
          messages: [
            ...t.messages,
            { sender: 'الدعم الفني', text: replyText, time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }), isStaff: true }
          ]
        };
        setSelectedTicket(updatedTicket);
        return updatedTicket;
      }
      return t;
    });

    setTickets(updatedTickets);
    setReplyText('');
    showToast('تم إرسال الرد بنجاح', 'success');
  };

  const handleActivateTicket = (id: string) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        showToast('تم تفعيل التذكرة وإعادة فتحها', 'success');
        const updated = { ...t, status: 'open' as const };
        if (selectedTicket?.id === id) setSelectedTicket(updated);
        return updated;
      }
      return t;
    }));
  };

  const handleCloseTicket = (id: string) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        showToast('تم إغلاق التذكرة', 'info');
        const updated = { ...t, status: 'closed' as const };
        if (selectedTicket?.id === id) setSelectedTicket(updated);
        return updated;
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">الدعم الفني والتذاكر</h2>
          <p className="text-slate-500 text-sm mt-1">إدارة تذاكر الدعم الفني والتواصل مع المستخدمين</p>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-12rem)]">
        {/* Tickets List */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'all' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              الكل
            </button>
            <button 
              onClick={() => setActiveTab('open')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'open' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              مفتوحة
            </button>
            <button 
              onClick={() => setActiveTab('closed')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'closed' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              مغلقة
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 rounded-[1.25rem] cursor-pointer transition-all border-2 ${
                  selectedTicket?.id === ticket.id 
                    ? 'border-secondary bg-gradient-to-br from-secondary/5 to-secondary/10 shadow-md' 
                    : 'border-transparent bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                    {ticket.isReviewed && (
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye size={10} /> تمت المراجعة
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ticket.status === 'open' ? 'bg-emerald-100 text-emerald-600' :
                    ticket.status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {ticket.status === 'open' ? 'مفتوحة' : ticket.status === 'in_progress' ? 'قيد المعالجة' : 'مغلقة'}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 mb-1 truncate">{ticket.subject}</h4>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Ticket size={12} /> {ticket.user}</span>
                  <span>{ticket.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="w-2/3 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          {selectedTicket ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedTicket.subject}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Ticket size={16} className="text-primary" /> {selectedTicket.user} ({selectedTicket.role})</span>
                    <span className="flex items-center gap-1"><Clock size={16} className="text-secondary" /> {selectedTicket.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedTicket && !selectedTicket.isReviewed && (
                    <button 
                      onClick={() => handleMarkReviewed(selectedTicket.id)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                    >
                      <Eye size={16} />
                      تحديد كمقروءة
                    </button>
                  )}
                  {selectedTicket.status === 'closed' ? (
                    <button 
                      onClick={() => handleActivateTicket(selectedTicket.id)}
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      تفعيل التذكرة
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleCloseTicket(selectedTicket.id)}
                      className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                    >
                      <AlertCircle size={16} />
                      إغلاق التذكرة
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                {selectedTicket.messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.isStaff ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      msg.isStaff 
                        ? 'bg-primary text-white rounded-tl-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tr-none'
                    }`}>
                      <div className="flex justify-between items-center mb-2 gap-4">
                        <span className="font-bold text-sm">{msg.sender}</span>
                        <span className={`text-xs ${msg.isStaff ? 'text-primary-100' : 'text-slate-400'}`}>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              {selectedTicket.status !== 'closed' && (
                <div className="p-4 border-t border-slate-100 bg-white">
                  <form onSubmit={handleReply} className="flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="اكتب ردك هنا..."
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-secondary focus:border-secondary bg-slate-50"
                    />
                    <button 
                      type="submit"
                      disabled={!replyText.trim()}
                      className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      <Send size={18} />
                      إرسال
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <MessageSquare size={64} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">اختر تذكرة لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
