'use client';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { Text } from '@coinbase/cds-web/typography';
import { LogoMark } from '@coinbase/cds-web/icons';

export default function HomePage() {
  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <Box background="bg" minHeight="100vh" width="100%">
          {/* Coinbase Logo */}
          <Box padding={3}>
            <LogoMark size={32} />
          </Box>

          {/* Centered Content */}
          <VStack
            width="100%"
            alignItems="center"
            justifyContent="center"
            paddingTop={10}
            gap={3}
          >
            <Text as="h1" font="display2" textAlign="center">
              Welcome to Coinbase
            </Text>

            <Text font="body" color="fgMuted" textAlign="center">
              You have successfully logged in!
            </Text>
          </VStack>
        </Box>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}
