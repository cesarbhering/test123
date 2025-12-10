'use client';
import { ReactNode } from 'react';
import { UserProvider } from '../context/UserContext';
import { NotificationProvider } from '../context/NotificationContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </UserProvider>
  );
}
