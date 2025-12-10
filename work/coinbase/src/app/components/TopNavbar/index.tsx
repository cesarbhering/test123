'use client';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import avatarImg from '../../assets/avatar.png';
import { useUser } from '../../context/UserContext';

const SearchIcon = ({ color = '#8A919E' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="#5B616E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="#5B616E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#5B616E" strokeWidth="2" />
    <path
      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
      stroke="#5B616E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="17" r="1" fill="#5B616E" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="#5B616E" />
    <rect x="14" y="3" width="7" height="7" rx="1" fill="#5B616E" />
    <rect x="3" y="14" width="7" height="7" rx="1" fill="#5B616E" />
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#5B616E" />
  </svg>
);

const AddAccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B616E" strokeWidth="2">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B616E" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const DarkModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B616E" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Helper function to extract display name from email
const getDisplayNameFromEmail = (email: string): string => {
  const localPart = email.split('@')[0];
  // Capitalize first letter of each word
  return localPart
    .split(/[._-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const words = name.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

interface TopNavbarProps {
  title?: string;
}

export const TopNavbar = ({ title = 'Home' }: TopNavbarProps) => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.name || (user?.email ? getDisplayNameFromEmail(user.email) : 'User');
  const userEmail = user?.email || '';
  const initials = getInitials(displayName);

  const handleSignOut = () => {
    logout();
    setMenuOpen(false);
    router.push('/signin');
  };

  return (
    <Box
      background="bg"
      paddingX={2}
      paddingY={2}
      borderBottomWidth={100}
      borderColor="bgLine"
      width="100%"
    >
      <HStack alignItems="center" justifyContent="space-between" width="100%">
        {/* Left side - Title and Search */}
        <HStack alignItems="center" gap={3}>
          <Text as="h1" font="title3" style={{ fontWeight: 550, fontSize: '28px', paddingLeft: '12px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px' }}>
            {title}
          </Text>
        </HStack>

        {/* Right side - Icons and Avatar */}
        <HStack alignItems="center" gap={1}>
          {/* Search */}
          <Box
            borderRadius="800"
            paddingX={3}
            paddingY={1}
            style={{
              backgroundColor: '#F0F2F5',
              width: searchFocused ? 450 : 375,
              transition: 'all 0.2s ease-in-out',
              border: searchFocused ? '2px solid #0052FF' : '2px solid transparent',
              boxShadow: searchFocused ? '0 4px 12px rgba(0, 82, 255, 0.25)' : 'none',
            }}
          >
            <HStack alignItems="center" gap={2}>
              <SearchIcon color={searchFocused ? '#0052FF' : '#8A919E'} />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: searchFocused ? '#000000ff' : '#8A919E',
                  fontSize: '14px',
                  width: '100%',
                }}
              />
            </HStack>
          </Box>
          {/* Notification bell */}
          <Box
            as="button"
            border="none"
            cursor="pointer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F0F2F5',
              borderRadius: '50%',
              width: 36,
              height: 36,
            }}
          >
            <BellIcon />
          </Box>

          {/* Help */}
          <Box
            as="button"
            border="none"
            cursor="pointer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F0F2F5',
              borderRadius: '50%',
              width: 36,
              height: 36,
            }}
          >
            <QuestionIcon />
          </Box>

          {/* Grid/Apps */}
          <Box
            as="button"
            border="none"
            cursor="pointer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F0F2F5',
              borderRadius: '50%',
              width: 36,
              height: 36,
            }}
          >
            <GridIcon />
          </Box>

          {/* User Avatar with Dropdown */}
          <Box style={{ position: 'relative' }} ref={menuRef}>
            <Box
              as="button"
              border="none"
              cursor="pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                backgroundColor: 'transparent',
                marginLeft: 8,
                padding: 0,
              }}
            >
              <img
                src={avatarImg.src}
                alt="User Avatar"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'block',
                }}
              />
            </Box>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 8,
                  width: 350,
                  backgroundColor: 'white',
                  font: 'menu',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  overflow: 'hidden',
                }}
              >
                {/* User Info Header */}
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={avatarImg.src}
                      alt="User Avatar"
                      style={{
                        font: 'menu',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <span style={{ font: 'menu', fontWeight: 650, fontSize: '16px', color: '#000' }}>
                        {displayName}
                      </span>
                      <span style={{ font: 'menu', fontSize: '14px', color: '#5B616E' }}>
                        {userEmail}
                      </span>
                      <span
                        style={{ font: 'menu', color: '#0052FF', fontSize: '14px', cursor: 'pointer', textDecoration: 'bold' }}
                      >
                        Manage account
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ borderTop: '1px solid #E8EAED' }}>
                  {/* Add account */}
                  <button
                    style={{
                      width: '100%',
                      font: 'menu',
                      padding: '12px 16px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <AddAccountIcon />
                    <span style={{ font: 'menu', fontSize: '16px', color: '#000' }}>Add account</span>
                  </button>

                  {/* Settings */}
                  <button
                    style={{
                      width: '100%',
                      font: 'menu',
                      padding: '12px 16px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <SettingsIcon />
                    <span style={{ font: 'menu', fontSize: '16px', color: '#000' }}>Settings</span>
                  </button>

                  {/* Dark mode */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                      width: '100%',
                      font: 'menu',
                      padding: '12px 16px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <DarkModeIcon />
                      <span style={{ font: 'menu', fontSize: '16px', color: '#000' }}>Dark mode</span>
                    </div>
                    {/* Toggle Switch */}
                    <div
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: darkMode ? '#0052FF' : '#E0E0E0',
                        position: 'relative',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: 2,
                          left: darkMode ? 22 : 2,
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  </button>

                  {/* Sign out */}
                  <button
                    onClick={handleSignOut}
                    style={{
                      width: '100%',
                      font: 'menu',
                      padding: '12px 16px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <SignOutIcon />
                    <span style={{ fontSize: '16px', color: '#E53935' }}>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
