'use client';
import { Box, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState } from 'react';
import avatarImg from '../../assets/avatar.png';

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

interface TopNavbarProps {
  title?: string;
}

export const TopNavbar = ({ title = 'Home' }: TopNavbarProps) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

          {/* User Avatar */}
          <Box
            as="button"
            border="none"
            cursor="pointer"
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
        </HStack>
      </HStack>
    </Box>
  );
};
