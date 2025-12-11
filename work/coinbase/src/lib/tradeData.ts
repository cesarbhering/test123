import { CryptoAsset } from '../app/components/Content/TradeContent';

const STORAGE_KEY = 'coinbase_trade_data';
const SEARCH_DATA_STORAGE_KEY = 'coinbase_search_crypto_data';

// Extended crypto data for search dropdown
export interface SearchCryptoAsset {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  marketCap: string;
  volume: string;
  change24h: number;
  apy?: number; // Optional staking APY
  category: 'crypto' | 'futures' | 'perpetuals';
}

// Default search crypto data matching the screenshot
const defaultSearchCryptoData: SearchCryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: 1,
    price: 90386.42,
    marketCap: '$1.8T',
    volume: '$65.8B',
    change24h: -1.60,
    category: 'crypto',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    rank: 2,
    price: 3238.32,
    marketCap: '$392.6B',
    volume: '$31.6B',
    change24h: -1.54,
    apy: 1.80,
    category: 'crypto',
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    rank: 3,
    price: 1.00,
    marketCap: '$186.1B',
    volume: '$106.9B',
    change24h: 0.00,
    category: 'crypto',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    rank: 4,
    price: 198.45,
    marketCap: '$92.3B',
    volume: '$4.2B',
    change24h: 5.67,
    category: 'crypto',
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    rank: 5,
    price: 2.20,
    marketCap: '$125.4B',
    volume: '$12.1B',
    change24h: 3.45,
    category: 'crypto',
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    rank: 6,
    price: 645.30,
    marketCap: '$94.2B',
    volume: '$2.1B',
    change24h: -0.82,
    category: 'crypto',
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    rank: 7,
    price: 0.35,
    marketCap: '$52.1B',
    volume: '$3.8B',
    change24h: 2.15,
    category: 'crypto',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    rank: 8,
    price: 0.95,
    marketCap: '$33.8B',
    volume: '$1.2B',
    change24h: -2.34,
    category: 'crypto',
  },
  // Futures
  {
    id: 'btc-futures',
    name: 'Bitcoin Futures',
    symbol: 'BTC-PERP',
    rank: 1,
    price: 90450.00,
    marketCap: '$850M',
    volume: '$25.2B',
    change24h: -1.55,
    category: 'futures',
  },
  {
    id: 'eth-futures',
    name: 'Ethereum Futures',
    symbol: 'ETH-PERP',
    rank: 2,
    price: 3242.50,
    marketCap: '$420M',
    volume: '$12.8B',
    change24h: -1.48,
    category: 'futures',
  },
  // Perpetuals
  {
    id: 'btc-perp',
    name: 'Bitcoin Perpetual',
    symbol: 'BTC-USD',
    rank: 1,
    price: 90400.00,
    marketCap: '$1.2B',
    volume: '$45.6B',
    change24h: -1.58,
    category: 'perpetuals',
  },
  {
    id: 'eth-perp',
    name: 'Ethereum Perpetual',
    symbol: 'ETH-USD',
    rank: 2,
    price: 3240.00,
    marketCap: '$680M',
    volume: '$22.3B',
    change24h: -1.50,
    category: 'perpetuals',
  },
];

// Search data storage functions
export function initializeSearchData(): void {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(SEARCH_DATA_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(SEARCH_DATA_STORAGE_KEY, JSON.stringify(defaultSearchCryptoData));
  }
}

export function getSearchData(): SearchCryptoAsset[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(SEARCH_DATA_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultSearchCryptoData;
    }
  }
  return defaultSearchCryptoData;
}

export function saveSearchData(data: SearchCryptoAsset[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SEARCH_DATA_STORAGE_KEY, JSON.stringify(data));
}

