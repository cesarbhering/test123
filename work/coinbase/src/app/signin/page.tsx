'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@coinbase/cds-web';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { Box, VStack, HStack, Divider } from '@coinbase/cds-web/layout';
import { MediaQueryProvider, Pressable } from '@coinbase/cds-web/system';
import { Text, Link } from '@coinbase/cds-web/typography';
import { TextInput } from '@coinbase/cds-web/controls';
import { Button } from '@coinbase/cds-web/buttons';
import { LogoMark } from '@coinbase/cds-web/icons';
import { useUser } from '../context/UserContext';

// Custom SVG icons for social login
const PasskeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// Social login button component
const SocialButton = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <Pressable
    background="bgSecondary"
    borderRadius={1000}
    width="100%"
  >
    <HStack
      width="100%"
      justifyContent="center"
      alignItems="center"
      gap={1}
      paddingY={1.5}
    >
      {icon}
      <Text font="headline">{children}</Text>
    </HStack>
  </Pressable>
);

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = isValidEmail(email);

  const handleContinue = () => {
    if (isEmailValid) {
      setShowPasswordForm(true);
      setError(''); // Clear any previous errors
    }
  };

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isEmailValid) {
      handleContinue();
    }
  };

  const handlePasswordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && password && !isLoading) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in context
        setUser(data.user);
        // Success - navigate to /home
        router.push('/home');
      } else {
        // Error - show error message
        setError('Your email or password are incorrect; try again.');
      }
    } catch (err) {
      setError('Your email or password are incorrect; try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme="light">
        <Box background="bg" minHeight="100vh" width="100%">
          {/* Coinbase Logo */}
          <Box padding={3}>
            <LogoMark size={32} />
          </Box>

          {/* Centered Login Card */}
          <VStack
            width="100%"
            alignItems="center"
            paddingTop={8}
          >
            <Box
              width={400}
              padding={4}
              borderRadius={300}
              borderWidth={100}
              borderColor="bgLine"
            >
              <VStack gap={3} width="100%">
                {!showPasswordForm ? (
                  <>
                  {/* Title */}
                  <Text as="h1" font="title1" textAlign="center">
                    Sign in to Coinbase
                  </Text>

                  {/* Email Input */}
                  <VStack gap={0.5} width="100%">
                    <Text as="label" font="label1">
                      Email
                    </Text>
                    <TextInput
                      accessibilityLabel="Email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                    />
                  </VStack>

                  {/* Continue Button */}
                  <Button variant="primary" width="100%" disabled={!isEmailValid} onClick={handleContinue}>
                    Continue
                  </Button>

                  {/* OR Divider */}
                  <HStack width="100%" alignItems="center" gap={2}>
                    <Box flexGrow={1}>
                      <Divider />
                    </Box>
                    <Text font="label2" color="fgMuted">
                      OR
                    </Text>
                    <Box flexGrow={1}>
                      <Divider />
                    </Box>
                  </HStack>

                  {/* Social Sign-in Buttons */}
                  <VStack gap={1.5} width="100%">
                    <SocialButton icon={<PasskeyIcon />}>
                      Sign in with Passkey
                    </SocialButton>

                    <SocialButton icon={<GoogleIcon />}>
                      Sign in with Google
                    </SocialButton>

                    <SocialButton icon={<AppleIcon />}>
                      Sign in with Apple
                    </SocialButton>
                  </VStack>

                  {/* Sign up link */}
                  <VStack paddingTop={1} alignItems="center">
                    <Text font="body" textAlign="center" as="p">
                      Don't have an account?{' '}
                      <Link href="#">Sign up</Link>
                    </Text>
                  </VStack>

                  {/* Privacy notice */}
                  <VStack gap={0} alignItems="center">
                    <Text font="legal" color="fgMuted" textAlign="center">
                      Not your device? Use a private window.
                    </Text>
                    <Text font="legal" color="fgMuted" textAlign="center">
                      See our{' '}
                      <Link href="#">
                        Privacy Policy
                      </Link>{' '}
                      for more info.
                    </Text>
                  </VStack>
                  </>
                ) : (
                  <>
                  {/* Title */}
                  <Text as="h1" font="title1" textAlign="center">
                    Sign in to Coinbase
                  </Text>
                  
                  <Text font="body" textAlign="center" color="fgMuted">
                    To continue to Account Management
                  </Text>

                  {/* Email Display with Avatar */}
                  <HStack
                    gap={1.5}
                    alignItems="center"
                    padding={1.5}
                    background="bgSecondary"
                    borderRadius={200}
                  >
                    <Box
                      width={32}
                      height={32}
                      borderRadius={1000}
                      background="bgLine"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text font="body" color="fgMuted">
                        👤
                      </Text>
                    </Box>
                    <Text font="body">{email}</Text>
                  </HStack>

                  {/* Password Input */}
                  <VStack gap={0.5} width="100%">
                    <Text as="label" font="label1">
                      Password
                    </Text>
                    <Box
                      width="100%"
                      style={{
                        border: error ? '2px solid #f0616d' : 'none',
                        borderRadius: '8px',
                      }}
                    >
                      <TextInput
                        accessibilityLabel="Password"
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError(''); // Clear error when user types
                        }}
                        onKeyPress={handlePasswordKeyPress}
                      />
                    </Box>
                    {error && (
                      <Text font="label2" style={{ color: '#f0616d' }}>
                        {error}
                      </Text>
                    )}
                  </VStack>

                  {/* Forgot Password Link */}
                  <Box width="100%">
                    <Link href="/forgot-password">
                      Forgot password?
                    </Link>
                  </Box>

                  {/* Continue Button */}
                  <Button
                    variant="primary"
                    width="100%"
                    disabled={!password || isLoading}
                    onClick={handleLogin}
                  >
                    {isLoading ? 'Signing in...' : 'Continue'}
                  </Button>

                  {/* Cancel Login Link */}
                  <Box width="100%" display="flex" justifyContent="center">
                    <Pressable onClick={() => setShowPasswordForm(false)}>
                      <Text font="body" color="fgPrimary">
                        Cancel login
                      </Text>
                    </Pressable>
                  </Box>
                  </>
                )}
                </VStack>
            </Box>
          </VStack>
        </Box>
      </ThemeProvider>
    </MediaQueryProvider>
  );
};

export default LoginPage;
