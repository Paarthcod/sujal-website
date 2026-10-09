import React, { createContext, useContext, useState } from 'react';
import { AppNotification } from '../types';
import { storage } from '../services/storage';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface NotificationContextType {
  toasts: ToastMessage[];
  notifications: AppNotification[];
  unreadCount: number;
  showToast: (title: string, message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => storage.getNotifications());

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const showToast = (title: string, message: string, type: ToastType = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, type, title, message };
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markAsRead = (id: string) => {
    storage.markNotificationAsRead(id);
    setNotifications(storage.getNotifications());
  };

  const markAllAsRead = () => {
    storage.markAllNotificationsAsRead();
    setNotifications(storage.getNotifications());
  };

  const refreshNotifications = () => {
    setNotifications(storage.getNotifications());
  };

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        notifications,
        unreadCount,
        showToast,
        removeToast,
        markAsRead,
        markAllAsRead,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
