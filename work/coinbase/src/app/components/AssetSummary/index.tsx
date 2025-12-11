'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Pressable } from '@coinbase/cds-web/system';
import { Icon } from '@coinbase/cds-web/icons';

interface AssetSummaryProps {
  cryptoBalance: number;
  cashBalance: number;
}

export const AssetSummary = ({ cryptoBalance, cashBalance }: AssetSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <VStack gap={0}>
      {/* Crypto Asset Row */}
      <Pressable>
        <HStack paddingY={4} gap={3} alignItems="center" justifyContent="space-between" width="100%" style={{ borderBottom: '1px solid #F0F2F5' }}>
          <HStack gap={3} alignItems="center">
            <Box width="40px" height="40px" style={{ borderRadius: '50%' }} background="bgAlternate" display="flex" alignItems="center" justifyContent="center">
              <Icon name="coinsCrypto" size="m" />
            </Box>
            <Text font="headline" style={{ fontSize: '18px' }}>Crypto</Text>
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
            <Box width="40px" height="40px" style={{ borderRadius: '50%' }} background="bgAlternate" display="flex" alignItems="center" justifyContent="center">
              <Icon name="moneyCardCoin" size="m" />
            </Box>
            <Text font="headline" style={{ fontSize: '18px' }}>Cash</Text>
          </HStack>

          <HStack gap={3} alignItems="center">
            <Text font="headline">{formatCurrency(cashBalance)}</Text>
            <Icon name="caretRight" size="xs" />
          </HStack>
        </HStack>
      </Pressable>
    </VStack>
  );
};
