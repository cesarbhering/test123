'use client';
import { useState } from 'react';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { Text, Link } from '@coinbase/cds-web/typography';
import { TextInput } from '@coinbase/cds-web/controls';
import { Button } from '@coinbase/cds-web/buttons';
import { LogoMark } from '@coinbase/cds-web/icons';
import Image from 'next/image';
import NextLink from 'next/link';
import heroImage from './assets/hero-image.avif';
import { fontWeight } from '@coinbase/cds-web/styles/responsive/base';

// Navigation items
const navItems = [
  { label: 'Cryptocurrencies', href: '#' },
  { label: 'Individuals', href: '#' },
  { label: 'Businesses', href: '#' },
  { label: 'Institutions', href: '#' },
  { label: 'Developers', href: '#' },
  { label: 'Company', href: '#' },
];

// Globe icon for language selector
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LandingPage = () => {
  const [email, setEmail] = useState('');

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <VStack width="100%" minHeight="100vh" background="bg" gap={0}>
          {/* Promo Banner */}
          <Box
            width="100%"
            paddingY={1.5}
            display="flex"
            justifyContent="center"
            background="bg"
          >
            <Link href="#" color="fg" style={{ textDecoration: 'underline', fontFamily: 'CoinbaseSans, sans-serif', fontSize: '13px', fontWeight: 'bold' }}>
              Earn up to $2,000 when you buy $50 in crypto¹
            </Link>
          </Box>

          {/* Navigation Bar */}
          <Box
            width="100%"
            paddingX={1.5}
            paddingY={1.5}
            borderTopWidth={100}
            borderBottomWidth={100}
            borderColor="bgLine"
            overflow="hidden"
          >
            <HStack
              width="100%"
              maxWidth={1800}
              alignItems="center"
            >
              {/* Logo and Nav Links - centered */}
              <HStack alignItems="center" gap={5} flexGrow={1} justifyContent="spaceBetween" paddingX="10">
                <Box flexShrink={0}>
                  <LogoMark size={32} />
                </Box>
                <HStack as="nav" gap={6}>
                  {navItems.map((item) => (
                    <Text
                      key={item.label}
                      font="label2"
                      color="fg"
                      style={{ whiteSpace: 'nowrap', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                    >
                      {item.label}
                    </Text>
                  ))}
                </HStack>
              </HStack>

              {/* Right side buttons - far right */}
              <HStack alignItems="center" gap={2} flexShrink={0} paddingX="10">
                <Box
                  as="button"
                  padding={1.5}
                  borderRadius={1000}
                  background="bgSecondary"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <GlobeIcon />
                </Box>
                <NextLink href="/signin">
                  <Button variant="secondary" size="md" style={{ height: '44px' }}>
                    Sign in
                  </Button>
                </NextLink>
                <Button variant="primary" size="md" style={{ height: '44px' }}>
                  Sign up
                </Button>
              </HStack>
            </HStack>
          </Box>

          {/* Hero Section */}
          <Box
            width="100%"
            maxWidth={1905}
            marginX="auto"
            paddingX={6}
            paddingY={8}
          >
            <HStack
              width="100%"
              alignItems="center"
              justifyContent="center"
              gap={6}
            >
              {/* Hero Image - Phone mockups with background */}
              <Box
                background="bgSecondary"
                borderRadius={900}
                padding={0.2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={heroImage}
                  alt="Coinbase app showing crypto portfolio and Ethereum details"
                  width={744}
                  height={744}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>

              {/* Right side content */}
              <VStack
                alignItems="flexStart"
                gap={3}
                maxWidth={700}
              >
                <Text
                  as="h1"
                  font="display1"
                  style={{ fontSize: '80px' }}
                >
                  The future of money is here
                </Text>

                <Text
                  font="title2"
                  color="fg"
                  style={{ fontSize: '18px' }}
                >
                  We're the most trusted place for people and businesses to buy, sell, and use crypto.
                </Text>

                <Text
                  font="body"
                  color="fg"
                  paddingTop={2}
                  style={{ fontSize: '18px' }}
                >
                  Sign up and get up to $2,000 in crypto¹
                </Text>

                {/* Email signup form */}
                <HStack
                  width="75%"
                  gap={2}
                  paddingTop={1}
                >
                  <Box flexGrow={1}>
                    <TextInput
                      accessibilityLabel="Email"
                      placeholder="satoshi@nakamoto.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Button variant="primary" size="lg">
                    Sign up
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </ThemeProvider>
    </MediaQueryProvider>
  );
};

export default LandingPage;
