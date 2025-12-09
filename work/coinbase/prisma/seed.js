require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({});

async function main() {
  console.log('Starting database seed...');

  // Create coins
  const usd = await prisma.coin.upsert({
    where: { symbol: 'USD' },
    update: {},
    create: {
      symbol: 'USD',
      name: 'US Dollar',
      currentPriceUsd: 1.0,
    },
  });
  console.log('Created coin:', usd);

  const btc = await prisma.coin.upsert({
    where: { symbol: 'BTC' },
    update: {},
    create: {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPriceUsd: 45000.0,
    },
  });
  console.log('Created coin:', btc);

  const eth = await prisma.coin.upsert({
    where: { symbol: 'ETH' },
    update: {},
    create: {
      symbol: 'ETH',
      name: 'Ethereum',
      currentPriceUsd: 2500.0,
    },
  });
  console.log('Created coin:', eth);

  // Create test user
  const user = await prisma.user.upsert({
    where: { email: 'test@coinbase.com' },
    update: {},
    create: {
      email: 'test@coinbase.com',
      password: 'password123', // Plain text for now (no encryption)
    },
  });
  console.log('Created user:', user);

  // Create balances for test user
  const usdBalance = await prisma.balance.upsert({
    where: {
      userId_coinSymbol: {
        userId: user.id,
        coinSymbol: 'USD'
      }
    },
    update: {},
    create: {
      userId: user.id,
      coinSymbol: 'USD',
      amount: 10000.0, // Starting with $10,000
    },
  });
  console.log('Created USD balance:', usdBalance);

  const btcBalance = await prisma.balance.upsert({
    where: {
      userId_coinSymbol: {
        userId: user.id,
        coinSymbol: 'BTC'
      }
    },
    update: {},
    create: {
      userId: user.id,
      coinSymbol: 'BTC',
      amount: 0.0,
    },
  });
  console.log('Created BTC balance:', btcBalance);

  const ethBalance = await prisma.balance.upsert({
    where: {
      userId_coinSymbol: {
        userId: user.id,
        coinSymbol: 'ETH'
      }
    },
    update: {},
    create: {
      userId: user.id,
      coinSymbol: 'ETH',
      amount: 0.0,
    },
  });
  console.log('Created ETH balance:', ethBalance);

  console.log('\n✅ Seed completed successfully!');
  console.log('\nTest login credentials:');
  console.log('Email: test@coinbase.com');
  console.log('Password: password123');
  console.log('\nStarting balances:');
  console.log('USD: $10,000.00');
  console.log('BTC: 0.00');
  console.log('ETH: 0.00');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
