import { useEffect, useState } from 'react';
import { butterWebSocket, type OHLCVData } from '../services/websocket';

export function useWebSocket(contracts: string[], timeframe: string = '1m') {
  const [data, setData] = useState<Map<string, OHLCVData[]>>(new Map());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    butterWebSocket.connect();
    setIsConnected(true);

    const unsubscribe = butterWebSocket.onMessage((ohlcvData: OHLCVData) => {
      setData(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(ohlcvData.contractAddress) || [];
        const updated = [...existing, ohlcvData].slice(-100);
        newMap.set(ohlcvData.contractAddress, updated);
        return newMap;
      });
    });

    if (contracts.length > 0) {
      console.log('Subscribing to contracts:', contracts);
      butterWebSocket.subscribe(contracts, timeframe);
    }

    return () => {
      if (contracts.length > 0) {
        butterWebSocket.unsubscribe(contracts, timeframe);
      }
      unsubscribe();
    };
  }, [contracts.join(','), timeframe]);

  return { data, isConnected };
}
