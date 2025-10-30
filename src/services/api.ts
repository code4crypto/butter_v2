export interface TokenData {
  name: string;
  symbol: string;
  contract: string;
  marketCap: string;
  liquidity: string;
  volume: string;
  volume5m: string;
  buys: number;
  buyVolume: string;
  sells: number;
  sellVolume: string;
  netVolume: string;
  priceChange: number;
  top10Holders: string;
  devHoldings: string;
  snipersHoldings: string;
  insiders: string;
  bundlers: string;
  lpBurned: string;
  holders: number;
  proTraders: number;
  dexPaid: string;
  txns: number;
  buyTxns: number;
  sellTxns: number;
  imageUrl?: string;
  chartData: Array<{ time: number; value: number }>;
}

export interface APITokenResponse {
  tokens: TokenData[];
  lastUpdate: string;
}

const API_BASE_URL = 'https://api.buttertrade.xyz';

export async function fetchTokens(community?: string): Promise<TokenData[]> {
  try {
    const endpoint = community && community !== 'All'
      ? `${API_BASE_URL}/tokens?community=${encodeURIComponent(community)}`
      : `${API_BASE_URL}/tokens`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      console.warn('API request failed, using mock data');
      return getMockTokens();
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.map((token: any) => ({
        name: token.name || token.symbol,
        symbol: token.symbol,
        contract: token.contract || token.contractAddress || token.address,
        marketCap: formatCurrency(token.marketCap || token.market_cap || 0),
        liquidity: formatCurrency(token.liquidity || 0),
        volume: formatCurrency(token.volume || 0),
        volume5m: formatCurrency(token.volume5m || token.volume_5m || 0),
        buys: token.buys || 0,
        buyVolume: formatCurrency(token.buyVolume || token.buy_volume || 0),
        sells: token.sells || 0,
        sellVolume: formatCurrency(token.sellVolume || token.sell_volume || 0),
        netVolume: formatNetVolume(token.netVolume || token.net_volume || 0),
        priceChange: token.priceChange || token.price_change || 0,
        top10Holders: formatPercent(token.top10Holders || token.top_10_holders || 0),
        devHoldings: formatPercent(token.devHoldings || token.dev_holdings || 0),
        snipersHoldings: formatPercent(token.snipersHoldings || token.snipers_holdings || 0),
        insiders: formatPercent(token.insiders || 0),
        bundlers: formatPercent(token.bundlers || 0),
        lpBurned: formatPercent(token.lpBurned || token.lp_burned || 0),
        holders: token.holders || 0,
        proTraders: token.proTraders || token.pro_traders || 0,
        dexPaid: token.dexPaid || token.dex_paid || 'Unknown',
        txns: token.txns || token.transactions || 0,
        buyTxns: token.buyTxns || token.buy_txns || 0,
        sellTxns: token.sellTxns || token.sell_txns || 0,
        imageUrl: token.imageUrl || token.image_url || token.image,
        chartData: [],
      }));
    }

    return getMockTokens();
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return getMockTokens();
  }
}

export async function fetchTokenDetails(symbol: string): Promise<TokenData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tokens/${symbol}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch token details: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching token details:', error);
    return null;
  }
}

export async function fetchChartData(
  symbol: string,
  timeframe: string = '1m'
): Promise<Array<{ time: number; value: number }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chart/${symbol}?timeframe=${timeframe}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch chart data: ${response.status}`);
    }

    const data = await response.json();
    return data.chartData;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return generateMockChartData();
  }
}

function generateMockChartData(points: number = 50): Array<{ time: number; value: number }> {
  const now = Math.floor(Date.now() / 1000);
  const data: Array<{ time: number; value: number }> = [];
  let value = 100;

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * 10;
    value = Math.max(50, value + change);
    data.push({
      time: now - (points - i) * 60,
      value: value,
    });
  }

  return data;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatNetVolume(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${formatCurrency(Math.abs(value))}`;
}

