/**
 * Advanced Permanent Storage System (Simulated via IndexedDB / LocalStorage)
 * This service provides a robust, asynchronous API for data persistence,
 * preparing the application for offline capabilities and synchronization
 * with a remote cloud database.
 */

const DB_NAME = 'EliteUniv_PermanentStorage';
const LOGS_STORE = 'activity_logs';

export interface ActivityLogEntry {
  id: string | number;
  type: string;
  user: string;
  action: string;
  time: string;
  timestamp: number;
  iconName: string;
  color: string;
  bg: string;
}

class StorageService {
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    // In a real-world scenario, this would initialize IndexedDB or a local SQLite instance (for mobile apps).
    // For this environment, we use a robust LocalStorage wrapper with async simulation.
    if (!localStorage.getItem(LOGS_STORE)) {
      const initialLogs: ActivityLogEntry[] = [
        { id: 1, type: 'security', user: 'النظام الآلي', action: 'صد هجوم سيبراني (DDoS) من IP خارجي', time: 'منذ 5 دقائق', timestamp: Date.now() - 300000, iconName: 'ShieldAlert', color: 'text-red-500', bg: 'bg-red-50' },
        { id: 2, type: 'contract', user: 'د. أحمد محمود', action: 'توقيع عقد نشر كتاب "فيزياء الكم"', time: 'منذ 15 دقيقة', timestamp: Date.now() - 900000, iconName: 'FileText', color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 3, type: 'user', user: 'سارة خالد', action: 'تسجيل دخول جديد (ولاية وهران)', time: 'منذ 32 دقيقة', timestamp: Date.now() - 1920000, iconName: 'User', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 4, type: 'content', user: 'د. عبد الله صالح', action: 'رفع محاضرة جديدة (أصول الفقه)', time: 'منذ ساعة', timestamp: Date.now() - 3600000, iconName: 'BookOpen', color: 'text-purple-500', bg: 'bg-purple-50' },
        { id: 5, type: 'system', user: 'المنسق (الجزائر)', action: 'تفعيل 15 اشتراك جديد للطلبة', time: 'منذ ساعتين', timestamp: Date.now() - 7200000, iconName: 'Activity', color: 'text-secondary', bg: 'bg-secondary/10' },
      ];
      localStorage.setItem(LOGS_STORE, JSON.stringify(initialLogs));
    }
    this.isInitialized = true;
  }

  async getLogs(): Promise<ActivityLogEntry[]> {
    await this.init();
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(LOGS_STORE);
        resolve(data ? JSON.parse(data) : []);
      }, 300); // Simulate network/DB latency
    });
  }

  async addLog(log: Omit<ActivityLogEntry, 'id' | 'timestamp'>): Promise<ActivityLogEntry> {
    await this.init();
    return new Promise((resolve) => {
      setTimeout(() => {
        const logs = JSON.parse(localStorage.getItem(LOGS_STORE) || '[]');
        const newLog: ActivityLogEntry = {
          ...log,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };
        logs.unshift(newLog); // Add to beginning
        localStorage.setItem(LOGS_STORE, JSON.stringify(logs));
        resolve(newLog);
      }, 200);
    });
  }
}

export const storageService = new StorageService();
