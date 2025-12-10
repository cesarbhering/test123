'use client';
import { useMemo } from 'react';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { RollingNumber } from '@coinbase/cds-web/numbers/RollingNumber';
import { Text } from '@coinbase/cds-web/typography';
import { Pressable } from '@coinbase/cds-web/system';
import { Icon } from '@coinbase/cds-web/icons';
import './styles.css';

// Simple Sparkline component
const Sparkline = ({ data, width = 300, height = 100, color = '#0052FF' }: { 
  data: number[]; 
  width?: number; 
  height?: number;
  color?: string;
}) => {
  const points = useMemo(() => {
    if (!data || data.length === 0) return { line: '', area: '' };
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const xStep = width / (data.length - 1);
    const yPadding = height * 0.1;
    const effectiveHeight = height - yPadding * 2;
    
    const pointsString = data
      .map((value, index) => {
        const x = index * xStep;
        const y = yPadding + effectiveHeight - ((value - min) / range) * effectiveHeight;
        return `${x},${y}`;
      })
      .join(' ');
    
    // Create area path
    const firstPoint = data[0];
    const lastPoint = data[data.length - 1];
    const firstY = yPadding + effectiveHeight - ((firstPoint - min) / range) * effectiveHeight;
    const lastY = yPadding + effectiveHeight - ((lastPoint - min) / range) * effectiveHeight;
    
    const areaPath = `M 0,${firstY} L ${pointsString} L ${width},${height} L 0,${height} Z`;
    
    return { line: pointsString, area: areaPath };
  }, [data, width, height]);

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* Dotted area fill */}
      <defs>
        <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill={color} opacity="0.3" />
        </pattern>
      </defs>
      <path d={points.area} fill="url(#dots)" />
      
      {/* Line */}
      <polyline
        points={points.line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface BalanceCardProps {
  balance: number;
  change: number;
  changePercentage: number;
  period?: string;
  cryptoBalance: number;
  cashBalance: number;
}

export const BalanceCard = ({ 
  balance, 
  change, 
  changePercentage, 
  period = '1D',
  cryptoBalance,
  cashBalance
}: BalanceCardProps) => {
  const trendColor = change >= 0 ? 'fgPositive' : 'fgNegative';

  // Generate sample sparkline data based on balance
  const sparklineData = useMemo(() => {
    const baseValue = balance;
    const points = 50;
    const data = [];
    for (let i = 0; i < points; i++) {
      const variation = Math.sin(i / 5) * (balance * 0.02) + (Math.random() - 0.5) * (balance * 0.01);
      data.push(baseValue + variation - Math.abs(change));
    }
    data.push(balance); // End at current balance
    return data;
  }, [balance, change]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <VStack gap={4}>
      {/* Total Balance Section with Chart */}
      <HStack gap={4} alignItems="flex-start" justifyContent="space-between" width="100%" id="total-balance">
        <VStack gap={0.5}>
          <RollingNumber
            colorPulseOnUpdate
            value={balance}
            format={{
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            }}
            styles={{
              root: {
                fontSize: '40px',
                fontWeight: 400,
                lineHeight: '1.2',
                fontFamily: 'Coinbase Display, -apple-system, BlinkMacSystemFont, sans-serif',
              }
            }}
          />
          <HStack gap={0} alignItems="center" id="change-text">
            <RollingNumber
              accessibilityLabelPrefix={change > 0 ? 'up ' : change < 0 ? 'down ' : ''}
              color="fgMuted"
              format={{
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }}
              styles={{
                root: {
                  fontSize: '20px',
                  fontWeight: 400,
                  color: 'rgb(91, 97, 110)',
                  marginLeft: '0px',
                },
              }}
              suffix={` (${changePercentage >= 0 ? '+' : ''}${changePercentage.toFixed(2)}%) ${period}`}
              value={Math.abs(change)}
            />
            <Icon name="caretRight" size="xs" color="fgMuted" />
          </HStack>
        </VStack>
        
        {/* Sparkline Chart */}
        <Box flexShrink={0}>
          <Sparkline 
            data={sparklineData} 
            width={228} 
            height={75} 
            color="#0052FF"
          />
        </Box>
      </HStack>

      {/* Assets Section */}
      <VStack gap={0}>
        {/* Crypto Asset Row */}
        <Pressable>
          <HStack paddingY={4} gap={3} alignItems="center" justifyContent="space-between" width="100%" style={{ borderBottom: '1px solid #F0F2F5' }}>
            <HStack gap={3} alignItems="center">
              <Box width="30px" height="30px" style={{ borderRadius: '50%' }} background="bgAlternate" display="flex" alignItems="center" justifyContent="center">
                <Icon name="coinsCrypto" size="s" style={{ color: '#000000' }} />
              </Box>
              <Text font="headline" style={{ fontSize: '16px' }}>Crypto</Text>
            </HStack>

            <HStack gap={3} alignItems="center">
              <Text font="body" color="fgPrimary">Buy</Text>
              <Icon name="caretRight" size="xs" />
            </HStack>
          </HStack>
        </Pressable>

        {/* Cash Asset Row */}
        <Pressable>
          <HStack paddingY={4} gap={3} alignItems="center" justifyContent="space-between" width="100%">
            <HStack gap={3} alignItems="center">
              <Box width="30px" height="30px" style={{ borderRadius: '50%' }} background="bgAlternate" display="flex" alignItems="center" justifyContent="center">
                <Icon name="moneyCardCoin" size="s" style={{ color: '#000000' }} />
              </Box>
              <Text font="headline" style={{ fontSize: '16px' }}>Cash</Text>
            </HStack>

            <HStack gap={3} alignItems="center">
              <Text font="headline">{formatCurrency(cashBalance)}</Text>
              <Icon name="caretRight" size="xs" />
            </HStack>
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
};