function getMockTokens(): TokenData[] {
  return [
    {
      name: "Don't Even Trip Dawg",
      symbol: 'TRIP',
      contract: 'So11111111111111111111111111111111111111112',
      marketCap: '$82.9K',
      liquidity: '$45.2K',
      volume: '$10.5K',
      volume5m: '$165K',
      buys: 721,
      buyVolume: '$85.6K',
      sells: 576,
      sellVolume: '$79.5K',
      netVolume: '+$6.01K',
      priceChange: 66.14,
      top10Holders: '13.33%',
      devHoldings: '0%',
      snipersHoldings: '0%',
      insiders: '6.31%',
      bundlers: '0.12%',
      lpBurned: '100%',
      holders: 1050,
      proTraders: 500,
      dexPaid: 'Unpaid',
      txns: 12,
      buyTxns: 7,
      sellTxns: 5,
      chartData: generateMockChartData(),
    },
    {
      name: 'CORTEX',
      symbol: 'CORTEX',
      contract: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      marketCap: '$82.7K',
      liquidity: '$38.1K',
      volume: '$4.75K',
      volume5m: '$142K',
      buys: 615,
      buyVolume: '$72.3K',
      sells: 503,
      sellVolume: '$69.8K',
      netVolume: '+$2.50K',
      priceChange: -6.76,
      top10Holders: '15.20%',
      devHoldings: '2%',
      snipersHoldings: '1%',
      insiders: '7.10%',
      bundlers: '0.15%',
      lpBurned: '100%',
      holders: 890,
      proTraders: 420,
      dexPaid: 'Paid',
      txns: 10,
      buyTxns: 4,
      sellTxns: 6,
      chartData: generateMockChartData(),
    },
    {
      name: 'PayNet Protocol',
      symbol: 'PAYNET',
      contract: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      marketCap: '$53.5K',
      liquidity: '$23.3K',
      volume: '$623',
      volume5m: '$98.5K',
      buys: 412,
      buyVolume: '$50.2K',
      sells: 389,
      sellVolume: '$48.3K',
      netVolume: '+$1.90K',
      priceChange: -21.60,
      top10Holders: '18.45%',
      devHoldings: '5%',
      snipersHoldings: '2%',
      insiders: '8.50%',
      bundlers: '0.20%',
      lpBurned: '95%',
      holders: 720,
      proTraders: 310,
      dexPaid: 'Unpaid',
      txns: 8,
      buyTxns: 3,
      sellTxns: 5,
      chartData: generateMockChartData(),
    },
    {
      name: 'LOOTFI',
      symbol: 'LOOTFI',
      contract: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      marketCap: '$91.8K',
      liquidity: '$52.7K',
      volume: '$488',
      volume5m: '$125K',
      buys: 530,
      buyVolume: '$65.8K',
      sells: 467,
      sellVolume: '$59.2K',
      netVolume: '+$6.60K',
      priceChange: -10.89,
      top10Holders: '12.80%',
      devHoldings: '1%',
      snipersHoldings: '0%',
      insiders: '5.90%',
      bundlers: '0.08%',
      lpBurned: '100%',
      holders: 1180,
      proTraders: 580,
      dexPaid: 'Paid',
      txns: 15,
      buyTxns: 9,
      sellTxns: 6,
      chartData: generateMockChartData(),
    },
    {
      name: 'PAPEG',
      symbol: 'PAPEG',
      contract: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      marketCap: '$276K',
      liquidity: '$158K',
      volume: '$212',
      volume5m: '$320K',
      buys: 892,
      buyVolume: '$168K',
      sells: 653,
      sellVolume: '$152K',
      netVolume: '+$16K',
      priceChange: 199.05,
      top10Holders: '10.25%',
      devHoldings: '0%',
      snipersHoldings: '0%',
      insiders: '4.15%',
      bundlers: '0.05%',
      lpBurned: '100%',
      holders: 1520,
      proTraders: 710,
      dexPaid: 'Paid',
      txns: 20,
      buyTxns: 14,
      sellTxns: 6,
      chartData: generateMockChartData(),
    },
    {
      name: 'Zerox Society',
      symbol: 'ZEROXS',
      contract: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
      marketCap: '$31.0K',
      liquidity: '$15.8K',
      volume: '$35.7',
      volume5m: '$52.3K',
      buys: 245,
      buyVolume: '$28.1K',
      sells: 312,
      sellVolume: '$24.2K',
      netVolume: '+$3.90K',
      priceChange: -89.14,
      top10Holders: '22.50%',
      devHoldings: '8%',
      snipersHoldings: '5%',
      insiders: '12.80%',
      bundlers: '0.35%',
      lpBurned: '80%',
      holders: 450,
      proTraders: 180,
      dexPaid: 'Unpaid',
      txns: 6,
      buyTxns: 2,
      sellTxns: 4,
      chartData: generateMockChartData(),
    },
  ];
}
