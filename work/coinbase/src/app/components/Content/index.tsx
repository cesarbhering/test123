'use client';
import { HomeContent } from './HomeContent';
import { TradeContent } from './TradeContent';
import { CreditCardContent } from './CreditCardContent';
import { CoinbaseOneContent } from './CoinbaseOneContent';
import { TransactionsContent } from './TransactionsContent';

interface MainContentProps {
  activeSection: string;
}

const contentMap: Record<string, React.ReactNode> = {
  'home': <HomeContent />,
  'trade': <TradeContent />,
  'credit-card': <CreditCardContent />,
  'coinbase-one': <CoinbaseOneContent />,
  'transactions': <TransactionsContent />,
};

export const MainContent = ({ activeSection }: MainContentProps) => {
  return contentMap[activeSection] || <HomeContent />;
};

export { HomeContent, TradeContent, CreditCardContent, CoinbaseOneContent, TransactionsContent };
