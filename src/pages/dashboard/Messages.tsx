import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Paperclip, Image as ImageIcon, FileText, Search, Shield, MoreVertical } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const contacts = [
  { id: 1, name: 'أحمد محمود', role: 'أستاذ - فيزياء', status: 'online', unread: 2 },
  { id: 2, name: 'سارة خالد', role: 'طالبة - ماستر', status: 'offline', unread: 0 },
  { id: 3, name: 'دعم السوبر أدمن', role: 'إدارة', status: 'online', unread: 0, isSupport: true },
];

const initialMessages = [
  { id: 1, senderId: 1, text: 'السلام عليكم، هل يمكنك مراجعة الملف المرفق؟', time: '10:30', isMe: false },
  { id: 2, senderId: 'me', text: 'وعليكم السلام، بالتأكيد سأقوم بمراجعته فوراً.', time: '10:32', isMe: true },
  { id: 3, senderId: 1, text: 'lecture_notes_v2.pdf', time: '10:33', isMe: false, isFile: true, fileType: 'pdf' },
];

export default function Messages() {
  const { showToast } = useToast();
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, {
      id: Date.now(),
      senderId: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setNewMessage('');
  };

  const handleFileUpload = () => {
    showToast('تم تشفير الملف وإرساله بأمان', 'success');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 font-sans">
      
      {/* Contacts List */}
      <div className="w-80 card-3d rounded-3xl transform-3d flex flex-col overflow-hidden hidden md:flex">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-primary mb-4">الرسائل الخاصة</h2>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="block w-full pr-10 pl-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-secondary focus:border-secondary bg-slate-50"
              placeholder="بحث في المحادثات..."
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-colors text-right ${
                activeContact.id === contact.id ? 'bg-primary/5 border border-primary/10' : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  contact.isSupport ? 'bg-red-600' : 'bg-primary'
                }`}>
                  {contact.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  contact.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'
                }`} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-800 truncate">{contact.name}</h3>
                  {contact.unread > 0 && (
                    <span className="bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                  {contact.isSupport && <Shield size={12} className="text-red-500" />}
                  {contact.role}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 card-3d rounded-3xl transform-3d flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="h-20 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              activeContact.isSupport ? 'bg-red-600' : 'bg-primary'
            }`}>
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {activeContact.name}
                {activeContact.isSupport && <Shield size={16} className="text-red-500" title="دعم السوبر أدمن" />}
              </h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Lock size={12} />
                محادثة مشفرة (E2EE)
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50/30">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${
                msg.isMe 
                  ? 'bg-primary text-white rounded-tl-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tr-none'
              }`}>
                {msg.isFile ? (
                  <div className="flex items-center gap-3 bg-black/10 p-3 rounded-xl">
                    <FileText size={24} className={msg.isMe ? 'text-white' : 'text-primary'} />
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{msg.text}</p>
                      <p className="text-xs opacity-70">2.4 MB</p>
                    </div>
                  </div>
                ) : (
                  <p className="leading-relaxed">{msg.text}</p>
                )}
                <div className={`text-[10px] mt-2 text-left ${msg.isMe ? 'text-white/70' : 'text-slate-400'}`}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="flex gap-1 pb-2">
              <button type="button" onClick={handleFileUpload} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-colors">
                <Paperclip size={20} />
              </button>
              <button type="button" onClick={handleFileUpload} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-colors">
                <ImageIcon size={20} />
              </button>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا... (محادثة مشفرة وسرية)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-secondary focus:border-secondary resize-none min-h-[50px] max-h-[120px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-secondary hover:bg-secondary-dark disabled:opacity-50 disabled:hover:bg-secondary text-white p-3.5 rounded-full transition-colors btn-3d mb-1"
            >
              <Send size={20} className="rtl:-scale-x-100" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
