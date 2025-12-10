'use client';
import { Text } from '@coinbase/cds-web/typography';
import { useState, useEffect } from 'react';
import { initializeTradeData, getTradeData, saveTradeData, exposeTradeHelpers } from '../../../lib/tradeData';
import { CryptoDetailView } from './CryptoDetailView';

// Types
export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  marketPrice: number;
  trades: number;
  marketCap: string;
  change24h: number;
  isFavorite: boolean;
}

type MarketTab = 'crypto' | 'futures' | 'perpetuals';
type FilterTab = 'trending' | 'top_gainers' | 'top_losers' | 'top_volume';

const DEFAULT_DISPLAY_COUNT = 5;

// Icon components
const CryptoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="8" height="8" rx="2" fill="#0052FF" />
    <rect x="14" y="2" width="8" height="8" rx="2" fill="#0052FF" />
    <rect x="2" y="14" width="8" height="8" rx="2" fill="#0052FF" />
    <rect x="14" y="14" width="8" height="8" rx="2" fill="#0052FF" />
  </svg>
);

const FuturesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#0052FF" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PerpetualsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20M7 12H17M10 18H14" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? '#F5A623' : 'none'}>
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke={filled ? '#F5A623' : '#D1D5DB'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Generate crypto icon based on symbol
const getCryptoIconColor = (symbol: string): string => {
  const colors: Record<string, string> = {
    VIRTUAL: '#8B5CF6',
    REPPO: '#6366F1',
    DEGEN: '#06B6D4',
    PING: '#8B5CF6',
    ZEN: '#F59E0B',
    BTC: '#F7931A',
    ETH: '#627EEA',
    SOL: '#00FFA3',
  };
  return colors[symbol] || '#0052FF';
};

const CryptoAssetIcon = ({ symbol }: { symbol: string }) => {
  const color = getCryptoIconColor(symbol);
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 12,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {symbol.slice(0, 2)}
    </div>
  );
};

