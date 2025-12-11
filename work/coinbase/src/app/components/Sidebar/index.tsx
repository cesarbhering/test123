'use client';
import { Box, VStack, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { Switch } from '@coinbase/cds-web/controls';
import { useState, useEffect, useRef } from 'react';
import mainLogo from '../../assets/logo.svg';
import candleIconImg from '../../assets/candle.png';
import { borderRadius } from '@coinbase/cds-web/styles/responsive/base';

interface NavItemProps {
  Icon: React.ComponentType<{ color?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const HomeIcon = ({ color = 'black' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TradeIcon = ({ color = 'black' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17L9 11L13 15L21 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 7H21V11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CreditCardIcon = ({ color = 'black' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M2 10H22" stroke={color} strokeWidth="2" />
  </svg>
);

const CoinbaseOneIcon = ({ color = 'black' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <path
      d="M12 8V16M8 12H16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const TransactionsIcon = ({ color = 'black' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MoreIcon = ({ color = 'black' }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="2" fill={color} />
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="19" cy="12" r="2" fill={color} />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CryptoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#5B616E" strokeWidth="2" />
    <path d="M12 6V8M12 16V18M8 12H6M18 12H16" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DerivativesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 4L10 10M14 10L20 4M4 20L10 14M14 14L20 20" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RecurringIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#5B616E" strokeWidth="2" />
    <path d="M12 7V12L15 15" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TokenSalesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#5B616E" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="#5B616E" strokeWidth="2" />
  </svg>
);

const CashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#5B616E" strokeWidth="2" />
    <path d="M12 9V15M9 12H15" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const StakingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="#5B616E" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 12L12 16L20 12" stroke="#5B616E" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 16L12 20L20 16" stroke="#5B616E" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const RewardsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15 8L21 9L16.5 14L18 21L12 17L6 21L7.5 14L3 9L9 8L12 2Z" stroke="#5B616E" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const InviteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="4" stroke="#5B616E" strokeWidth="2" />
    <path d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 8V14M16 11H22" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DebitCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#5B616E" strokeWidth="2" />
    <path d="M6 15H10" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TaxesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 4H20V20H4V4Z" stroke="#5B616E" strokeWidth="2" />
    <path d="M8 8L16 16M16 8L8 16" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OnchainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#5B616E" strokeWidth="2" />
    <path d="M9 12L11 14L15 10" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ApiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M8 9L4 12L8 15M16 9L20 12L16 15M14 4L10 20" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CandleIcon = () => (
  <img src={candleIconImg.src} alt="Trading Chart" width={20} height={20} />
);

const CoinbaseLogo = () => (
  <img src={mainLogo.src} alt="Coinbase" width={32} height={32} />
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
      width="100%"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: 'left',
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
        borderRadius: '8px',
        transition: 'background-color 0.15s ease',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <HStack alignItems="center" gap={2} paddingX={2} paddingY={1.5}>
        {icon}
        <Text font="body" style={{ color: '#000', fontSize: '14px' }}>
          {label}
        </Text>
      </HStack>
    </Box>
  );
};

const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap={0} style={{ marginBottom: '24px' }}>
    <Text font="body" style={{ color: '#5B616E', fontSize: '12px', fontWeight: 700, paddingLeft: '8px', paddingBottom: '4px' }}>
      {title}
    </Text>
    <VStack gap={0} width="100%">
      {children}
    </VStack>
  </VStack>
);

interface SeeAllMenuProps {
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const SeeAllMenu = ({ onClose, menuRef }: SeeAllMenuProps) => (
  <Box
    ref={menuRef}
    display="flex"
    flexDirection="column"
    style={{
      position: 'absolute',
      left: '100%',
      top: 0,
      width: 220,
      height: '100vh',
      backgroundColor: 'white',
      borderLeft: '1px solid #E8EAED',
      boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
      zIndex: 100,
      overflowY: 'auto',
    }}
    paddingY={2}
    paddingX={1}
  >
    {/* Close button */}
    <Box
      as="button"
      onClick={onClose}
      background="transparent"
      style={{ position: 'absolute', top: 16, right: 16, border: 'none', cursor: 'pointer' }}
    >
      <CloseIcon />
    </Box>

    {/* TRADE Section */}
    <MenuSection title="TRADE">
      <MenuItem icon={<CryptoIcon />} label="Crypto" />
      <MenuItem icon={<DerivativesIcon />} label="Derivatives" />
      <MenuItem icon={<RecurringIcon />} label="Recurring buys" />
      <MenuItem icon={<TokenSalesIcon />} label="Token sales" />
    </MenuSection>

    {/* EARN Section */}
    <MenuSection title="EARN">
      <MenuItem icon={<CashIcon />} label="Cash" />
      <MenuItem icon={<StakingIcon />} label="Staking" />
      <MenuItem icon={<RewardsIcon />} label="Rewards" />
      <MenuItem icon={<InviteIcon />} label="Invite friends" />
    </MenuSection>

    {/* TRANSACT Section */}
    <MenuSection title="TRANSACT">
      <MenuItem icon={<CreditCardIcon color="#5B616E" />} label="Credit card" />
      <MenuItem icon={<DebitCardIcon />} label="Debit card" />
    </MenuSection>

    {/* MORE Section */}
    <MenuSection title="MORE">
      <MenuItem icon={<TaxesIcon />} label="Taxes" />
      <MenuItem icon={<OnchainIcon />} label="Onchain verifications" />
      <MenuItem icon={<ApiIcon />} label="Advanced API" />
    </MenuSection>
  </Box>
);

const NavItem = ({ Icon, label, active, onClick }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = active ? '#0052FF' : 'black';

  const getBackgroundColor = () => {
    if (active) return 'rgba(131, 185, 255, 0.11)';
    if (isHovered) return 'rgba(0, 0, 0, 0.05)';
    return 'transparent';
  };

  return (
    <Box
      as="button"
      onClick={onClick}
      background="transparent"
      width="100%"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: 'left',
        backgroundColor: getBackgroundColor(),
        borderRadius: '80px',
        transition: 'background-color 0.15s ease',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <HStack alignItems="center" gap={2} paddingX={3} paddingY={2}>
        <Icon color={color} />
        <Text
          font="body"
          style={{ color, fontWeight: active ? 600 : 400 }}
        >
          {label}
        </Text>
      </HStack>
    </Box>
  );
};

interface SidebarProps {
  activeItem: string;
  onActiveItemChange: (id: string, label: string) => void;
}

export const Sidebar = ({ activeItem, onActiveItemChange }: SidebarProps) => {
  const [advancedEnabled, setAdvancedEnabled] = useState(false);
  const [seeAllOpen, setSeeAllOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (seeAllOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSeeAllOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [seeAllOpen]);

  const navItems = [
    { id: 'home', Icon: HomeIcon, label: 'Home' },
    { id: 'trade', Icon: TradeIcon, label: 'Trade' },
    { id: 'credit-card', Icon: CreditCardIcon, label: 'Credit card' },
    { id: 'coinbase-one', Icon: CoinbaseOneIcon, label: 'Coinbase One' },
    { id: 'transactions', Icon: TransactionsIcon, label: 'Transactions' },
    { id: 'see-all', Icon: MoreIcon, label: 'See all' },
  ];

  return (
    <Box
      width={240}
      minWidth={200}
      height="100vh"
      paddingY={1}
      display="flex"
      flexDirection="column"
      style={{
        backgroundColor: '#ffffffff',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* See All Menu */}
      {seeAllOpen && <SeeAllMenu onClose={() => setSeeAllOpen(false)} menuRef={menuRef} />}
      {/* Logo */}
      <Box paddingX={3} paddingY={2} style={{ marginBottom: '16px' }}>
        <CoinbaseLogo />
      </Box>

      {/* Navigation Items */}
      <VStack gap={0.5} paddingX={2}>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            Icon={item.Icon}
            label={item.label}
            active={activeItem === item.id}
            onClick={() => {
              if (item.id === 'see-all') {
                setSeeAllOpen(true);
              } else {
                onActiveItemChange(item.id, item.label);
              }
            }}
          />
        ))}
        
      </VStack>

      {/* Spacer */}
      <Box style={{ flexGrow: 1 }} />

      {/* Advanced Toggle */}
      <Box paddingX={2} paddingBottom={.5}>
        <HStack alignItems="center" gap={1} paddingX={3} paddingY={2}>
          <CandleIcon />
          <Text font="body" style={{ color: 'black' }}>
            Advanced
          </Text>
          <Box style={{ flexGrow: 1 }} />
          <Box style={{ transform: 'scale(0.75)', transformOrigin: 'right center' }}>
            <Switch
              checked={advancedEnabled}
              onChange={() => setAdvancedEnabled(!advancedEnabled)}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};
