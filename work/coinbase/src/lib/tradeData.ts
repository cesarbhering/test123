import { CryptoAsset } from '../app/components/Content/TradeContent';

const STORAGE_KEY = 'coinbase_trade_data';

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