export const TradeContent = () => {
  const [marketTab, setMarketTab] = useState<MarketTab>('crypto');
  const [filterTab, setFilterTab] = useState<FilterTab>('trending');
  const [cryptoData, setCryptoData] = useState<CryptoAsset[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);

  // Initialize and load data from localStorage
  useEffect(() => {
    // Initialize default data if localStorage is empty
    initializeTradeData();
    // Load data from localStorage
    setCryptoData(getTradeData());
    // Expose console helpers for testing
    exposeTradeHelpers();
    setIsLoaded(true);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (isLoaded && cryptoData.length > 0) {
      saveTradeData(cryptoData);
    }
  }, [cryptoData, isLoaded]);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setCryptoData((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...asset, isFavorite: !asset.isFavorite } : asset
      )
    );
  };

  // Filter and sort data based on selected filter
  const getFilteredData = (): CryptoAsset[] => {
    let filtered = [...cryptoData];

    switch (filterTab) {
      case 'trending':
        filtered.sort((a, b) => b.trades - a.trades);
        break;
      case 'top_gainers':
        filtered = filtered.filter((a) => a.change24h > 0);
        filtered.sort((a, b) => b.change24h - a.change24h);
        break;
      case 'top_losers':
        filtered = filtered.filter((a) => a.change24h < 0);
        filtered.sort((a, b) => a.change24h - b.change24h);
        break;
      case 'top_volume':
        filtered.sort((a, b) => {
          const parseMarketCap = (cap: string) => {
            const num = parseFloat(cap.replace(/[$,]/g, ''));
            if (cap.includes('T')) return num * 1e12;
            if (cap.includes('B')) return num * 1e9;
            if (cap.includes('M')) return num * 1e6;
            return num;
          };
          return parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap);
        });
        break;
    }

    return filtered;
  };

  const filteredData = getFilteredData();
  const displayData = showAll ? filteredData : filteredData.slice(0, DEFAULT_DISPLAY_COUNT);

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    }
    return `$${price.toFixed(4)}`;
  };

  // If an asset is selected, show the detail view
  if (selectedAsset) {
    return (
      <CryptoDetailView
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onToggleFavorite={toggleFavorite}
        onSelectAsset={setSelectedAsset}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        backgroundColor: '#f8f8f8',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      {/* Market Type Tabs */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        {/* Crypto Tab */}
        <button
          onClick={() => setMarketTab('crypto')}
          style={{
            flex: 1,
            padding: '20px 24px',
            backgroundColor: marketTab === 'crypto' ? 'white' : '#F3F4F6',
            border: marketTab === 'crypto' ? '2px solid #E5E7EB' : '2px solid transparent',
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          <CryptoIcon />
          <Text font="body" style={{ fontWeight: 500 }}>Crypto</Text>
        </button>

        {/* Futures Tab */}
        <button
          onClick={() => setMarketTab('futures')}
          style={{
            flex: 1,
            padding: '20px 24px',
            backgroundColor: marketTab === 'futures' ? 'white' : '#F3F4F6',
            border: marketTab === 'futures' ? '2px solid #E5E7EB' : '2px solid transparent',
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          <FuturesIcon />
          <Text font="body" style={{ fontWeight: 500 }}>Futures</Text>
        </button>

        {/* Perpetuals Tab */}
        <button
          onClick={() => setMarketTab('perpetuals')}
          style={{
            flex: 1,
            padding: '20px 24px',
            backgroundColor: marketTab === 'perpetuals' ? 'white' : '#F3F4F6',
            border: marketTab === 'perpetuals' ? '2px solid #E5E7EB' : '2px solid transparent',
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          <PerpetualsIcon />
          <Text font="body" style={{ fontWeight: 500 }}>Perpetuals</Text>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 16 }}>
        <button
          style={{
            padding: '8px 12px',
            backgroundColor: '#F3F4F6',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FilterIcon />
        </button>

        <button
          onClick={() => setFilterTab('trending')}
          style={{
            padding: '8px 16px',
            backgroundColor: filterTab === 'trending' ? '#0A0B0D' : 'white',
            border: '1px solid #E5E7EB',
            borderRadius: 20,
            cursor: 'pointer',
          }}
        >
          <Text font="caption" style={{ color: filterTab === 'trending' ? 'white' : '#0A0B0D' }}>
            Trending
          </Text>
        </button>

        <button
          onClick={() => setFilterTab('top_gainers')}
          style={{
            padding: '8px 16px',
            backgroundColor: filterTab === 'top_gainers' ? '#0A0B0D' : 'white',
            border: '1px solid #E5E7EB',
            borderRadius: 20,
            cursor: 'pointer',
          }}
        >
          <Text font="caption" style={{ color: filterTab === 'top_gainers' ? 'white' : '#0A0B0D' }}>
            Top gainers
          </Text>
        </button>

        <button
          onClick={() => setFilterTab('top_losers')}
          style={{
            padding: '8px 16px',
            backgroundColor: filterTab === 'top_losers' ? '#0A0B0D' : 'white',
            border: '1px solid #E5E7EB',
            borderRadius: 20,
            cursor: 'pointer',
          }}
        >
          <Text font="caption" style={{ color: filterTab === 'top_losers' ? 'white' : '#0A0B0D' }}>
            Top losers
          </Text>
        </button>

        <button
          onClick={() => setFilterTab('top_volume')}
          style={{
            padding: '8px 16px',
            backgroundColor: filterTab === 'top_volume' ? '#0A0B0D' : 'white',
            border: '1px solid #E5E7EB',
            borderRadius: 20,
            cursor: 'pointer',
          }}
        >
          <Text font="caption" style={{ color: filterTab === 'top_volume' ? 'white' : '#0A0B0D' }}>
            Top volume
          </Text>
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: 12,
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr 60px 40px',
            padding: '12px 20px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Text font="caption" color="fgMuted">Name</Text>
          <Text font="caption" color="fgMuted">Market price</Text>
          <Text font="caption" color="fgMuted">Trades</Text>
          <Text font="caption" color="fgMuted">Market cap</Text>
          <Text font="caption" color="fgMuted">Change</Text>
          <span></span>
          <span></span>
        </div>

        {/* Table Body */}
        <div style={{ flex: 1, maxHeight: showAll ? 'none' : 400, overflowY: showAll ? 'visible' : 'auto' }}>
          {displayData.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr 60px 40px',
                padding: '16px 20px',
                borderBottom: '1px solid #F3F4F6',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <CryptoAssetIcon symbol={asset.symbol} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Text font="body" style={{ fontWeight: 500 }}>{asset.name}</Text>
                  <Text font="caption" color="fgMuted">{asset.symbol}</Text>
                </div>
              </div>

              {/* Market Price */}
              <Text font="body">{formatPrice(asset.marketPrice)}</Text>

              {/* Trades */}
              <Text font="body">{asset.trades > 0 ? asset.trades : ''}</Text>

              {/* Market Cap */}
              <Text font="body">{asset.marketCap}</Text>

              {/* Change */}
              <Text
                font="body"
                style={{
                  color: asset.change24h >= 0 ? '#00D395' : '#E53935',
                }}
              >
                {asset.change24h >= 0 ? '↗' : '↘'} {Math.abs(asset.change24h).toFixed(2)}%
              </Text>

              {/* Buy Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAsset(asset);
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Text font="body" style={{ color: '#0052FF', fontWeight: 500 }}>Buy</Text>
              </button>

              {/* Favorite */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(asset.id);
                }}
                style={{
                  padding: 4,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StarIcon filled={asset.isFavorite} />
              </button>
            </div>
          ))}
        </div>

        {/* Browse All / Show Less Button */}
        <button
          onClick={() => filteredData.length > DEFAULT_DISPLAY_COUNT && setShowAll(!showAll)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#F3F4F6',
            border: 'none',
            cursor: filteredData.length > DEFAULT_DISPLAY_COUNT ? 'pointer' : 'default',
            marginTop: 'auto',
          }}
        >
          <Text font="body" style={{ fontWeight: 500 }}>
            {filteredData.length > DEFAULT_DISPLAY_COUNT
              ? (showAll ? 'Show less' : `Browse all (${filteredData.length})`)
              : `${filteredData.length} assets`}
          </Text>
        </button>
      </div>
    </div>
  );
};