// Default crypto data to seed localStorage
const defaultCryptoData: CryptoAsset[] = [
  {
    id: 'virtual',
    name: 'Virtuals Protocol',
    symbol: 'VIRTUAL',
    iconUrl: '',
    marketPrice: 0.85,
    trades: 46,
    marketCap: '$560.2M',
    change24h: -3.14,
    isFavorite: false,
  },
  {
    id: 'reppo',
    name: 'Reppo',
    symbol: 'REPPO',
    iconUrl: '',
    marketPrice: 0.0281,
    trades: 21,
    marketCap: '$27.7M',
    change24h: 29.39,
    isFavorite: false,
  },
  {
    id: 'degen',
    name: 'Degen',
    symbol: 'DEGEN',
    iconUrl: '',
    marketPrice: 0.0016,
    trades: 0,
    marketCap: '$33.6M',
    change24h: -3.43,
    isFavorite: false,
  },
  {
    id: 'ping',
    name: 'Ping',
    symbol: 'PING',
    iconUrl: '',
    marketPrice: 0.0069,
    trades: 0,
    marketCap: '$6.9M',
    change24h: 0.47,
    isFavorite: false,
  },
  {
    id: 'horizen',
    name: 'Horizen',
    symbol: 'ZEN',
    iconUrl: '',
    marketPrice: 9.34,
    trades: 0,
    marketCap: '$165.3M',
    change24h: -10.81,
    isFavorite: false,
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    iconUrl: '',
    marketPrice: 97234.56,
    trades: 1250,
    marketCap: '$1.9T',
    change24h: 2.34,
    isFavorite: false,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: '',
    marketPrice: 3456.78,
    trades: 890,
    marketCap: '$415.6B',
    change24h: -1.23,
    isFavorite: false,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    iconUrl: '',
    marketPrice: 198.45,
    trades: 567,
    marketCap: '$92.3B',
    change24h: 5.67,
    isFavorite: false,
  },
];

// Initialize trade data in localStorage if not present
export function initializeTradeData(): void {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCryptoData));
  }
}

// Get trade data from localStorage
export function getTradeData(): CryptoAsset[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save trade data to localStorage
export function saveTradeData(data: CryptoAsset[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add a new crypto asset
export function addCryptoAsset(asset: Omit<CryptoAsset, 'id'>): CryptoAsset {
  const newAsset: CryptoAsset = {
    ...asset,
    id: `crypto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  const data = getTradeData();
  data.push(newAsset);
  saveTradeData(data);

  return newAsset;
}

// Remove a crypto asset
export function removeCryptoAsset(id: string): void {
  const data = getTradeData();
  const filtered = data.filter((asset) => asset.id !== id);
  saveTradeData(filtered);
}

// Update a crypto asset
export function updateCryptoAsset(id: string, updates: Partial<CryptoAsset>): void {
  const data = getTradeData();
  const updated = data.map((asset) =>
    asset.id === id ? { ...asset, ...updates } : asset
  );
  saveTradeData(updated);
}

// Clear all trade data
export function clearTradeData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// Reset to default data
export function resetTradeData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCryptoData));
}

// Console helper for testing
export function exposeTradeHelpers(): void {
  if (typeof window === 'undefined') return;

  (window as Window & typeof globalThis & { tradeData: unknown }).tradeData = {
    get: getTradeData,
    add: addCryptoAsset,
    remove: removeCryptoAsset,
    update: updateCryptoAsset,
    clear: clearTradeData,
    reset: resetTradeData,
    help: () => {
      console.log(`
📊 Trade Data Console Helper
==============================
tradeData.get()                    - Get all crypto assets
tradeData.add({name, symbol, ...}) - Add a new crypto asset
tradeData.remove(id)               - Remove a crypto asset by ID
tradeData.update(id, {updates})    - Update a crypto asset
tradeData.clear()                  - Clear all trade data
tradeData.reset()                  - Reset to default data
tradeData.help()                   - Show this help

Example:
  tradeData.add({
    name: 'Dogecoin',
    symbol: 'DOGE',
    iconUrl: '',
    marketPrice: 0.12,
    trades: 500,
    marketCap: '$16.5B',
    change24h: 5.2,
    isFavorite: false
  })
      `);
    },
  };
  console.log('📊 Trade data helper loaded. Type tradeData.help() for usage.');
}
