'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'price_alert' | 'transaction';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = 'coinbase_notifications';

function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    }
  }, [notifications, isLoaded]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  // Expose notification helpers to window for console testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as Window & typeof globalThis & { notify: unknown }).notify = {
        // Add a notification
        add: (type: NotificationType, title: string, message: string) => {
          const newNotification: Notification = {
            type,
            title,
            message,
            id: generateId(),
            timestamp: new Date().toISOString(),
            read: false,
          };
          setNotifications((prev) => [newNotification, ...prev]);
          console.log('✅ Notification added:', newNotification);
        },
        // Quick helpers
        info: (title: string, message: string) => {
          (window as Window & typeof globalThis & { notify: { add: (type: NotificationType, title: string, message: string) => void } }).notify.add('info', title, message);
        },
        success: (title: string, message: string) => {
          (window as Window & typeof globalThis & { notify: { add: (type: NotificationType, title: string, message: string) => void } }).notify.add('success', title, message);
        },
        warning: (title: string, message: string) => {
          (window as Window & typeof globalThis & { notify: { add: (type: NotificationType, title: string, message: string) => void } }).notify.add('warning', title, message);
        },
        error: (title: string, message: string) => {
          (window as Window & typeof globalThis & { notify: { add: (type: NotificationType, title: string, message: string) => void } }).notify.add('error', title, message);
        },
        priceAlert: (title: string, message: string) => {
          (window as Window & typeof globalThis & { notify: { add: (type: NotificationType, title: string, message: string) => void } }).notify.add('price_alert', title, message);
        },
        transaction: (title: string, message: string) => {
          (window as Window & typeof globalThis & { notify: { add: (type: NotificationType, title: string, message: string) => void } }).notify.add('transaction', title, message);
        },
        // Clear all
        clear: () => {
          setNotifications([]);
          console.log('🗑️ All notifications cleared');
        },
        // Show help
        help: () => {
          console.log(`
📬 Notification Console Helper
==============================
notify.add(type, title, message) - Add notification (type: 'info'|'success'|'warning'|'error'|'price_alert'|'transaction')
notify.info(title, message)      - Add info notification
notify.success(title, message)   - Add success notification
notify.warning(title, message)   - Add warning notification
notify.error(title, message)     - Add error notification
notify.priceAlert(title, message)- Add price alert notification
notify.transaction(title, message)- Add transaction notification
notify.clear()                   - Clear all notifications
notify.help()                    - Show this help

Examples:
  notify.info('Welcome!', 'Thanks for using Coinbase')
  notify.success('Purchase Complete', 'You bought 0.5 BTC')
  notify.priceAlert('BTC Price Alert', 'Bitcoin just hit $100,000!')
          `);
        },
      };
      console.log('📬 Notification helper loaded. Type notify.help() for usage.');
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
