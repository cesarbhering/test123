'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Icon } from '@coinbase/cds-web/icons';

interface ForYouCardProps {
  title: string;
  description: string;
  iconName?: string;
  iconBg?: string;
  onClose?: () => void;
}

const ForYouCard = ({ title, description, iconName, iconBg, onClose }: ForYouCardProps) => {
  return (
    <Box
      minWidth="350px"
      padding={4}
      background="bgSecondary"
      style={{ borderRadius: '16px' }}
      position="relative"
    >
      {onClose && (
        <Box position="absolute" top={4} right={4} style={{ cursor: 'pointer' }} onClick={onClose}>
          <Icon name="close" size="xs" />
        </Box>
      )}
      <HStack gap={4} alignItems="center">
        {iconName && (
          <Box 
            width="48px" 
            height="48px" 
            style={{ borderRadius: iconBg ? '12px' : '50%', background: iconBg || '#0052FF' }} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            {iconName === 'C' ? (
              <Text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>C</Text>
            ) : (
              <Icon name="lightningBolt" size="m" />
            )}
          </Box>
        )}
        <VStack gap={1}>
          <Text font="headline">{title}</Text>
          <Text font="body" color="fgMuted">{description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export const ForYouSection = () => {
  return (
    <VStack gap={4} paddingTop={4}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text font="title3">For you</Text>
        <HStack gap={2}>
          <Box width="32px" height="32px" style={{ borderRadius: '50%' }} background="bgAlternate" display="flex" alignItems="center" justifyContent="center">
            <Icon name="arrowLeft" size="xs" />
          </Box>
          <Box width="32px" height="32px" style={{ borderRadius: '50%' }} background="bgAlternate" display="flex" alignItems="center" justifyContent="center">
            <Icon name="arrowRight" size="xs" />
          </Box>
        </HStack>
      </HStack>

      <HStack gap={4} style={{ overflow: 'auto', paddingBottom: '16px' }}>
        <ForYouCard
          title="Save on trading fees"
          description="Try Coinbase One for free"
          iconName="lightning"
        />
        <ForYouCard
          title="Mark Your Calendar"
          description="Hear about the next chapter..."
          iconName="C"
          iconBg="#0052FF"
        />
        <Box
          minWidth="100px"
          padding={4}
          background="bgSecondary"
          style={{ borderRadius: '16px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="48px" height="48px" style={{ background: '#0052FF' }} />
        </Box>
      </HStack>
    </VStack>
  );
};
