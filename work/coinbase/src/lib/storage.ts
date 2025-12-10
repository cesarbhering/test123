// Local storage based database for user authentication and balances

// Types
interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

interface Balance {
  userId: string;
  coinSymbol: string;
  amount: number;
}

interface Coin {
  symbol: string;
  name: string;
  currentPriceUsd: number;
}

// Storage keys
const STORAGE_KEYS = {
  USERS: 'coinbase_users',
  BALANCES: 'coinbase_balances',
  COINS: 'coinbase_coins',
  INITIALIZED: 'coinbase_db_initialized',
};

// Helper functions for localStorage
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

// Default data
const DEFAULT_USERS: User[] = [
  {
    id: '1',
    email: 'test@coinbase.com',
    password: 'password123',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

const DEFAULT_COINS: Coin[] = [
  { symbol: 'BTC', name: 'Bitcoin', currentPriceUsd: 97000 },
  { symbol: 'ETH', name: 'Ethereum', currentPriceUsd: 3400 },
  { symbol: 'USDC', name: 'USD Coin', currentPriceUsd: 1 },
  { symbol: 'SOL', name: 'Solana', currentPriceUsd: 180 },
  { symbol: 'DOGE', name: 'Dogecoin', currentPriceUsd: 0.35 },
  { symbol: 'ADA', name: 'Cardano', currentPriceUsd: 0.95 },
  { symbol: 'XRP', name: 'XRP', currentPriceUsd: 2.20 },
  { symbol: 'DOT', name: 'Polkadot', currentPriceUsd: 7.50 },
  { symbol: 'LINK', name: 'Chainlink', currentPriceUsd: 22 },
  { symbol: 'MATIC', name: 'Polygon', currentPriceUsd: 0.55 },
];

const DEFAULT_BALANCES: Balance[] = [
  { userId: '1', coinSymbol: 'BTC', amount: 1.5 },
  { userId: '1', coinSymbol: 'ETH', amount: 10 },
  { userId: '1', coinSymbol: 'USDC', amount: 5000 },
  { userId: '1', coinSymbol: 'SOL', amount: 25 },
  { userId: '1', coinSymbol: 'DOGE', amount: 10000 },
];

// Database operations
export const db = {
  users: {
    getAll: (): User[] => getStorageItem<User[]>(STORAGE_KEYS.USERS, []),

    getByEmail: (email: string): User | undefined => {
      const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
      return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    },

    getById: (id: string): User | undefined => {
      const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
      return users.find((u) => u.id === id);
    },

    create: (user: Omit<User, 'id' | 'createdAt'>): User => {
      const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
      const newUser: User = {
        ...user,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      setStorageItem(STORAGE_KEYS.USERS, users);
      return newUser;
    },
  },

  balances: {
    getByUserId: (userId: string): Balance[] => {
      const balances = getStorageItem<Balance[]>(STORAGE_KEYS.BALANCES, []);
      return balances.filter((b) => b.userId === userId);
    },

    update: (userId: string, coinSymbol: string, amount: number): void => {
      const balances = getStorageItem<Balance[]>(STORAGE_KEYS.BALANCES, []);
      const index = balances.findIndex(
        (b) => b.userId === userId && b.coinSymbol === coinSymbol
      );
      if (index >= 0) {
        balances[index].amount = amount;
      } else {
        balances.push({ userId, coinSymbol, amount });
      }
      setStorageItem(STORAGE_KEYS.BALANCES, balances);
    },
  },

  coins: {
    getAll: (): Coin[] => getStorageItem<Coin[]>(STORAGE_KEYS.COINS, []),

    getBySymbol: (symbol: string): Coin | undefined => {
      const coins = getStorageItem<Coin[]>(STORAGE_KEYS.COINS, []);
      return coins.find((c) => c.symbol === symbol);
    },
  },
};

// Initialize database with default data
export const initializeDatabase = (): void => {
  if (typeof window === 'undefined') return;

  // Always ensure coins data exists (can be updated without breaking anything)
  const existingCoins = getStorageItem<Coin[]>(STORAGE_KEYS.COINS, []);
  if (existingCoins.length === 0) {
    setStorageItem(STORAGE_KEYS.COINS, DEFAULT_COINS);
  }

  // Check if default test user exists, if not add it
  const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
  const testUserExists = users.some(
    (u) => u.email.toLowerCase() === 'test@coinbase.com'
  );

  if (!testUserExists) {
    const updatedUsers = [...users, ...DEFAULT_USERS];
    setStorageItem(STORAGE_KEYS.USERS, updatedUsers);
  }

  // Ensure default balances exist for test user
  const balances = getStorageItem<Balance[]>(STORAGE_KEYS.BALANCES, []);
  const testUserBalances = balances.filter((b) => b.userId === '1');
  if (testUserBalances.length === 0) {
    const updatedBalances = [...balances, ...DEFAULT_BALANCES];
    setStorageItem(STORAGE_KEYS.BALANCES, updatedBalances);
  }

  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
};

// Reset database to default state (useful for testing)
export const resetDatabase = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  initializeDatabase();
};
