'use client';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Box } from '@coinbase/cds-web/layout';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { MainContent } from '../components/Content';
import { CryptoDetailView } from '../components/Content/CryptoDetailView';
import { CryptoAsset } from '../components/Content/TradeContent';

export default function HomePage() {
  const [activeItem, setActiveItem] = useState('home');
  const [pageTitle, setPageTitle] = useState('Home');
  const [selectedCryptoAsset, setSelectedCryptoAsset] = useState<CryptoAsset | null>(null);

  useEffect(() => {
    document.title = `Coinbase - ${pageTitle} | Alignerr`;
  }, [pageTitle]);

  const handleActiveItemChange = (id: string, label: string) => {
    setActiveItem(id);
    setPageTitle(label);
    setSelectedCryptoAsset(null); // Clear selected asset when changing sections
  };

  const handleSelectCryptoAsset = (asset: CryptoAsset) => {
    setSelectedCryptoAsset(asset);
    setPageTitle(asset.symbol);
  };

  const handleCloseCryptoDetail = () => {
    setSelectedCryptoAsset(null);
    // Restore previous title based on active item
    const titleMap: Record<string, string> = {
      home: 'Home',
      trade: 'Trade',
      'credit-card': 'Credit Card',
      'coinbase-one': 'Coinbase One',
      transactions: 'Transactions',
    };
    setPageTitle(titleMap[activeItem] || 'Home');
  };

  const handleToggleFavorite = (id: string) => {
    if (selectedCryptoAsset && selectedCryptoAsset.id === id) {
      setSelectedCryptoAsset({
        ...selectedCryptoAsset,
        isFavorite: !selectedCryptoAsset.isFavorite,
      });
    }
  };

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <Box
          background="bg"
          width="100%"
          display="flex"
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          {/* Sidebar - fixed position */}
          <Sidebar activeItem={activeItem} onActiveItemChange={handleActiveItemChange} />

          {/* Main content area */}
          <Box
            display="flex"
            flexDirection="column"
            style={{
              flexGrow: 1,
              minWidth: 0,
              height: '100%',
              borderLeft: '1px solid #E8EAED',
              overflow: 'hidden',
            }}
          >
            {/* Top Navbar - fixed at top */}
            <div style={{ flexShrink: 0 }}>
              <TopNavbar title={pageTitle} onSelectCryptoAsset={handleSelectCryptoAsset} />
            </div>

            {/* Content Area - scrollable */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {selectedCryptoAsset ? (
                <CryptoDetailView
                  asset={selectedCryptoAsset}
                  onClose={handleCloseCryptoDetail}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectAsset={handleSelectCryptoAsset}
                />
              ) : (
                <MainContent activeSection={activeItem} />
              )}
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}
