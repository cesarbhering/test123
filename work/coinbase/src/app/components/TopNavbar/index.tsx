'use client';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import avatarImg from '../../assets/avatar.png';
import notificationsImg from '../../assets/notifications.svg';
import settingImg from '../../assets/setting.png';
import { useUser } from '../../context/UserContext';
import { useNotifications, Notification } from '../../context/NotificationContext';
import { initializeSearchData, getSearchData, SearchCryptoAsset } from '../../../lib/tradeData';
import { CryptoAsset } from '../Content/TradeContent';

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

// Grid Menu Icons
const CoinbaseMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM13.5 19.5C12.12 19.5 11 18.38 11 17V15C11 13.62 12.12 12.5 13.5 12.5H18.5C19.88 12.5 21 13.62 21 15V17C21 18.38 19.88 19.5 18.5 19.5H13.5Z" fill="white" />
  </svg>
);

const AdvancedMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#0052FF" />
    <path d="M16 2C23.732 2 30 8.268 30 16C30 23.732 23.732 30 16 30V2Z" fill="#FFC107" />
    <circle cx="16" cy="16" r="6" fill="white" />
  </svg>
);

const BaseAppMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0052FF" />
    <circle cx="16" cy="16" r="8" fill="white" />
  </svg>
);

const BusinessMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="8" width="12" height="22" fill="#0052FF" />
    <rect x="16" y="2" width="14" height="12" fill="#FFC107" />
    <rect x="16" y="16" width="14" height="14" fill="#0052FF" />
  </svg>
);

const PrimeMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="primeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0052FF" />
        <stop offset="100%" stopColor="#00D4FF" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#primeGrad)" />
  </svg>
);

const ExchangeMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" fill="#0052FF" />
    <rect x="18" y="4" width="10" height="10" fill="#00D4FF" />
    <rect x="4" y="18" width="10" height="10" fill="#00D4FF" />
    <rect x="18" y="18" width="10" height="10" fill="#0052FF" />
  </svg>
);

const DerivativesMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="8" width="10" height="16" fill="#0052FF" transform="rotate(-10 4 8)" />
    <rect x="14" y="6" width="10" height="16" fill="#00D4FF" transform="rotate(10 14 6)" />
  </svg>
);

const DevPlatformMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0052FF" />
    <path d="M10 16L14 12L10 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20H24" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DevDocsMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#0052FF" />
    <circle cx="12" cy="16" r="4" fill="#FFC107" />
    <circle cx="20" cy="16" r="4" fill="#FFC107" />
  </svg>
);

const BaseBuildMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="10" height="10" fill="#0052FF" />
    <rect x="18" y="4" width="10" height="10" fill="#00D4FF" />
    <rect x="4" y="18" width="24" height="10" fill="#0052FF" />
  </svg>
);

const HelpMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0052FF" />
    <path d="M16 8C13.24 8 11 10.24 11 13H14C14 11.9 14.9 11 16 11C17.1 11 18 11.9 18 13C18 14.1 17.1 15 16 15C15.45 15 15 15.45 15 16V19H17V16.9C18.72 16.44 20 14.87 20 13C20 10.24 17.76 8 16 8ZM15 21V23H17V21H15Z" fill="white" />
  </svg>
);

const AccountMenuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#F0F0F0" />
    <circle cx="16" cy="12" r="5" fill="#666" />
    <path d="M8 26C8 21.58 11.58 18 16 18C20.42 18 24 21.58 24 26" stroke="#666" strokeWidth="2" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridMenuItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      as="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 96,
        padding: '12px 8px',
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
        borderRadius: 12,
        border: 'none',
        cursor: 'pointer',
        gap: 8,
        transition: 'background-color 0.15s ease',
      }}
    >
      {icon}
      <Text font="caption" style={{ textAlign: 'center' }}>{label}</Text>
    </Box>
  );
};

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

