'use client';
import { useState, useEffect } from 'react';
import { Box, VStack, HStack, Divider } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Button } from '@coinbase/cds-web/buttons';
import { Pressable } from '@coinbase/cds-web/system';
import { Icon } from '@coinbase/cds-web/icons';
import { db, initializeDatabase } from '@/lib/storage';
import { useUser } from '@/app/context/UserContext';
import { BalanceCard } from '@/app/components/BalanceCard';
import { ForYouSection } from '@/app/components/ForYouSection';
import { WatchlistSection } from '@/app/components/WatchlistSection';
import { ContentTemplate } from './ContentTemplate';

export const HomeContent = () => {
  const { user } = useUser();
  const [balances, setBalances] = useState([]);
  const [coins, setCoins] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);

  useEffect(() => {
    initializeDatabase();

    if (user) {
      // Get user balances
      const userBalances = db.balances.getByUserId(user.id);
      const allCoins = db.coins.getAll();

      setBalances(userBalances);
      setCoins(allCoins);

      // Calculate balances
      let total = 0;
      let crypto = 0;
      let cash = 0;

      userBalances.forEach((balance: any) => {
        const coin = allCoins.find((c: any) => c.symbol === balance.coinSymbol);
        const value = balance.amount * (coin?.currentPriceUsd || 0);
        total += value;

        if (balance.coinSymbol === 'USD') {
          cash += value;
        } else {
          crypto += value;
        }
      });

      setTotalBalance(total);
      setCryptoBalance(crypto);
      setCashBalance(cash);
    }
  }, [user]);

  return (
    <ContentTemplate>
      <VStack width="100%" maxWidth="780px" paddingX={4} paddingTop={3} gap={6}>
        
        {/* Balance Card */}
        <BalanceCard
          balance={totalBalance}
          change={0}
          changePercentage={0}
          period="1D"
          cryptoBalance={cryptoBalance}
          cashBalance={cashBalance}
        />

        {/* Onboarding Banner */}
        <Box
          padding={6}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
          }}
        >
          <VStack gap={4}>
            <HStack justifyContent="space-between" alignItems="flex-start">
              <VStack gap={2}>
                <HStack gap={2} alignItems="center">
                  <Box width="20px" height="20px" style={{ borderRadius: '50%', background: '#0052FF' }} display="flex" alignItems="center" justifyContent="center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </Box>
                  <Text font="headline" style={{ fontSize: '16px' }}>You're almost there!</Text>
                </HStack>
                <Text font="title1" style={{ fontSize: '24px' }}>You're ready to buy crypto!</Text>
              </VStack>
              <Box
                as="button"
                style={{
                  transform: 'rotate(180deg)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Icon name="caretRight" size="xs" />
              </Box>
            </HStack>

            <HStack gap={4} alignItems="center">
              <Box flex={1} height="8px" style={{ borderRadius: '4px', background: '#F0F2F5', overflow: 'hidden' }}>
                <Box width="75%" height="100%" style={{ background: '#0052FF', borderRadius: '4px' }} />
              </Box>
              <Text font="label2" color="fgMuted" style={{ whiteSpace: 'nowrap' }}>1 step remaining</Text>
            </HStack>

            <Button variant="primary" style={{ width: 'fit-content', paddingLeft: '32px', paddingRight: '32px' }}>
              Buy crypto
            </Button>

            {/* Steps List */}
            <VStack gap={0} paddingTop={4}>
              <Text font="headline" style={{ paddingBottom: '16px' }}>Remaining steps</Text>
              
              <HStack paddingY={3} gap={3} alignItems="center">
                <Box width="20px" height="20px" style={{ borderRadius: '50%' }} background="fgPrimary" display="flex" alignItems="center" justifyContent="center">
                  <Icon name="checkmark" size="xs" />
                </Box>
                <Text font="body" style={{ fontWeight: 500 }}>Account created</Text>
              </HStack>

              <HStack paddingY={3} gap={3} alignItems="center">
                <Box width="24px" height="24px" style={{ borderRadius: '50%' }} background="fgPrimary" display="flex" alignItems="center" justifyContent="center">
                  <Icon name="checkmark" size="xs" />
                </Box>
                <Text font="body" style={{ fontWeight: 500 }}>Verify your info</Text>
              </HStack>
              
              <HStack paddingY={3} gap={3} alignItems="center">
                <Box width="24px" height="24px" style={{ borderRadius: '50%' }} background="fgPrimary" display="flex" alignItems="center" justifyContent="center">
                  <Icon name="checkmark" size="xs" />
                </Box>
                <Text font="body" style={{ fontWeight: 500 }}>Payment method added</Text>
              </HStack>

              {/* Buy Crypto - Pending */}
              <HStack paddingY={3} gap={3} alignItems="center" justifyContent="space-between" width="100%">
                <HStack gap={3} alignItems="center">
                  <Box width="24px" height="24px" style={{ borderRadius: '50%', border: '2px solid #E2E8F0' }} />
                  <VStack gap={0.5}>
                    <Text font="body" style={{ fontWeight: 600 }}>Buy your first crypto</Text>
                    <Text font="label2" color="fgMuted">Jump start your crypto portfolio</Text>
                  </VStack>
                </HStack>
                <Box
                  width="32px"
                  height="32px"
                  style={{ borderRadius: '50%' }}
                  background="bgAlternate"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon name="arrowRight" size="xs" />
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </Box>

        {/* Need more info? */}
        <VStack gap={4} paddingTop={4}>
          <Text font="title3">Need more info?</Text>
          
          <VStack gap={0}>
            <Pressable>
              <HStack paddingY={4} justifyContent="space-between" alignItems="center" style={{ borderBottom: '1px solid #F0F2F5' }}>
                <Text font="headline">Frequently asked questions</Text>
                <Icon name="caretRight" size="xs" />
              </HStack>
            </Pressable>
            <Pressable>
              <HStack paddingY={4} justifyContent="space-between" alignItems="center">
                <Text font="headline">Account agreement & statements</Text>
                <Icon name="caretRight" size="xs" />
              </HStack>
            </Pressable>
          </VStack>
        </VStack>

        <Divider />

        {/* For you */}
        <ForYouSection />

        <Divider />

        {/* Watchlist */}
        <WatchlistSection />

        <Divider />
        
        {/* Footer */}
        <VStack gap={6} paddingY={8}>
          <HStack gap={6}>
            <Link href="#">Careers</Link>
            <Link href="#">Legal & Privacy</Link>
            <Link href="#">Accessibility Statement</Link>
          </HStack>
          <Text color="fgMuted">© 2025 Coinbase</Text>
        </VStack>

        {/* Language Selector */}
        <Box paddingBottom={8}>
          <Button variant="secondary" style={{ borderRadius: '999px' }}>
            English v
          </Button>
        </Box>
      </VStack>
    </ContentTemplate>
  );
};

const Link = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href} style={{ textDecoration: 'none', fontSize: '14px', color: '#5B616E' }}>
    {children}
  </a>
);
