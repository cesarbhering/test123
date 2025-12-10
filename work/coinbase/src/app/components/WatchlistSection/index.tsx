'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Button } from '@coinbase/cds-web/buttons';
import { Icon } from '@coinbase/cds-web/icons';

export const WatchlistSection = () => {
  return (
    <VStack gap={4} paddingTop={4} paddingBottom={8}>
      <Text font="title3">Watchlist</Text>
      
      <VStack gap={4} alignItems="center" paddingY={8}>
        <Box position="relative">
          <Box width="48px" height="48px" style={{ background: '#FFD700', borderRadius: '50%' }} />
          <Box 
            width="20px" 
            height="20px" 
            background="fgPrimary" 
            style={{ borderRadius: '50%' }} 
            position="absolute" 
            bottom={0}  
            right={0} 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
          >
            <Icon name="add" size="xs" />
          </Box>
        </Box>
        
        <VStack gap={2} alignItems="center">
          <Text font="title3" style={{ textAlign: 'center' }}>Build your watchlist</Text>
          <Text font="body" color="fgMuted" style={{ textAlign: 'center' }}>
            Keep track of crypto prices by adding assets to your watchlist
          </Text>
        </VStack>

        <Button variant="secondary" style={{ borderRadius: '999px', paddingLeft: '24px', paddingRight: '24px' }}>
          Add to watchlist
        </Button>
      </VStack>
    </VStack>
  );
};
