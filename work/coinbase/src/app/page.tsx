'use client';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { Text, Link } from '@coinbase/cds-web/typography';
import { LogoMark } from '@coinbase/cds-web/icons';

export default function Home() {
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
              Work in Progress
            </Text>

            <Text font="body" color="fgMuted" textAlign="center">
              This page is currently under development.
            </Text>

            <Box paddingTop={2}>
              <Link href="/signin">
                Go to Sign In
              </Link>
            </Box>
          </VStack>
        </Box>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}
