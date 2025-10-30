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
        const updated = [...existing, ohlcvData].slice(-100);
        newMap.set(ohlcvData.contractAddress, updated);
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
