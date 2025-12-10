'use client';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Box } from '@coinbase/cds-web/layout';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { MainContent } from '../components/Content';

export default function HomePage() {
  const [activeItem, setActiveItem] = useState('home');
  const [pageTitle, setPageTitle] = useState('Home');

  useEffect(() => {
    document.title = `Coinbase - ${pageTitle} | Alignerr`;
  }, [pageTitle]);

  const handleActiveItemChange = (id: string, label: string) => {
    setActiveItem(id);
    setPageTitle(label);
  };

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <Box
          background="bg"
          minHeight="100vh"
          width="100%"
          display="flex"
          style={{ overflow: 'hidden' }}
        >
          {/* Sidebar */}
          <Sidebar activeItem={activeItem} onActiveItemChange={handleActiveItemChange} />

          {/* Main content area */}
          <Box
            display="flex"
            flexDirection="column"
            style={{
              flexGrow: 1,
              minWidth: 0,
              borderLeft: '1px solid #E8EAED',
            }}
          >
            {/* Top Navbar */}
            <TopNavbar title={pageTitle} />

            {/* Content Area */}
            <Box background="bg" style={{ flexGrow: 1 }}>
              <MainContent activeSection={activeItem} />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}
