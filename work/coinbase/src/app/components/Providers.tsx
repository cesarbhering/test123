'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { UserProvider } from '../context/UserContext';
import { NotificationProvider } from '../context/NotificationContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme} activeColorScheme="light">
      <MediaQueryProvider>
        <UserProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </UserProvider>
      </MediaQueryProvider>
    </ThemeProvider>
  );
}