// Notification Bell Illustration
const NotificationBellIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    {/* Bell dome */}
    <ellipse cx="60" cy="35" rx="35" ry="20" fill="#E8EAED" />
    {/* Red dot on bell */}
    <circle cx="80" cy="30" r="10" fill="#E53935" />
    {/* Black arc on bell */}
    <path d="M45 25 Q60 15 75 25" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Bell body */}
    <path d="M30 50 L30 75 Q30 85 40 85 L80 85 Q90 85 90 75 L90 50 Z" fill="#E8EAED" />
    {/* Blue band */}
    <rect x="30" y="70" width="60" height="15" fill="#0052FF" />
    {/* Gray bottom */}
    <rect x="35" y="85" width="50" height="10" fill="#9CA3AF" />
    {/* Yellow clapper */}
    <circle cx="60" cy="100" r="8" fill="#FFC107" />
    {/* Sound lines */}
    <path d="M20 55 L15 50" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 65 L12 65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 75 L15 80" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <path d="M100 55 L105 50" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <path d="M100 65 L108 65" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    <path d="M100 75 L105 80" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Settings Gear Icon
const SettingsGearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#5B616E" strokeWidth="2" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Close/X Icon for notifications
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Notification type icons
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0052FF" />
    <path d="M12 16V12M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#00D395" />
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 22H22L12 2Z" fill="#F5A623" />
    <path d="M12 10V14M12 18H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#E53935" />
    <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PriceAlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0052FF" />
    <path d="M12 6V18M8 10L12 6L16 10M8 14L12 18L16 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TransactionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#00D395" />
    <path d="M7 12H17M17 12L13 8M17 12L13 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Helper to get icon for notification type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'price_alert':
      return <PriceAlertIcon />;
    case 'transaction':
      return <TransactionIcon />;
    default:
      return <InfoIcon />;
  }
};

// Helper to format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

// Chevron Right for notification tabs
const ChevronRightSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

// Crypto Icon colors mapping
const getCryptoIconColor = (symbol: string): string => {
  const colors: Record<string, string> = {
    BTC: '#F7931A',
    ETH: '#627EEA',
    USDT: '#26A17B',
    SOL: '#00FFA3',
    XRP: '#23292F',
    BNB: '#F3BA2F',
    DOGE: '#C2A633',
    ADA: '#0033AD',
    'BTC-PERP': '#F7931A',
    'ETH-PERP': '#627EEA',
    'BTC-USD': '#F7931A',
    'ETH-USD': '#627EEA',
  };
  return colors[symbol] || '#0052FF';
};

// Crypto Icon component for search dropdown
const SearchCryptoIcon = ({ symbol }: { symbol: string }) => {
  const color = getCryptoIconColor(symbol);
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {symbol.slice(0, 2).toUpperCase()}
    </div>
  );
};

// Search Tab type
type SearchTab = 'top' | 'crypto' | 'futures' | 'perpetuals';

interface TopNavbarProps {
  title?: string;
  onSelectCryptoAsset?: (asset: CryptoAsset) => void;
}

