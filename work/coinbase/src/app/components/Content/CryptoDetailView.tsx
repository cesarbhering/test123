'use client';
import { Text } from '@coinbase/cds-web/typography';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { CryptoAsset } from './TradeContent';
import noTransactionsImg from '../../assets/noTransactions.svg';

interface CryptoDetailViewProps {
  asset: CryptoAsset;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectAsset?: (asset: CryptoAsset) => void;
}

// Generate crypto icon based on symbol
const getCryptoIconColor = (symbol: string): string => {
  const colors: Record<string, string> = {
    VIRTUAL: '#8B5CF6',
    REPPO: '#6366F1',
    DEGEN: '#06B6D4',
    PING: '#8B5CF6',
    ZEN: '#F59E0B',
    BTC: '#F7931A',
    ETH: '#627EEA',
    SOL: '#9945FF',
    SUI: '#4DA2FF',
    BCH: '#8DC351',
    TAO: '#0A0B0D',
    TRUMP: '#FFD200',
    ADA: '#0033AD',
  };
  return colors[symbol] || '#0052FF';
};

const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? '#F5A623' : 'none'}>
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke={filled ? '#F5A623' : '#D1D5DB'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReceiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BankIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 21H21M3 10H21M5 10V21M19 10V21M9 10V21M15 10V21M12 3L21 10H3L12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WithdrawIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2" />
    <path d="M3 10H21" stroke="white" strokeWidth="2" />
  </svg>
);

interface ChartDataPoint {
  x: number;
  y: number;
  price: number;
  date: string;
}

