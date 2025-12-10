'use client';
import { IconButton } from '@coinbase/cds-web/buttons';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState, useRef, useEffect } from 'react';

// Coinbase Logo Icon (blue C)
const CoinbaseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path
      d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM13.5 19.5C12.12 19.5 11 18.38 11 17V15C11 13.62 12.12 12.5 13.5 12.5H18.5C19.88 12.5 21 13.62 21 15V17C21 18.38 19.88 19.5 18.5 19.5H13.5Z"
      fill="white"
    />
  </svg>
);

// Advanced Icon (half blue/half yellow circle)
const AdvancedIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#0052FF" />
    <path d="M16 2C23.732 2 30 8.268 30 16C30 23.732 23.732 30 16 30V2Z" fill="#FFC107" />
    <circle cx="16" cy="16" r="6" fill="white" />
  </svg>
);

// Base App Icon
const BaseAppIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0052FF" />
    <circle cx="16" cy="16" r="8" fill="white" />
  </svg>
);

// Business Icon
const BusinessIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="8" width="12" height="22" fill="#0052FF" />
    <rect x="16" y="2" width="14" height="12" fill="#FFC107" />
    <rect x="16" y="16" width="14" height="14" fill="#0052FF" />
  </svg>
);

// Prime Icon (blue gradient circle)
const PrimeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="primeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0052FF" />
        <stop offset="100%" stopColor="#00D4FF" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#primeGradient)" />
  </svg>
);

// Exchange Icon
const ExchangeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" fill="#0052FF" />
    <rect x="18" y="4" width="10" height="10" fill="#00D4FF" />
    <rect x="4" y="18" width="10" height="10" fill="#00D4FF" />
    <rect x="18" y="18" width="10" height="10" fill="#0052FF" />
  </svg>
);

// Derivatives Icon
const DerivativesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="8" width="10" height="16" fill="#0052FF" transform="rotate(-10 4 8)" />
    <rect x="14" y="6" width="10" height="16" fill="#00D4FF" transform="rotate(10 14 6)" />
  </svg>
);

// Dev Platform Icon
const DevPlatformIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0052FF" />
    <path d="M10 16L14 12L10 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20H24" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Dev Docs Icon
const DevDocsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#0052FF" />
    <circle cx="12" cy="16" r="4" fill="#FFC107" />
    <circle cx="20" cy="16" r="4" fill="#FFC107" />
  </svg>
);

// Base Build Icon
const BaseBuildIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" fill="#0052FF" />
    <rect x="18" y="4" width="10" height="10" fill="#00D4FF" />
    <rect x="4" y="18" width="24" height="10" fill="#0052FF" />
  </svg>
);

// Help Icon
const HelpIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0052FF" />
    <path d="M16 8C13.24 8 11 10.24 11 13H14C14 11.9 14.9 11 16 11C17.1 11 18 11.9 18 13C18 14.1 17.1 15 16 15C15.45 15 15 15.45 15 16V19H17V16.9C18.72 16.44 20 14.87 20 13C20 10.24 17.76 8 16 8ZM15 21V23H17V21H15Z" fill="white" />
  </svg>
);

// Account Icon
const AccountIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#F0F0F0" />
    <circle cx="16" cy="12" r="5" fill="#666" />
    <path d="M8 26C8 21.58 11.58 18 16 18C20.42 18 24 21.58 24 26" stroke="#666" strokeWidth="2" />
  </svg>
);


// Grid Icon
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="5" r="2" fill="currentColor" />
    <circle cx="12" cy="5" r="2" fill="currentColor" />
    <circle cx="19" cy="5" r="2" fill="currentColor" />
    <circle cx="5" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="19" cy="12" r="2" fill="currentColor" />
    <circle cx="5" cy="19" r="2" fill="currentColor" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
    <circle cx="19" cy="19" r="2" fill="currentColor" />
  </svg>
);

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const MenuItem = ({ icon, label, onClick }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      as="button"
      onClick={onClick}
      background="transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        padding: '12px 8px',
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
        borderRadius: '12px',
        transition: 'background-color 0.15s ease',
        border: 'none',
        cursor: 'pointer',
        gap: '8px',
      }}
    >
      {icon}
      <Text font="body" style={{ color: '#000', fontSize: '12px', textAlign: 'center' }}>
        {label}
      </Text>
    </Box>
  );
};

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection = ({ title, children }: MenuSectionProps) => (
  <VStack gap={1} style={{ marginBottom: '16px' }}>
    <HStack alignItems="center" justifyContent="space-between" style={{ width: '100%', paddingLeft: '8px', paddingRight: '8px' }}>
      <Text font="body" style={{ color: '#666', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </Text>
    </HStack>
    <HStack gap={0} style={{ flexWrap: 'wrap' }}>
      {children}
    </HStack>
  </VStack>
);

export const MoreMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box style={{ position: 'relative' }}>
      <Box
        as="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        background="transparent"
        style={{
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GridIcon />
      </Box>

      {isOpen && (
        <Box
          ref={menuRef}
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            width: '320px',
            maxHeight: '80vh',
            overflowY: 'auto',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            padding: '16px 8px',
          }}
        >
          {/* FOR INDIVIDUALS */}
          <MenuSection title="For Individuals">
            <MenuItem icon={<CoinbaseIcon />} label="Coinbase" />
            <MenuItem icon={<AdvancedIcon />} label="Advanced" />
            <MenuItem icon={<BaseAppIcon />} label="Base App" />
          </MenuSection>

          {/* FOR BUSINESSES */}
          <MenuSection title="For Businesses">
            <MenuItem icon={<BusinessIcon />} label="Business" />
          </MenuSection>

          {/* FOR INSTITUTIONS */}
          <MenuSection title="For Institutions">
            <MenuItem icon={<PrimeIcon />} label="Prime" />
            <MenuItem icon={<ExchangeIcon />} label="Exchange" />
            <MenuItem icon={<DerivativesIcon />} label="Derivatives" />
          </MenuSection>

          {/* FOR DEVELOPERS */}
          <MenuSection title="For Developers">
            <MenuItem icon={<DevPlatformIcon />} label="Dev Platform" />
            <MenuItem icon={<DevDocsIcon />} label="Dev Docs" />
            <MenuItem icon={<BaseBuildIcon />} label="Base Build" />
          </MenuSection>

          {/* MORE */}
          <MenuSection title="More">
            <MenuItem icon={<HelpIcon />} label="Help" />
            <MenuItem icon={<AccountIcon />} label="Account" />
          </MenuSection>
        </Box>
      )}
    </Box>
  );
};
