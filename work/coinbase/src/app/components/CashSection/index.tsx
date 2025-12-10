'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

interface CashSectionProps {
  balance: number;
}

export const CashSection = ({ balance }: CashSectionProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <VStack gap={4} paddingTop={4} paddingBottom={8}>
      <Text font="title3">Cash</Text>
      
      <VStack gap={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text font="body">Real</Text>
          <Text font="headline">{formatCurrency(balance)}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
