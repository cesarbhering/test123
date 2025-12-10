'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

interface CryptoSectionProps {
  balance: number;
}

export const CryptoSection = ({ balance }: CryptoSectionProps) => {
  return (
    <VStack gap={4} paddingTop={4} paddingBottom={8}>
      <Text font="title3">Crypto</Text>
      
      <VStack gap={4}>
        {/* Placeholder for crypto assets */}
        <Text font="body" color="fgMuted">
          R${balance.toFixed(2)} (0.00%) today
        </Text>
      </VStack>
    </VStack>
  );
};
