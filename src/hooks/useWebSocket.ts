import { useEffect, useState } from 'react';
import { butterWebSocket, type OHLCVData } from '../services/websocket';

export function useWebSocket(contracts: string[], timeframe: string = '1m') {
  const [data, setData] = useState<Map<string, OHLCVData[]>>(new Map());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (contracts.length === 0) return;

    butterWebSocket.connect();

    const unsubscribe = butterWebSocket.onMessage((ohlcvData: OHLCVData) => {
      console.log('📊 Hook received data for:', ohlcvData.contractAddress);
      setData(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(ohlcvData.contractAddress) || [];

        // Merge by candle time: replace if same time, append otherwise
        const idx = existing.findIndex(c => c.time === ohlcvData.time);
        let next: OHLCVData[];
        if (idx >= 0) {
          next = existing.slice();
          next[idx] = ohlcvData; // replace running/complete candle
        } else {
          next = [...existing, ohlcvData];
        }

        // Keep bounded history
        if (next.length > 200) next = next.slice(-200);

        newMap.set(ohlcvData.contractAddress, next);
        return newMap;
      });
    });

    const subscribeTimeout = setTimeout(() => {
      console.log('⏰ Delayed subscription to contracts:', contracts.slice(0, 3));
      butterWebSocket.subscribe(contracts, timeframe);
      setIsConnected(true);
    }, 500);

    return () => {
      clearTimeout(subscribeTimeout);
      butterWebSocket.unsubscribe(contracts, timeframe);
      unsubscribe();
    };
  }, [contracts.join(','), timeframe]);

  return { data, isConnected };
}