export const TopNavbar = ({ title = 'Home', onSelectCryptoAsset }: TopNavbarProps) => {
  const router = useRouter();
  const { user, logout } = useUser();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [gridMenuOpen, setGridMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTab, setSearchTab] = useState<SearchTab>('top');
  const [searchData, setSearchData] = useState<SearchCryptoAsset[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const gridMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Initialize search data on mount
  useEffect(() => {
    initializeSearchData();
    setSearchData(getSearchData());
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (gridMenuRef.current && !gridMenuRef.current.contains(event.target as Node)) {
        setGridMenuOpen(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setNotificationMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search data based on tab and search value
  const getFilteredSearchData = (): SearchCryptoAsset[] => {
    let filtered = [...searchData];

    // Filter by category based on tab
    if (searchTab === 'crypto') {
      filtered = filtered.filter(asset => asset.category === 'crypto');
    } else if (searchTab === 'futures') {
      filtered = filtered.filter(asset => asset.category === 'futures');
    } else if (searchTab === 'perpetuals') {
      filtered = filtered.filter(asset => asset.category === 'perpetuals');
    }
    // 'top' shows all but sorted by rank within crypto category primarily

    // Filter by search value
    if (searchValue.trim()) {
      const query = searchValue.toLowerCase();
      filtered = filtered.filter(
        asset =>
          asset.name.toLowerCase().includes(query) ||
          asset.symbol.toLowerCase().includes(query)
      );
    }

    // Sort by rank
    filtered.sort((a, b) => a.rank - b.rank);

    return filtered;
  };

  // Format price for display
  const formatSearchPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    }
    return `$${price.toFixed(4)}`;
  };

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
          {/* Search with Dropdown */}
          <div ref={searchRef} style={{ position: 'relative' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#F0F2F5',
                borderRadius: searchFocused ? '12px 12px 0 0' : '24px',
                width: searchFocused ? 500 : 375,
                padding: '8px 16px',
                transition: 'all 0.2s ease-in-out',
                border: searchFocused ? '2px solid #0052FF' : '2px solid transparent',
                borderBottom: searchFocused ? '1px solid #E8EAED' : '2px solid transparent',
                boxShadow: searchFocused ? '0 4px 12px rgba(0, 82, 255, 0.25)' : 'none',
                cursor: 'text',
              }}
            >
              <SearchIcon color={searchFocused ? '#0052FF' : '#8A919E'} />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: searchFocused ? '#000000ff' : '#8A919E',
                  fontSize: '14px',
                  width: '100%',
                  flex: 1,
                }}
              />
            </label>

            {/* Search Dropdown */}
            {searchFocused && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: 500,
                  backgroundColor: 'white',
                  borderRadius: '0 0 12px 12px',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  overflow: 'hidden',
                  border: '2px solid #0052FF',
                  borderTop: 'none',
                }}
              >
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 8, padding: '16px 20px', borderBottom: '1px solid #E8EAED' }}>
                  <button
                    onClick={() => setSearchTab('top')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: searchTab === 'top' ? '#0A0B0D' : 'transparent',
                      border: 'none',
                      borderRadius: 20,
                      cursor: 'pointer',
                    }}
                  >
                    <Text font="body" style={{ color: searchTab === 'top' ? 'white' : '#5B616E', fontWeight: 500 }}>Top</Text>
                  </button>
                  <button
                    onClick={() => setSearchTab('crypto')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: searchTab === 'crypto' ? '#0A0B0D' : 'transparent',
                      border: 'none',
                      borderRadius: 20,
                      cursor: 'pointer',
                    }}
                  >
                    <Text font="body" style={{ color: searchTab === 'crypto' ? 'white' : '#5B616E', fontWeight: 500 }}>Crypto</Text>
                  </button>
                  <button
                    onClick={() => setSearchTab('futures')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: searchTab === 'futures' ? '#0A0B0D' : 'transparent',
                      border: 'none',
                      borderRadius: 20,
                      cursor: 'pointer',
                    }}
                  >
                    <Text font="body" style={{ color: searchTab === 'futures' ? 'white' : '#5B616E', fontWeight: 500 }}>Futures</Text>
                  </button>
                  <button
                    onClick={() => setSearchTab('perpetuals')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: searchTab === 'perpetuals' ? '#0A0B0D' : 'transparent',
                      border: 'none',
                      borderRadius: 20,
                      cursor: 'pointer',
                    }}
                  >
                    <Text font="body" style={{ color: searchTab === 'perpetuals' ? 'white' : '#5B616E', fontWeight: 500 }}>Perpetuals</Text>
                  </button>
                </div>

                {/* Category Label */}
                <div style={{ padding: '16px 20px 8px' }}>
                  <Text font="caption" color="fgMuted" style={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 11 }}>
                    {searchTab === 'top' ? 'CRYPTO' : searchTab.toUpperCase()}
                  </Text>
                </div>

                {/* Crypto List */}
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  {getFilteredSearchData().length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <Text font="body" color="fgMuted">No results found</Text>
                    </div>
                  ) : (
                    getFilteredSearchData().map((asset) => (
                      <div
                        key={asset.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '14px 20px',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => {
                          setSearchFocused(false);
                          setSearchValue('');
                          // Convert SearchCryptoAsset to CryptoAsset and navigate
                          if (onSelectCryptoAsset) {
                            const cryptoAsset: CryptoAsset = {
                              id: asset.id,
                              name: asset.name,
                              symbol: asset.symbol,
                              iconUrl: '',
                              marketPrice: asset.price,
                              trades: 0,
                              marketCap: asset.marketCap,
                              change24h: asset.change24h,
                              isFavorite: false,
                            };
                            onSelectCryptoAsset(cryptoAsset);
                          }
                        }}
                      >
                        {/* Icon */}
                        <SearchCryptoIcon symbol={asset.symbol} />

                        {/* Name and Symbol */}
                        <div style={{ marginLeft: 12, flex: 1, minWidth: 120 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Text font="body" style={{ fontWeight: 500 }}>{asset.name}</Text>
                            <Text font="caption" color="fgMuted">#{asset.rank}</Text>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Text font="caption" color="fgMuted">{asset.symbol}</Text>
                            {asset.apy && (
                              <Text font="caption" style={{ color: '#0052FF' }}>{asset.apy}% APY</Text>
                            )}
                          </div>
                        </div>

                        {/* Market Cap and Volume */}
                        <div style={{ textAlign: 'left', marginRight: 32, minWidth: 100 }}>
                          <Text font="caption" color="fgMuted">{asset.marketCap} mcap</Text>
                          <br />
                          <Text font="caption" color="fgMuted">{asset.volume} vol</Text>
                        </div>

                        {/* Price and Change */}
                        <div style={{ textAlign: 'right', minWidth: 100 }}>
                          <Text font="body" style={{ fontWeight: 500 }}>{formatSearchPrice(asset.price)}</Text>
                          <br />
                          <Text font="caption" style={{ color: asset.change24h >= 0 ? '#00D395' : '#E53935' }}>
                            {asset.change24h >= 0 ? '' : ''} {Math.abs(asset.change24h).toFixed(2)}%
                          </Text>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Notification bell */}
          <Box style={{ position: 'relative' }} ref={notificationMenuRef}>
            <Box
              as="button"
              onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F0F2F5',
                borderRadius: '50%',
                width: 36,
                height: 36,
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <BellIcon />
              {/* Unread blue dot */}
              {unreadCount > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: '#0052FF',
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                  }}
                />
              )}
            </Box>

            {/* Notification Dropdown */}
            {notificationMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 8,
                  width: 380,
                  maxHeight: 500,
                  backgroundColor: 'white',
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px' }}>
                  <Text font="title4">Notifications</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: 8,
                        }}
                      >
                        <Text font="caption" style={{ color: '#0052FF' }}>Mark all read</Text>
                      </button>
                    )}
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 4,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={settingImg.src} alt="Settings" width={20} height={20} />
                    </button>
                  </div>
                </div>

                {/* Notifications List or Empty State */}
                {notifications.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 40px', gap: 8 }}>
                    <img src={notificationsImg.src} alt="Notifications" width={120} height={120} />
                    <Text font="title4" style={{ marginTop: 8 }}>All caught up!</Text>
                    <Text font="body" color="fgMuted" style={{ textAlign: 'center', maxWidth: 280 }}>
                      You've read all updates in this category. Feel free to explore other topics or check back later for fresh insights. Stay tuned!
                    </Text>
                  </div>
                ) : (
                  <div style={{ overflowY: 'auto', flex: 1 }}>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          padding: '12px 20px',
                          backgroundColor: notification.read ? 'transparent' : 'rgba(0, 82, 255, 0.05)',
                          cursor: 'pointer',
                          borderBottom: '1px solid #E8EAED',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = notification.read ? '#F5F5F5' : 'rgba(0, 82, 255, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = notification.read ? 'transparent' : 'rgba(0, 82, 255, 0.05)';
                        }}
                      >
                        {/* Icon */}
                        <div style={{ flexShrink: 0, marginTop: 2 }}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                            <Text font="body" style={{ fontWeight: notification.read ? 400 : 600 }}>
                              {notification.title}
                            </Text>
                            <Text font="caption" color="fgMuted" style={{ flexShrink: 0 }}>
                              {formatTimestamp(notification.timestamp)}
                            </Text>
                          </div>
                          <Text font="caption" color="fgMuted" style={{ marginTop: 2 }}>
                            {notification.message}
                          </Text>
                        </div>

                        {/* Close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 4,
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.5,
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '0.5';
                          }}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Box>

          {/* Help */}
          <Box
            as="button"
            onClick={() => console.log('agent clicked help')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F0F2F5',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: 36,
              height: 36,
            }}
          >
            <QuestionIcon />
          </Box>

          {/* Grid/Apps */}
          <Box style={{ position: 'relative' }} ref={gridMenuRef}>
            <Box
              as="button"
              onClick={() => setGridMenuOpen(!gridMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F0F2F5',
                borderRadius: '50%',
                width: 36,
                height: 36,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <GridIcon />
            </Box>

            {/* Grid Menu Dropdown */}
            {gridMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 8,
                  width: 320,
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  backgroundColor: 'white',
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  padding: '16px 8px',
                }}
              >
                {/* FOR INDIVIDUALS */}
                <VStack gap={1} style={{ paddingBottom: 16 }}>
                  <Box paddingX={2} paddingBottom={1}>
                    <Text font="legal" color="fgMuted" style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      For Individuals
                    </Text>
                  </Box>
                  <HStack gap={0} style={{ flexWrap: 'wrap' }}>
                    <GridMenuItem icon={<CoinbaseMenuIcon />} label="Coinbase" />
                    <GridMenuItem icon={<AdvancedMenuIcon />} label="Advanced" />
                    <GridMenuItem icon={<BaseAppMenuIcon />} label="Base App" />
                  </HStack>
                </VStack>

                {/* Divider */}
                <Box style={{ height: 1, backgroundColor: '#E8EAED', marginBottom: 16 }} />

                {/* FOR BUSINESSES */}
                <VStack gap={1} style={{ paddingBottom: 16 }}>
                  <Box paddingX={2} paddingBottom={1}>
                    <Text font="legal" color="fgMuted" style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      For Businesses
                    </Text>
                  </Box>
                  <HStack gap={0} style={{ flexWrap: 'wrap' }}>
                    <GridMenuItem icon={<BusinessMenuIcon />} label="Business" />
                  </HStack>
                </VStack>

                {/* Divider */}
                <Box style={{ height: 1, backgroundColor: '#E8EAED', marginBottom: 16 }} />

                {/* FOR INSTITUTIONS */}
                <VStack gap={1} style={{ paddingBottom: 16 }}>
                  <Box paddingX={2} paddingBottom={1}>
                    <Text font="legal" color="fgMuted" style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      For Institutions
                    </Text>
                  </Box>
                  <HStack gap={0} style={{ flexWrap: 'wrap' }}>
                    <GridMenuItem icon={<PrimeMenuIcon />} label="Prime" />
                    <GridMenuItem icon={<ExchangeMenuIcon />} label="Exchange" />
                    <GridMenuItem icon={<DerivativesMenuIcon />} label="Derivatives" />
                  </HStack>
                </VStack>

                {/* Divider */}
                <Box style={{ height: 1, backgroundColor: '#E8EAED', marginBottom: 16 }} />

                {/* FOR DEVELOPERS */}
                <VStack gap={1} style={{ paddingBottom: 16 }}>
                  <Box paddingX={2} paddingBottom={1}>
                    <Text font="legal" color="fgMuted" style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      For Developers
                    </Text>
                  </Box>
                  <HStack gap={0} style={{ flexWrap: 'wrap' }}>
                    <GridMenuItem icon={<DevPlatformMenuIcon />} label="Dev Platform" />
                    <GridMenuItem icon={<DevDocsMenuIcon />} label="Dev Docs" />
                    <GridMenuItem icon={<BaseBuildMenuIcon />} label="Base Build" />
                  </HStack>
                </VStack>

                {/* Divider */}
                <Box style={{ height: 1, backgroundColor: '#E8EAED', marginBottom: 16 }} />

                {/* MORE */}
                <VStack gap={1}>
                  <Box paddingX={2} paddingBottom={1}>
                    <Text font="legal" color="fgMuted" style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      More
                    </Text>
                  </Box>
                  <HStack gap={0} style={{ flexWrap: 'wrap' }}>
                    <GridMenuItem icon={<HelpMenuIcon />} label="Help" />
                    <GridMenuItem icon={<AccountMenuIcon />} label="Account" />
                  </HStack>
                </VStack>
              </div>
            )}
          </Box>

          {/* User Avatar with Dropdown */}
          <Box style={{ position: 'relative' }} ref={menuRef}>
            <Box
              as="button"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                backgroundColor: 'transparent',
                marginLeft: 8,
                padding: 0,
                border: 'none',
                cursor: 'pointer',
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