// Interactive chart component
const InteractivePriceChart = ({
  asset,
  timeRange,
  onHover
}: {
  asset: CryptoAsset;
  timeRange: string;
  onHover: (point: ChartDataPoint | null) => void;
}) => {
  const isPositive = asset.change24h >= 0;
  const color = isPositive ? '#00D395' : '#E53935';

  // Generate chart data points based on time range
  const chartData = useMemo(() => {
    const points: ChartDataPoint[] = [];
    const width = 600;
    const height = 200;
    const numPoints = 60;

    const now = new Date();
    let timeMultiplier = 1; // hours
    let dateFormat: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };

    switch (timeRange) {
      case '1H':
        timeMultiplier = 1 / 60; // minutes
        dateFormat = { hour: 'numeric', minute: '2-digit' };
        break;
      case '1D':
        timeMultiplier = 24 / numPoints;
        dateFormat = { hour: 'numeric', minute: '2-digit' };
        break;
      case '1W':
        timeMultiplier = (24 * 7) / numPoints;
        dateFormat = { weekday: 'short', hour: 'numeric' };
        break;
      case '1M':
        timeMultiplier = (24 * 30) / numPoints;
        dateFormat = { month: 'short', day: 'numeric' };
        break;
      case '1Y':
        timeMultiplier = (24 * 365) / numPoints;
        dateFormat = { month: 'short', day: 'numeric' };
        break;
      case 'ALL':
        timeMultiplier = (24 * 365 * 3) / numPoints;
        dateFormat = { year: 'numeric', month: 'short' };
        break;
    }

    // Generate price data with some randomness but trending in the right direction
    const basePrice = asset.marketPrice;
    const priceVariation = basePrice * 0.15; // 15% variation
    const trend = asset.change24h / 100;

    let currentPrice = basePrice * (1 - trend * 0.8); // Start lower/higher based on trend

    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * width;

      // Add some noise and trend
      const noise = (Math.sin(i * 0.5) * 0.3 + Math.cos(i * 0.3) * 0.2 + (Math.random() - 0.5) * 0.4) * priceVariation * 0.3;
      const trendComponent = (i / numPoints) * trend * basePrice;

      currentPrice = basePrice * (1 - trend) + trendComponent + noise;
      currentPrice = Math.max(currentPrice, basePrice * 0.5);

      // Normalize y position
      const minPrice = basePrice * 0.85;
      const maxPrice = basePrice * 1.15;
      const normalizedPrice = (currentPrice - minPrice) / (maxPrice - minPrice);
      const y = height - (normalizedPrice * (height - 40)) - 20;

      const pointDate = new Date(now.getTime() - (numPoints - i) * timeMultiplier * 60 * 60 * 1000);

      points.push({
        x,
        y: Math.max(20, Math.min(height - 20, y)),
        price: currentPrice,
        date: pointDate.toLocaleString('en-US', dateFormat),
      });
    }

    // Ensure last point matches current price
    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      const minPrice = basePrice * 0.85;
      const maxPrice = basePrice * 1.15;
      const normalizedPrice = (basePrice - minPrice) / (maxPrice - minPrice);
      lastPoint.price = basePrice;
      lastPoint.y = height - (normalizedPrice * (height - 40)) - 20;
    }

    return points;
  }, [asset.marketPrice, asset.change24h, timeRange]);

  const pathD = chartData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 600;

    // Find closest point
    let closestIndex = 0;
    let closestDistance = Infinity;
    chartData.forEach((point, index) => {
      const distance = Math.abs(point.x - x);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setHoveredIndex(closestIndex);
    onHover(chartData[closestIndex]);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    onHover(null);
  };

  return (
    <svg
      width="100%"
      height="200"
      viewBox="0 0 600 200"
      preserveAspectRatio="none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'crosshair' }}
    >
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="0"
          y1={40 + i * 40}
          x2="600"
          y2={40 + i * 40}
          stroke="#E5E7EB"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Gradient fill under the line */}
      <defs>
        <linearGradient id={`gradient-${asset.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area under curve */}
      <path
        d={`${pathD} L 600,200 L 0,200 Z`}
        fill={`url(#gradient-${asset.id})`}
      />

      {/* Price line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Hover indicator */}
      {hoveredIndex !== null && chartData[hoveredIndex] && (
        <>
          {/* Vertical line */}
          <line
            x1={chartData[hoveredIndex].x}
            y1="0"
            x2={chartData[hoveredIndex].x}
            y2="200"
            stroke="#5B616E"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Point circle */}
          <circle
            cx={chartData[hoveredIndex].x}
            cy={chartData[hoveredIndex].y}
            r="6"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
};

type OrderTab = 'buy' | 'sell' | 'convert';
type TimeRange = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';

export const CryptoDetailView = ({ asset, onClose, onToggleFavorite, onSelectAsset }: CryptoDetailViewProps) => {
  const [orderTab, setOrderTab] = useState<OrderTab>('buy');
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [amount, setAmount] = useState('0');
  const [infoTab, setInfoTab] = useState<'balance' | 'insights'>('insights');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  // Reset view state when asset changes
  useEffect(() => {
    setInfoTab('insights');
    setTimeRange('1D');
    setOrderTab('buy');
    setAmount('0');
    setHoveredPoint(null);
  }, [asset.id]);

  const color = getCryptoIconColor(asset.symbol);
  const priceChange = asset.marketPrice * (asset.change24h / 100);
  const isPositive = asset.change24h >= 0;

  const displayPrice = hoveredPoint ? hoveredPoint.price : asset.marketPrice;
  const displayDate = hoveredPoint ? hoveredPoint.date : null;

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    }
    return `$${price.toFixed(4)}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        backgroundColor: 'white',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #E5E7EB',
          gap: 16,
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BackArrowIcon />
        </button>
        <Text font="title3" style={{ fontWeight: 600 }}>{asset.symbol}</Text>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
        {/* Left Side - Chart and Info */}
        <div style={{ flex: 1, borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {/* Price Info */}
          <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text font="title1" style={{ fontSize: 36, fontWeight: 500 }}>{formatPrice(displayPrice)}</Text>
                {displayDate ? (
                  <Text font="body" color="fgMuted">{displayDate}</Text>
                ) : (
                  <Text font="body" style={{ color: isPositive ? '#00D395' : '#E53935' }}>
                    {isPositive ? '↗' : '↘'} {formatPrice(Math.abs(priceChange))} ({isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%)
                  </Text>
                )}
              </div>
              <button
                onClick={() => onToggleFavorite(asset.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                <StarIcon filled={asset.isFavorite} />
              </button>
            </div>
          </div>

          {/* Chart */}
          <div style={{ padding: '24px' }}>
            <InteractivePriceChart
              asset={asset}
              timeRange={timeRange}
              onHover={setHoveredPoint}
            />

            {/* Time Range Selector */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 16 }}>
              {(['1H', '1D', '1W', '1M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: timeRange === range ? '#0A0B0D' : 'transparent',
                    border: 'none',
                    borderRadius: 20,
                    cursor: 'pointer',
                  }}
                >
                  <Text font="caption" style={{ color: timeRange === range ? 'white' : '#5B616E' }}>
                    {range}
                  </Text>
                </button>
              ))}
            </div>
          </div>

          {/* Balance / Insights Tabs */}
          <div style={{ borderTop: '1px solid #E5E7EB', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #E5E7EB' }}>
              <button
                onClick={() => setInfoTab('balance')}
                style={{
                  padding: '16px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: infoTab === 'balance' ? '2px solid #0052FF' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <Text font="body" style={{ fontWeight: infoTab === 'balance' ? 600 : 400 }}>Balance</Text>
              </button>
              <button
                onClick={() => setInfoTab('insights')}
                style={{
                  padding: '16px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: infoTab === 'insights' ? '2px solid #0052FF' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <Text font="body" style={{ fontWeight: infoTab === 'insights' ? 600 : 400, color: infoTab === 'insights' ? '#0052FF' : undefined }}>Insights</Text>
              </button>
            </div>

            <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
              {infoTab === 'insights' ? (
                <div>
                  {/* Happening Now Section */}
                  <div style={{ marginBottom: 32 }}>
                    <Text font="body" style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>Happening now</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, backgroundColor: '#0052FF', borderRadius: 2 }} />
                      <Text font="caption" color="fgMuted">AI generated 8h ago</Text>
                    </div>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block', marginBottom: 16 }}>
                      Following the recent market activity, traders are watching whether institutional access can help sustain {asset.symbol}&apos;s recent momentum. The token has seen increased trading volume over the past 24 hours, with significant buy orders coming from major exchanges.
                    </Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block' }}>
                      Market analysts suggest that the current price action reflects growing confidence among retail investors, particularly as the broader cryptocurrency market shows signs of recovery. Technical indicators point to a potential breakout if key resistance levels are breached.
                    </Text>
                  </div>

                  {/* Market Overview Section */}
                  <div style={{ marginBottom: 32 }}>
                    <Text font="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>Market Overview</Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block', marginBottom: 16 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block' }}>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                    </Text>
                  </div>

                  {/* Technical Analysis Section */}
                  <div style={{ marginBottom: 32 }}>
                    <Text font="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>Technical Analysis</Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block', marginBottom: 16 }}>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                    </Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block', marginBottom: 16 }}>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                    </Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block' }}>
                      Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                    </Text>
                  </div>

                  {/* Key Statistics */}
                  <div style={{ marginBottom: 32 }}>
                    <Text font="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>Key Statistics</Text>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                        <Text font="caption" color="fgMuted" style={{ display: 'block', marginBottom: 4 }}>Market Cap</Text>
                        <Text font="body" style={{ fontWeight: 500 }}>{asset.marketCap}</Text>
                      </div>
                      <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                        <Text font="caption" color="fgMuted" style={{ display: 'block', marginBottom: 4 }}>24h Volume</Text>
                        <Text font="body" style={{ fontWeight: 500 }}>{asset.trades > 0 ? `${asset.trades.toLocaleString()} trades` : 'N/A'}</Text>
                      </div>
                      <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                        <Text font="caption" color="fgMuted" style={{ display: 'block', marginBottom: 4 }}>24h Change</Text>
                        <Text font="body" style={{ fontWeight: 500, color: isPositive ? '#00D395' : '#E53935' }}>
                          {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                        </Text>
                      </div>
                      <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
                        <Text font="caption" color="fgMuted" style={{ display: 'block', marginBottom: 4 }}>Current Price</Text>
                        <Text font="body" style={{ fontWeight: 500 }}>{formatPrice(asset.marketPrice)}</Text>
                      </div>
                    </div>
                  </div>

                  {/* Community Sentiment */}
                  <div>
                    <Text font="body" style={{ fontWeight: 600, marginBottom: 12, display: 'block' }}>Community Sentiment</Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block', marginBottom: 16 }}>
                      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                    </Text>
                    <Text font="body" style={{ lineHeight: 1.6, display: 'block' }}>
                      Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                    </Text>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Balance Header */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                        }}
                      >
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <Text font="title4" style={{ display: 'block' }}>$0.00</Text>
                        <Text font="caption" color="fgMuted">0 {asset.symbol}</Text>
                      </div>
                    </div>
                    <button
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: 24,
                        cursor: 'pointer',
                      }}
                    >
                      <Text font="body" style={{ fontWeight: 500 }}>See balance summary</Text>
                    </button>
                  </div>

                  {/* Transactions Section */}
                  <div>
                    <Text font="title4" style={{ display: 'block', marginBottom: 24 }}>Transactions</Text>

                    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <Image
                        src={noTransactionsImg}
                        alt="No transactions"
                        width={200}
                        height={100}
                        style={{ marginBottom: 24 }}
                      />
                      <Text font="title4" style={{ display: 'block', marginBottom: 8 }}>No activity</Text>
                      <Text font="body" color="fgMuted" style={{ display: 'block' }}>
                        Your trades and transfers will appear here
                      </Text>
                    </div>
                  </div>

                  {/* You may also like Section */}
                  <div style={{ marginTop: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <Text font="title4">You may also like</Text>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#F3F4F6',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#F3F4F6',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="#5B616E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Crypto Cards */}
                    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                      {[
                        { symbol: 'SOL', name: 'Solana', price: 137.34, change: -0.90, color: '#9945FF', marketCap: '$63.2B' },
                        { symbol: 'BCH', name: 'Bitcoin Cash', price: 575.53, change: -1.17, color: '#8DC351', marketCap: '$11.4B' },
                        { symbol: 'TAO', name: 'Bittensor', price: 297.92, change: -1.38, color: '#0A0B0D', marketCap: '$2.1B' },
                        { symbol: 'TRUMP', name: 'TRUMP', price: 5.77, change: -2.62, color: '#FFD200', marketCap: '$1.2B' },
                        { symbol: 'ADA', name: 'Cardano', price: 0.45, change: -2.73, color: '#0033AD', marketCap: '$15.8B' },
                        { symbol: 'ETH', name: 'Ethereum', price: 3343.33, change: 0.50, color: '#627EEA', marketCap: '$401.5B' },
                      ].map((crypto, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            if (onSelectAsset) {
                              const newAsset: CryptoAsset = {
                                id: crypto.symbol.toLowerCase(),
                                name: crypto.name,
                                symbol: crypto.symbol,
                                iconUrl: '',
                                marketPrice: crypto.price,
                                trades: 0,
                                marketCap: crypto.marketCap,
                                change24h: crypto.change,
                                isFavorite: false,
                              };
                              onSelectAsset(newAsset);
                            }
                          }}
                          style={{
                            minWidth: 120,
                            padding: 16,
                            backgroundColor: '#F9FAFB',
                            borderRadius: 12,
                            cursor: 'pointer',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              backgroundColor: crypto.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 10,
                              fontWeight: 600,
                              marginBottom: 12,
                            }}
                          >
                            {crypto.symbol.slice(0, 2)}
                          </div>
                          <Text font="caption" color="fgMuted" style={{ display: 'block', marginBottom: 4 }}>{crypto.name}</Text>
                          <Text font="body" style={{ fontWeight: 500, display: 'block' }}>{formatPrice(crypto.price)}</Text>
                          <Text font="caption" style={{ color: crypto.change >= 0 ? '#00D395' : '#E53935' }}>
                            {crypto.change >= 0 ? '↗' : '↘'} {Math.abs(crypto.change).toFixed(2)}%
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Order Panel */}
        <div style={{ width: 380, display: 'flex', flexDirection: 'column', backgroundColor: '#FAFAFA', overflow: 'auto' }}>
          {/* Order Type Tabs */}
          <div style={{ display: 'flex', flexDirection: 'row', padding: '16px 24px', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', backgroundColor: '#E5E7EB', borderRadius: 24, padding: 4 }}>
              {(['buy', 'sell', 'convert'] as OrderTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setOrderTab(tab)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: orderTab === tab ? '#0A0B0D' : 'transparent',
                    border: 'none',
                    borderRadius: 20,
                    cursor: 'pointer',
                  }}
                >
                  <Text font="caption" style={{ color: orderTab === tab ? 'white' : '#0A0B0D', textTransform: 'capitalize' }}>
                    {tab}
                  </Text>
                </button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text font="caption">One-time order</Text>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Amount Input */}
          <div style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Text font="title1" style={{ fontSize: 48, fontWeight: 400, color: amount === '0' ? '#D1D5DB' : '#0A0B0D' }}>
                  {amount}
                </Text>
                <Text font="title2" style={{ color: '#D1D5DB' }}>USD</Text>
              </div>
              <button
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F3F4F6',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                <Text font="caption">Max</Text>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Text font="body" style={{ color: '#0052FF' }}>0 {asset.symbol}</Text>
            </div>

            {/* Pay with */}
            <button
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#0052FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BankIcon />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <Text font="body" style={{ fontWeight: 500 }}>Pay with</Text>
                <Text font="caption" color="fgMuted">Select a payment method</Text>
              </div>
              <ChevronRightIcon />
            </button>

            {/* Buy Asset */}
            <button
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
              }}
            >
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
                }}
              >
                {asset.symbol.slice(0, 2)}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <Text font="body" style={{ fontWeight: 500 }}>Buy</Text>
                <Text font="caption" color="fgMuted">{asset.symbol}</Text>
              </div>
              <ChevronRightIcon />
            </button>

            {/* Continue Button */}
            <button
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#0052FF',
                border: 'none',
                borderRadius: 24,
                cursor: 'pointer',
                marginBottom: 24,
              }}
            >
              <Text font="body" style={{ color: 'white', fontWeight: 500 }}>Continue to payment</Text>
            </button>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: <SendIcon />, label: 'Send crypto', color: '#0052FF' },
                { icon: <ReceiveIcon />, label: 'Receive crypto', color: '#0052FF' },
                { icon: <BankIcon />, label: 'Deposit cash', color: '#0052FF' },
                { icon: <WithdrawIcon />, label: 'Withdraw cash', color: '#0052FF' },
              ].map((action, index) => (
                <button
                  key={index}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: action.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {action.icon}
                  </div>
                  <Text font="body" style={{ fontWeight: 500 }}>{action.label}</Text>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
