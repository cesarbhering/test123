'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { ReactNode } from 'react';

export interface ContentTemplateProps {
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  children?: ReactNode;
}

export const ContentTemplate = ({
  title,
  subtitle,
  headerAction,
  children,
}: ContentTemplateProps) => {
  return (
    <Box
      padding={4}
      style={{
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: '#f8f8f8',
      }}
    >
      <VStack gap={4}>
        {(title || headerAction) && (
          <HStack justifyContent="space-between" alignItems="center">
            <VStack gap={1}>
              {title && (
                <Text as="h1" font="title2">
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text as="p" font="body" color="fgMuted">
                  {subtitle}
                </Text>
              )}
            </VStack>
            {headerAction && <Box>{headerAction}</Box>}
          </HStack>
        )}

        <Box style={{ width: '100%' }}>
          {children}
        </Box>
      </VStack>
    </Box>
  );
};
