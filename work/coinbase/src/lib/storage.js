/**
 * localStorage Database Abstraction Layer
 * Provides CRUD operations (GET, POST, PATCH, DELETE) for managing data in localStorage
 */

// Storage keys for different collections
const STORAGE_KEYS = {
  users: 'db_users',
  balances: 'db_balances',
  coins: 'db_coins',
};

// Helper function to generate unique IDs
function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to get current timestamp
function getTimestamp() {
  return new Date().toISOString();
}

// Check if we're in a browser environment
function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Base storage operations for interacting with localStorage collections
 */
class Storage {
  /**
   * GET: Retrieve all records from a collection
   */
  getAll(collectionName) {
    if (!isBrowser()) {
      return [];
    }
    const key = STORAGE_KEYS[collectionName];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  /**
   * GET: Find a single record by ID
   */
  getById(collectionName, id) {
    const records = this.getAll(collectionName);
    return records.find((r) => r.id === id) || null;
  }

  /**
   * GET: Find records by matching criteria
   */
  getBy(collectionName, criteria) {
    const records = this.getAll(collectionName);
    return records.filter((record) => {
      return Object.entries(criteria).every(([key, value]) => {
        return record[key] === value;
      });
    });
  }

  /**
   * GET: Find first record by matching criteria
   */
  getFirst(collectionName, criteria) {
    const results = this.getBy(collectionName, criteria);
    return results[0] || null;
  }

  /**
   * POST: Create a new record
   */
  post(collectionName, data) {
    if (!isBrowser()) {
      throw new Error('Cannot modify storage on server side');
    }

    const records = this.getAll(collectionName);
    const now = getTimestamp();

    const newRecord = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    records.push(newRecord);
    this.saveAll(collectionName, records);

    return newRecord;
  }

  /**
   * PATCH: Update an existing record by ID
   */
  patch(collectionName, id, updates) {
    if (!isBrowser()) {
      throw new Error('Cannot modify storage on server side');
    }

    const records = this.getAll(collectionName);
    const index = records.findIndex((r) => r.id === id);

    if (index === -1) {
      return null;
    }

    records[index] = {
      ...records[index],
      ...updates,
      updatedAt: getTimestamp(),
    };

    this.saveAll(collectionName, records);
    return records[index];
  }

  /**
   * PATCH: Update multiple records by matching criteria
   */
  patchBy(collectionName, criteria, updates) {
    if (!isBrowser()) {
      throw new Error('Cannot modify storage on server side');
    }

    const records = this.getAll(collectionName);
    let count = 0;

    const updatedRecords = records.map((record) => {
      const matches = Object.entries(criteria).every(([key, value]) => {
        return record[key] === value;
      });

      if (matches) {
        count++;
        return {
          ...record,
          ...updates,
          updatedAt: getTimestamp(),
        };
      }

      return record;
    });

    this.saveAll(collectionName, updatedRecords);
    return count;
  }

  /**
   * DELETE: Remove a record by ID
   */
  delete(collectionName, id) {
    if (!isBrowser()) {
      throw new Error('Cannot modify storage on server side');
    }

    const records = this.getAll(collectionName);
    const filteredRecords = records.filter((r) => r.id !== id);

    if (filteredRecords.length === records.length) {
      return false; // No record was deleted
    }

    this.saveAll(collectionName, filteredRecords);
    return true;
  }

  /**
   * DELETE: Remove records by matching criteria
   */
  deleteBy(collectionName, criteria) {
    if (!isBrowser()) {
      throw new Error('Cannot modify storage on server side');
    }

    const records = this.getAll(collectionName);
    const filteredRecords = records.filter((record) => {
      return !Object.entries(criteria).every(([key, value]) => {
        return record[key] === value;
      });
    });

    const deletedCount = records.length - filteredRecords.length;
    this.saveAll(collectionName, filteredRecords);
    return deletedCount;
  }

  /**
   * Save all records to a collection
   */
  saveAll(collectionName, data) {
    if (!isBrowser()) {
      return;
    }
    const key = STORAGE_KEYS[collectionName];
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Clear a specific collection
   */
  clear(collectionName) {
    if (!isBrowser()) {
      return;
    }
    const key = STORAGE_KEYS[collectionName];
    localStorage.removeItem(key);
  }

  /**
   * Clear all collections
   */
  clearAll() {
    if (!isBrowser()) {
      return;
    }
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

// Create singleton instance
export const storage = new Storage();

/**
 * Database API with convenient methods for each collection
 */
export const db = {
  // Users collection
  users: {
    getAll: () => storage.getAll('users'),
    getById: (id) => storage.getById('users', id),
    getByEmail: (email) => storage.getFirst('users', { email }),
    create: (data) => storage.post('users', data),
    update: (id, updates) => storage.patch('users', id, updates),
    delete: (id) => storage.delete('users', id),
  },

  // Coins collection
  coins: {
    getAll: () => storage.getAll('coins'),
    getById: (id) => storage.getById('coins', id),
    getBySymbol: (symbol) => storage.getFirst('coins', { symbol }),
    create: (data) => storage.post('coins', data),
    update: (id, updates) => storage.patch('coins', id, updates),
    updateBySymbol: (symbol, updates) => {
      const coin = storage.getFirst('coins', { symbol });
      return coin ? storage.patch('coins', coin.id, updates) : null;
    },
    delete: (id) => storage.delete('coins', id),
  },

  // Balances collection
  balances: {
    getAll: () => storage.getAll('balances'),
    getById: (id) => storage.getById('balances', id),
    getByUserId: (userId) => storage.getBy('balances', { userId }),
    getByUserIdAndCoin: (userId, coinSymbol) =>
      storage.getFirst('balances', { userId, coinSymbol }),
    create: (data) => storage.post('balances', data),
    update: (id, updates) => storage.patch('balances', id, updates),
    delete: (id) => storage.delete('balances', id),
    deleteByUserId: (userId) => storage.deleteBy('balances', { userId }),
  },

  // Utility methods
  clearAll: () => storage.clearAll(),
};

/**
 * Initialize database with seed data
 * Call this on app startup to ensure default data exists
 */
export function initializeDatabase() {
  if (!isBrowser()) {
    return;
  }

  // Check if database is already initialized
  const existingUsers = storage.getAll('users');
  if (existingUsers.length > 0) {
    return; // Already initialized
  }

  console.log('Initializing localStorage database with seed data...');

  // Create coins
  const coins = [
    {
      symbol: 'USD',
      name: 'US Dollar',
      currentPriceUsd: 1.0,
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPriceUsd: 45000.0,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      currentPriceUsd: 2500.0,
    },
  ];

  coins.forEach((coin) => db.coins.create(coin));

  // Create test user
  const testUser = db.users.create({
    email: 'test@coinbase.com',
    password: 'password123', // Plain text for testing
  });

  // Create balances for test user
  db.balances.create({
    userId: testUser.id,
    coinSymbol: 'USD',
    amount: 9826.87,
  });

  db.balances.create({
    userId: testUser.id,
    coinSymbol: 'BTC',
    amount: 0.01372,
  });

  db.balances.create({
    userId: testUser.id,
    coinSymbol: 'ETH',
    amount: 0.09288,
  });

  console.log('Database initialized successfully!');
  console.log('Test credentials: test@coinbase.com / password123');
  console.log('Starting balances: USD $9,826.87 | BTC ~$617 | ETH ~$232');
}
